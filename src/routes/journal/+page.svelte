<script lang="ts">
    import { journalStore, type TradeEntry } from '$lib/store';
    
    let totalTrades = $derived($journalStore.length);
    let wonTrades = $derived($journalStore.filter(t => t.status === 'Won').length);
    let winRate = $derived(totalTrades > 0 ? ((wonTrades / totalTrades) * 100).toFixed(1) : '0.0');
    
    let totalPnL = $derived($journalStore.reduce((acc, trade) => {
        const riskAmount = (trade.capital || 0) * ((trade.risk || 0) / 100);
        if (trade.status === 'Won') return acc + (riskAmount * 2); // Assume 1:2 R:R target
        if (trade.status === 'Lost') return acc - riskAmount;
        return acc;
    }, 0));
    
    let avgRisk = $derived(totalTrades > 0 
        ? $journalStore.reduce((acc, trade) => acc + ((trade.capital || 0) * ((trade.risk || 0) / 100)), 0) / totalTrades 
        : 0);

    let showDeleteModal = $state(false);
    let showDeleteAllModal = $state(false);
    let deleteTargetId = $state<string | null>(null);

    function setStatus(id: string, status: 'Won' | 'Lost') {
        journalStore.updateEntryStatus(id, status);
    }
    
    function requestDelete(id: string) {
        deleteTargetId = id;
        showDeleteModal = true;
    }

    function confirmDelete() {
        if (deleteTargetId) {
            journalStore.removeEntry(deleteTargetId);
            showDeleteModal = false;
            deleteTargetId = null;
        }
    }

    function cancelDelete() {
        showDeleteModal = false;
        deleteTargetId = null;
    }
    
    function requestDeleteAll() {
        showDeleteAllModal = true;
    }

    function confirmDeleteAll() {
        journalStore.reset();
        showDeleteAllModal = false;
    }

    function cancelDeleteAll() {
        showDeleteAllModal = false;
    }

    let isRoasting = $state(false);
    let aiRoastMessage = $state<string | null>(null);

    async function callRiskManager() {
        if ($journalStore.length === 0) return;
        
        isRoasting = true;
        aiRoastMessage = null;

        try {
            const res = await fetch('/api/roast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trades: $journalStore })
            });
            
            const data = await res.json();
            aiRoastMessage = data.roast || data.error;
        } catch (err) {
            aiRoastMessage = "Connection to AI system lost.";
        } finally {
            isRoasting = false;
        }
    }
</script>

