# TestSprite AI Testing Report (Finalized)

## 1️⃣ Document Metadata
- **Project Name:** RiskNode
- **Date:** 2026-03-15
- **Prepared by:** Antigravity AI Assistant
- **Test Environment:** Production Preview (Port 5173 / 4173)

---

## 2️⃣ Requirement Validation Summary

### Group: Risk Calculator Core Logic
#### ✅ [TC001] Save a valid trade to the journal
- **Status:** Passed
- **Analysis:** Successfully verified that the calculator can load and handle a basic navigation flow. The environment correctly rendered the SvelteKit components.

#### ❌ [TC002] Save works at boundary value Risk % = 5%
- **Status:** Failed
- **Analysis:** The test failed to locate the "Save to Journal" button. This is likely due to the button being disabled if the input validation failed or a timing issue with the Svelte reactive state.

#### ✅ [TC003] Save a trade with decimal Risk % and prices
- **Status:** Passed
- **Analysis:** Confirmed that the calculator correctly handles floating-point inputs and remains functional.

### Group: Trading Journal Management
#### ❌ [TC004] View journal entries list
#### ❌ [TC005] Mark a trade as Won
#### ❌ [TC006] Mark a trade as Lost
#### ❌ [TC007] Delete a single trade entry
#### ❌ [TC008] Status change persists (Won)
#### ❌ [TC009] Status change persists (Lost)
- **Status:** Failed
- **Analysis:** These tests failed because they expected existing data in `localStorage`. Since each test runs in a fresh browser context, the entries created in TC001/TC003 were not available. The Journal page correctly showed "No trading records yet," leading to assertion failures on missing status/delete buttons.

### Group: AI Risk Evaluator (Roast)
#### ✅ [TC010] Create an unrealistic trade and expect roast
- **Status:** Passed
- **Analysis:** This test successfully filled the form (including the new `target_ratio` field), saved the trade, navigated to the journal, and triggered the AI roast. Crucially, it verified that the AI responded with the specific "greedy dreamers" phrase as implemented.

---

## 3️⃣ Coverage & Matching Metrics
- **Pass Rate:** 30% (3/10)
- **Requirement Matching:** High (all core features covered by test plans)

| Requirement Group | Total Tests | ✅ Passed | ❌ Failed |
|-------------------|-------------|-----------|-----------|
| Risk Calculator   | 3           | 2         | 1         |
| Trading Journal   | 6           | 0         | 6         |
| AI Evaluator      | 1           | 1         | 0         |

---

## 4️⃣ Key Gaps / Risks
1. **Data Persistence in Testing:** The primary gap is that the current test suite does not seed data for the Journal tests. Tests that verify journal actions must first perform a "Save" action within the same session or have a mechanism to mock `localStorage`.
2. **Brittle Selectors:** Some failures occurred because the generated tests used XPaths instead of the provided `data-testid` attributes, making them sensitive to minor UI changes.
3. **AI Consistency:** While TC010 passed, AI responses can be non-deterministic. Future tests should use more robust fuzzy matching for roasts.
