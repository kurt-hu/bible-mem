/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    console.log('layout.server.js load user:', locals.user);
    return {
        user: locals.user,
    };
}
