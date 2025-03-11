<script>
    import { Heading, TableSearch, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Checkbox, Card} from 'flowbite-svelte';
    import { Button, Modal, Label, Input, Select, Textarea, Alert } from 'flowbite-svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';

    import { UserEditSolid, UserRemoveSolid } from 'flowbite-svelte-icons';

    import { enhance } from '$app/forms';
    import { error } from '@sveltejs/kit';

    let { data } = $props();

    let searchTermSpeaker = $state('');
    let filteredSpeakers = $state([]);
    let selectedSpeakers = $state([]);
    $effect(() => {
        filteredSpeakers = data.speakers.filter((item) => item.name.toLowerCase().includes(searchTermSpeaker.toLowerCase()))
    });

    let speaker_modal = $state(false);
    let remove_speaker_modal = $state(false);
    let selected_speaker = $state(null);
    
    const addSpeakerModal = () => {
        selected_speaker = null;
        speaker_modal = true;
    };
    const modifySpeakerModal = (id) => {
        selected_speaker = data.speakers.find((item) => item.id === id);
        speaker_modal = true;
    };
    const removeSpeakerModal = (id) => {
        selected_speaker = data.speakers.find((item) => item.id === id);
        remove_speaker_modal = true;
    };

    let update_speaker_error = $state('');
    const afterUpdateSpeaker = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({ reset: false });
                speaker_modal = false;
                update_speaker_error = '';
            } else {
                update_speaker_error = result.error.message;
            }
        }
    };

    let remove_speaker_error = $state('');
    const afterRemoveSpeaker = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({ reset: false });
                remove_speaker_modal = false;
                remove_speaker_error = '';
            } else {
                remove_speaker_error = result.error.message;
            }
        }
    };

    const format_type = (type) => {
        switch (type) {
            case 'keynote':
                return 'Keynote Talk';
            case 'invited':
                return 'Invited Talk';
            case 'contributed':
                return 'Contributed Talk';
            case 'short':
                return 'Short Talk';
            case 'poster':
                return 'Poster';
            default:
                return 'Unknown';
        }
    };


    let send_email_modal = $state(false);
    const showSendEmailModal = () => {
        send_email_modal = true;
    };

    let message_send_email = $state({});
    const afterSuccessfulSendEmails = () => {
        return async ({ result, action, update }) => {
            if (result.type === 'success') {
                await update({ reset: false });
                send_email_modal = false;
                message_send_email = {}
            } else {
                message_send_email = { type: 'error', message: 'Failed to send emails.' };
            }
        };
    };
</script>

<Heading tag="h2" customSize="text-xl font-bold" class="mb-3">Speakers</Heading>
<p class="font-light mb-6">You can manage speakers information and send batch emails to them below.</p>
<div class="flex justify-end gap-2">
    <Button color="primary" size="sm" disabled={selectedSpeakers.length === 0} onclick={showSendEmailModal}>Send Email to Selected Speakers</Button>
    <Button color="primary" size="sm" onclick={addSpeakerModal}>Add Speaker</Button>
