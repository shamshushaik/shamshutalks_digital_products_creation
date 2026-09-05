# API Contract Testing and Mocking Starter Kit for SDETs

> **Stop waiting for backend teams to finish.** Test your UI against a mock server while the backend is still being built — with 5 Pact.js contract templates, 3 WireMock setups, a Postman collection, and a 10-page breaking-change checklist. One kit, zero waiting.

**What you get:** 5 ready-to-use Pact.js templates (consumer-driven, Pact V3), 3 WireMock scripts (JAR / Docker / programmatic), Postman collection (v2.1) with `pm.test` assertions, 14-category breaking-change checklist, runnable Express demo API, and 5 hands-on practice exercises.

---

## 1. What's Included

| # | Item | Type | Path on Disk | What You Get |
|---|------|------|--------------|--------------|
| 1 | Pact Template 01 — GET /users/:id | Code template | `companion_files/pact-templates/template-01-consumer-contract-basic.test.js` | Path param + `like`/`integer`/`string`/`regex` matchers |
| 2 | Pact Template 02 — POST /users | Code template | `companion_files/pact-templates/template-02-consumer-contract-create.test.js` | Body + `regex` + `eachLike` |
| 3 | Pact Template 03 — GET /users?search | Code template | `companion_files/pact-templates/template-03-consumer-contract-search.test.js` | Query params + array matchers |
| 4 | Pact Template 04 — Error Handling | Code template | `companion_files/pact-templates/template-04-consumer-contract-error-handling.test.js` | 404/422 error contracts |
| 5 | Pact Template 05 — Provider Verification | Code template | `companion_files/pact-templates/template-05-provider-verification.test.js` | `Verifier` + `stateHandlers` |
| 6 | WireMock JAR Script | Setup script | `companion_files/wiremock-setup/01-standalone-jar.sh` + `.bat` | `java -jar` with templating + CORS |
| 7 | WireMock Docker Script | Setup script | `companion_files/wiremock-setup/02-docker.sh` + `.bat` + `docker-compose.yml` | `docker run` / `docker-compose up` |
| 8 | WireMock Programmatic | Setup script | `companion_files/wiremock-setup/wiremock-03-start-mock-server.js` | Node.js via Admin API |
| 9 | WireMock Mappings | Mock data | `companion_files/wiremock-setup/03-mappings/mappings/*.json` + `__files/` | 3 mappings (get, create, search) |
| 10 | Postman Collection | Collection v2.1 | `companion_files/postman/Contract_Mock_Validation.postman_collection.json` | 3 folders, 6 requests, `pm.test` per request |
| 11 | Breaking-Change Checklist | Checklist | `companion_files/checklists/api-breaking-change-checklist.md` | 14 categories, severity matrix, decision tree |
| 12 | Demo App | Runnable API | `companion_files/contract-mock-demo-app/` | Express with 5 endpoints, 5 seed users |
| 13 | Practice Lab | Exercises | `companion_files/contract-mock-practice-lab/` | 5 exercises + 3 helpers + data-factory |
| 14 | PDF Guide | Guide (35 pages) | `API_Contract_Testing_and_Mocking_Starter_Kit.pdf` | Full methodology + all templates explained |

---

## 2. Start Here — Numbered Flow

1. **Read** this README (you are here) — 2 min orientation.
2. **Study** the PDF Ch 1–2 (methodology + lifecycle) — understand stub vs mock vs contract.
3. **Learn** matchers (PDF p12, Table T3) — `like` for type, `regex` for format, `eachLike` for arrays.
4. **Practice** — copy a Pact template, run `npm test` in demo app, see `pacts/*.json` generated.
5. **Training** — start WireMock + demo app + Postman collection (2-terminal workflow below).
6. **Create** — fork demo app, add your API endpoint, write new Pact test, verify.

---

## 3. Pre-requisites

| Tool | Version | Why Needed | Download Link | Verify Command |
|------|---------|------------|---------------|----------------|
| Node.js | 18+ (20 LTS recommended) | Runs Pact, Express, Jest | https://nodejs.org/en/download | `node -v` |
| npm | 9+ (bundled with Node) | Installs dependencies | Bundled with Node | `npm -v` |
| Java (for WireMock JAR only) | 17 LTS (Temurin) | Runs WireMock standalone JAR | https://adoptium.net/temurin/releases/ | `java -version` |
| Docker Desktop (for WireMock Docker) | Latest | Runs WireMock without Java | https://www.docker.com/products/docker-desktop/ | `docker --version` |
| Postman | Latest (free tier) | Validates mock responses | https://www.postman.com/downloads/ | Open Postman |
| VS Code | Latest | Editor | https://code.visualstudio.com/download | `code --version` |
| Git | Latest | Version control | https://git-scm.com/downloads | `git --version` |

