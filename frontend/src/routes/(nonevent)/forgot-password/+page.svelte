<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    
    import { A, List, Li, Card, Button, Heading, Indicator, Label, Input, Dropzone, Checkbox, Select, Alert, Navbar } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    import { createForm } from 'felte';
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup';

    let { data, form } = $props();

    const schema = yup.object({
        email: yup.string().required('Email is required.'),
    });

    let me = data.user;
    let submitted = $state(false);
    let error_message = $state('');
    let success_message = $state('');
    const { form: felteForm, data: formData, errors, isSubmitting } = createForm({
        onSubmit: async (data) => {
            const response = await fetch('?/password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                    },
                    body: new URLSearchParams(data),
                }
            );
            if (!response.ok || response.status !== 200) {
                const rtn = await response.json();
                throw rtn.error;
            } else {
                submitted = true;
                success_message = 'An email has been sent. Please check your email to reset your password.';
            }
        },
        extend: validator({ schema }),
        onError: (errors) => {
            // scroll to top
            error_message = errors.message;
            return errors;
        }
    });
</script>

<Heading tag="h1" customSize="text-2xl font-bold" class="mb-3">Reset Password</Heading>
<p class="mb-5 font-light">Please enter your email address to reset your password.</p>
<form use:felteForm method="post" class="space-y-5">
    <div class="mb-6">
        <Label for="email" class="block mb-2">Email*</Label>
        <Input id="email" name="email" type="email" bind:value={$formData.email} />
        {#if $errors.email}
            <Alert type="error" color="red" class="mb-6 mt-3">
            <p class="text-sm">{$errors.email}</p>
            </Alert>
        {/if}
    </div>
    {#if error_message}
        <Alert type="error" color="red" class="mb-6 mt-3">
            <p class="text-sm">{error_message}</p>
        </Alert>
    {/if}
    {#if success_message}
        <Alert type="success" color="green" class="mb-6 mt-3">
            <p class="text-sm">{success_message}</p>
        </Alert>
    {/if}
    <div class="flex flex-col md:flex-row justify-center gap-4">
        <Button type="submit" color="primary" size="lg" disabled={$isSubmitting || submitted}>Reset Password</Button>
        <Button href={data.next} color="alternative" size="lg" data-sveltekit-reload>Go Back</Button>
    </div>
</form>