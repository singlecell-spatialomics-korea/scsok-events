<script>
    import { enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    
    import { A, Card, Button, Heading, Indicator, Label, Input, Checkbox, Select, Alert, Navbar, Textarea } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    import { createForm } from 'felte';
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup';

    import RegistrationForm from '$lib/components/RegistrationForm.svelte';
    import 'academicons';

    let { data, form } = $props();

    let event = data.event;
    
    let form_config = { 
        hide_login_info: true,
    };

    const schema = yup.object({
        first_name: yup.string().required('First name is required.'),
        last_name: yup.string().required('Last name is required.'),
        middle_initial: yup.string().max(1),
        nationality: yup.number().required(),
        job_title: yup.string(),
        department: yup.string(),
        institute: yup.string().required('Institute is required.'),
        disability: yup.string(),
        dietary: yup.string(),
    });

    let me = data.user;
    let error_message = $state('');
    const { form: felteForm, data: formData, errors, isSubmitting } = createForm({
        initialValues: {
            first_name: me?me.first_name:'',
            middle_initial: me?me.middle_initial:'',
            last_name: me?me.last_name:'',
            nationality: me?me.nationality:1,
            institute: me?me.institute:'',
            department: me?me.department:'',
            job_title: me?me.job_title:'',
            disability: me?me.disability:'',
            dietary: me?me.dietary:'',
        },
        onSubmit: async (data) => {
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
            goto(`/event/${event.id}`);
        },
        extend: validator({ schema }),
        onError: (errors) => {
            // scroll to top
            error_message = errors.message;
            return errors;
        }
    });
</script>

{#snippet process_spaces(text)}
    {@html text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
{/snippet}

<Heading tag="h1" customSize="text-2xl font-bold" class="mb-3">Event Registration</Heading>
<p class="mb-10 font-light">Please fill the following form to register for the event.</p>
<form use:felteForm method="post" class="space-y-5">
    <RegistrationForm data={$formData} errors={$errors} config={form_config} />
    {#if data.questions.length > 0}
        <Heading tag="h2" customSize="text-lg font-bold" class="pt-3">Event Specific Information</Heading>
        <div>
            {#each data.questions as question}
            <div class="mb-3">
                <Label for={question.id} class="block mb-5">{@render process_spaces(question.question.question)}</Label>
                {#if question.question.type === 'select'}
                <Select id={question.id} name={question.id} class="mb-6" required>
                    {#each question.question.options as option, oidx}
                    <option value={option}>{option}</option>
                    {/each}
                </Select>
                {:else if question.question.type === 'checkbox'}
                {#each question.question.options as option, oidx}
                    <div class="flex">
                        <Checkbox id={`${question.id}_${oidx}`} name={`${question.id}_${oidx}`} class="mb-5" checked>{option}</Checkbox>
                    </div>
                {/each}
                {:else if question.question.type === 'text'}
                <div class="mb-6">
                    <Input type="text" id={question.id} name={question.id} />
                </div>
                {:else if question.question.type === 'textarea'}
                <div class="mb-6">
                    <Textarea type="text" id={question.id} name={question.id} />
                </div>
                {/if}
            </div>
            {/each}
        </div>
    {/if}
    {#if error_message}
        <Alert color="red" class="mb-4 error">{error_message}</Alert>
    {/if}
    <div class="flex flex-col md:flex-row justify-center gap-4">
        <Button type="submit" color="blue" size="lg" disabled={$isSubmitting}>Register</Button>
    </div>
</form>