</div>
<TableSearch placeholder="Search by First Name" hoverable={true} bind:inputValue={searchTermSpeaker}>
    <TableHead>
        <TableHeadCell class="w-1"><Checkbox 
            checked={selectedSpeakers.length > 0 && selectedSpeakers.length === data.speakers.length}
            intermediate={
                selectedSpeakers.length > 0 && (selectedSpeakers.length < data.speakers.length)
            }
            onclick={(e) => {
                if (e.target.checked) {
                    selectedSpeakers = filteredSpeakers.map(a => a.id);
                } else {
                    selectedSpeakers = [];
                }
            }}
        /></TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Email</TableHeadCell>
        <TableHeadCell>Affiliation</TableHeadCell>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell class="w-1">Actions</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each filteredSpeakers as row}
            <TableBodyRow>
                <TableBodyCell><Checkbox checked={selectedSpeakers.includes(row.id)} onclick={(e) => {
                    if (e.target.checked) {
                        selectedSpeakers = [...selectedSpeakers, row.id];
                    } else {
                        selectedSpeakers = selectedSpeakers.filter(a => a !== row.id);
                    }
                }} /></TableBodyCell>
                <TableBodyCell>{row.name}</TableBodyCell>
                <TableBodyCell>{row.email}</TableBodyCell>
                <TableBodyCell>{row.affiliation}</TableBodyCell>
                <TableBodyCell>{format_type(row.type)}</TableBodyCell>
                <TableBodyCell>
                    <div class="flex justify-center gap-2">
                        <Button color="none" size="none" onclick={() => modifySpeakerModal(row.id)}>
                            <UserEditSolid class="w-5 h-5" />
                        </Button>
                        <Button color="none" size="none" onclick={() => removeSpeakerModal(row.id)}>
                            <UserRemoveSolid class="w-5 h-5" />
                        </Button>
                    </div>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
        {#if filteredSpeakers.length === 0}
            <TableBodyRow>
                <TableBodyCell colspan="6" class="text-center">No records</TableBodyCell>
            </TableBodyRow>
        {/if}
    </TableBody>
</TableSearch>

<Modal bind:open={speaker_modal} title={(selected_speaker?"Update":"Add") + " Speaker"} size="lg">
    <form method="POST" action={selected_speaker?"?/update_speaker":"?/add_speaker"} use:enhance={afterUpdateSpeaker}>
        {#if selected_speaker}
            <input type="hidden" name="id" value={selected_speaker.id} />
        {:else}
            <div class="mb-6">
                <Label for="id" class="block mb-2">Select an attendee to copy data to below form:</Label>
                <Select id="id" name="id" items={
                    data.attendees.map(a => ({ value: a.id, name: `${a.name}, ${a.institute} (${a.user.email})` }))
                } onchange={
                    (e) => {
                        const id = parseInt(e.target.value);
                        const attendee = data.attendees.find(a => a.id === id);
                        document.getElementById('name').value = attendee.name;
                        document.getElementById('email').value = attendee.user.email;
                        document.getElementById('affiliation').value = attendee.institute;
                    }
                } />
            </div>
            <hr class="mb-6" />
        {/if}
        <div class="mb-6">
            <Label for="name" class="block mb-2">Name*</Label>
            <Input id="name" name="name" type="text" value={selected_speaker?selected_speaker.name:''} />
        </div>
        <div class="mb-6">
            <Label for="email" class="block mb-2">Email*</Label>
            <Input id="email" name="email" type="email" value={selected_speaker?selected_speaker.email:''} />
        </div>
        <div class="mb-6">
            <Label for="affiliation" class="block mb-2">Affiliation*</Label>
            <Input id="affiliation" name="affiliation" type="text" value={selected_speaker?selected_speaker.affiliation:''} />
        </div>
        <div class="mb-6">
            <Label for="type" class="block mb-2">Type</Label>
            <Select id="type" name="type" items={[
                { value: 'keynote', name: 'Keynote Talk' },
                { value: 'invited', name: 'Invited Talk' },
                { value: 'contributed', name: 'Contributed Talk' },
                { value: 'short', name: 'Short Talk' },
                { value: 'poster', name: 'Poster' },
            ]} value={selected_speaker?selected_speaker.type:''} />
        </div>
        {#if update_speaker_error}
            <Alert color="red" class="mb-6">{update_speaker_error}</Alert>
        {/if}
        <div class="flex justify-center">
            <Button color="primary" type="submit">{selected_speaker?"Update":"Add"}</Button>
        </div>
    </form>
</Modal>

<Modal bind:open={remove_speaker_modal} title="Remove Speaker" size="sm">
    <form method="POST" action="?/remove_speaker" use:enhance={afterRemoveSpeaker}>
        <input type="hidden" name="id" value={selected_speaker?selected_speaker.id:''} />
        <p class="mb-6">Are you sure you want to remove the speaker?</p>
        {#if remove_speaker_error}
            <Alert color="red" class="mb-6">{remove_speaker_error}</Alert>
        {/if}
        <div class="flex justify-center gap-2">
            <Button color="red" type="submit">Remove</Button>
            <Button color="dark" type="button" onclick={() => remove_speaker_modal = false}>Cancel</Button>
        </div>
    </form>
</Modal>

<Modal id="send_email_modal" size="lg" title="Send Emails" bind:open={send_email_modal} outsideclose>
    <form method="post" action="?/send_emails" use:enhance={afterSuccessfulSendEmails}>
        <div class="mb-6">
            <Label for="to" class="block mb-2 text-black">To</Label>
            <Input id="to" name="to" type="text" value={selectedSpeakers.map(id => data.speakers.find(a => a.id === id).email).join("; ")} readonly />
        </div>
        <div class="mb-6">
            <Label for="subject" class="block mb-2">Subject</Label>
            <Input id="subject" name="subject" type="text" />
        </div>
        <div class="mb-6">
            <Label for="body" class="block mb-2">Message</Label>
            <Textarea id="body" name="body" rows="10" />
        </div>
        {#if message_send_email.type === 'error'}
            <Alert type="error" color="red" class="mb-6">{message_send_email.message}</Alert>
        {/if}
        <div class="flex justify-center gap-2">
            <Button color="primary" type="submit">Send Emails</Button>
        </div>
    </form>
</Modal>