# Exercise 04 — WireMock Templating (Dynamic Mocks)

> **What you build:** A WireMock mapping with Handlebars templating — `{{request.pathSegments.[1]}}` and `{{now}}`.
> **Why it matters:** Static mocks are limited — templating makes responses dynamic (echo request data, timestamps, random values).
> **WireMock feature:** Response templating via `transformers: ["response-template"]` or `--global-response-templating`.

## What / Why / Where

- **What:** Create a WireMock mapping that echoes the requested user ID and returns current timestamp.
- **Why:** Teaches `{{request.path}}`, `{{now}}`, `{{randomValue}}` — enterprise mocking.
- **Where:** `exercise.test.js` (TODOs) + `solution/solution.test.js`. Needs WireMock running at `http://localhost:8080`.

## How to Do

1. Start WireMock: `bash ../../wiremock-setup/02-docker.sh` (or `01-standalone-jar.sh`).
2. Open `exercise.test.js` — fill TODOs (create mapping with `transformers: ["response-template"]`).
3. Run `npx jest exercises/04-wiremock-templating --runInBand` — see PASS, curl shows dynamic response.
4. Check `solution/solution.test.js` if stuck.

## What You Should See

- `PASS` — WireMock returns `{"id": "1", "timestamp": "2024-..."}` with dynamic timestamp.
- `curl http://localhost:8080/users/1` → templated JSON.

## What If

- `ECONNREFUSED` → WireMock not running — start it first.
- `Templating not working` → need `transformers: ["response-template"]` or `--global-response-templating` flag.

## What's Next

Exercise 05 — UI against mock (env var + CORS + verification).

*WireMock docs: https://wiremock.org/docs/response-templating/*
