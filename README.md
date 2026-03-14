# ⚡ RiskNode

**RiskNode** is a precision-engineered trading journal and risk calculator designed for disciplined crypto traders. It provides a precise mathematical tool to calculate maximum position sizes based on risk tolerance, keeping all data private using local-only storage.

## 🎯 Business Objectives
The primary goal is to help traders avoid "gambling" by providing deterministic calculations for risk management.

### Core Business Logic
The application calculates position sizes using the following deterministic formula:
$$\text{Position Size} = \frac{\text{Total Capital} \times (\text{Risk Percentage} / 100)}{|\text{Entry Price} - \text{Stop Loss Price}|}$$

### Logic Constraints
- **Risk Limits**: System strictly rejects (hard block) Risk Percentage inputs above **5%**.
- **Division by Zero**: If Entry Price equals Stop Loss Price, the system displays "Invalid price distance" and prevents saving.
- **Negative Inputs**: All numerical inputs must be ≥ 0.

## 🚀 Key Features

- **Precision Calculator**: Real-time position size calculation with built-in safety limits.
- **Trading Journal**: Persistent trade history with status tracking (Open, Won, Lost).
- **AI Risk Evaluator**: Powered by **Gemini 2.5 Flash**, providing brutally honest quantitative feedback.
- **Privacy First**: All trade data is stored exclusively in your browser's `localStorage`. No server dependency.

## 🛠️ Technical Architecture

### Framework
- **SvelteKit**: High-performance, compiled web framework. Svelte avoids the Virtual DOM by compiling code into small, fast pure JavaScript.

### State Management
- **Svelte Stores**: Built-in reactive stores synced with `localStorage` via `onMount`. No external state libraries (Redux/Zustand) required.

### Styling
- **Tailwind CSS**: Utility-first styling for rapid, responsive UI development.

### AI Integration
- **Google Generative AI**: Gemini SDK for advanced institutional-grade risk analysis.

## 🏃 Getting Started

### Prerequisites
- Node.js (v18+)
- Gemini API Key

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   Create a `.env` file and add:
   ```env
   SECRET_GEMINI_API_KEY=your_api_key_here
   ```

### Developing & Building
- **Dev**: `npm run dev`
- **Build**: `npm run build && npm run preview`

## 🧪 Testing (Mandatory)
This project uses **TestSprite** for automated logic and UI verification. This is an absolute requirement for the hackathon workflow. See `TESTING.md` for detailed E2E guidance with Playwright.

---
*Built for the TestSprite Hackathon. Not financial advice.*
