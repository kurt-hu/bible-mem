<script lang="ts">
    import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';

    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import { PasswordInput } from '$lib/components/ui/password-input';
    import type { ActionData } from './$types';
    import { signInSchema, type SignInSchema } from './sign-up-schema';

    export let data: SuperValidated<Infer<SignInSchema>>;
    export let actionData: ActionData;

    const form = superForm(data, {
        validators: zodClient(signInSchema),
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.Description>This will be your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <PasswordInput {...attrs} bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="passwordConfirm">
        <Form.Control let:attrs>
            <Form.Label>Confirm Password</Form.Label>
            <PasswordInput {...attrs} bind:value={$formData.passwordConfirm} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    {#if actionData?.error}
        <p>
            <!-- TODO: Write helper function to render ClientResponseError (https://github.com/pocketbase/js-sdk#error-handling) -->
            {`${actionData.error?.message} ${actionData.error?.data ? JSON.stringify(actionData.error?.data) : ''}`}
        </p>
    {/if}
    <Form.Button class="mt-2">Submit</Form.Button>
</form>
