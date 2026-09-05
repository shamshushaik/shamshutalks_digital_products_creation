# Exercise 02 — Break: Type Change (🔴 Breaking)

> **What you break:** Change `id` from `number` (1) to `string` ("1").
> **Why it matters:** Consumer does `user.id + 1` — if id becomes string, math breaks. Type drift is silent but deadly.
> **Checklist item:** #14 — Field type changed → 🔴 Breaking → `integer` vs `string` fails.

## What / Why / Where

- **What:** Pact contract expects `id: integer(1)` — simulate provider returning `id: "1"` and see FAIL.
- **Why:** `integer` matcher catches type drift — `like` would also catch, but `integer` is explicit.
- **Where:** `exercise.test.js` (TODOs) + `solution/solution.test.js`.

## How to Do

1. Open `exercise.test.js` — fill TODOs (use `integer(1)` matcher).
2. Run `npx jest exercises/02-break-type-change --runInBand` — PASS.
3. Change matcher to `string("1")` or simulate provider returning string — see FAIL: `expected number but was string`.
4. Fix: keep `id` as number, or version API.

## What You Should See

- Before: `PASS` — id is number.
- After type change: `FAIL` — diff shows type mismatch.
- Fix: revert to `integer` → `PASS`.

## What's Next

Exercise 03 — add required field (`phone`).

*Checklist ref: `../../checklists/api-breaking-change-checklist.md` #14*
