<script>
    import { A, Heading, Button } from 'flowbite-svelte';
    let { data } = $props();
    let event = data.event;
</script>

<Heading tag="h1" customSize="text-2xl font-bold" class="mb-3">Event Registration</Heading>
<p class="mb-10 font-light">You are already registered for the event. Thank you for joining us!</p>
<div class="flex flex-col md:flex-row justify-center gap-4">
    {#if event.accepts_abstract}
        <Button href="/event/{event.id}/abstract" color="primary" size="lg" data-sveltekit-reload>Submit an Abstract</Button>
    {/if}
    <Button color="alternative" href={event.link_info} size="lg" data-sveltekit-reload>Return to Event Page</Button>
</div>