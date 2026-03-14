<script lang="ts">
    import { journalStore } from '$lib/store';
    
    let pasangan_aset: string = $state('');
    let modal: number | null = $state(null);
    let risiko: number | null = $state(null);
    let harga_masuk: number | null = $state(null);
    let harga_berhenti_rugi: number | null = $state(null);

    let hasValues = $derived(
        typeof modal === 'number' && !isNaN(modal) &&
        typeof risiko === 'number' && !isNaN(risiko) &&
        typeof harga_masuk === 'number' && !isNaN(harga_masuk) &&
        typeof harga_berhenti_rugi === 'number' && !isNaN(harga_berhenti_rugi)
    );

    let isValid = $derived(hasValues && 
        modal! >= 0 && 
        risiko! >= 0 && risiko! <= 5 && 
        harga_masuk! >= 0 && 
        harga_berhenti_rugi! >= 0 && 
        harga_masuk !== harga_berhenti_rugi
    );

    let errorMsg = $derived.by(() => {
        if (hasValues) {
            if (risiko! > 5) return 'Persentase Risiko tidak boleh di atas 5%.';
            else if (harga_masuk === harga_berhenti_rugi) return 'Jarak harga tidak valid';
            else if (modal! < 0 || risiko! < 0 || harga_masuk! < 0 || harga_berhenti_rugi! < 0) return 'Nilai tidak boleh negatif.';
            return '';
        }
        return '';
    });

    let positionSize = $derived(isValid ? (modal! * (risiko! / 100)) / Math.abs(harga_masuk! - harga_berhenti_rugi!) : 0);
    let estimatedValue = $derived(isValid ? positionSize * harga_masuk! : 0);

    function handleSave() {
        if (!isValid || !hasValues) return;
        
        journalStore.addEntry({
            id: crypto.randomUUID(),
            tanggal: new Date().toISOString(),
            pasangan_aset: pasangan_aset || 'Unknown',
            modal: modal!,
            risiko: risiko!,
            harga_masuk: harga_masuk!,
            harga_berhenti_rugi: harga_berhenti_rugi!,
            ukuran_posisi: positionSize,
            status: 'Terbuka'
        });
        
        alert('Disimpan ke jurnal!');
        pasangan_aset = '';
        modal = null;
        risiko = null;
        harga_masuk = null;
        harga_berhenti_rugi = null;
    }
</script>

<main class="flex-grow flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-xl">
        <!-- Page Title -->
        <div class="mb-8 text-center sm:text-left">
            <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-2">Risk Calculator</h2>
            <p class="text-slate-600 dark:text-slate-400">Hitung ukuran posisi Anda berdasarkan toleransi risiko yang telah ditetapkan.</p>
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
                <label for="pasangan_aset" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Asset Pair (Opsional)</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">currency_bitcoin</span>
                    <input id="pasangan_aset" bind:value={pasangan_aset} class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="e.g. BTC/USDT" type="text" />
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Modal -->
                <div class="flex flex-col gap-2">
                    <label for="modal" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Modal (USDT)</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">account_balance_wallet</span>
                        <input id="modal" bind:value={modal} min="0" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="1000" type="number" />
                    </div>
                </div>

                <!-- Risiko % -->
                <div class="flex flex-col gap-2">
                    <label for="risiko" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Risiko (%)</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">warning</span>
                        <input id="risiko" bind:value={risiko} min="0" max="5" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="1" type="number" />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Harga Masuk -->
                <div class="flex flex-col gap-2">
                    <label for="harga_masuk" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Harga Masuk</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">login</span>
                        <input id="harga_masuk" bind:value={harga_masuk} min="0" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="50000" type="number" />
                    </div>
                </div>

                <!-- Harga Berhenti Rugi -->
                <div class="flex flex-col gap-2">
                    <label for="harga_berhenti_rugi" class="text-sm font-semibold text-slate-700 dark:text-slate-300">Harga Berhenti Rugi (Stop Loss)</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">cancel</span>
                        <input id="harga_berhenti_rugi" bind:value={harga_berhenti_rugi} min="0" step="any" required class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white" placeholder="48000" type="number" />
                    </div>
                </div>
            </div>

            <!-- Result Card -->
            <div class="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-xl flex flex-col items-center justify-center text-center">
                <p class="text-sm font-medium text-primary uppercase tracking-widest mb-2">Ukuran Posisi yang Diizinkan</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{positionSize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                    <span class="text-xl font-bold text-slate-500 dark:text-slate-400">Units</span>
                </div>
                <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Estimasi nilai posisi: <span class="font-mono">${estimatedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            </div>

            <!-- Submit Button -->
            <button disabled={!isValid} type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="material-symbols-outlined">save</span>
                Simpan ke Jurnal
            </button>
        </form>
    </div>
</main>
