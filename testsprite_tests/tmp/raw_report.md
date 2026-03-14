
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** RiskNode
- **Date:** 2026-03-15
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Save a valid risk calculation to Journal and verify it appears
- **Test Code:** [TC001_Save_a_valid_risk_calculation_to_Journal_and_verify_it_appears.py](./TC001_Save_a_valid_risk_calculation_to_Journal_and_verify_it_appears.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/0fe3b47d-8d01-4d3c-b39f-de1c3485974c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Journal shows the newly saved position size value
- **Test Code:** [TC002_Journal_shows_the_newly_saved_position_size_value.py](./TC002_Journal_shows_the_newly_saved_position_size_value.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Save to Journal button not found as an interactive element on the current page snapshot.
- Click attempts to Save/Add Calculation failed due to stale or non-interactable element indices recorded in prior steps.
- After multiple save attempts, the Journal page displays 'No trading records yet.' indicating no saved entries were persisted.
- Required UI control to persist calculations ('Save to Journal') is not exposed as an interactable DOM element in the current snapshot, so the workflow to create a journal entry cannot be executed.
- Cannot verify presence of 'position_size' in the Journal because no journal entries exist to inspect.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/645fdb28-e032-4109-be88-d364be41116f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Stop loss equal to entry shows invalid price distance and disables save
- **Test Code:** [TC003_Stop_loss_equal_to_entry_shows_invalid_price_distance_and_disables_save.py](./TC003_Stop_loss_equal_to_entry_shows_invalid_price_distance_and_disables_save.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- "Invalid price distance" message not displayed after setting Entry Price equal to Stop Loss Price.
- Element with data-testid='btn-calculate' not found in the DOM (Save to Journal visible as text but not as a button with that test id).
- No visible text 'disabled' indicating the save action is disabled.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/4904867e-4d79-4076-b42f-d6c2a550dd19
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Risk percent above 5% shows validation error and disables save
- **Test Code:** [TC004_Risk_percent_above_5_shows_validation_error_and_disables_save.py](./TC004_Risk_percent_above_5_shows_validation_error_and_disables_save.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Element with data-testid 'input-modal' not found on page
- Element with data-testid 'input-risiko' not found on page
- Element with data-testid 'btn-calculate' not found on page
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/e7b87bc7-5628-4912-8c70-ae9ab991e903
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Negative capital shows validation error and disables save
- **Test Code:** [TC005_Negative_capital_shows_validation_error_and_disables_save.py](./TC005_Negative_capital_shows_validation_error_and_disables_save.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/0283f928-2928-49e2-8d77-c5b540d281a1
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Boundary: Risk percent exactly 5% allows calculation and save
- **Test Code:** [TC006_Boundary_Risk_percent_exactly_5_allows_calculation_and_save.py](./TC006_Boundary_Risk_percent_exactly_5_allows_calculation_and_save.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/a9bcc744-0930-4a79-89e0-1ee9c7e9b373
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Correct an invalid price distance to enable saving
- **Test Code:** [TC007_Correct_an_invalid_price_distance_to_enable_saving.py](./TC007_Correct_an_invalid_price_distance_to_enable_saving.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/f21697cb-47dd-48bf-8dad-6e0308db8817
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Correct an over-limit risk % to re-enable saving
- **Test Code:** [TC008_Correct_an_over_limit_risk__to_re_enable_saving.py](./TC008_Correct_an_over_limit_risk__to_re_enable_saving.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Validation message 'Risk must be 5% or less' was not displayed when Risk was set above 5% (entered value: 7).
- Inputs accepted a Risk value greater than 5% without any visible blocking or error, preventing verification of the expected rejection behavior.
- Unable to verify that reducing the risk to an allowed value clears the error because no error appeared when a disallowed value was entered.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1f2c442f-00d5-4971-a783-bcb183242c90/e94c9847-3b80-4a7b-8e1c-0cc41bfbfad8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **50.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---