> **You need only ONE of Java or Docker for WireMock.** Have Docker? Use Docker (no Java). No Docker? Use JAR (needs Java 11+). See `companion_files/wiremock-setup/README.md` for choice guide.

**Windows vs Mac vs Linux:**
- Node: `winget install OpenJS.NodeJS.LTS` (Windows) / `brew install node` (Mac) / `nvm install 20` (Linux)
- Java: `winget install EclipseAdoptium.Temurin.17.JDK` (Windows) / `brew install --cask temurin@17` (Mac)
- Docker volume mount: `-v %cd%:/home/wiremock` (cmd) / `-v ${PWD}:/home/wiremock` (PowerShell) / `-v $PWD:/home/wiremock` (Mac/Linux)

---

## 4. Quick Start (3 Commands to First Win)

```bash
# 1. Go to demo app
cd companion_files/contract-mock-demo-app

# 2. Install — downloads Express, Pact, Jest, Axios
npm install
# What: installs dependencies from package.json
# Why: needed to run server + tests
# Expected: "added 45 packages" + no errors

# 3. Start provider + run tests (see Try It Now for 2-terminal)
npm start
# What: starts Express at http://localhost:3000
# Expected: "[contract-mock-demo-app] Server running at http://localhost:3000"
```

---

## 5. Try It Now — 2-Terminal Workflow

| Terminal | Command | What You See |
|----------|---------|--------------|
| **Terminal 1** | `cd companion_files/contract-mock-demo-app && npm install && npm start` | `Server running at http://localhost:3000` — leave it running |
| **Terminal 2** | `cd companion_files/contract-mock-demo-app && npm test` | `PASS` ×5, `Pact Verification Complete!`, `pacts/WebApp-UserAPI.json` generated |

Then verify manually:

```bash
curl http://localhost:3000/health
# → {"status":"ok","version":"1.0.0","timestamp":"..."}

curl http://localhost:3000/users/1
# → {"id":1,"name":"Alice Johnson","email":"alice@example.com",...}

curl "http://localhost:3000/users?search=alice&page=1"
# → {"users":[...],"total":1,"page":1,"pageSize":10}
```

**WireMock (separate, for UI-against-mock):**

```bash
# Option A — Docker (no Java):
cd companion_files/wiremock-setup && bash 02-docker.sh
# Option B — JAR (needs Java 11+):
cd companion_files/wiremock-setup && bash 01-standalone-jar.sh
# Verify:
curl http://localhost:8080/__admin/mappings
# → {"mappings": [3 mappings]}
```

**Postman:**

1. Open Postman → File → Import → select `companion_files/postman/Contract_Mock_Validation.postman_collection.json`
2. Set variable `baseUrl` to `http://localhost:8080` (WireMock) or `http://localhost:3000` (demo app)
3. Click any request → Send → see `pm.test` PASS/FAIL

---

## 6. Project Tree

```
API_Contract_Testing_and_Mocking_Starter_Kit_for_SDETs/
├── README.md                          # this file — 10-point onboarding
├── requirements.txt                   # dependency listing
├── .env.example                       # PORT, WIREMOCK_URL, PACT_DIR
├── API_Contract_Testing_and_Mocking_Starter_Kit.pdf  # 35-page guide (when generated)
├── companion_files/
│   ├── pact-templates/                # 5 Pact.js templates (PactV3 + MatchersV3)
│   │   ├── template-01-consumer-contract-basic.test.js
│   │   ├── template-02-consumer-contract-create.test.js
│   │   ├── template-03-consumer-contract-search.test.js
│   │   ├── template-04-consumer-contract-error-handling.test.js
│   │   └── template-05-provider-verification.test.js
│   ├── wiremock-setup/                # 3 WireMock setups
│   │   ├── 01-standalone-jar.sh / .bat
│   │   ├── 02-docker.sh / .bat
│   │   ├── docker-compose.yml
│   │   ├── wiremock-03-start-mock-server.js
│   │   ├── 03-mappings/
│   │   │   ├── mappings/
│   │   │   │   ├── get-user.json
│   │   │   │   ├── create-user.json
│   │   │   │   └── search-users.json
│   │   │   └── __files/
│   │   │       └── user-1.json
│   │   └── README.md
│   ├── postman/
│   │   └── Contract_Mock_Validation.postman_collection.json  # v2.1
│   ├── checklists/
│   │   └── api-breaking-change-checklist.md  # 14 categories + decision tree
│   ├── contract-mock-demo-app/        # Runnable Express provider
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── data/users.json
│   │   ├── .env.example
│   │   └── README.md
│   └── contract-mock-practice-lab/    # 5 exercises + helpers
│       ├── package.json
│       ├── jest.config.js
│       ├── .env.example
│       ├── helpers/
│       │   ├── pact-helpers.js
│       │   ├── wiremock-helpers.js
│       │   └── data-factory.js
│       ├── exercises/
│       │   ├── 01-break-field-removal/
│       │   ├── 02-break-type-change/
│       │   ├── 03-add-required-field/
│       │   ├── 04-wiremock-templating/
│       │   └── 05-ui-against-mock/
│       └── README.md
└── slides/                            # HTML slides (when generated)
    └── index.html
```

