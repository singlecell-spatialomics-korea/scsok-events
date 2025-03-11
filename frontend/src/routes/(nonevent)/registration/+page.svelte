<script>
    let { data: page_data } = $props();

    import RegistrationForm from '$lib/components/RegistrationForm.svelte';

    import { goto } from '$app/navigation';
    import { createForm } from 'felte';
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup';
    import { Alert, Input, Textarea, Select, Button, Label, InputAddon, ButtonGroup, Heading, Card } from 'flowbite-svelte';
    import { UserCircleSolid } from 'flowbite-svelte-icons';

    const schema = yup.object({
        email: yup.string().email().required('Email is required.'),
        password: yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters.'),
        confirm_password: yup.string().required('Passwords do not match.').oneOf([yup.ref('password'), null], 'Passwords do not match.'),
        first_name: yup.string().required('First name is required.'),
        last_name: yup.string().required('Last name is required.'),
        middle_initial: yup.string().max(1),
        nationality: yup.string().required('Nationality is required.'),
        job_title: yup.string(),
        department: yup.string(),
        institute: yup.string().required('Institute is required.'),
        disability: yup.string(),
        dietary: yup.string(),
    });

    let form_config = {
        next: page_data.next,
    }

    const { form: felteForm, data, errors, isSubmitting } = createForm({
        onSubmit: async (data) => {
            delete data.confirm_password;
            data.username = data.email;
            const response = await fetch('?/register',
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
            }
        },
        extend: validator({ schema }),
        onError: (errors) => {
            if (errors.redirect) {
                goto(`/verify-email?next=${page_data.next}`);
            } else {
                window.scrollTo(0, 0);
            }
            return errors;
        }
    });
</script>

<Heading tag="h1" customSize="text-2xl font-bold" class="mb-3">Registration</Heading>
<p class="mb-10 font-light">Please fill out the form below to register with us.</p>
<form use:felteForm method="post">
    <RegistrationForm errors={$errors} config={form_config} />
    <p class="text-center">
        <Button type="submit" size="xl" color="blue" disabled={$isSubmitting}>Register</Button>
    </p>
</form>