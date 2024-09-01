import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
    },
    preprocess: vitePreprocess(),
    adapter: adapter({
        // See below for an explanation of these options
        routes: {
            include: ['/*'],
            exclude: ['<all>'],
        },
        platformProxy: {
            configPath: 'wrangler.toml',
            environment: undefined,
            experimentalJsonConfig: false,
            persist: false,
        },
    }),
};

export default config;
