<svelte:head>
    <title>How It Works - RiskNode</title>
</svelte:head>

<main class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-6 sm:p-12 transition-colors duration-200">
    <div class="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        <header class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
                <span class="material-symbols-outlined text-4xl">help</span>
            </div>
            <h1 class="text-3xl font-black tracking-tight">How RiskNode Works?</h1>
            <p class="text-slate-500 dark:text-slate-400">Basic principles of risk management to protect your portfolio.</p>
        </header>

        <section class="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div>
                <h3 class="text-lg font-bold flex items-center gap-2 mb-2"><span class="material-symbols-outlined text-primary">calculate</span> 1. Set Risk Baseline</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Before entering the market, determine the percentage of total capital you are willing to lose if your analysis is wrong. Our system strictly limits the maximum risk to 5% per trade to prevent account ruin.</p>
            </div>
            <hr class="border-slate-100 dark:border-slate-700">
            <div>
                <h3 class="text-lg font-bold flex items-center gap-2 mb-2"><span class="material-symbols-outlined text-primary">price_change</span> 2. Input Planned Prices</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Define at what price you will buy (Entry Price) and at what price you will cut losses (Stop Loss Price). The distance between these two numbers determines the transaction's danger level.</p>
            </div>
            <hr class="border-slate-100 dark:border-slate-700">
            <div>
                <h3 class="text-lg font-bold flex items-center gap-2 mb-2"><span class="material-symbols-outlined text-primary">analytics</span> 3. Execute According to Calculation</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">The RiskNode engine will calculate the exact Position Size. If you only purchase this allowed number of units, your loss upon hitting the stop loss will exactly match the dollar limit you set at the beginning.</p>
            </div>
            <hr class="border-slate-100 dark:border-slate-700">
            <div>
                <h3 class="text-lg font-bold flex items-center gap-2 mb-2"><span class="material-symbols-outlined text-primary">storage</span> 4. Serverless Local Storage</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">All your trading history data is secured exclusively within your device's browser via the Local Storage mechanism. No financial data is sent to external servers. Your privacy is 100% guaranteed, but remember that clearing browser data will permanently delete your journal.</p>
            </div>
        </section>
    </div>
</main>
