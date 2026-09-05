# Exercise 03 — Break: Add Required Field (🔴 Breaking)

> **What you break:** Add required `phone` field to `POST /users` — old consumers without `phone` get 422.
> **Why it matters:** Adding a required field without default breaks all existing consumers — they don't send it.
> **Checklist item:** #8 — Required field added to request body → 🔴 Breaking → 422.

## What / Why / Where

- **What:** Pact contract for `POST /users` without `phone` — simulate provider now requiring `phone` and see old consumer FAIL.
- **Why:** Teaches that required field addition is breaking — must be optional with default or versioned.
- **Where:** `exercise.test.js` (TODOs) + `solution/solution.test.js`.

## How to Do

1. Open `exercise.test.js` — fill TODOs (POST without phone).
2. Run `npx jest exercises/03-add-required-field --runInBand` — PASS (old contract).
3. Simulate provider requiring phone: change provider to reject without phone (422) — old consumer without phone would FAIL at Verifier.
4. Fix: make `phone` optional (no validation if missing) or version endpoint (`/v2/users`).

## What You Should See

- Before: `PASS` — POST without phone succeeds (201).
- After provider requires phone: `FAIL` — 422 `phone is required`.
- Fix: make phone optional → `PASS`.

## What's Next

Exercise 04 — WireMock templating (dynamic mocks).

*Checklist ref: `../../checklists/api-breaking-change-checklist.md` #8*
