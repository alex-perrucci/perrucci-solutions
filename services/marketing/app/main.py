import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from .config import CORS_ORIGINS, ADMIN_TOKEN
from .db import init_db, insert_lead, insert_event, lead_stats
from .notifications import telegram
from .scheduler import build_scheduler, weekly_report, weekly_content

RATE: dict[str, deque[float]] = defaultdict(deque)


class LeadIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    service: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=10, max_length=3000)
    source: str | None = Field(default='website', max_length=80)
    page: str | None = Field(default='/', max_length=300)
    privacy_consent: str = 'yes'
    website: str | None = None


class EventIn(BaseModel):
    event: str = Field(min_length=1, max_length=80)
    path: str | None = Field(default=None, max_length=300)
    source: str | None = Field(default=None, max_length=100)
    campaign: str | None = Field(default=None, max_length=100)


def rate_limit(request: Request, limit: int = 8, window: int = 600) -> None:
    ip = request.client.host if request.client else 'unknown'
    now = time.time()
    q = RATE[ip]
    while q and q[0] < now - window:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(429, 'Troppe richieste. Riprova più tardi.')
    q.append(now)


def require_admin(request: Request) -> None:
    if not ADMIN_TOKEN or request.headers.get('x-admin-token') != ADMIN_TOKEN:
        raise HTTPException(401, 'Unauthorized')


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    scheduler = build_scheduler()
    scheduler.start()
    yield
    scheduler.shutdown(wait=False)


app = FastAPI(title='Perrucci Marketing API', version='0.1.0', lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=CORS_ORIGINS, allow_credentials=False, allow_methods=['POST', 'GET'], allow_headers=['Content-Type', 'X-Admin-Token'])


@app.get('/health')
def health():
    return {'ok': True}


@app.post('/leads', status_code=201)
async def create_lead(lead: LeadIn, request: Request):
    rate_limit(request)
    if lead.website:
        return {'ok': True}
    if lead.privacy_consent != 'yes':
        raise HTTPException(400, 'Consenso richiesto')
    lead_id = insert_lead(lead.model_dump(exclude={'website', 'privacy_consent'}))
    await telegram(f'NUOVO LEAD #{lead_id}\n{lead.name} — {lead.service or "Servizio non specificato"}\n{lead.email}\n{lead.phone or ""}\n\n{lead.message[:700]}')
    return {'ok': True, 'id': lead_id}


@app.post('/events', status_code=202)
def event(data: EventIn):
    insert_event(data.model_dump())
    return {'ok': True}


@app.get('/admin/stats')
def stats(request: Request, days: int = 7):
    require_admin(request)
    return lead_stats(max(1, min(days, 365)))


@app.post('/admin/run/weekly-report')
async def run_weekly_report(request: Request):
    require_admin(request)
    await weekly_report()
    return {'ok': True}


@app.post('/admin/run/content')
async def run_content(request: Request):
    require_admin(request)
    await weekly_content()
    return {'ok': True}
