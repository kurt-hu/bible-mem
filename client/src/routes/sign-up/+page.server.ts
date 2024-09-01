import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types.js';
import { signInSchema } from './sign-up-schema.js';

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

        try {
            const newUser = await event.locals.pb.users.create(form.data);
            await event.locals.pb.users.authWithPassword(newUser.username, form.data.password);
        } catch (error: any) {
            console.error('Error:', error.originalError);
            return fail(400, {
                form,
            });
        }

        throw redirect(303, '/');
    },
};
