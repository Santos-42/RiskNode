import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface TradeEntry {
    id: string;
    tanggal: string;
    pasangan_aset: string;
    modal: number;
    risiko: number;
    harga_masuk: number;
    harga_berhenti_rugi: number;
    ukuran_posisi: number;
    status: 'Open' | 'Won' | 'Lost';
}

const STORAGE_KEY = 'risknode_journal';

function createJournalStore() {
    let initialValue: TradeEntry[] = [];
    
    if (browser) {
        const storedValue = localStorage.getItem(STORAGE_KEY);
        if (storedValue) {
            try {
                initialValue = JSON.parse(storedValue);
            } catch (e) {
                console.error("Failed to parse stored journal entries", e);
            }
        }
    }

    const { subscribe, set, update } = writable<TradeEntry[]>(initialValue);

    return {
        subscribe,
        addEntry: (entry: TradeEntry) => {
            update(entries => {
                const newEntries = [entry, ...entries];
                if (browser) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
                }
                return newEntries;
            });
        },
        updateEntryStatus: (id: string, status: 'Won' | 'Lost') => {
            update(entries => {
                const newEntries = entries.map(e => e.id === id ? { ...e, status } : e);
                if (browser) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
                }
                return newEntries;
            });
        },
        removeEntry: (id: string) => {
            update(entries => {
                const newEntries = entries.filter(e => e.id !== id);
                if (browser) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
                }
                return newEntries;
            });
        },
        reset: () => {
            set([]);
            if (browser) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    };
}

export const journalStore = createJournalStore();
