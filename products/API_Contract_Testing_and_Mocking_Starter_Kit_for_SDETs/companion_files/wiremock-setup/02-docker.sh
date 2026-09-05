#!/bin/bash
# WireMock Setup — Script 02: Docker (no Java needed, just Docker Desktop)
# What: Starts WireMock mock server via Docker at http://localhost:8080
# Why: For SDETs with Docker — no Java install, reproducible, one command.
# Where: companion_files/wiremock-setup/ — run from this folder
# How: bash 02-docker.sh  (or docker-compose up for Compose option)
# Expected: "WireMock started on port 8080" + curl http://localhost:8080/__admin/mappings → {"mappings":[...]}
# What if: Docker not found → install Docker Desktop from https://www.docker.com/products/docker-desktop/
#          Port 8080 in use → change -p 9999:8080 and update {{baseUrl}} in Postman
#          Volume mount fails on Windows → use ${PWD} in PowerShell, %cd% in cmd (see .bat)

set -e

WIREMOCK_IMAGE="wiremock/wiremock:3.13.2"
PORT="${PORT:-8080}"
CONTAINER_NAME="wiremock-contract-mock"

echo "[WireMock] Docker setup — image ${WIREMOCK_IMAGE}"

if ! command -v docker &> /dev/null; then
  echo "[ERROR] Docker not found. Install Docker Desktop:"
  echo "  Download: https://www.docker.com/products/docker-desktop/"
  echo "  Verify: docker --version"
  echo "  Alternative: Podman (https://podman.io/) or Rancher Desktop"
  exit 1
fi
echo "[OK] Docker: $(docker --version)"

# Ensure mappings exist
mkdir -p 03-mappings/mappings 03-mappings/__files
if [ ! -f "03-mappings/mappings/get-user.json" ]; then
  echo "[WARN] Example mappings not found at 03-mappings/mappings/ — WireMock will start empty."
  echo "  Create mappings per README or copy from companion_files/wiremock-setup/03-mappings/"
fi

# Stop existing container if running
if docker ps -q -f name="${CONTAINER_NAME}" | grep -q .; then
  echo "[INFO] Stopping existing container ${CONTAINER_NAME}..."
  docker stop "${CONTAINER_NAME}" > /dev/null
  docker rm "${CONTAINER_NAME}" > /dev/null 2>&1 || true
fi

echo "[INFO] Starting WireMock via Docker on port ${PORT}..."
echo "  Image: ${WIREMOCK_IMAGE}"
echo "  Flags: --global-response-templating --enable-stub-cors --verbose"
echo "  Mount: ./03-mappings → /home/wiremock (inside container)"
echo "  Admin: http://localhost:${PORT}/__admin/mappings"
echo "  Stop:  docker stop ${CONTAINER_NAME}"
echo ""

# Use 03-mappings as WireMock root (contains mappings/ + __files/)
docker run -it --rm \
  -p "${PORT}:8080" \
  -v "$PWD/03-mappings:/home/wiremock" \
  --name "${CONTAINER_NAME}" \
  "${WIREMOCK_IMAGE}" \
  --global-response-templating \
  --enable-stub-cors \
  --verbose

# ── Alternative: Docker Compose ─────────────────────────────────────────
# What: docker-compose up  (uses docker-compose.yml in this folder)
# Why: Team sharing — one command, mounts mappings, reproducible.
# How: docker-compose up  (or docker compose up for newer Docker)
# Expected: same as above, but via Compose
