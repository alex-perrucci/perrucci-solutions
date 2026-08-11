#!/usr/bin/env bash
set -euo pipefail

if [[ $EUID -ne 0 ]]; then echo 'Esegui come root: sudo bash scripts/bootstrap-vps.sh'; exit 1; fi

apt-get update
apt-get install -y docker.io docker-compose-v2 ufw rsync curl
systemctl enable --now docker

mkdir -p /opt/perrucci-solutions /opt/perrucci-solutions/data
chown -R "${SUDO_USER:-root}:${SUDO_USER:-root}" /opt/perrucci-solutions

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

echo 'VPS pronta. Copia .env in /opt/perrucci-solutions/.env e configura i GitHub Secrets per il deploy.'
