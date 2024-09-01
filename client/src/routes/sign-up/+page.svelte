<script lang="ts">
    import SignUpForm from './sign-up-form.svelte';

    import type { PageData } from './$types.js';

    export let data: PageData;
</script>

<svelte:head>
    <title>Sign Up</title>
    <meta name="description" content="Sign Up Page" />
</svelte:head>

<div class="text-column">
    <h1 class="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Sign Up</h1>
    <SignUpForm data={data.form} />
</div>
