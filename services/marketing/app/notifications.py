import httpx
from .config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID


async def telegram(text: str) -> bool:
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return False
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.post(url, json={'chat_id': TELEGRAM_CHAT_ID, 'text': text, 'disable_web_page_preview': True})
        response.raise_for_status()
    return True
