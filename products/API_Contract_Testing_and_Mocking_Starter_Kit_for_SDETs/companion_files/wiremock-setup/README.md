# WireMock Setup — 3 Ways to Run a Mock Server

> **What is this?** Three scripts to spin up a WireMock mock server at `http://localhost:8080` — pick ONE that fits your machine. All three produce the same mock server with the same 3 mappings.

## Before You Start

- [ ] Terminal open (PowerShell on Windows, Terminal on Mac/Linux)
- [ ] Internet for downloads
- [ ] Files at `companion_files/wiremock-setup/`
- [ ] **Either** Java 11+ **or** Docker Desktop (you need only ONE — see table below)

## Choose Your Path (30 seconds)

| Option | Command | Needs Java? | Needs Docker? | Best For |
|--------|---------|-------------|---------------|----------|
| **01 Standalone JAR** | `bash 01-standalone-jar.sh` | ✅ Yes (11+) | No | No Docker, just Java |
| **02 Docker** | `bash 02-docker.sh` | No | ✅ Yes | No Java, have Docker |
| **02 Docker Compose** | `docker-compose up` | No | ✅ Yes | Team sharing, one command |
| **03 Programmatic** | `node wiremock-03-start-mock-server.js` | No* | No* | From code (Jest beforeAll) |

*03 needs WireMock already running via 01 or 02 — it configures via Admin API.

**Have Docker? Use Docker (no Java). No Docker? Use JAR (needs Java 11+). Team sharing? Use Compose.**

All 3 produce the same mock server at `http://localhost:8080` — pick one, the mappings are identical.

## Quick Start

### Option 01 — Standalone JAR

```bash
# Windows: 01-standalone-jar.bat  (double-click or run in PowerShell)
# Mac/Linux: bash 01-standalone-jar.sh

bash 01-standalone-jar.sh
# What: downloads wiremock-standalone-3.13.2.jar (if missing) + starts on :8080
# Why: no Docker needed, just Java 11+
# Expected: "WireMock started on port 8080"
```

Download JAR manually if needed: https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/3.13.2/wiremock-standalone-3.13.2.jar

