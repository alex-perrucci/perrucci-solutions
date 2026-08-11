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
