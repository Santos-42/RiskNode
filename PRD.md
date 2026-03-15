# Business Objectives
Provide a precise mathematical tool for amateur crypto traders to calculate maximum position size based on risk tolerance, and record these executions locally for evaluation.

# Core Business Logic (Calculator Engine)
The application must not guess. It must calculate deterministically using this formula:
$$\text{Position Size} = \frac{\text{Total Capital} \times (\text{Risk Percentage} / 100)}{|\text{Entry Price} - \text{Stop Loss Price}|}$$

# Logic Constraints (To be tested by TestSprite AI)
- **Division by Zero**: If Entry Price equals Stop Loss Price, the system must display a clear error message ("Invalid price distance") and disable the save button.
- **Risk Limits**: System strictly rejects (hard block) Risk Percentage inputs above 5%. Traders risking more than that are gambling, not trading.
- **Negative Inputs**: All numerical inputs must not be less than zero.

# Storage Logic (Journal)
Data is stored as an array of JSON objects in `localStorage`.
**Object Structure**: `id` (unique), `date`, `asset_pair`, `capital`, `risk`, `entry_price`, `stop_loss_price`, `position_size`, `target_ratio`, `status` (Open, Won, Lost).
