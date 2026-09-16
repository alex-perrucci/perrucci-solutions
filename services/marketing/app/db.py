import json
import os
import sqlite3
from datetime import datetime, timezone
from .config import DATA_DIR, DB_PATH


def connect() -> sqlite3.Connection:
    os.makedirs(DATA_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA journal_mode=WAL')
    return conn


def init_db() -> None:
    with connect() as db:
        db.executescript('''
        CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          created_at TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          service TEXT,
          message TEXT NOT NULL,
          source TEXT,
          page TEXT,
          status TEXT NOT NULL DEFAULT 'new'
        );
        CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          created_at TEXT NOT NULL,
          event TEXT NOT NULL,
          path TEXT,
          source TEXT,
          campaign TEXT
        );
        CREATE TABLE IF NOT EXISTS content_queue (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          created_at TEXT NOT NULL,
          channel TEXT NOT NULL,
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          target_url TEXT,
          status TEXT NOT NULL DEFAULT 'draft',
          external_id TEXT
        );
        CREATE TABLE IF NOT EXISTS gsc_snapshots (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          collected_at TEXT NOT NULL,
          period_start TEXT NOT NULL,
          period_end TEXT NOT NULL,
          clicks INTEGER NOT NULL,
          impressions INTEGER NOT NULL,
          ctr REAL NOT NULL,
          position REAL NOT NULL,
          payload_json TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_gsc_snapshots_period_end
          ON gsc_snapshots(period_end DESC);
        CREATE TABLE IF NOT EXISTS seo_tasks (
          task_key TEXT PRIMARY KEY,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          priority TEXT NOT NULL,
          task_type TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'open',
          page TEXT,
          query TEXT,
          title TEXT NOT NULL,
          rationale TEXT NOT NULL,
          evidence_json TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_seo_tasks_status_priority
          ON seo_tasks(status, priority, updated_at DESC);
        CREATE TABLE IF NOT EXISTS seo_changes (
          release_key TEXT PRIMARY KEY,
          deployed_at TEXT NOT NULL,
          page TEXT NOT NULL,
          summary TEXT NOT NULL,
          baseline_json TEXT NOT NULL,
          review_14_json TEXT,
          review_28_json TEXT
        );
        ''')


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def insert_lead(data: dict) -> int:
    with connect() as db:
        cur = db.execute('INSERT INTO leads(created_at,name,email,phone,service,message,source,page) VALUES(?,?,?,?,?,?,?,?)',
          (now_iso(), data['name'], data['email'], data.get('phone'), data.get('service'), data['message'], data.get('source'), data.get('page')))
        return int(cur.lastrowid)


def insert_event(data: dict) -> None:
    with connect() as db:
        db.execute('INSERT INTO events(created_at,event,path,source,campaign) VALUES(?,?,?,?,?)',
          (now_iso(), data['event'], data.get('path'), data.get('source'), data.get('campaign')))


def lead_stats(days: int = 7) -> dict:
    with connect() as db:
        row = db.execute("SELECT COUNT(*) total, SUM(CASE WHEN status='new' THEN 1 ELSE 0 END) new_count FROM leads WHERE created_at >= datetime('now', ?)", (f'-{days} days',)).fetchone()
        services = db.execute("SELECT COALESCE(service,'Non specificato') service, COUNT(*) n FROM leads WHERE created_at >= datetime('now', ?) GROUP BY service ORDER BY n DESC LIMIT 5", (f'-{days} days',)).fetchall()
    return {'total': int(row['total'] or 0), 'new': int(row['new_count'] or 0), 'services': [dict(x) for x in services]}


def queue_content(channel: str, title: str, body: str, target_url: str = '') -> int:
    with connect() as db:
        cur = db.execute('INSERT INTO content_queue(created_at,channel,title,body,target_url) VALUES(?,?,?,?,?)', (now_iso(), channel, title, body, target_url))
        return int(cur.lastrowid)


def update_content(content_id: int, status: str, external_id: str = '') -> None:
    with connect() as db:
        db.execute('UPDATE content_queue SET status=?, external_id=? WHERE id=?', (status, external_id, content_id))


def save_gsc_snapshot(dataset: dict) -> int:
    with connect() as db:
        cur = db.execute(
            '''INSERT INTO gsc_snapshots(
                 collected_at,period_start,period_end,clicks,impressions,ctr,position,payload_json
               ) VALUES(?,?,?,?,?,?,?,?)''',
            (
                now_iso(),
                dataset['start_date'],
                dataset['end_date'],
                int(dataset.get('clicks', 0)),
                int(dataset.get('impressions', 0)),
                float(dataset.get('ctr', 0)),
                float(dataset.get('position', 0)),
                json.dumps(dataset, ensure_ascii=False, separators=(',', ':'))
            )
        )
        return int(cur.lastrowid)


def latest_gsc_snapshot() -> dict | None:
    with connect() as db:
        row = db.execute('SELECT * FROM gsc_snapshots ORDER BY id DESC LIMIT 1').fetchone()
    if not row:
        return None
    result = dict(row)
    result['payload'] = json.loads(result.pop('payload_json'))
    return result


def upsert_seo_task(task: dict) -> None:
    stamp = now_iso()
    with connect() as db:
        db.execute(
            '''INSERT INTO seo_tasks(
                 task_key,created_at,updated_at,priority,task_type,status,page,query,title,rationale,evidence_json
               ) VALUES(?,?,?,?,?,'open',?,?,?,?,?)
               ON CONFLICT(task_key) DO UPDATE SET
                 updated_at=excluded.updated_at,
                 priority=excluded.priority,
                 task_type=excluded.task_type,
                 page=excluded.page,
                 query=excluded.query,
                 title=excluded.title,
                 rationale=excluded.rationale,
                 evidence_json=excluded.evidence_json''',
            (
                task['task_key'],
                stamp,
                stamp,
                task['priority'],
                task['task_type'],
                task.get('page'),
                task.get('query'),
                task['title'],
                task['rationale'],
                json.dumps(task.get('evidence', {}), ensure_ascii=False, separators=(',', ':'))
            )
        )


def list_seo_tasks(limit: int = 50, status: str | None = 'open') -> list[dict]:
    sql = 'SELECT * FROM seo_tasks'
    params: list[object] = []
    if status:
        sql += ' WHERE status=?'
        params.append(status)
    sql += " ORDER BY CASE priority WHEN 'P1' THEN 1 WHEN 'P2' THEN 2 WHEN 'P3' THEN 3 ELSE 9 END, updated_at DESC LIMIT ?"
    params.append(max(1, min(limit, 200)))
    with connect() as db:
        rows = db.execute(sql, params).fetchall()
    result = []
    for row in rows:
        item = dict(row)
        item['evidence'] = json.loads(item.pop('evidence_json'))
        result.append(item)
    return result


def seo_task_stats() -> dict:
    with connect() as db:
        rows = db.execute(
            "SELECT priority, COUNT(*) n FROM seo_tasks WHERE status='open' GROUP BY priority"
        ).fetchall()
    counts = {row['priority']: int(row['n']) for row in rows}
    return {'P1': counts.get('P1', 0), 'P2': counts.get('P2', 0), 'P3': counts.get('P3', 0)}


def seed_seo_change(release_key: str, deployed_at: str, page: str, summary: str, baseline: dict) -> None:
    with connect() as db:
        db.execute(
            '''INSERT OR IGNORE INTO seo_changes(
                 release_key,deployed_at,page,summary,baseline_json
               ) VALUES(?,?,?,?,?)''',
            (release_key, deployed_at, page, summary, json.dumps(baseline, ensure_ascii=False, separators=(',', ':')))
        )


def due_seo_changes(review_days: int) -> list[dict]:
    if review_days not in (14, 28):
        raise ValueError('review_days must be 14 or 28')
    review_column = f'review_{review_days}_json'
    with connect() as db:
        rows = db.execute(
            f'''SELECT * FROM seo_changes
                WHERE {review_column} IS NULL
                  AND datetime(deployed_at) <= datetime('now', ?)
                ORDER BY deployed_at ASC''',
            (f'-{review_days} days',)
        ).fetchall()
    result = []
    for row in rows:
        item = dict(row)
        item['baseline'] = json.loads(item.pop('baseline_json'))
        result.append(item)
    return result


def save_seo_change_review(release_key: str, review_days: int, result: dict) -> None:
    if review_days not in (14, 28):
        raise ValueError('review_days must be 14 or 28')
    review_column = f'review_{review_days}_json'
    with connect() as db:
        db.execute(
            f'UPDATE seo_changes SET {review_column}=? WHERE release_key=?',
            (json.dumps(result, ensure_ascii=False, separators=(',', ':')), release_key)
        )
