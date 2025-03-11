import { get } from '$lib/fetch';
import { fail, redirect } from '@sveltejs/kit';

const ORCID_CLIENT_ID = process.env.ORCID_CLIENT_ID;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
    let rtn = {};

    const response_csrftoken = await get('api/csrftoken');
    if (!response_csrftoken.ok || response_csrftoken.status !== 200) {
        throw error(500, "Internal Server Error");
    }
    cookies.set('csrftoken', response_csrftoken.data.csrftoken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    if (cookies.get('sessionid')) {
        const response_me = await get('api/me', cookies);
        if (response_me.ok && response_me.status === 200) {
            let user = response_me.data;
            rtn.user = user;
        } else {
            cookies.delete('sessionid', {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });
        }
    }

    const response_events = await get('api/events');
    if (response_events.ok && response_events.status === 200) {
        rtn.events = response_events.data;
    }

    rtn.orcid_client_id = ORCID_CLIENT_ID;
    rtn.csrf_token = response_csrftoken.data.csrftoken;
    
    return rtn;
}