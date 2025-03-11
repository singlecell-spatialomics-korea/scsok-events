import { get } from '$lib/fetch';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { post } from '$lib/fetch';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, request }) {
    const data = await parent();
    const url = new URL(request.url);
    const next = url.searchParams.get('next') || '/';
    data.next = next;
    return data;
}

/** @type {import('./$types').Actions} */
export const actions = {
    update: async ({ cookies, request }) => {
        let formdata = await request.formData()
        const response = await post('api/me', formdata, cookies);

        if (!response.ok || response.status !== 200) {
            throw error(response.status, { message: 'Server error. It this persists, please contact the admininistrator.' });
        }
    }
};