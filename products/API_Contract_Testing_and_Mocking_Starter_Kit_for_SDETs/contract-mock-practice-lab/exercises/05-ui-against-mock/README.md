# Exercise 05 — UI Against Mock (Env Var + CORS + Verification)

> **What you build:** Point a UI (fetch) to WireMock via env var, handle CORS, verify requests.
> **Why it matters:** THE promise — test UI while backend is still being built. Saves weeks of waiting.
> **Workflow:** Pact contract → WireMock mappings → `VITE_API_URL=http://localhost:8080` → UI fetch → verify via `GET /__admin/requests`.

## What / Why / Where

- **What:** Simulate UI calling `fetch(VITE_API_URL + "/users/1")` against WireMock, then verify WireMock received it.
- **Why:** Teaches env var switch (no code change), CORS (`--enable-stub-cors`), and `verifyRequest()` / `GET /__admin/requests`.
- **Where:** `exercise.test.js` (TODOs) + `solution/solution.test.js`. Needs WireMock at :8080.

## How to Do

1. Start WireMock: `bash ../../wiremock-setup/02-docker.sh` (with `--enable-stub-cors`).
2. Open `exercise.test.js` — fill TODOs (create mapping, fetch via baseUrl, verify).
3. Run `npx jest exercises/05-ui-against-mock --runInBand` — PASS, verification shows request was received.
4. Check `solution/solution.test.js` if stuck.

## What You Should See

- `PASS` — fetch returns Alice, `verifyRequest({ method: 'GET', url: '/users/1' })` returns count 1.
- `curl http://localhost:8080/__admin/requests` shows the request in journal.

## What If

- `ECONNREFUSED` → WireMock not running.
- `CORS blocked` in real browser → need `--enable-stub-cors` or `Access-Control-Allow-Origin: *` in mapping.
- `Env var not picked up` → restart dev server (Vite/CRA need restart).

## Framework Env Var Table

| Framework | Env Var | Usage |
|-----------|---------|-------|
| Vite | `VITE_API_URL` | `fetch(import.meta.env.VITE_API_URL + "/users/1")` |
| CRA | `REACT_APP_API_URL` | `fetch(process.env.REACT_APP_API_URL + "/users/1")` |
| Next.js | `NEXT_PUBLIC_API_URL` | `fetch(process.env.NEXT_PUBLIC_API_URL + "/users/1")` |

No code change — just config. See PDF Ch 6 (p27-29) for full 10-step workflow.

## What's Next

You completed all 5 exercises! Next: fork `../../contract-mock-demo-app/` and add your own API — see root `README.md` "Create Own".

*WireMock docs: https://wiremock.org/docs/standalone/docker/ + https://wiremock.org/docs/verifying/*
