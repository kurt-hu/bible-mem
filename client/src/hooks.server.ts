import type { Handle } from '@sveltejs/kit';

import { POCKETBASE_URL } from '$env/static/private';
import Pocketbase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
    if (!POCKETBASE_URL) {
        console.warn(
            'POCKETBASE_URL is not set in the environment variables, defaulting to http://127.0.0.1:8090',
        );
    }
    const pocketbaseUrl = POCKETBASE_URL || 'http://127.0.0.1:8090';
    event.locals.pb = new Pocketbase(pocketbaseUrl);

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid &&
            (await event.locals.pb.collection('users').authRefresh());

        // Just for convenience to shorten path to user model
        event.locals.user = event.locals.pb.authStore.model;
        console.log('event.locals.user:', event.locals.user);
    } catch (error) {
        console.error('Failed to refresh auth model:', error);
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.set(
        'set-cookie',
        event.locals.pb.authStore.exportToCookie({
            secure: process.env.NODE_ENV === 'production' || pocketbaseUrl.startsWith('https'),
        }),
    );

    return response;
};
