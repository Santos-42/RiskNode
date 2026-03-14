<script lang="ts">
    import { journalStore } from '$lib/store';
    
    let asset_pair: string = $state('');
    let capital: number | null = $state(null);
    let risk: number | null = $state(null);
    let entry_price: number | null = $state(null);
    let stop_loss: number | null = $state(null);
    let showSuccess = $state(false);

    let hasValues = $derived(
        typeof capital === 'number' && !isNaN(capital) &&
        typeof risk === 'number' && !isNaN(risk) &&
        typeof entry_price === 'number' && !isNaN(entry_price) &&
        typeof stop_loss === 'number' && !isNaN(stop_loss)
    );

    let isValid = $derived(hasValues && 
        capital! >= 0 && 
        risk! >= 0 && risk! <= 5 && 
        entry_price! >= 0 && 
        stop_loss! >= 0 && 
        entry_price !== stop_loss
    );

    let errorMsg = $derived.by(() => {
        if (hasValues) {
            if (risk! > 5) return 'Risk percentage cannot exceed 5%.';
            else if (entry_price === stop_loss) return 'Invalid price distance';
            else if (capital! < 0 || risk! < 0 || entry_price! < 0 || stop_loss! < 0) return 'Values cannot be negative.';
            return '';
        }
        return '';
    });

    let positionSize = $derived(isValid ? (capital! * (risk! / 100)) / Math.abs(entry_price! - stop_loss!) : 0);
    let riskAmount = $derived(isValid ? capital! * (risk! / 100) : 0); // Static 1:2 ratio
    let profitAmount = $derived(riskAmount * 2); 

    function handleSave() {
        if (!isValid || !hasValues) return;
        
        journalStore.addEntry({
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            asset_pair: asset_pair || 'Unknown',
            capital: capital!,
            risk: risk!,
            entry_price: entry_price!,
            stop_loss_price: stop_loss!,
            position_size: positionSize,
            status: 'Open'
        });
        
        showSuccess = true;
        setTimeout(() => showSuccess = false, 3000);
        
        asset_pair = '';
        capital = null;
        risk = null;
        entry_price = null;
        stop_loss = null;
    }
</script>

<main class="flex-grow flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-xl">
        <!-- Page Title -->
        <div class="mb-8 text-center sm:text-left">
            <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-2">Risk Calculator</h2>
            <p class="text-slate-600 dark:text-slate-400">Calculate your position size based on set risk tolerance.</p>
        </div>

        <!-- Form Container -->
        <form onsubmit={(e) => { e.preventDefault(); handleSave(); }} class="space-y-6 bg-white dark:bg-slate-900/50 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
            
            {#if errorMsg}
                <div class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-3 border border-red-200 dark:border-red-800/50">
                    <span class="material-symbols-outlined">error</span>
                    <p class="text-sm font-semibold">{errorMsg}</p>
                </div>
            {/if}

            <!-- Asset Pair -->
            <div class="flex flex-col gap-2">
                <label for="asset_pair" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Asset Pair (Optional)</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">currency_bitcoin</span>
                    <input id="asset_pair" data-testid="input-asset" bind:value={asset_pair} class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="e.g. BTC/USDT" type="text" />
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Capital -->
                <div class="flex flex-col gap-2">
                    <label for="capital" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Capital (USD)</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">account_balance_wallet</span>
                        <input id="capital" data-testid="input-modal" bind:value={capital} min="0" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="1000" type="number" />
                    </div>
                </div>

                <!-- Risk % -->
                <div class="flex flex-col gap-2">
                    <label for="risk" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Risk (%)</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">warning</span>
                        <input id="risk" data-testid="input-risiko" bind:value={risk} min="0" max="5" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="1" type="number" />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Entry Price -->
                <div class="flex flex-col gap-2">
                    <label for="entry_price" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Entry Price</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">login</span>
                        <input id="entry_price" data-testid="input-entry" bind:value={entry_price} min="0" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="50000" type="number" />
                    </div>
                </div>

                <!-- Stop Loss -->
                <div class="flex flex-col gap-2">
                    <label for="stop_loss" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Stop Loss Price</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">cancel</span>
                        <input id="stop_loss" data-testid="input-stoploss" bind:value={stop_loss} min="0" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="48000" type="number" />
                    </div>
                </div>
            </div>

            <!-- Result Card -->
            <div class="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-xl flex flex-col items-center justify-center text-center">
                <p class="text-sm font-medium text-primary uppercase tracking-widest mb-2">Allowed Position Size</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{positionSize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                    <span class="text-xl font-bold text-slate-500 dark:text-slate-400">Units</span>
                </div>
                
                <div class="mt-3 flex items-center gap-4 text-sm bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col text-left">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Total Risk</span>
                        <span class="font-black text-rose-500">${riskAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div class="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <div class="flex flex-col text-left">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Target Profit (1:2)</span>
                        <span class="font-black text-emerald-500">${profitAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <button data-testid="btn-calculate" disabled={!isValid} type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="material-symbols-outlined">save</span>
                Save to Journal
            </button>
        </form>

        {#if showSuccess}
            <div class="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl font-bold animate-pulse z-[100]">
                Entry successfully saved!
            </div>
        {/if}
    </div>
</main>
