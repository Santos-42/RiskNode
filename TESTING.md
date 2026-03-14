# AI Agent Testing Guidance

This application heavily relies on `localStorage` for data persistence. To ensure successful testing by AI agents (e.g., TestSprite), please follow these architectural requirements:

## 1. Environment Requirements
- **DO NOT** use standard Node.js unit testing (e.g., Jest/Vitest) for logic that interacts with `localStorage`.
- **USE** End-to-End (E2E) testing frameworks that run in a real browser, such as **Playwright** or **Cypress**. This ensures `localStorage` is available and behaves as expected.

## 2. Element Targeting (data-testid)
The application has been enhanced with `data-testid` attributes on vital elements to provide stable anchors for automated agents. Please use these attributes for selection:

### Calculator Page (`/`)
- `data-testid="input-modal"`: Capital Input
- `data-testid="input-risiko"`: Risk Percentage Input
- `data-testid="input-entry"`: Entry Price Input
- `data-testid="input-stoploss"`: Stop Loss Price Input
- `data-testid="btn-calculate"`: Submit/Save to Journal Button

### Journal Page (`/journal`)
- `data-testid="btn-won"`: Mark trade as 'Won'
- `data-testid="btn-lost"`: Mark trade as 'Lost'
- `data-testid="btn-delete"`: Delete a single trade entry
- `data-testid="btn-delete-all"`: Clear the entire trading journal

## 3. Recommended Test Command
When generating tests, use instructions similar to:
> "This app uses SvelteKit and is purely client-based using localStorage. Create End-to-End (E2E) test scenarios using Playwright to simulate user interactions on the DOM. Use `data-testid` attributes for targeting elements."