---

## 7. Glossary

| Term | Plain-Language Definition | Where It Fits |
|------|---------------------------|---------------|
| **Consumer** | The app that USES the API (like a customer ordering from a menu) | Your UI / frontend — writes Pact contract |
| **Provider** | The app that BUILDS the API (like the kitchen making the dish) | Backend API — must satisfy contract |
| **Contract** | Written agreement: what requests look like + what responses look like | Pact file (`pacts/*.json`) — the handshake |
| **Pact file** | JSON artifact generated by consumer tests — the contract | `pacts/WebApp-UserAPI.json` — commit & share |
| **Matcher** | Flexible rule: `like` (any type), `regex` (format), `eachLike` (array) | Catches breaking changes (type/format drift) |
| **Provider state** | `given('user exists')` — tells provider what data to seed | `stateHandlers` in Verifier |
| **Verifier** | Checks real provider satisfies all consumer pacts | `template-05` — CI gate |
| **Stub** | Canned response for a matched request (no verification) | WireMock `mappings/*.json` |
| **Mock** | Stub + verification that expected requests were made | WireMock `verifyRequest()` |
| **WireMock** | Mock server that returns canned responses at `http://localhost:8080` | Standalone JAR or Docker |

---

## 8. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `port already in use` (3000 or 8080) | Another app on that port | `PORT=3001 npm start` (demo) or `--port 9999` (WireMock) + update `{{baseUrl}}` in Postman |
| `Cannot find module 'express'` | Forgot `npm install` | `cd companion_files/contract-mock-demo-app && npm install` |
| `Pact file not generated` | Tests not run or `pacts/` missing | `mkdir -p pacts && npm test` — check `pacts/WebApp-UserAPI.json` appears |
| `Verifier fails — ECONNREFUSED` | Provider not running | Start `npm start` in Terminal 1 before `npm test` in Terminal 2 |
| `WireMock 404 for /users/1` | Mapping not loaded | Check `curl http://localhost:8080/__admin/mappings` shows 3 mappings; check `--root-dir` points to folder with `mappings/` subfolder |
| `CORS blocked` in browser | Missing CORS header | Ensure WireMock started with `--enable-stub-cors` or mapping has `"Access-Control-Allow-Origin": "*"` |
| `Postman variable not set` | `baseUrl` not configured | Collection → Variables → set `baseUrl` to `http://localhost:8080` (WireMock) or `http://localhost:3000` (demo) |
| `Java not found` | No Java 11+ for JAR | Install Temurin 17: https://adoptium.net/temurin/releases/ → `java -version` (or use Docker instead) |

---

## 9. Link to PDF

The full 35-page guide is at `API_Contract_Testing_and_Mocking_Starter_Kit.pdf` (when generated) — covers methodology, all 5 templates with 7-part flow, WireMock deep dive, Postman validation, UI-against-mock hero workflow (10 steps), and the printable breaking-change checklist.

Until PDF is generated, this README + `companion_files/` is fully runnable — every template, mapping, and exercise works standalone.

---

## 10. Branding

**ShamshuTalks — SDET Series** · Free & Open-Source Stack · No Vendor Lock-In

- Pact (MIT) · WireMock (Apache 2.0) · Express (MIT) · Jest (MIT) · Postman (free tier)
- Every tool is free/open-source with download link — no paid tool required.
- Questions? DM **CAREER** on Instagram @shamshutalks

---

*Stack: Node.js 18+ (20 LTS rec.) + Pact 17.1.3 + WireMock 3.13.2 + Jest 29 + Express 4 + Postman v2.1 — all free/OSS, verified 2026-09-04*
