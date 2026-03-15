
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** RiskNode
- **Date:** 2026-03-15
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Save a valid trade to the journal from the Risk Calculator
- **Test Code:** [TC001_Save_a_valid_trade_to_the_journal_from_the_Risk_Calculator.py](./TC001_Save_a_valid_trade_to_the_journal_from_the_Risk_Calculator.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/b0c192d4-aba9-478d-9462-e65ad024e82a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Save works at boundary value Risk % = 5% with valid prices
- **Test Code:** [TC002_Save_works_at_boundary_value_Risk___5_with_valid_prices.py](./TC002_Save_works_at_boundary_value_Risk___5_with_valid_prices.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Save to Journal button not found on page
- Trade could not be saved because no save action is available
- Journal page could not be reached or verified because saving the trade is not possible
- Required test cases (10) were not executed due to the missing save feature
- Entry Price and Stop Loss were not set to the requested values (3000 and 2850), preventing manual verification of a saved trade
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/81285a30-c0f1-463b-8c35-bb91236e30fd
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Save a trade with a decimal Risk % and decimal prices
- **Test Code:** [TC003_Save_a_trade_with_a_decimal_Risk__and_decimal_prices.py](./TC003_Save_a_trade_with_a_decimal_Risk__and_decimal_prices.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/5289978d-9909-4392-928e-c52b8b93018d
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 View journal entries list on /journal when entries exist
- **Test Code:** [TC004_View_journal_entries_list_on_journal_when_entries_exist.py](./TC004_View_journal_entries_list_on_journal_when_entries_exist.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No trading records are present on the Trading Journal page: the table shows the message 'No trading records yet.'
- 'Winning' button not visible on any trade entry because there are no entries to show a status button.
- 'Losing' button not visible on any trade entry because there are no entries to show a status button.
- No per-entry delete icon was found; only a page-level 'Delete All' control is present, so per-entry delete functionality could not be verified.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/f2e009c0-a5b1-47db-8b6b-c77bbc17d3f1
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Mark a trade as Won using the Winning button
- **Test Code:** [TC005_Mark_a_trade_as_Won_using_the_Winning_button.py](./TC005_Mark_a_trade_as_Won_using_the_Winning_button.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No trade entries are present on the Journal page; the table displays 'No trading records yet.'
- Winning button (data-testid="btn-won") not found on the page
- Losing button (data-testid="btn-lost") not found on the page
- Cannot mark an entry as 'Won' because there are no entries to interact with
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/9e854de9-698b-4814-a233-1e59edaa3a44
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Mark a trade as Lost using the Losing button
- **Test Code:** [TC006_Mark_a_trade_as_Lost_using_the_Losing_button.py](./TC006_Mark_a_trade_as_Lost_using_the_Losing_button.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Trade entries list is empty; page shows 'No trading records yet.'
- No trade entry present to interact with; cannot click 'Lost' button on a trade.
- No element with data-testid='btn-lost' was found within any trade entry on the page.
- Cannot verify 'Lost' text within a trade entry because no entries exist.
- Test prerequisites not met: at least one trade entry must exist to perform the requested checks.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/ffec182a-14a8-4435-b450-9f0053e96750
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Delete a single trade entry using the Delete icon
- **Test Code:** [TC007_Delete_a_single_trade_entry_using_the_Delete_icon.py](./TC007_Delete_a_single_trade_entry_using_the_Delete_icon.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No trade entries present in the journal; the page displays the message 'No trading records yet.'
- Individual delete control (data-testid='btn-delete') cannot be found because no trade rows exist to attach the control to.
- Unable to perform and verify deletion of a trade entry because there are no existing entries to delete.
- The automated test cannot proceed with steps that require an existing trade entry (clicking an individual delete icon and verifying removal).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/ee80bb6a-4c6d-4de5-8f3c-5fd417771c2b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Status change persists after page reload (Won)
- **Test Code:** [TC008_Status_change_persists_after_page_reload_Won.py](./TC008_Status_change_persists_after_page_reload_Won.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- ASSERTION: 'No trading records yet.' message is displayed on /journal, so no trade entries exist to mark as Won.
- ASSERTION: No 'Save to Journal' or equivalent control could be located in the Calculator view; entry creation cannot be performed.
- ASSERTION: Unable to click a 'Winning' button (data-testid="btn-won") because no trade entries are present.
- ASSERTION: Persistence of the 'Won' status could not be verified after reload because an entry could not be created.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/a1400eda-d377-44f4-b45d-13e3bea4267a
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Status change persists after page reload (Lost)
- **Test Code:** [TC009_Status_change_persists_after_page_reload_Lost.py](./TC009_Status_change_persists_after_page_reload_Lost.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Trade entries list is empty on /journal; 'No trading records yet.' message is shown
- 'Losing' button (data-testid="btn-lost") not found on the page so no entry can be marked as Lost
- Cannot verify persistence of 'Lost' status because there is no trade entry to modify

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/d84fa0b3-53a9-4618-b28d-a5dd40f644ee
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Create an unrealistic trade, then evaluate and expect specific roast phrase
- **Test Code:** [TC010_Create_an_unrealistic_trade_then_evaluate_and_expect_specific_roast_phrase.py](./TC010_Create_an_unrealistic_trade_then_evaluate_and_expect_specific_roast_phrase.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6e0765a-0e55-43e6-ac7d-a78b3ec3020e/a600fb65-bb73-4fde-94ff-220c93039cf6
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **30.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---