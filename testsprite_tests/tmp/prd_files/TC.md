# Test Cases (TC.md) - RiskNode

This document provides a structured list of Test Cases (TC) for the RiskNode application, organized by functional area.

## Element Registry (IDs)

Reference these IDs for automated testing selectors (`data-testid`):

| Element Name       | ID               | Type   | Description             |
| ------------------ | ---------------- | ------ | ----------------------- |
| Asset Pair Input   | `input-asset`    | Input  | Name of the asset       |
| Capital Input      | `input-capital`  | Input  | Total funds available   |
| Risk % Input       | `input-risk`     | Input  | Percentage to risk      |
| Entry Price Input  | `input-entry`    | Input  | Target entry price      |
| Stop Loss Input    | `input-stoploss` | Input  | Protective stop price   |
| Target Ratio Input | `input-ratio`    | Input  | Reward multiplier (1:X) |
| Save Button        | `btn-save`       | Button | Commit trade to journal |
| Nav Calculator     | `nav-calculator` | Link   | Go to Calculator        |
| Nav Journal        | `nav-journal`    | Link   | Go to Journal           |
| Win Button         | `btn-won`        | Button | Status: Won             |
| Lost Button        | `btn-lost`       | Button | Status: Lost            |
| Delete Button      | `btn-delete`     | Button | Delete single row       |
| Delete All Button  | `btn-delete-all` | Button | Reset journal           |
| Evaluate Button    | `btn-evaluate`   | Button | Get AI feedback         |

---

## 1. Calculator Logic & Validation

### TC001: Real-time Calculation (Positive)

- **Description:** Verify "Target Profit" updates as soon as inputs change.
- **Steps:** Set Risk Amount to 100, set `input-ratio` to 4.
- **Expected:** Display text shows "400".

### TC002: Maximum Risk Guard (Negative)

- **Description:** Verify the system prevents risk higher than 5%.
- **Steps:** Enter "5.5" into `input-risk`.
- **Expected:** `btn-save` is disabled or error text appears.

### TC003: Logical Price Check (Negative)

- **Description:** Verify Buy trades require Entry > Stop Loss.
- **Steps:** Enter `50000` for Entry, `51000` for Stop Loss.
- **Expected:** Position size defaults to 0 and saving is blocked.

### TC004: Financial Input Integrity (Negative)

- **Description:** Verify rejection of non-positive capital.
- **Steps:** Enter `0` or `-500` into `input-capital`.
- **Expected:** Calculations are bypassed; saving is disabled.

---

## 2. Journal & Data Management

### TC005: Successful Data Commitment (Positive)

- **Description:** Verify a complete form can be saved to the database.
- **Steps:** Fill all fields correctly and click `btn-save`.
- **Expected:** Success state confirmed; record appears in Journal.

### TC006: Required Field Enforcement (Negative)

- **Description:** Verify saving is blocked if Asset Pair is missing.
- **Steps:** Leave `input-asset` empty, try to save.
- **Expected:** Form prevents submission.

### TC007: Manual Status Update (Positive)

- **Description:** Verify users can toggle trade outcomes.
- **Steps:** In Journal, click `btn-won` or `btn-lost`.
- **Expected:** Row status color and label update correctly.

### TC008: Record Removal (Positive)

- **Description:** Verify individual trades can be deleted.
- **Steps:** Click `btn-delete` on a specific Journal entry.
- **Expected:** Row is permanently removed from the view and storage.

---

## 3. Intelligent Features

### TC009: AI "Greedy Dreamer" Roast (Positive/Boundary)

- **Description:** Verify AI detects unrealistic Profit Targets.
- **Steps:** Save a trade with `input-ratio` of `15`, then click `btn-evaluate` in Journal.
- **Expected:** AI response includes the specific roast phrase "greedy dreamers".

### TC010: Data Persistence (Positive)

- **Description:** Verify data survives a browser refresh.
- **Steps:** Save a trade, refresh the page, check Journal.
- **Expected:** Trade entries are still present (loaded from LocalStorage).
