<script>
    let { data } = $props();
    import { A } from 'flowbite-svelte';
    import { Heading } from 'flowbite-svelte';
</script>

<Heading tag="h1" customSize="text-2xl font-bold" class="mb-6">Email Verification</Heading>
<p class="mb-3 font-light">Thank you for registering with us. Please check your email for the verification link. Sometimes the email may end up in the spam folder, so please check there as well.</p>
<p class="mb-10 font-light">After the verification, <A href={data.next}>click here</A> to continue the registration process.</p>