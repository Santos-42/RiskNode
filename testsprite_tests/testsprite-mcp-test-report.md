# TestSprite Regression Report - RiskNode

## 1️⃣ Document Metadata
- **Project Name:** RiskNode
- **Date:** 2026-03-15
- **Test Set:** 10 Structured cases from `TC.md` (Self-expanded to 12)
- **Status:** Complete

---

## 2️⃣ Requirement Validation Summary

### 📊 Overall Status: 5/12 Passed (41.67%)

| Test Case | Title | Status | Findings |
|-----------|-------|--------|----------|
| **TC001** | Real-time Calculation | ✅ Passed | Target Profit updates correctly when inputs and ratios change. |
| **TC002** | Save to Journal (Functional) | ✅ Passed | Form submission commits trade and it appears in the list. |
| **TC003** | Journal Row Visibility | ✅ Passed | Record persists after navigating between pages. |
| **TC004** | Prevent Saving (Empty Asset) | ❌ Failed | Asset field is currently marked 'Optional' in UI, allowing saving when blank. |
| **TC005** | Mark as Won | ❌ Failed | Environment isolation prevented locating the 'Save' button in this specific context. |
| **TC006** | Mark as Lost | ❌ Failed | No records found in clean environment session. |
| **TC007** | Record Removal | ✅ Passed | Row deletion and confirmation works correctly. |
| **TC008** | AI "Greedy Dreamer" Roast | ❌ Failed | Test failed to create the trade with 1:15 ratio due to UI timeout/mis-click. |
| **TC009** | Empty Journal Behavior | ✅ Passed | Evaluate button logic correctly handles empty lists. |
| **TC010** | Repeated Evaluation | ❌ Failed | Navigation timing issues prevented verification. |
| **TC011** | Multiple Trades Association | ❌ Failed | Lack of saved trades in testing context. |
| **TC012** | Evaluation Feedback | ❌ Failed | No trade available to trigger evaluation. |

---

## 3️⃣ Coverage & Metrics
- **Core Calculator:** 100% (Passed sanity checks)
- **Data Persistence:** 50% (Passed lifecycle checks, failed in cross-session isolation)
- **AI Logic:** 20% (Verified empty state; failed functional roast due to data setup issues)

---

## 4️⃣ Key Gaps / Risks
1.  **Test Environment Data:** TestSprite runs browsers in isolated contexts. Future tests should include "Seeding" steps to ensure a trade exists before testing "Mark as Won/Lost".
2.  **Asset Pair Validation:** `TC004` revealed that the Asset Pair is not strictly required in the UI, despite being a logical requirement.
3.  **UI Element Robustness:** Some failures occurred because the "Save" button wasn't found immediately.
4.  **AI Roast Verification:** While manually verified in previous steps, the automated test for the `1:15` ratio roast failed today due to form setup issues.

---
*Note: The project server was running on http://localhost:5173 during this run.*
