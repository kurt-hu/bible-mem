<script>
    import '../app.css';

    export let data;
</script>

<div class="app">
    <header>
        <div>
            <nav class="container mx-auto px-6 py-8 md:flex md:items-center md:justify-between">
                <div class="flex items-center justify-between">
                    <a
                        class="text-xl font-bold text-gray-800 hover:text-blue-400 md:text-2xl"
                        href="/"
                        >BibleMem
                    </a>
                </div>

                <div
                    class="mt-8 flex-col space-y-4 md:mt-0 md:flex md:flex-row md:items-center md:space-x-10 md:space-y-0"
                >
                    <a class="text-gray-800 hover:text-blue-400" href="/">Home</a>
                    <a class="text-gray-800 hover:text-blue-400" href="/about">About Us</a>
                    {#if data?.user}
                        <a class="text-gray-800 hover:text-blue-400" href="/decks">Decks</a>
                        <a class="text-gray-800 hover:text-blue-400" href="/settings">Settings</a>
                        <form action="/sign-out" method="POST">
                            <button class="text-gray-800 hover:text-blue-400" type="submit">
                                Sign Out
                            </button>
                        </form>
                    {:else}
                        <a class="text-gray-800 hover:text-blue-400" href="/sign-in">Sign In</a>
                        <a class="text-gray-800 hover:text-blue-400" href="/sign-up">Sign Up</a>
                    {/if}
                </div>
            </nav>
        </div>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer>
        <p>
            This project is open source! Visit our <a
                href="https://github.com/kurt-hu/bible-mem"
                target="_blank">GitHub repo</a
            >🛠️
        </p>
    </footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
