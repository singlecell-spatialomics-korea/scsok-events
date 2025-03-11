import { get, post } from '$lib/fetch';
import { redirect, error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ parent, request, params, cookies }) {
    let rtn = await parent();
    if (!rtn.user && !request.url.includes('admin')){
        return redirect(303, `/event/${params.slug}/login`);
    }

    if (rtn.user) {
        rtn.is_reviewer = false;
        const response = await get(`api/event/${params.slug}/reviewer`, cookies);
        if (response.ok && response.status === 200) {
            rtn.is_reviewer = response.data;
        }
    }
    return rtn;
}