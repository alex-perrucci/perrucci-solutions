FROM node:22-alpine AS build
WORKDIR /app
COPY apps/web/package.json ./package.json
RUN npm install
COPY apps/web/ ./
ARG NEXT_PUBLIC_MARKETING_API_URL=https://api.perruccisolutions.com
ENV NEXT_PUBLIC_MARKETING_API_URL=$NEXT_PUBLIC_MARKETING_API_URL
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/out /srv
RUN printf ':80 {\n  encode zstd gzip\n  root * /srv\n  try_files {path} {path}/ {path}/index.html\n  file_server\n  header {\n    X-Content-Type-Options nosniff\n    Referrer-Policy strict-origin-when-cross-origin\n    X-Frame-Options DENY\n    Permissions-Policy "camera=(), microphone=(), geolocation=()"\n  }\n}\n' > /etc/caddy/Caddyfile
