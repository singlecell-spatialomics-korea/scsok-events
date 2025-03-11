<script>
    import { enhance } from '$app/forms';
    import { Alert, Button, Card, Heading, Input, Label, Li, List, Select, Textarea } from 'flowbite-svelte';

    let { data } = $props();

    let custom_questions = $state({});
    let message_custom_question_changes = $state({});

    const addNewCustomQuestion = () => {
        custom_questions = [...custom_questions, {
            id: -1,
            question: {
                type: 'checkbox',
                question: '',
                options: ''
            }
        }];
        scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    };

    const resetCustomQuestionChanges = () => {
        custom_questions = data.questions.map(q => {
            let rtn = {
                id: q.id,
                question: {
                    type: q.question.type,
                    question: q.question.question
                }
            };
            if (q.question.options) {
                rtn.question.options = q.question.options.join('\n');
            }
            return rtn;
        });
    };

    const afterSuccessfulSubmitCustomQuestionChanges = () => {
        return async ({ result, action, update }) => {
            if (action.search.includes('update_questions')) {
                if (result.type === 'success') {
                    await update({ reset: false });
                    resetCustomQuestionChanges();
                    message_custom_question_changes = { type: 'success', message: 'Successfully updated custom questions.' };
                } else {
                    message_custom_question_changes = { type: 'error', message: 'Failed to update custom questions.' };
                }
            }
            scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
        };
    };

    $effect.pre(() => {
        resetCustomQuestionChanges();
    });
</script>

<Heading tag="h2" customSize="text-xl font-bold" class="mb-3">Event Specific Questions</Heading>
<p class="font-light mb-6">Customize event specific questions below. Note that the following information is already collected by default:</p>
<List class="mb-6">
    <Li>First Name, Middle Initial, Last Name, Nationality, Institute, Department, Job Title, Disability Information, Dietary Information</Li>
</List>
<p class="font-light mb-6">Four types of custom questions are supported: checkbox (multiple choices), dropdown (single choice), text (text input), textarea (multiline text input)</p>
<form method="POST" action="?/update_questions" use:enhance={afterSuccessfulSubmitCustomQuestionChanges}>
    <div class="flex justify-center mb-6 gap-2">
        <Button color="primary" onclick={resetCustomQuestionChanges}>Reset Changes</Button>
        <Button type="submit" color="primary">Apply Changes</Button>
    </div>
    {#each custom_questions as question}
    <Card size="none" class="mb-6">
        <div class="mb-6">
            <Label for="question_type" class="block mb-2">Question Type</Label>
            <Select id="question_type" name="question_type[]" bind:value={question.question.type} items={[
                { value: 'checkbox', name: 'Checkbox' },
                { value: 'select', name: 'Dropdown' },
                { value: 'text', name: 'Text' },
                { value: 'textarea', name: 'Textarea' }
            ]} />
        </div>
        <div class="mb-6">
            <Label for="question_question" class="block mb-2">Question</Label>
            <Textarea id="question_question" name="question_question[]" bind:value={question.question.question} />
        </div>
        {#if question.question.type === 'checkbox' || question.question.type === 'select'}
        <div class="mb-6">
            <Label for="question_options" class="block mb-2">Options (for checkbox and select, separate by new line)</Label>
            <Textarea id="question_options" name="question_options[]" rows="3" bind:value={question.question.options} />
        </div>
        {/if}
        <Input type="hidden" name="question_id[]" bind:value={question.id} />
        <div class="flex justify-center">
            <Button color="red" class="ml-2" onclick={() => {
                custom_questions = custom_questions.filter(q => q.id !== question.id);
            }}>Delete Question</Button>
        </div>
    
    </Card>
    {/each}
    {#if custom_questions.length === 0}
        <p class="font-light text-center mb-6">No custom questions defined.</p>
    {/if}
    <div class="flex justify-center mb-6">
        <Button color="dark" onclick={addNewCustomQuestion}>+</Button>
    </div>
    <div class="mb-6">
        {#if message_custom_question_changes.type === 'success'}
            <Alert type="success" color="green">{message_custom_question_changes.message}</Alert>
        {:else if message_custom_question_changes.type === 'error'}
            <Alert type="error" color="red">{message_custom_question_changes.message}</Alert>
        {/if}
    </div>
    <div class="flex justify-center gap-2">
        <Button color="primary" onclick={resetCustomQuestionChanges}>Reset Changes</Button>
        <Button type="submit" color="primary">Apply Changes</Button>
    </div>
</form>