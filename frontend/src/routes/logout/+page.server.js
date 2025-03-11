import { get } from '$lib/fetch';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, request, cookies }) {
    const url = new URL(request.url);
    const next = url.searchParams.get('next') || '/';

    const data = await parent();
    if (!data.user) {
        return redirect(303, next);
    }

    cookies.delete('sessionid', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    return redirect(303, next);
}