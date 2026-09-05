# contract-mock-demo-app — Demo Provider API

> **What is this?** A tiny Express API that acts as the *real* provider your Pact contracts verify against. Think of it as a fake backend that behaves like a real one — 5 users, real validation, real status codes.

## Before You Start

- [ ] Node.js 18+ installed — check `node -v` (need v18 or higher). Download: https://nodejs.org/en/download
- [ ] Terminal open (PowerShell on Windows, Terminal on Mac/Linux)
- [ ] Internet for `npm install`
- [ ] Files at `companion_files/contract-mock-demo-app/`
- [ ] VS Code or any editor

If any check fails, see **Pre-requisites** in the root `README.md`.

## Quick Start (3 commands to first win)

```bash
# 1. Install — downloads Express, Pact, Jest, Axios
npm install
# What: installs dependencies from package.json
# Why: needed to run server + tests
# Expected: "added 45 packages" + no errors

# 2. Start provider — runs at http://localhost:3000
npm start
# What: starts Express server (server.js)
# Why: provider must be running for Pact Verifier (template 05)
# Expected: "[contract-mock-demo-app] Server running at http://localhost:3000"

# 3. In a SECOND terminal — run all Pact tests
npm test
# What: runs Jest → 5 Pact templates (consumer + provider verification)
# Why: proves contracts pass against this provider
# Expected: "5 passed" + pacts/WebApp-UserAPI.json generated
```

## Try It Now — 2-Terminal Workflow

| Terminal | Command | What You See |
|----------|---------|--------------|
| **Terminal 1** | `npm start` | `Server running at http://localhost:3000` — leave it running |
| **Terminal 2** | `npm test` | `PASS template-01...` ×5, `Pact Verification Complete!` |

Then verify manually:

```bash
curl http://localhost:3000/health
# → {"status":"ok","version":"1.0.0","timestamp":"..."}

curl http://localhost:3000/users/1
# → {"id":1,"name":"Alice Johnson","email":"alice@example.com",...}

curl "http://localhost:3000/users?search=alice&page=1"
# → {"users":[...],"total":1,"page":1,"pageSize":10}

curl http://localhost:3000/users/999
# → {"error":"User not found","statusCode":404}  (404)

curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"","email":"bad"}'
# → {"errors":[...],"statusCode":422}  (422)
```

## Endpoints

| Method | Path | Status | Body Shape | Used By |
|--------|------|--------|------------|---------|
| GET | `/health` | 200 | `{ status, version, timestamp }` | Postman health check |
| GET | `/users/:id` | 200 / 404 | `{ id, name, email, active, createdAt, tags }` | Template 01, WireMock get-user.json |
| POST | `/users` | 201 / 422 | `{ id, name, email, active, createdAt, tags }` | Template 02, WireMock create-user.json |
| GET | `/users?search=&page=&pageSize=` | 200 | `{ users: [...], total, page, pageSize }` | Template 03, WireMock search-users.json |
| GET | `/users/:id` (unknown) | 404 | `{ error, message, statusCode }` | Template 04 |
| POST | `/users` (invalid) | 422 | `{ errors: [{ field, message }], statusCode }` | Template 04 |

## Template → Demo Mapping

| Pact Template | Endpoint Hit | What It Proves |
|---------------|--------------|----------------|
| `template-01-consumer-contract-basic` | `GET /users/1` | Path param + type matchers (`like`, `integer`, `string`) |
| `template-02-consumer-contract-create` | `POST /users` | Body + `regex` + `eachLike` |
| `template-03-consumer-contract-search` | `GET /users?search=alice&page=1` | Query params + array matchers |
| `template-04-consumer-contract-error-handling` | `GET /users/999` + `POST /users` (bad) | 404/422 error contracts |
| `template-05-provider-verification` | All above via `Verifier` | Provider satisfies all consumer pacts |

## Project Tree

```
contract-mock-demo-app/
├── server.js          # Express app — 5 endpoints, in-memory users, CORS
├── package.json       # express, @pact-foundation/pact, jest, axios
├── data/
│   └── users.json     # 5 seed users (Alice, Bob, Charlie, Diana, Evan)
├── .env.example       # PORT=3000, PACT_DIR, PROVIDER_BASE_URL
└── README.md          # this file
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `port already in use` | Another app on 3000 | `PORT=3001 npm start` (or `set PORT=3001` on Windows cmd) |
| `Cannot find module 'express'` | Forgot `npm install` | Run `npm install` in this folder |
| `Pact file not generated` | Tests not run | Run `npm test` — check `pacts/` folder appears |
| `Verifier fails — ECONNREFUSED` | Provider not running | Start `npm start` in Terminal 1 before `npm test` in Terminal 2 |
| `java -jar` not needed here | This demo is Node-only | WireMock is separate — see `../wiremock-setup/README.md` |

## Port via Env Var

```bash
# Windows PowerShell
$env:PORT=4000; npm start

# Windows cmd
set PORT=4000 && npm start

# Mac/Linux
PORT=4000 npm start
```

No database, no Docker, no external services — just Node + Express. Reset on restart (in-memory).

---

*Part of API Contract Testing and Mocking Starter Kit for SDETs — ShamshuTalks SDET Series*
