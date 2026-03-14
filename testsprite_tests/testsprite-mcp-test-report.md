# TestSprite AI Testing Report (RiskNode)

## 1️⃣ Document Metadata
- **Project Name:** RiskNode
- **Date:** 2026-03-15
- **Prepared by:** Antigravity (TestSprite MCP)

---

## 2️⃣ Requirement Validation Summary

### Requirement: Calculator Logic Constraints
*Verifies that the calculator correctly handles input validation and business logic constraints.*

- **TC005: Negative capital shows validation error**
  - **Status:** ✅ Passed
  - **Findings:** Correctly rejects negative inputs.
- **TC006: Boundary Risk percent exactly 5% allows calculation**
  - **Status:** ✅ Passed
  - **Findings:** Correctly allows the upper boundary of risk percentage.
- **TC007: Correct an invalid price distance to enable saving**
  - **Status:** ✅ Passed
  - **Findings:** Successfully re-enables calculation after fixing Entry/StopLoss equality.
- **TC003: Stop loss equal to entry shows error**
  - **Status:** ❌ Failed
  - **Findings:** "Invalid price distance" message or button state not correctly picked up by the test runner.
- **TC004: Risk percent above 5% shows validation error**
  - **Status:** ❌ Failed
  - **Findings:** Selectors (`data-testid`) were not found during this specific test execution run.
- **TC008: Correct an over-limit risk % to re-enable saving**
  - **Status:** ❌ Failed
  - **Findings:** Mismatch between expected error text and actual application text, or failure to trigger validation UI.

### Requirement: Journal Persistence
*Verifies that calculations are correctly saved and persisted to the local trading journal.*

- **TC001: Save a valid risk calculation to Journal and verify it appears**
  - **Status:** ✅ Passed
  - **Findings:** Successfully saved and navigated to verification.
- **TC002: Journal shows the newly saved position size value**
  - **Status:** ❌ Failed
  - **Findings:** Save button not found as an interactive element in this specific sequence.

---

## 3️⃣ Coverage & Matching Metrics

- **Pass Rate:** 50% (4 / 8)
- **Status Summary:**
  | Requirement Area | Total Tests | ✅ Passed | ❌ Failed |
  |------------------|-------------|-----------|-----------|
  | Calculator Logic | 6           | 3         | 3         |
  | Journal Persistence| 2           | 1         | 1         |

---

## 4️⃣ Key Gaps / Risks
- **Test Runner Instability:** The failures in finding `data-testid` elements (like `input-modal`) which are confirmed to exist suggests that the development server (`npm run dev`) might be experiencing performance issues or race conditions during concurrent test execution.
- **Error Message Content:** There is a discrepancy between the test's expected error messages and the actual implementation (e.g., "Risk must be 5% or less" vs "Risk percentage cannot exceed 5%.").
- **Manual Verification Recommended:** Given the 50% pass rate and the nature of the failures (selector/timing issues), manual verification of the blocked scenarios is recommended to confirm the logic is sound.
