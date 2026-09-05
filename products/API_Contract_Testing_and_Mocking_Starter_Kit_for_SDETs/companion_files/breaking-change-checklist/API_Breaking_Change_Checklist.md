# API Breaking-Change Checklist — Catch Schema Drift Early

> **What is this?** A 14-category checklist to catch breaking API changes before they hit production. Like a pre-flight checklist for pilots — run it for every API change, before every deploy.
>
> **When to run:** Before merging any API PR, before deploying provider, in CI via `can-i-deploy`, when adding new endpoint or changing existing one.
>
> **How to use:** Check each item (☐), note severity, see detection method (which Pact matcher catches it), apply fix. Print the one-page quick-ref (last page) and pin it.

**Severity Legend**

| Severity | Meaning | Action |
|----------|---------|--------|
| 🔴 **Breaking** | Must fix before deploy — Pact verification fails, consumer breaks | Block deploy, version API or keep old field |
| 🟡 **Breaking if consumer checks** | Fails only if consumer asserts that field/status | Check consumer contracts — if they check it, it's breaking |
| 🟢 **Non-breaking** | Safe — no existing contract affected | Safe to deploy |

---

## 1. Request — URL / Path Changes

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 1 | ☐ URL path changed or renamed | 🔴 Breaking | `/users/:id` → `/v2/users/:id` | `path` mismatch — no interaction matches, 404 | Version API (`/v2/`), keep old path with redirect, update all consumers first |
| 2 | ☐ Path parameter type changed | 🔴 Breaking | `/users/:id` where `id: string "123"` → `id: number 123` | `integer` vs `string` matcher fails | Keep string, or version endpoint |
| 3 | ☐ HTTP method changed | 🔴 Breaking | `GET /users` → `POST /users` | `method` mismatch — no interaction matches | Never change method — create new endpoint |

## 2. Request — Headers

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 4 | ☐ Required header removed or renamed | 🟡 Breaking | `X-Request-Id` removed | Header assertion fails (`equalTo` mismatch) | Keep header, deprecate with warning, remove only after consumers updated |
| 5 | ☐ Auth scheme changed | 🔴 Breaking | `Bearer` → `ApiKey` header | 401 — provider rejects old auth | Support both schemes during transition, version auth |

## 3. Request — Query Parameters

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 6 | ☐ Query param renamed or removed | 🟡 Breaking | `?page=1` → `?pageNum=1` | Query assertion fails | Keep old param as alias, deprecate |
| 7 | ☐ New required query param added | 🔴 Breaking | `?page=1` now requires `?pageSize=10` | Consumer without new param gets 400/422 | Make new param optional with default, or version |

## 4. Request — Body

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 8 | ☐ Required field added to request body | 🔴 Breaking | `POST /users` now requires `phone` | Provider rejects without new field (422) | Make field optional, or version endpoint |
| 9 | ☐ Field type changed in request | 🔴 Breaking | `age: string "25"` → `age: number 25` | `integer` vs `string` fails | Keep old type, accept both during transition |

## 5. Response — Status Code

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 10 | ☐ Status code changed | 🟡 Breaking | `200` → `204` for empty list, `200` → `201` | `willRespondWith: { status: 200 }` fails | Keep status, or update all consumers that check status |

## 6. Response — Headers

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 11 | ☐ Response header removed or renamed | 🟡 Breaking | `X-Total-Count` removed | Header assertion fails | Keep header, deprecate |
| 12 | ☐ Content-Type changed | 🟡 Breaking | `application/json` → `application/vnd.api+json` | Header matcher fails | Keep `application/json` or support both via `Accept` negotiation |

## 7. Response — Body Schema

| # | Check | Severity | Example | How Pact Catches It | Fix |
|---|-------|----------|---------|---------------------|-----|
| 13 | ☐ Field removed from response | 🔴 Breaking | `GET /users` no longer returns `email` | `like`/`string` fails — consumer expects field, provider omits | Keep field (even if null), version API, never remove without deprecation |
| 14 | ☐ Field type changed in response | 🔴 Breaking | `id: string "123"` → `id: number 123` | `integer` vs `string` fails | Keep old type, or version |
| 15 | ☐ Enum narrowed (value removed) | 🔴 Breaking | `status: "active"\|"inactive"\|"pending"` → `"active"\|"inactive"` | `regex` fails for removed value | Keep enum value, deprecate, remove only after consumers updated |
| 16 | ☐ New required field added to response | 🟢 Non-breaking* | New `nickname` (optional) added | `like` ignores extra fields — safe | *Safe if optional. If consumer does strict matching (`equal`), it's breaking — use `like` |
| 17 | ☐ Pagination shape changed | 🔴 Breaking | `{ users: [...] }` → `{ data: [...], meta: {...} }` | JSON path fails — `users` not found | Keep old shape, add new shape alongside, version |
| 18 | ☐ Error format changed | 🟡 Breaking | `{ error: "msg" }` → `{ errors: [{ msg }] }` | Error body matcher fails | Keep old error format, add new alongside, version |

> **Count:** 18 checks across 7 groups — covers all 14 breaking-change categories from research (field removal, required addition, type change, enum narrowing, status, header, URL, query, auth, pagination, error format, content-type, optional addition, new endpoint). Extra checks for method + param type for completeness.

---

