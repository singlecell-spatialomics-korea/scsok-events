<script>
    import { Heading, TableSearch, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Checkbox, Card} from 'flowbite-svelte';
    import { Button, Modal, Label, Input, Select, Textarea, Alert } from 'flowbite-svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';

    import { UserEditSolid, UserRemoveSolid, DownloadSolid, EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';

    import { enhance } from '$app/forms';
    import { error } from '@sveltejs/kit';

    let { data } = $props();

    let searchTermReviewer = $state('');
    let filteredReviewers = $state([]);
    let selectedReviewers = $state([]);
    $effect(() => {
        filteredReviewers = data.reviewers.filter((item) => item.name.toLowerCase().includes(searchTermReviewer.toLowerCase()))
    });

    let reviewer_modal = $state(false);
    let delete_reviewer_modal = $state(false);
    let selected_reviewer = $state(null);
    
    const addReviewerModal = () => {
        selected_reviewer = null;
        reviewer_modal = true;
    };
    const deleteReviewerModal = (id) => {
        selected_reviewer = data.reviewers.find((item) => item.id === id);
        delete_reviewer_modal = true;
    };

    let add_reviwer_error = $state('');
    const afterAddReviewer = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({ reset: false });
                reviewer_modal = false;
                add_reviwer_error = '';
            } else {
                add_reviwer_error = result.error.message;
            }
        }
    };

    let delete_reviewer_error = $state('');
    const afterDeleteReviewer = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({ reset: false });
                delete_reviewer_modal = false;
                delete_reviewer_error = '';
            } else {
                delete_reviewer_error = result.error.message;
            }
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

    let abstract_modal = $state(false);
    let abstract_delete_modal = $state(false);
    let selected_abstract = $state(null);
    let update_abstract_error = $state('');
    const showAbstractEditModal = async (id) => {
        // fetch full abstract details
        const body = new FormData();
        body.append('id', id);
        const response = await fetch(`?/get_abstract`, {
            method: 'POST',
            body
        });
        if (response.ok) {
            const result = await response.json();
            selected_abstract = JSON.parse(JSON.parse(result.data)[0]);
            abstract_modal = true;
        } else {
            update_abstract_error = 'Failed to fetch abstract details.';
        }
    };
    const showAbstractDeleteModal = (id) => {
        selected_abstract = data.abstracts.find((item) => item.id === id);
        abstract_delete_modal = true;
    };
    const afterUpdateAbstract = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({ reset: false });
                abstract_modal = false;
                update_abstract_error = '';
            } else {
                update_abstract_error = result.error.message;
            }
        }
    };

    let delete_abstract_error = $state('');
    const afterDeleteAbstract = () => {
        return async ({ result, action, update }) => {
            if (result.type === "success") {
                await update({ reset: false });
                abstract_delete_modal = false;
                delete_abstract_error = '';
            } else {
                delete_abstract_error = result.error.message;
            }
        }
    };
</script>

<Heading tag="h2" customSize="text-xl font-bold" class="mb-3">Abstracts</Heading>
<p class="font-light mb-6">Manage reviewers and submitted abstracts.</p>

<Heading tag="h3" customSize="text-lg font-bold" class="mb-3">Abstract Reviewers</Heading>
<div class="flex justify-end gap-2">
    <Button color="primary" size="sm" disabled={selectedReviewers.length === 0} onclick={showSendEmailModal}>Send Email to Selected Reviewers</Button>
    <Button color="primary" size="sm" onclick={addReviewerModal}>Add Reviewer</Button>
