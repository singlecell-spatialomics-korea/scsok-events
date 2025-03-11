import { invalidateAll } from '$app/navigation';
import { get, post } from '$lib/fetch';
import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, params, cookies }) {
    let rtn = await parent();

    if (rtn.user) {
        const response_registered = await get(`api/event/${params.slug}/registered`, cookies); // true if registered, false if not
        if (response_registered.ok && response_registered.status === 200) {
            if (!response_registered.data.registered) {
                return redirect(303, `/event/${params.slug}/register`);
            }
        } else {
            error(500, "Internal Server Error");
        }
    } else {
        return redirect(303, `/event/${params.slug}/login`);
    }
}