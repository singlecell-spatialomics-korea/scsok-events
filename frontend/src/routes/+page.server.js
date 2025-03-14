import { get } from '$lib/fetch';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    return redirect(301, 'https://kobra.kr');
}