</div>
<TableSearch placeholder="Search by First Name" hoverable={true} bind:inputValue={searchTermReviewer}>
    <TableHead>
        <TableHeadCell class="w-1"><Checkbox 
            checked={selectedReviewers.length > 0 && selectedReviewers.length === data.reviewers.length}
            intermediate={
                selectedReviewers.length > 0 && (selectedReviewers.length < data.reviewers.length)
            }
            onclick={(e) => {
                if (e.target.checked) {
                    selectedReviewers = filteredReviewers.map(a => a.id);
                } else {
                    selectedReviewers = [];
                }
            }}
        /></TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Email</TableHeadCell>
        <TableHeadCell>Institute</TableHeadCell>
        <TableHeadCell class="w-1">Actions</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each filteredReviewers as row}
            <TableBodyRow>
                <TableBodyCell><Checkbox checked={selectedReviewers.includes(row.id)} onclick={(e) => {
                    if (e.target.checked) {
                        selectedReviewers = [...selectedReviewers, row.id];
                    } else {
                        selectedReviewers = selectedReviewers.filter(a => a !== row.id);
                    }
                }} /></TableBodyCell>
                <TableBodyCell>{row.name}</TableBodyCell>
                <TableBodyCell>{row.user.email}</TableBodyCell>
                <TableBodyCell>{row.institute}</TableBodyCell>
                <TableBodyCell>
                    <div class="flex justify-center gap-2">
                        <Button color="none" size="none" onclick={() => deleteReviewerModal(row.id)}>
                            <UserRemoveSolid class="w-5 h-5" />
                        </Button>
                    </div>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
        {#if filteredReviewers.length === 0}
            <TableBodyRow>
                <TableBodyCell colspan="5" class="text-center">No records</TableBodyCell>
            </TableBodyRow>
        {/if}
    </TableBody>
</TableSearch>

<Heading tag="h3" customSize="text-lg font-bold" class="mt-12 mb-3">Abstracts</Heading>
<TableSearch placeholder="Search by Title" hoverable={true}>
    <TableHead>
        <TableHeadCell>Title</TableHeadCell>
        <TableHeadCell>Presenter</TableHeadCell>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Accepted</TableHeadCell>
        <TableHeadCell>Votes</TableHeadCell>
        <TableHeadCell class="w-1">Actions</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each data.abstracts as row}
            <TableBodyRow>
                <TableBodyCell>{(row.title.length > 10)?row.title.slice(0, 10)+'...':row.title}</TableBodyCell>
                <TableBodyCell>{row.attendee.name}</TableBodyCell>
                <TableBodyCell>{row.is_oral?"Oral":"Poster"}</TableBodyCell>
                <TableBodyCell>{row.is_accepted}</TableBodyCell>
                <TableBodyCell>{row.votes}</TableBodyCell>
                <TableBodyCell>
                    <div class="flex justify-center gap-2">
                        <Button color="none" size="none" href={row.link}>
                            <DownloadSolid class="w-5 h-5" />
                        </Button>
                        <Button color="none" size="none" onclick={() => showAbstractEditModal(row.id)}>
                            <EditSolid class="w-5 h-5" />
                        </Button>
                        <Button color="none" size="none" onclick={() => showAbstractDeleteModal(row.id)}>
                            <TrashBinSolid class="w-5 h-5" />
                        </Button>
                    </div>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
        {#if data.abstracts.length === 0}
            <TableBodyRow>
                <TableBodyCell colspan="5" class="text-center">No records</TableBodyCell>
            </TableBodyRow>
        {/if}
    </TableBody>
</TableSearch>

<Modal bind:open={reviewer_modal} title="Add Reviewer" size="lg">
    <form method="POST" action="?/add_reviewer" use:enhance={afterAddReviewer}>
        <div class="mb-6">
            <Label for="id" class="block mb-2">Reviewer</Label>
            <Select id="id" name="id" items={
                data.attendees.map(a => ({ value: a.id, name: a.name + ", " + a.institute }))
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
        {#if add_reviwer_error}
            <Alert color="red" class="mb-6">{add_reviwer_error}</Alert>
        {/if}
        <div class="flex justify-center">
            <Button color="primary" type="submit">Add</Button>
        </div>
    </form>
</Modal>

<Modal bind:open={delete_reviewer_modal} title="Remove Reviewer" size="sm">
    <form method="POST" action="?/delete_reviewer" use:enhance={afterDeleteReviewer}>
        <input type="hidden" name="id" value={selected_reviewer?selected_reviewer.id:''} />
        <p class="mb-6">Are you sure you want to remove the reviewer?</p>
        {#if delete_reviewer_error}
            <Alert color="red" class="mb-6">{delete_reviewer_error}</Alert>
        {/if}
        <div class="flex justify-center gap-2">
            <Button color="red" type="submit">Remove</Button>
            <Button color="dark" type="button" onclick={() => delete_reviewer_modal = false}>Cancel</Button>
        </div>
    </form>
</Modal>

<Modal id="send_email_modal" size="lg" title="Send Emails" bind:open={send_email_modal} outsideclose>
    <form method="post" action="?/send_emails" use:enhance={afterSuccessfulSendEmails}>
        <div class="mb-6">
            <Label for="to" class="block mb-2 text-black">To</Label>
            <Input id="to" name="to" type="text" value={selectedReviewers.map(id => data.reviewers.find(a => a.id === id).user.email).join("; ")} readonly />
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

<Modal id="abstract_modal" size="lg" title="Abstract Details" bind:open={abstract_modal} outsideclose>
    <form method="post" action="?/update_abstract" use:enhance={afterUpdateAbstract}>
        <input type="hidden" name="id" value={selected_abstract?selected_abstract.id:''} />
        <div class="flex flex-row justify-stretch gap-6 mb-6">
            <div class="w-full">
                <Label for="votes" class="block mb-2">Votes</Label>
                <Input id="votes" type="number" value={selected_abstract?selected_abstract.votes:''} readonly />
            </div>
            <div class="w-full">
                <Label for="type" class="block mb-2">Type</Label>
                <Select id="type" name="type" items={[
                    { value: 'oral', name: 'Oral' },
                    { value: 'poster', name: 'Poster' }
                ]} value={selected_abstract?selected_abstract.is_oral?'oral':'poster':''} />
            </div>
            <div class="w-full">
                <Label for="is_accepted" class="block mb-2">Accepted</Label>
                <Select id="is_accepted" name="is_accepted" items={[
                    { value: 'true', name: 'Yes' },
                    { value: 'false', name: 'No' }
                ]} value={selected_abstract?selected_abstract.is_accepted?'true':'false':''} />
            </div>
        </div>
        <div class="mb-6">
            <Label for="presenter" class="block mb-2">Presenter</Label>
            <Input id="presenter" type="text" value={selected_abstract?selected_abstract.attendee.name:''} readonly />
        </div>
        <div class="mb-6">
            <Label for="title" class="block mb-2">Title</Label>
            <Input id="title" name="title" type="text" value={selected_abstract?selected_abstract.title:''} />
        </div>
        <div class="mb-6">
            <Label for="abstract" class="block mb-2">Abstract Preview</Label>
            <Card size="none">
                {@html selected_abstract?selected_abstract.body:''}
            </Card>
        </div>
        {#if update_abstract_error}
            <Alert color="red" class="mb-6">{update_abstract_error}</Alert>
        {/if}
        <div class="flex justify-center gap-2">
            <Button color="primary" type="submit">Update</Button>
        </div>
    </form>
</Modal>

<Modal id="abstract_delete_modal" size="sm" title="Remove Abstract" bind:open={abstract_delete_modal} outsideclose>
    <form method="post" action="?/delete_abstract" use:enhance={afterDeleteAbstract}>
        <input type="hidden" name="id" value={selected_abstract?selected_abstract.id:''} />
        <p class="mb-6">Are you sure you want to remove the abstract?</p>
        {#if delete_abstract_error}
            <Alert color="red" class="mb-6">{delete_abstract_error}</Alert>
        {/if}
        <div class="flex justify-center gap-2">
            <Button color="red" type="submit">Remove</Button>
            <Button color="dark" type="button" onclick={() => abstract_delete_modal = false}>Cancel</Button>
        </div>
    </form>
</Modal>