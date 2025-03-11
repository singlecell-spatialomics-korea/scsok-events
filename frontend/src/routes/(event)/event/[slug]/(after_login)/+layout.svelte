<script>
    let { children, data } = $props();
    let event = data.event;

    import { A } from 'flowbite-svelte';
</script>

<style>
    :global(.docx_paragraphs) {
        margin-bottom: 1rem;
        font-family: 'Times New Roman';
        color: black;
    }
    :global(.odt_paragraphs) {
        margin-bottom: 1rem;
        font-family: 'Times New Roman';
        color: black;
    }
    :global(b) {
        font-weight: bold;
    }
</style>

<div class="flex flex-col justify-center gap-3 sm:justify-between sm:flex-row items-center">
    <p class="sm:text-lg">Welcome { data.user.first_name } {#if data.user.middle_initial}{data.user.middle_initial}{/if} { data.user.last_name }!</p>
    <div class="font-bold flex space-x-3">
        {#if data.is_reviewer}
            <A href="/event/{event.id}/reviewer" class="text-gray-600" data-sveltekit-reload>Reviewer</A>
            <span>|</span>
        {/if}
        <A href="/profile?next=/event/{event.id}" class="text-gray-600" data-sveltekit-reload>My Info</A>
        <span>|</span>
        <A href="/logout?next=/event/{event.id}" class="text-gray-600" data-sveltekit-reload>Sign Out</A>
    </div>
</div>
<hr class="my-6">

{@render children()}