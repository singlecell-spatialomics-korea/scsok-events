/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
    const url = new URL(request.url);
    const next = url.searchParams.get('next') || '/';
    return { next };
}
