import os

DATA_DIR = os.getenv('DATA_DIR', '/data')
DB_PATH = os.path.join(DATA_DIR, 'marketing.db')
CORS_ORIGINS = [x.strip() for x in os.getenv('CORS_ORIGINS', 'https://perruccisolutions.com,https://www.perruccisolutions.com').split(',') if x.strip()]
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID', '')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET', '')
GOOGLE_REFRESH_TOKEN = os.getenv('GOOGLE_REFRESH_TOKEN', '')
GOOGLE_SEARCH_CONSOLE_SITE = os.getenv('GOOGLE_SEARCH_CONSOLE_SITE', 'https://perruccisolutions.com/')
GBP_ACCOUNT_ID = os.getenv('GBP_ACCOUNT_ID', '')
GBP_LOCATION_ID = os.getenv('GBP_LOCATION_ID', '')
GBP_AUTO_PUBLISH = os.getenv('GBP_AUTO_PUBLISH', 'false').lower() == 'true'
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', '')
