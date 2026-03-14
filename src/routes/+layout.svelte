<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    const { children } = $props();

    let isDark = $state(false);

    onMount(() => {
        isDark = document.documentElement.classList.contains('dark');
    });

    function toggleTheme() {
        isDark = !isDark;
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }
</script>

<div class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
    <!-- Navigation Header -->
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src={isDark ? '/assets/dark.png' : '/assets/light.png'} alt="RiskNode Logo" class="h-8 w-auto object-contain" />
                <span class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Risk<span class="text-primary">Node</span></span>
            </a>
            <nav class="flex items-center gap-6">
                <a href="/" class="text-sm transition-colors {$page.url.pathname === '/' ? 'font-semibold text-primary' : 'font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'}">Calculator</a>
                <a href="/journal" class="text-sm transition-colors {$page.url.pathname.startsWith('/journal') ? 'font-semibold text-primary' : 'font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'}">Journal</a>
                <a href="/about" class="text-sm transition-colors {$page.url.pathname === '/about' ? 'font-semibold text-primary' : 'font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'}">How It Works</a>
                
                <button onclick={toggleTheme} class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Toggle Theme">
                    <span class="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </nav>
        </div>
    </header>

    {@render children()}

    <!-- Footer -->
    <footer class="py-8 border-t border-slate-200 dark:border-slate-800 mt-auto bg-white dark:bg-background-dark">
        <div class="max-w-5xl mx-auto px-4 text-center">
            <p class="text-sm text-slate-500 dark:text-slate-500 font-medium">
                Built for <span class="text-slate-900 dark:text-slate-300">TestSprite Hackathon</span>. Not Financial Advice.
            </p>
            <div class="mt-4 flex justify-center">
                <a href="https://github.com/Santos-42/RiskNode" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">code</span>
                    Source Code
                </a>
            </div>
            <div class="mt-4 flex justify-center gap-4 text-slate-400">
                <span class="material-symbols-outlined text-sm">security</span>
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span class="material-symbols-outlined text-sm">data_exploration</span>
            </div>
            <div class="mt-6 text-xs font-black text-slate-400">
                © 2026 RISKNODE
            </div>
        </div>
    </footer>
</div>

<style>
    :global(body) {
        font-family: 'Inter', sans-serif;
    }
</style>
