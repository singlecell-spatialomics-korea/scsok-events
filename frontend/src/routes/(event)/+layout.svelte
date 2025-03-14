<script>
    let { children, data } = $props();
    let event = data.event;

    import { A } from 'flowbite-svelte';
</script>

<div class="relative flex justify-center items-center overflow-hidden h-[300px] sm:h-[400px] md:h-[340px]">
    <div class="absolute flex w-full h-full bg-darken">
        <img alt="..." src="/kobra-bg.png" class="absolute block !w-full h-full object-cover z-0">
    </div>
    <div class="relative container px-7">
        <a href={event.link_info}>
            <h5 class="text-xl sm:text-3xl mb-2 font-bold text-white">{event.name}</h5><br>    
            <p class="font-bold text-white text-sm sm:text-lg">Organizer: {event.organizers}</p>
            <p class="font-bold text-white text-sm sm:text-lg">Venue: {event.venue}</p>
            <p class="font-bold text-white text-sm sm:text-lg">Dates: {event.start_date} - {event.end_date}</p>
        </a>
    </div>
</div>

<div class="container mx-auto my-10 px-3 sm:px-7">
    {@render children()}
</div>