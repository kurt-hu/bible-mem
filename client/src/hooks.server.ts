import type { Handle } from '@sveltejs/kit';

import { POCKETBASE_URL } from '$env/static/private';
import Pocketbase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new Pocketbase(POCKETBASE_URL || 'http://127.0.0.1:8090');

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid &&
            (await event.locals.pb.collection('users').authRefresh());

        // Just for convenience to shorten path to user model
        event.locals.user = event.locals.pb.authStore.model;
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.set(
        'set-cookie',
        event.locals.pb.authStore.exportToCookie({ secure: process.env.NODE_ENV === 'production' }),
    );

    return response;
};
