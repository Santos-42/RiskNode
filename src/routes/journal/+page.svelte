<script lang="ts">
    import { journalStore, type TradeEntry } from '$lib/store';
    
    let totalTrades = $derived($journalStore.length);
    let wonTrades = $derived($journalStore.filter(t => t.status === 'Menang').length);
    let winRate = $derived(totalTrades > 0 ? ((wonTrades / totalTrades) * 100).toFixed(1) : '0.0');
    
    let totalPnL = $derived($journalStore.reduce((acc, trade) => {
        const riskAmount = trade.modal * (trade.risiko / 100);
        if (trade.status === 'Menang') return acc + (riskAmount * 2); // Asumsi target R:R 1:2
        if (trade.status === 'Kalah') return acc - riskAmount;
        return acc;
    }, 0));
    
    let avgRisk = $derived(totalTrades > 0 
        ? $journalStore.reduce((acc, trade) => acc + (trade.modal * (trade.risiko / 100)), 0) / totalTrades 
        : 0);

    function setStatus(id: string, status: 'Menang' | 'Kalah') {
        journalStore.updateEntryStatus(id, status);
    }
    
    function deleteEntry(id: string) {
        if(confirm('Hapus entri ini?')) {
            journalStore.removeEntry(id);
        }
    }
    
    function removeAll() {
        if(confirm('Hapus semua jurnal?')) {
            journalStore.reset();
        }
    }
</script>

<main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header Section -->
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-2">
            <h2 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Trading Journal</h2>
            <p class="text-slate-500 dark:text-slate-400 max-w-lg">
                Pantau dan analisis performa perdagangan kripto Anda dengan manajemen risiko yang disiplin.
            </p>
        </div>
        <div class="flex gap-3">
            <button onclick={removeAll} class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm hover:opacity-90 transition-opacity">
                <span class="material-symbols-outlined text-lg">delete_sweep</span>
                Hapus Semua
            </button>
            <a href="/" class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                <span class="material-symbols-outlined text-lg">add</span>
                Tambah Kalkulasi
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
                {totalPnL > 0 ? '+' : ''}${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
        <div class="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Avg Risk/Trade</p>
            <p class="text-2xl font-black text-slate-900 dark:text-white">${avgRisk.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
    </div>

    <!-- Data Table Card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/80">
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Tanggal</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Aset</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Ukuran Posisi</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Risiko ($)</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-center">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    {#if $journalStore.length === 0}
                        <tr>
                            <td colspan="5" class="px-6 py-10 text-center text-slate-500 font-medium">Belum ada jurnal perdagangan.</td>
                        </tr>
                    {/if}
                    {#each $journalStore as trade (trade.id)}
                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-300">
                                {new Date(trade.tanggal).toISOString().split('T')[0]}
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap">
                                <span class="font-bold text-slate-900 dark:text-white uppercase">{trade.pasangan_aset}</span>
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300 text-right">
                                {trade.ukuran_posisi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300 text-right">
                                ${(trade.modal * (trade.risiko / 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td class="px-6 py-5 whitespace-nowrap">
                                <div class="flex items-center justify-center gap-2">
                                    {#if trade.status === 'Terbuka'}
                                        <div class="flex gap-1">
                                            <button onclick={() => setStatus(trade.id, 'Menang')} class="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:brightness-105 transition-all">Menang</button>
                                            <button onclick={() => setStatus(trade.id, 'Kalah')} class="px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-bold hover:brightness-105 transition-all">Kalah</button>
                                        </div>
                                    {:else if trade.status === 'Menang'}
                                        <span class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-black uppercase shadow-sm">Menang</span>
                                    {:else}
                                        <span class="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-black uppercase shadow-sm">Kalah</span>
                                    {/if}
                                    <button onclick={() => deleteEntry(trade.id)} class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
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
</main>
