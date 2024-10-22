import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types.js';
import { signInSchema } from './sign-in-schema.js';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(signInSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(signInSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { username, password } = form.data;

        try {
            await event.locals.pb.collection('users').authWithPassword(username, password);
        } catch (error: any) {
            console.error('Error:', error.originalError);
            return fail(400, {
                form,
                error: 'Invalid username or password',
            });
        }

        throw redirect(303, '/');
    },
};