Verify Java: `java -version` (need 11+, recommend Temurin 17 from https://adoptium.net/temurin/releases/)

### Option 02 — Docker

```bash
# Windows: 02-docker.bat
# Mac/Linux: bash 02-docker.sh

bash 02-docker.sh
# What: docker run wiremock/wiremock:3.13.2 with volume mount
# Why: no Java, reproducible
# Expected: "WireMock started on port 8080"

# Or via Compose:
docker-compose up
# Or: docker compose up  (newer Docker)
```

Verify Docker: `docker --version` — install from https://www.docker.com/products/docker-desktop/

### Option 03 — Programmatic (Node.js)

```bash
# WireMock must already be running (via 01 or 02)
node wiremock-03-start-mock-server.js
# What: creates 4 mappings via Admin API (GET /users/1, POST /users, GET /users?search, GET /health)
# Why: spin mocks from code (e.g., Jest beforeAll)
# Expected: "WireMock mappings created" + 4 mappings

# Or import in Jest:
# const { createMapping, verifyRequest } = require('./wiremock-03-start-mock-server');
# beforeAll(async () => { await createMapping({ request: {...}, response: {...} }); });
```

## Verify It Works

```bash
curl http://localhost:8080/__admin/mappings
# → {"mappings": [3 mappings], "meta": {"total": 3}}

curl http://localhost:8080/users/1
# → {"id":1,"name":"Alice Johnson","email":"alice@example.com",...}

curl http://localhost:8080/health
# → {"status":"ok","version":"1.0.0",...}  (if via 03 script)

# Check what UI requested (for UI-against-mock workflow):
curl http://localhost:8080/__admin/requests
# → {"requests": [...], "meta": {"total": N}}
```

## Mappings — What They Do

| File | Request | Response | Used By |
|------|---------|----------|---------|
| `03-mappings/mappings/get-user.json` | `GET /users/1` | 200 + Alice | Pact template 01, Postman |
| `03-mappings/mappings/create-user.json` | `POST /users` | 201 + new user | Pact template 02 |
| `03-mappings/mappings/search-users.json` | `GET /users?search=alice&page=1` | 200 + users array | Pact template 03 |
| `03-mappings/__files/user-1.json` | (body file) | Alice JSON | Referenced via bodyFileName |

Each mapping includes `Access-Control-Allow-Origin: *` for UI-against-mock (browser CORS).

## WireMock CLI Flags Reference

| Flag | Example | What It Does | When to Use |
|------|---------|--------------|-------------|
| `--port` | `--port 8080` | Port to listen on | Change if 8080 in use |
| `--root-dir` | `--root-dir ./wiremock` | Folder with mappings/ + __files/ | Custom location |
| `--global-response-templating` | (flag) | Enables Handlebars `{{request.path}}`, `{{now}}` | Dynamic mocks (see PDF p24) |
| `--enable-stub-cors` | (flag) | Sends CORS headers for all stubs | UI-against-mock (browser) |
| `--verbose` | (flag) | Logs every request + matching | Debugging |
| `--https-port` | `--https-port 8443` | HTTPS port | HTTPS mocks |
| `--record-mappings` | (flag) | Captures real API traffic | Record real backend |
| `--proxy-all` | `--proxy-all="https://api.example.com"` | Proxies unmatched to real API | Partial backend ready |
| `--disable-gzip` | (flag) | Disables gzip | Debugging compressed responses |

## Response Templating (Dynamic Mocks)

Enabled via `--global-response-templating` or per-stub `"transformers": ["response-template"]`.

```json
{
  "request": { "urlPath": "/users/1" },
  "response": {
    "status": 200,
    "body": "{ \"id\": \"{{request.pathSegments.[1]}}\", \"timestamp\": \"{{now format='yyyy-MM-dd'}}\" }",
    "headers": { "Content-Type": "application/json" },
    "transformers": ["response-template"]
  }
}
```

Helpers: `{{request.url}}`, `{{request.path}}`, `{{request.query.key}}`, `{{now}}`, `{{randomValue length=10}}`, `{{jsonPath request.body '$.name'}}` — see https://wiremock.org/docs/response-templating/

## Record / Playback (Capture Real API)

```bash
# Start recording (proxy + capture):
curl -X POST http://localhost:8080/__admin/recordings/start -H "Content-Type: application/json" -d '{"targetBaseUrl": "https://api.example.com"}'
# Make requests through WireMock (they proxy to real API and are recorded)
curl http://localhost:8080/users/1
# Stop and save:
curl -X POST http://localhost:8080/__admin/recordings/stop
# → mappings written to wiremock/mappings/

# Or via CLI:
java -jar wiremock-standalone-3.13.2.jar --port 8080 --proxy-all="https://api.example.com" --record-mappings --verbose
```

UI: http://localhost:8080/__admin/recorder

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Java not found` | No Java 11+ | Install Temurin 17: https://adoptium.net/temurin/releases/ → `java -version` |
| `Docker not found` | No Docker Desktop | Install: https://www.docker.com/products/docker-desktop/ → `docker --version` |
| `Port 8080 in use` | Another app on 8080 | Use `--port 9999` (JAR) or `-p 9999:8080` (Docker) + update `{{baseUrl}}` in Postman to `http://localhost:9999` |
| `404 for /users/1` | Mapping not loaded | Check `--root-dir` points to folder with `mappings/` subfolder; check `curl http://localhost:8080/__admin/mappings` shows 3 |
| `CORS blocked` in browser | Missing CORS header | Ensure `--enable-stub-cors` flag OR mapping has `"Access-Control-Allow-Origin": "*"` |
| `Volume mount fails on Windows` | Path format | PowerShell: `-v ${PWD}/03-mappings:/home/wiremock` · cmd: `-v %cd%\03-mappings:/home/wiremock` |

## Project Tree

```
wiremock-setup/
├── 01-standalone-jar.sh / .bat     # JAR — needs Java 11+
├── 02-docker.sh / .bat             # Docker — needs Docker Desktop
├── docker-compose.yml              # Compose — team sharing
├── wiremock-03-start-mock-server.js # Programmatic — via Admin API
├── 03-mappings/
│   ├── mappings/
│   │   ├── get-user.json
│   │   ├── create-user.json
│   │   └── search-users.json
│   └── __files/
│       └── user-1.json
└── README.md                       # this file
```

---

*Part of API Contract Testing and Mocking Starter Kit for SDETs — ShamshuTalks SDET Series*
