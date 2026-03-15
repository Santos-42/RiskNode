# AI Agent Testing Guidance

This application heavily relies on `localStorage` for data persistence. To ensure successful testing by AI agents (e.g., TestSprite), please follow these architectural requirements:

## 1. Environment Requirements
- **DO NOT** use standard Node.js unit testing (e.g., Jest/Vitest) for logic that interacts with `localStorage`.
- **USE** End-to-End (E2E) testing frameworks that run in a real browser, such as **Playwright** or **Cypress**. This ensures `localStorage` is available and behaves as expected.

## 2. Element Targeting (data-testid)
The application has been enhanced with `data-testid` attributes on vital elements to provide stable anchors for automated agents. Please use these attributes for selection:

### Calculator Page (`/`)
- `data-testid="input-asset"`: Asset Pair (e.g. BTC/USDT)
- `data-testid="input-modal"`: Capital Input
- `data-testid="input-risiko"`: Risk Percentage Input
- `data-testid="input-entry"`: Entry Price Input
- `data-testid="input-stoploss"`: Stop Loss Price Input
- `data-testid="input-ratio"`: Target Ratio Input (1:X)
- `data-testid="btn-calculate"`: Submit/Save to Journal Button

### Journal Page (`/journal`)
- `data-testid="btn-roast"`: Trigger AI Risk Evaluator (Gemini)
- `data-testid="btn-won"`: Mark trade as 'Won'
- `data-testid="btn-lost"`: Mark trade as 'Lost'
- `data-testid="btn-delete"`: Delete a single trade entry
- `data-testid="btn-delete-all"`: Clear the entire trading journal

## 3. AI Evaluator (Gemini) Testing
The AI Risk Evaluator uses the **Gemini 2.5 Flash** model to analyze trade discipline.
- **Verification**: Ensure the button is disabled when the journal is empty.
- **Verification**: Upon clicking, verify a loading state appears (button text changes to "Analyzing Discipline...").
- **Verification**: Ensure a response is displayed in the UI after the AI process completes.
- **Verification (Roast Logic)**: Verify that high/unrealistic target ratios (e.g. 1:10) trigger the "greedy dreamers" roast.

## 4. Recommended Test Command
When generating tests for TestSprite, use this prompt for high fidelity:
> "This app is a SvelteKit trading journal using localStorage for persistence and Gemini 2.5 Flash for AI analysis. Perform E2E tests using Playwright. 
> 1. Calculate a position and save it to the journal using `data-testid` anchors (including `input-ratio`).
> 2. Navigate to the Journal page and verify the entry.
> 3. Add an entry with an unrealistic ratio (e.g. 1:15).
> 4. Click the AI Risk Evaluator button (`btn-roast`) and confirm the "greedy dreamer" roast appears.
> 5. Test status updates (Won/Lost) and deletions."
