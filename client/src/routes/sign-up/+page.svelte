<script lang="ts">
    import SignUpForm from './sign-up-form.svelte';

    import type { ActionData, PageData } from './$types.js';

    // Automatically gets populated by +page.server.ts load function
    export let data: PageData;

    // Automatically gets populated by return value in +page.server.ts actions
    export let form: ActionData;
</script>

<svelte:head>
    <title>Sign Up</title>
    <meta name="description" content="Sign Up Page" />
</svelte:head>

<div class="text-column">
    <h1 class="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Sign Up</h1>
    <SignUpForm data={data.form} actionData={form} />
</div>