<main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header Section -->
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-2">
            <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Trading Journal</h2>
            <p class="text-slate-500 dark:text-slate-400 max-w-lg">
                Monitor and analyze your crypto trading performance with disciplined risk management.
            </p>
        </div>
        <div class="flex gap-3">
            <button data-testid="btn-delete-all" onclick={requestDeleteAll} class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm hover:opacity-90 transition-opacity">
                <span class="material-symbols-outlined text-lg">delete_sweep</span>
                Delete All
            </button>
            <a href="/" class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                <span class="material-symbols-outlined text-lg">add</span>
                Add Calculation
            </a>
        </div>
    </div>

    <!-- Dashboard Summary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Trades</p>
            <p class="text-2xl font-black text-slate-900 dark:text-white">{totalTrades}</p>
        </div>
        <div class="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Win Rate</p>
            <p class="text-2xl font-black text-emerald-500">{winRate}%</p>
        </div>
        <div class="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total PNL</p>
            <p class="text-2xl font-black {totalPnL > 0 ? 'text-emerald-500' : totalPnL < 0 ? 'text-rose-500' : 'text-slate-500'}">
                {totalPnL < 0 ? '-' : totalPnL > 0 ? '+' : ''}${Math.abs(totalPnL).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
        <div class="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Avg Risk/Trade</p>
            <p class="text-2xl font-black text-slate-900 dark:text-white">${avgRisk.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
    </div>

    <!-- AI Risk Evaluator -->
    <div class="mb-6 p-6 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 text-slate-800/30 dark:text-slate-800/50">
            <span class="material-symbols-outlined text-9xl">smart_toy</span>
        </div>
        
        <div class="relative z-10">
            <h3 class="text-lg font-black text-white mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-amber-400">local_fire_department</span>
                AI Risk Evaluator
            </h3>
            
            {#if aiRoastMessage}
                <div class="p-4 rounded-xl bg-slate-800/50 text-slate-300 border-l-4 border-amber-500 font-medium italic text-sm mb-4">
                    "{aiRoastMessage}"
                </div>
            {/if}

            <button 
                onclick={callRiskManager} 
                disabled={isRoasting || $journalStore.length === 0}
                class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-900 disabled:text-slate-500 font-bold text-sm transition-all flex items-center gap-2"
            >
                {#if isRoasting}
                    <span class="material-symbols-outlined animate-spin text-sm">sync</span>
                    Analyzing Discipline...
                {:else}
                    <span class="material-symbols-outlined text-sm">psychology</span>
                    Evaluate My Journal
                {/if}
            </button>
        </div>
    </div>

    <!-- Data Table Card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/80">
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Date</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Asset</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Position Size</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Risk ($)</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-center">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    {#if $journalStore.length === 0}
                        <tr>
                            <td colspan="5" class="px-6 py-10 text-center text-slate-500 font-medium">No trading records yet.</td>
                        </tr>
                    {/if}
                    {#each $journalStore as trade (trade.id)}
                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-300">
                                {trade.date ? new Date(trade.date).toISOString().split('T')[0] : 'N/A'}
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap">
                                <span class="font-bold text-slate-900 dark:text-white uppercase">{trade.asset_pair || 'UNKNOWN'}</span>
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300 text-right">
                                {(trade.position_size || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300 text-right">
                                ${((trade.capital || 0) * ((trade.risk || 0) / 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap">
                                <div class="flex items-center justify-center gap-2">
                                    {#if trade.status === 'Open'}
                                        <div class="flex gap-1">
                                            <button data-testid="btn-won" onclick={() => setStatus(trade.id, 'Won')} class="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:brightness-105 transition-all">Won</button>
                                            <button data-testid="btn-lost" onclick={() => setStatus(trade.id, 'Lost')} class="px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-bold hover:brightness-105 transition-all">Lost</button>
                                        </div>
                                    {:else if trade.status === 'Won'}
                                        <span class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-black uppercase shadow-sm">Won</span>
                                    {:else}
                                        <span class="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-black uppercase shadow-sm">Lost</span>
                                    {/if}
                                    <button data-testid="btn-delete" onclick={() => requestDelete(trade.id)} class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
                                        <span class="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modals -->
    {#if showDeleteModal}
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                <div class="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/20 mb-4 mx-auto">
                    <span class="material-symbols-outlined text-rose-600 dark:text-rose-400 text-2xl">warning</span>
                </div>
                <h3 class="text-lg font-black text-center text-slate-900 dark:text-white mb-2">Delete Journal Entry?</h3>
                <p class="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">This action cannot be undone. This trade data will be permanently lost from your local storage.</p>
                <div class="flex gap-3">
                    <button onclick={cancelDelete} class="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                    <button onclick={confirmDelete} class="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30 transition-all">Yes, Delete</button>
                </div>
            </div>
        </div>
    {/if}

    {#if showDeleteAllModal}
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                <div class="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/20 mb-4 mx-auto">
                    <span class="material-symbols-outlined text-rose-600 dark:text-rose-400 text-2xl">delete_forever</span>
                </div>
                <h3 class="text-lg font-black text-center text-slate-900 dark:text-white mb-2">Delete All Entries?</h3>
                <p class="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">This will wipe your entire trading history. This action absolute and cannot be recovered.</p>
                <div class="flex gap-3">
                    <button onclick={cancelDeleteAll} class="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                    <button onclick={confirmDeleteAll} class="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30 transition-all">Wipe Everything</button>
                </div>
            </div>
        </div>
    {/if}
</main>
