<script>
	import "../app.css";
	let { children, data } = $props();
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		A,
	} from "flowbite-svelte";
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownDivider,
	} from "flowbite-svelte";
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterBrand,
		FooterIcon,
	} from "flowbite-svelte";
	import { Button } from "flowbite-svelte";
	import {
		FacebookSolid,
		LinkedinSolid,
		XSolid,
		YoutubeSolid,
		ChevronDownOutline,
	} from "flowbite-svelte-icons";
</script>

<Navbar>
	<NavBrand href="/" class="sm:ml-6">
		<img src="/logo.webp" class="me-3 h-16 sm:h-20" alt="Logo" />
	</NavBrand>
	<Button>Browse Events<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
	<Dropdown color="dark">
		{#each data.events as event}
			<DropdownItem href="/event/{event.id}" data-sveltekit-reload>{event.name}</DropdownItem>
		{/each}
	</Dropdown>
</Navbar>

{@render children()}

<Footer footerType="socialmedia" class="container mx-auto mt-5">
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0">
			<a href="/">
				<img
					src="/logo.webp"
					class="h-16 sm:h-20"
					alt="Logo"
				/>
			</a>
		</div>
	</div>
	<hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
	<div class="text-sm text-center">
		<h6>Powered by IEUM.</h6>
	</div>
</Footer>
