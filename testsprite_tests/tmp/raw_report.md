
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** RiskNode
- **Date:** 2026-03-15
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Calculate target profit updates when inputs are valid and target ratio changes
- **Test Code:** [TC001_Calculate_target_profit_updates_when_inputs_are_valid_and_target_ratio_changes.py](./TC001_Calculate_target_profit_updates_when_inputs_are_valid_and_target_ratio_changes.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/b329fe75-0c8d-4d5f-bf31-327684e38455
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Save a completed trade from the calculator and verify it appears in the Journal
- **Test Code:** [TC002_Save_a_completed_trade_from_the_calculator_and_verify_it_appears_in_the_Journal.py](./TC002_Save_a_completed_trade_from_the_calculator_and_verify_it_appears_in_the_Journal.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/d7429968-30e1-43d8-930e-f96a13a903dc
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Saved trade row is visible in Journal after navigating from calculator
- **Test Code:** [TC003_Saved_trade_row_is_visible_in_Journal_after_navigating_from_calculator.py](./TC003_Saved_trade_row_is_visible_in_Journal_after_navigating_from_calculator.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/6c1422e5-4af3-4f0a-a89b-9431b51a829f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Prevent saving a trade when Asset Pair is empty
- **Test Code:** [TC004_Prevent_saving_a_trade_when_Asset_Pair_is_empty.py](./TC004_Prevent_saving_a_trade_when_Asset_Pair_is_empty.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Submit/Save button not found on page (no interactive element labeled 'Save' or with a data-testid for save was available in the page interactive elements).
- Validation could not be triggered because the Save control is missing or not clickable, so the negative case cannot be executed.
- 'required' validation message not visible on the page; no validation error was produced for the Asset Pair input when the Save action could not be performed.
- The Asset Pair field is labeled as 'Optional' on the form, which contradicts the test expectation that leaving it blank should prevent saving.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/64553b22-c9e0-479f-8127-686ac941f399
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Mark a trade as Won updates the row status to Won
- **Test Code:** [TC005_Mark_a_trade_as_Won_updates_the_row_status_to_Won.py](./TC005_Mark_a_trade_as_Won_updates_the_row_status_to_Won.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Save to Journal button not found on the Risk Calculator page
- Journal entry could not be created because no Save/Submit action was available on the calculator page
- Cannot verify marking a trade as 'Won' because the trade could not be added to the journal
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/b22bb82d-adc1-4eab-a960-5f2b60ccc3d3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Mark a trade as Lost updates the row status to Lost
- **Test Code:** [TC006_Mark_a_trade_as_Lost_updates_the_row_status_to_Lost.py](./TC006_Mark_a_trade_as_Lost_updates_the_row_status_to_Lost.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Save to Journal button not found on calculator page
- No journal entries can be created because the save action is missing
- Journal page shows 'No trading records yet.' indicating there are no trades available to mark as Lost
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/72693c5a-fd03-4c11-b22e-033e94aaf513
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Delete a specific trade row removes it from the journal view
- **Test Code:** [TC007_Delete_a_specific_trade_row_removes_it_from_the_journal_view.py](./TC007_Delete_a_specific_trade_row_removes_it_from_the_journal_view.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/00fadeff-30e2-49ba-a8bd-27f307f81597
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Evaluate a high target-ratio trade and display AI roast inline
- **Test Code:** [TC008_Evaluate_a_high_target_ratio_trade_and_display_AI_roast_inline.py](./TC008_Evaluate_a_high_target_ratio_trade_and_display_AI_roast_inline.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- ASSERTION: Save to Journal button is not present as an interactive element on the page (no element index available), preventing automated click.
- ASSERTION: Required form inputs (Capital, Risk, Entry Price, Stop Loss) are empty; Save to Journal appears disabled/uninteractive.
- ASSERTION: No trade entry was created in the Journal, making it impossible to locate and evaluate a trade with Target Ratio=15.
- ASSERTION: Unable to verify AI roast 'greedy dreamers' and 'AI evaluation result' because evaluation cannot be triggered without a saved trade.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/bf10aad0-38b3-4992-86f2-1fc78159ae78
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Evaluate button behavior when there are no saved trades
- **Test Code:** [TC009_Evaluate_button_behavior_when_there_are_no_saved_trades.py](./TC009_Evaluate_button_behavior_when_there_are_no_saved_trades.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/93eab38b-d231-480e-8f88-c1336ba57d2a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Repeated evaluation does not create duplicate visible results for the same trade
- **Test Code:** [TC010_Repeated_evaluation_does_not_create_duplicate_visible_results_for_the_same_trade.py](./TC010_Repeated_evaluation_does_not_create_duplicate_visible_results_for_the_same_trade.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Saved trade entries not found on the Journal page; no entries available to evaluate.
- Evaluate button with data-testid='btn-evaluate' not present in the current page interactive elements.
- Journal navigation is inconsistent: current URL remains http://localhost:5173 (calculator) despite prior navigation attempts, preventing reliable access to saved trades.
- Save to Journal control is not accessible via a known interactive element index, preventing creation of a saved trade to test evaluation.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/2dafba15-9d84-411e-ae72-7d6742cf5920
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Evaluation result stays associated with the correct trade when multiple trades exist
- **Test Code:** [TC011_Evaluation_result_stays_associated_with_the_correct_trade_when_multiple_trades_exist.py](./TC011_Evaluation_result_stays_associated_with_the_correct_trade_when_multiple_trades_exist.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No saved trades found on the Journal page — 'No trading records yet.' message displayed.
- No trade row with Target Ratio='15' found on the page.
- No 'Evaluate' button (btn-evaluate) present for any trade row to trigger an inline AI roast.
- AI evaluation output 'greedy dreamers' could not be verified because no evaluation was executed for any trade.
- Test preconditions not met: saved trades are required to execute TC009 and the related negative-case checks.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/cec6ad1d-b0ad-481d-8891-2f3943129ae3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Evaluate control provides immediate user feedback while waiting for AI response
- **Test Code:** [TC012_Evaluate_control_provides_immediate_user_feedback_while_waiting_for_AI_response.py](./TC012_Evaluate_control_provides_immediate_user_feedback_while_waiting_for_AI_response.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No saved trades found on Journal page — 'No trading records yet.' message displayed
- Evaluate button (data-testid 'btn-evaluate') not present in the Journal UI
- Cannot verify 'Evaluating' loading indicator or 'AI evaluation result' because there are no trades to evaluate
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/6ac9e622-efcc-40ef-9d61-4f752590f88e/0eec4dba-18e4-423f-8c0c-5e1e7e2f29ed
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **41.67** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---