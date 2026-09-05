# contract-mock-practice-lab — Practice Lab

> **What is this?** 5 hands-on exercises where you BREAK a contract and see it fail — then fix it. Like a flight simulator for breaking changes — crash safely, learn, then fly for real.

## Before You Start

- [ ] Node.js 18+ — `node -v` (need 18+). Download: https://nodejs.org/en/download
- [ ] Terminal open (PowerShell / Terminal)
- [ ] Internet for `npm install`
- [ ] Files at `companion_files/contract-mock-practice-lab/`
- [ ] Demo app at `../contract-mock-demo-app/` (for exercises 01-03, 05)
- [ ] WireMock running at `http://localhost:8080` (for exercises 04-05) — see `../wiremock-setup/README.md`

## Quick Start

```bash
# 1. Install
npm install
# What: installs Pact, Jest, Axios
# Expected: "added 45 packages"

# 2. Run all exercises (some will FAIL — that's the point!)
npm test
# What: runs all 5 exercises via Jest
# Expected: exercises 01-03 show Pact verification FAIL (breaking change), 04-05 PASS

# 3. Run one exercise
npm run test:exercise1
# Or: npx jest exercises/01-break-field-removal --runInBand
```

## Exercises

| # | Exercise | What You Break | What You Learn | Checklist Item |
|---|----------|----------------|----------------|----------------|
| 01 | `01-break-field-removal` | Remove `email` from provider response | Field removal is 🔴 Breaking — `like`/`string` catches it | #13 |
| 02 | `02-break-type-change` | Change `id` from number to string | Type change is 🔴 Breaking — `integer` vs `string` | #14 |
| 03 | `03-add-required-field` | Add required `phone` to POST | Required field addition is 🔴 Breaking — 422 | #8 |
| 04 | `04-wiremock-templating` | Make WireMock response dynamic | Handlebars `{{request.path}}`, `{{now}}` | WireMock templating |
| 05 | `05-ui-against-mock` | Point UI to WireMock, verify requests | Env var + CORS + `verifyRequest()` | UI-against-mock workflow |

Each exercise has: `README.md` (What/Why/How) + `exercise.test.js` (starter with TODOs) + `solution/` (complete answer).

**How to do an exercise:**
1. Read `exercises/01-break-field-removal/README.md`
2. Open `exercises/01-break-field-removal/exercise.test.js` — fill TODOs
3. Run `npx jest exercises/01-break-field-removal --runInBand` — see FAIL (breaking change caught!)
4. Check `solution/solution.test.js` if stuck
5. Fix and re-run — see PASS

## Helpers Reference

### pact-helpers.js

| Helper | What It Does | Example |
|--------|--------------|---------|
| `createPact(consumer, provider, opts)` | One-liner PactV3 with defaults | `createPact('WebApp', 'UserAPI')` |
| `withAuthHeader(token)` | Returns `{ Authorization: Bearer ... }` | `withAuthHeader('my-token')` |
| `ProviderStates` | Constants for `given()` strings | `ProviderStates.USER_1_EXISTS` |
| `jsonHeaders(extra)` | `{ Content-Type, Accept, ...extra }` | `jsonHeaders({ 'X-Custom': '1' })` |

Copy to your project: `const { createPact } = require('./helpers/pact-helpers');`

### wiremock-helpers.js

| Helper | What It Does | Example |
|--------|--------------|---------|
| `createMapping(mapping)` | `POST /__admin/mappings` | `createMapping({ request: {...}, response: {...} })` |
| `listMappings()` | `GET /__admin/mappings` | `listMappings()` |
| `resetMappings()` | `POST /__admin/mappings/reset` | `resetMappings()` |
| `verifyRequest(pattern)` | `POST /__admin/requests/count` | `verifyRequest({ method: 'GET', url: '/users/1' })` |
| `getRequests()` | `GET /__admin/requests` | `getRequests()` |
| `isWireMockRunning()` | Health check | `isWireMockRunning()` |
| `buildMapping(opts)` | Build mapping with CORS | `buildMapping({ method: 'GET', url: '/users/1', jsonBody: {...} })` |

### data-factory.js

| Helper | What It Does | Example |
|--------|--------------|---------|
| `makeUser(overrides)` | Unique user with timestamped email | `makeUser({ name: 'Alice' })` |
| `makeUserList(count, overrides)` | Array of unique users | `makeUserList(3)` |
| `makeErrorResponse(status, msg)` | Error body (404/422) | `makeErrorResponse(404)` |
| `makeSearchResponse(users, page, pageSize)` | Paginated response | `makeSearchResponse()` |
| `makeUserMapping(user)` | WireMock mapping for user | `makeUserMapping(user)` |

All factories generate **unique timestamped data** — no two tests collide.

## Project Tree

```
contract-mock-practice-lab/
├── package.json
├── jest.config.js
├── .env.example
├── helpers/
│   ├── pact-helpers.js       # createPact(), ProviderStates, jsonHeaders
│   ├── wiremock-helpers.js   # createMapping(), verifyRequest(), buildMapping
│   └── data-factory.js       # makeUser(), makeUserList(), makeErrorResponse
├── exercises/
│   ├── 01-break-field-removal/
│   │   ├── README.md
│   │   ├── exercise.test.js  # TODOs for learner
│   │   └── solution/solution.test.js
│   ├── 02-break-type-change/
│   ├── 03-add-required-field/
│   ├── 04-wiremock-templating/
│   └── 05-ui-against-mock/
└── README.md                 # this file
```

## Try It Now — 2-Terminal (for exercises 04-05)

| Terminal | Command | What You See |
|----------|---------|--------------|
| Terminal 1 | `bash ../wiremock-setup/02-docker.sh` | WireMock at :8080 |
| Terminal 2 | `npm run test:exercise4` | Exercise 04 PASS |

For exercises 01-03 (Pact): no WireMock needed — Pact mock is ephemeral.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Cannot find module '@pact-foundation/pact'` | Forgot `npm install` | `npm install` in this folder |
| `ECONNREFUSED` in exercise 04/05 | WireMock not running | Start WireMock: `bash ../wiremock-setup/02-docker.sh` |
| `Pact file not found` | No `pacts/` folder | `mkdir -p pacts` or run exercise that generates it |
| `Port 8080 in use` | Another app on 8080 | `WIREMOCK_URL=http://localhost:9999 npm test` + start WireMock on 9999 |
| `Exercise FAIL` | That's the point! | Breaking-change exercises SHOULD fail — read diff, fix, re-run |

---

*Part of API Contract Testing and Mocking Starter Kit for SDETs — ShamshuTalks SDET Series*
*Next: After lab, fork `../contract-mock-demo-app/` and add your own API — see root README.md "Create Own"*
