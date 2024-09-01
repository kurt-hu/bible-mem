<script lang="ts">
    import type { PageData } from './$types.js';
    import SignInForm from './sign-in-form.svelte';
    export let data: PageData;
</script>

<svelte:head>
    <title>Sign In</title>
    <meta name="description" content="Sign In Page" />
</svelte:head>

<div class="text-column">
    <h1 class="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Sign In</h1>
    <SignInForm data={data.form} />
</div>
