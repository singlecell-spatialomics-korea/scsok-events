<script>
    import { Heading, Label, Input, Textarea, Button, Alert } from 'flowbite-svelte';
    import { enhance } from '$app/forms';

    let { data } = $props();

    let success = $state("");
    let failure = $state("");

    const afterSubmit = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({reset: false});
                success = result.data.message;
                failure = "";
            } else {
                failure = result.error.message;
                success = "";
            }
        }
    };
</script>

<Heading tag="h2" customSize="text-xl font-bold" class="mb-3">Email Templates</Heading>
<p class="font-light mb-6">Customize the email templates that are automatically sent to attendees below.</p>
<form method="POST" action="?/update_email_templates" use:enhance={afterSubmit}>
    <Heading tag="h3" customSize="text-lg font-bold" class="mb-6">Registration Confirmation</Heading>
    <div class="mb-6">
        <Label for="email_template_registration_subject" class="block mb-2">Subject</Label>
        <Input id="email_template_registration_subject" name="email_template_registration_subject" value={data.event.email_template_registration.subject} />
    </div>
    <div class="mb-6">
        <Label for="email_template_registration_body" class="block mb-2">Body</Label>
        <Textarea id="email_template_registration_body" name="email_template_registration_body" rows="10" value={data.event.email_template_registration.body} />
    </div>
    <Heading tag="h3" customSize="text-lg font-bold" class="mb-6">Abstract Submission Confirmation</Heading>
    <div class="mb-6">
        <Label for="email_template_abstract_submission_subject" class="block mb-2">Subject</Label>
        <Input id="email_template_abstract_submission_subject" name="email_template_abstract_submission_subject" value={data.event.email_template_abstract_submission.subject} />
    </div>
    <div class="mb-6">
        <Label for="email_template_abstract_submission_body" class="block mb-2">Body</Label>
        <Textarea id="email_template_abstract_submission_body" name="email_template_abstract_submission_body" rows="10" value={data.event.email_template_abstract_submission.body} />
    </div>
    <div class="mb-6">
        {#if success}
            <Alert color="green">{success}</Alert>
        {/if}
        {#if failure}
            <Alert color="red">{failure}</Alert>
        {/if}
    </div>
    <div class="flex justify-center">
        <Button color="primary" type="submit" size="lg">Update</Button>
    </div>
</form>