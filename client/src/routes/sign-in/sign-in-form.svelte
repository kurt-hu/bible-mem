<script lang="ts">
    import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';

    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import { PasswordInput } from '$lib/components/ui/password-input';
    import { signInSchema, type SignInSchema } from './sign-in-schema';

    export let data: SuperValidated<Infer<SignInSchema>>;

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
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <PasswordInput {...attrs} bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="mt-2">Submit</Form.Button>
</form>
