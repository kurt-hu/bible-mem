import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types.js';
import { signInSchema } from './sign-up-schema.js';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(signInSchema)),
        error: null,
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(signInSchema));
        if (!form.valid) {
            return fail(400, {
                form,
                error: null,
            });
        }

        try {
            const newUser = await event.locals.pb.collection('users').create(form.data);
            await event.locals.pb
                .collection('users')
                .authWithPassword(newUser.username, form.data.password);
        } catch (error) {
            console.error('Error:', error);
            return fail(400, {
                form,
                error: (error as ClientResponseError).response,
            });
        }

        throw redirect(303, '/');
    },
};
