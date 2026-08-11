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
COPY infra/Caddyfile /etc/caddy/Caddyfile
