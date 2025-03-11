<script>
    import { Label, Input, Select } from 'flowbite-svelte';
    export let data = {
        name: '',
        organizers: '',
        venue: '',
        start_date: '',
        end_date: '',
        deadline: '',
        capacity: 0,
        accepts_abstract: false,
        abstract_deadline: '',
        capacity_abstract: 0,
        max_votes: 2,
    };
</script>

<div class="mb-6">
    <Label for="name" class="block mb-2">Event Name*</Label>
    <Input type="text" id="name" name="name" value={data.name} />
</div>
<div class="mb-6">
    <Label for="link_info" class="block mb-2">Event Page URL*</Label>
    <Input type="text" id="link_info" name="link_info" value={data.link_info} />
</div>
<div class="mb-6">
    <Label for="organizers" class="block mb-2">Organizer*</Label>
    <Input type="text" id="organizers" name="organizers" value={data.organizers} />
</div>
<div class="mb-6">
    <Label for="venue" class="block mb-2">Venue*</Label>
    <Input type="text" id="venue" name="venue" value={data.venue} />
</div>
<div class="mb-6">
    <Label for="start_date" class="block mb-2">Dates*</Label>
    <div class="flex flex-col md:flex-row justify-stretch gap-4">
        <div class="w-full">
            <Input type="date" id="start_date" name="start_date" value={data.start_date} />
        </div>
        <div class="flex w-3 justify-center items-center">
            <span>-</span>
        </div>
        <div class="w-full">
            <Input type="date" id="end_date" name="end_date" value={data.end_date} />
        </div>
    </div>
</div>
<div class="mb-6">
    <Label for="registration_deadline" class="block mb-2">Registration Deadline</Label>
    <Input type="date" id="registration_deadline" name="registration_deadline" value={data.registration_deadline} />
    <span class="text-sm">* Registration is automatically disabled after this date.</span>
</div>
<div class="mb-6">
    <Label for="capacity" class="block mb-2">Registration Capacity (0 for unlimited)</Label>
    <Input type="number" id="capacity" name="capacity" value={data.capacity} />
    <span class="text-sm">* Registration is automatically disabled after this number is reached.</span>
</div>
<div class="mb-6">
    <Label for="accepts_abstract" class="block mb-2">Enable Abstract Submission?</Label>
    <Select id="accepts_abstract" name="accepts_abstract" bind:value={data.accepts_abstract} items={[
        { value: true, name: 'Yes' },
        { value: false, name: 'No' }
    ]} />
</div>
{#if data.accepts_abstract}
<div class="mb-6">
    <Label for="abstract_deadline" class="block mb-2">Abstract Submission Deadline</Label>
    <Input type="date" id="abstract_deadline" name="abstract_deadline" value={data.abstract_deadline} />
    <span class="text-sm">* Abstract submission is automatically disabled after this date.</span>
</div>

<div class="mb-6">
    <Label for="capacity_abstract" class="block mb-2">Abstract Submission Capacity (0 for unlimited)</Label>
    <Input type="number" id="capacity_abstract" name="capacity_abstract" value={data.capacity_abstract} />
    <span class="text-sm">* Abstract submission is automatically disabled after this number is reached.</span>
</div>

<div class="mb-6">
    <Label for="max_votes" class="block mb-2">Maximum Votes per Reviewer</Label>
    <Input type="number" id="max_votes" name="max_votes" value={data.max_votes} />
    <span class="text-sm">* Maximum number of abstracts a reviewer can vote.</span>
</div>
{/if}