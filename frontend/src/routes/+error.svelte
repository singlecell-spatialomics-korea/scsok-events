<script>
    import { page } from '$app/stores';
    import { A, Heading } from 'flowbite-svelte';
 </script>
  
<div class="flex mx-auto flex-col text-center items-center justify-center h-96">
    <Heading tag="h1" class="mb-4">{$page.status}</Heading>
    <Heading tag="h6">{$page.error.message}</Heading>
    {#if $page.status === 404}
        <p class="mt-4">The page you are looking for does not exist.</p>
    {:else if $page.status === 500}
        <p class="mt-4">If this problem persists, please contact <A href="mailto:admin@kobra.kr">the administrator</A>.</p>
    {/if}
</div>