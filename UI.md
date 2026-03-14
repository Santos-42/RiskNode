# Global Header (Static Navigation)
**Component**: Bold logo text on the left ("RiskNode"). Two links on the right: "Calculator" and "Journal".
**Function**: Allows instant transition between the two pages without reloading (SvelteKit SPA routing).

# Main Page (/ or /calculator)
**Visual**: Single-column form in the center of the screen. Clean, high contrast.
**Flow**:
1. User enters Capital (USDT), Risk (%), Entry Price, and Stop Loss Price.
2. Below the form, a result card displays the "Allowed Position Size" in real-time. This number changes as the user types (Svelte reactivity).
3. There is an optional additional text input: "Asset Pair" (e.g., BTC/USDT).
4. Large button at the bottom: "Save to Journal".
5. **Button Action**: Validates data. If valid, the object is entered into the Svelte Store (which triggers saving to `localStorage`), displays a short success notification, and then clears the form.

# Journal Page (/journal)
**Visual**: Dashboard layout as a data table.
**Flow**:
1. The table reads status from `localStorage` on load.
2. Columns show: Date, Asset, Position Size, Risk ($), and Status.
3. In the status column, there is a dropdown menu or three small buttons for each row: "Set Won", "Set Lost", "Delete".
4. **Button Action**: Updates the status attribute on the specific object within the `localStorage` array.

# Global Footer
**Component**: Small text at the bottom center.
**Content**: "Built for TestSprite Hackathon. Not Financial Advice." No useless external links.

# Color Palette

### Global Background
- **Light**: `bg-slate-50` (Very light gray, clean)
- **Dark**: `dark:bg-slate-900` (Deep gray-blue, not pitch black to reduce eye fatigue)

### Card & Form Surface
- **Light**: `bg-white`, `border border-slate-200`
- **Dark**: `dark:bg-slate-800`, `dark:border-slate-700`

### Main Typography
- **Light**: `text-slate-900` (Headings) and `text-slate-600` (Labels/Paragraphs)
- **Dark**: `dark:text-slate-50` (Headings) and `dark:text-slate-400` (Labels/Paragraphs)

### Primary Action (Save/Calculate Button)
- **Light**: `bg-blue-600`, `hover:bg-blue-700`, `text-white`
- **Dark**: `dark:bg-blue-500`, `dark:hover:bg-blue-600`, `dark:text-white`

### Success Indicator (Won Status / Positive Ratio)
- **Light**: `text-emerald-700`, `bg-emerald-100` (Dark green text on pale green background)
- **Dark**: `dark:text-emerald-400`, `dark:bg-emerald-900/30`

### Risk/Loss Indicator (Lost Status / Stop Loss Warning)
- **Light**: `text-rose-700`, `bg-rose-100`
- **Dark**: `dark:text-rose-400`, `dark:bg-rose-900/30`