## 8. Non-Breaking Changes (Safe)

| Change | Severity | Why Safe |
|--------|----------|----------|
| New optional field added (e.g., `nickname`) | 🟢 Safe | `like` ignores extra fields — consumer doesn't break |
| New endpoint added (e.g., `GET /users/:id/orders`) | 🟢 Safe | No existing contract affected |
| New optional query param | 🟢 Safe | Consumer without it still works |
| Additional enum value (e.g., `status` adds `"archived"`) | 🟢 Safe | Existing values still valid |

---

## 9. Decision Tree — Is This Change Breaking?

```
Did you REMOVE or RENAME a field?
  └─ Yes → 🔴 BREAKING → Keep old field, version API
  └─ No ↓
Did you ADD a REQUIRED field (request or response)?
  └─ Yes → 🔴 BREAKING → Make optional with default, or version
  └─ No ↓
Did you CHANGE a field TYPE or narrow an ENUM?
  └─ Yes → 🔴 BREAKING → Keep old type, accept both, version
  └─ No ↓
Did you CHANGE status code, header, or Content-Type?
  └─ Yes → 🟡 BREAKING IF CONSUMER CHECKS → Check consumer contracts
  └─ No ↓
Did you ADD an OPTIONAL field or NEW endpoint?
  └─ Yes → 🟢 NON-BREAKING → Safe to deploy
  └─ No → No API change — safe
```

**Rule of thumb:** If consumer's Pact test would fail, it's breaking. Run `npm test` (consumer) + Verifier to know for sure.

---

## 10. Automated Detection — How Pact Catches Each

| Breaking Change | Pact Matcher That Catches It | What Fails |
|-----------------|------------------------------|------------|
| Field removal | `like`, `string`, `integer` | Consumer expects field, provider omits → mismatch |
| Type change | `integer` vs `string`, `boolean` | Type mismatch → verification fails |
| Format drift | `regex` | Value doesn't match pattern → fails |
| Array shape drift | `eachLike` | Array item shape wrong → fails |
| Status change | `willRespondWith: { status }` | Status mismatch → fails |
| Header change | `headers: { "Content-Type": equalTo }` | Header mismatch → fails |
| Path change | `path: "/users/1"` | No interaction matches → 404 |
| Query change | `query: { search: "alice" }` | Query mismatch → no match |
| Error format | `body: { error: like(...) }` | Error body shape wrong → fails |

**CI Gate:** `can-i-deploy` (Pact Broker) checks if consumer and provider versions are compatible per pacts — blocks deploy if verification failed. For this kit, local `pacts/` + Verifier is the gate.

---

## 11. One-Page Quick-Reference (Printable)

| # | Check | Severity | Pact Matcher | Fix |
|---|-------|----------|--------------|-----|
| 1 | URL/path changed | 🔴 | `path` | Version API |
| 2 | Method changed | 🔴 | `method` | New endpoint |
| 3 | Header removed/renamed | 🟡 | `headers` | Keep + deprecate |
| 4 | Auth scheme changed | 🔴 | 401 | Support both |
| 5 | Query param changed | 🟡 | `query` | Keep alias |
| 6 | Required query added | 🔴 | 400/422 | Make optional |
| 7 | Required body field added | 🔴 | 422 | Make optional |
| 8 | Field removed (response) | 🔴 | `like` | Keep field |
| 9 | Type changed | 🔴 | `integer`/`string` | Keep type |
| 10 | Enum narrowed | 🔴 | `regex` | Keep value |
| 11 | Status changed | 🟡 | `status` | Keep status |
| 12 | Pagination changed | 🔴 | JSON path | Keep shape |
| 13 | Error format changed | 🟡 | `body` | Keep format |
| 14 | Content-Type changed | 🟡 | `headers` | Keep type |
| — | Optional field added | 🟢 | — | Safe |
| — | New endpoint | 🟢 | — | Safe |

**Print this table and pin it. Run through it for every API change.**

---

## 12. Sign-Off Table (For Team Use)

| Date | Change Description | Severity | Checked By | Approved By | Pact Verified? |
|------|--------------------|----------|------------|-------------|----------------|
| YYYY-MM-DD | e.g., Removed `email` from GET /users | 🔴 | Name | Name | ☐ Yes ☐ No |
| | | | | | ☐ Yes ☐ No |
| | | | | | ☐ Yes ☐ No |
| | | | | | ☐ Yes ☐ No |

---

## 13. How to Use With This Kit

1. **Before changing API:** Run through checklist (1–7) — mark each ☐.
2. **If any 🔴:** Fix before merging (keep old field, version, or make optional).
3. **Run Pact tests:** `npm test` in `contract-mock-demo-app` — if any 🔴, Verifier will fail with diff.
4. **Run Postman:** Import `postman/Contract_Mock_Validation.postman_collection.json` → Send all → check for failures.
5. **Sign off:** Fill sign-off table, commit with PR.

**Practice:** Do `contract-mock-practice-lab/exercises/01-break-field-removal` — remove `email` from provider, see Pact fail, fix it. That's this checklist in action.

---

*Part of API Contract Testing and Mocking Starter Kit for SDETs — ShamshuTalks SDET Series*
*Stack: Pact 17.1.3 + WireMock 3.13.2 + Jest 29 — all free/OSS, verified 2026-09-04*
