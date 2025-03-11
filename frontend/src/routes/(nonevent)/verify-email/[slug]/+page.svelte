<script>
    let { data } = $props();

    import { Heading, Button } from 'flowbite-svelte';

    let message = $state('Click the button below to verify your email address.');
    let verified = $state(false);

    const verifyEmail = async () => {
        verified = true;
        const response = await fetch('?/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams({
                key: data.key
            }),
        });
        if (!response.ok || response.status !== 200) {
            const rtn = await response.json();
            message = rtn.error.message;
        } else {
            const rtn = await response.json();
            message = 'Your email has been successfully verified! Please return to the event registration page to continue.';
        }
    };
</script>

<Heading tag="h1" customSize="text-2xl font-bold" class="mb-6">Email Verification</Heading>
<p class="mb-10 font-light">{ message }</p>
{#if !verified}
<div class="flex justify-center mb-10">
    <Button onclick={verifyEmail} color="primary" size="lg">Verify Email</Button>
</div>
{/if}