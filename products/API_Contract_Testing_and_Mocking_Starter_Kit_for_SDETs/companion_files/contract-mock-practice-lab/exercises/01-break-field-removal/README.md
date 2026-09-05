# Exercise 01 — Break: Field Removal (🔴 Breaking)

> **What you break:** Remove `email` from provider response `GET /users/1`.
> **Why it matters:** Consumer expects `email` — if provider removes it, UI breaks (no email to display). This is the #1 breaking change.
> **Checklist item:** #13 — Field removed from response → 🔴 Breaking → `like`/`string` fails.

## What / Why / Where

- **What:** You will see a Pact contract that expects `email`, then simulate provider removing it and see verification FAIL.
- **Why:** Teaches that field removal is breaking — Pact catches it via `like`/`string` matcher.
- **Where:** `exercises/01-break-field-removal/exercise.test.js` (starter with TODOs) + `solution/solution.test.js` (answer).

## How to Do

1. Open `exercise.test.js` — read the TODOs.
2. Run `npx jest exercises/01-break-field-removal --runInBand` — see PASS (contract expects email).
3. Now uncomment the "BREAKING" section (provider without email) — see FAIL with diff: `expected email but was missing`.
4. Fix: keep `email` in provider (even if null) or version API (`/v2/users`).

## What You Should See

- Before break: `PASS` — Pact mock returns email, consumer happy.
- After break (uncomment): `FAIL` — diff shows `email` missing, verification fails.
- Fix: re-add `email` → `PASS` again.

## What If

- `Pact file not found` → `mkdir -p pacts` or run from `contract-mock-practice-lab/` root.
- `Port conflict` → Pact mock uses random port, no conflict.

## What's Next

Exercise 02 — break type change (`id: number` → `string`).

---

*Checklist ref: `../../checklists/api-breaking-change-checklist.md` #13*
