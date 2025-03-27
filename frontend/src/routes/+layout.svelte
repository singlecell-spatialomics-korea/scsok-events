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
		<img src="/scsok-logo.png" class="me-3 h-10 sm:h-14" alt="SCSOK Logo" />
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
	<hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0">
			<a href="https://scsok.io/">
				<img
					src="/scsok-logo.png"
					class="h-10 sm:h-14"
					alt="SCSOK Logo"
				/>
			</a>
		</div>
		<div class="flex !mt-3 space-x-2 rtl:space-x-reverse sm:justify-center sm:mt-0">
			<a href="https://github.com/singlecell-spatialomics-korea" target="_blank" alt="GitHub" type="button" class="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 pr-1"><span class="absolute -inset-1.5"></span> <svg class="h-6 w-6" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#ccc"></path></svg></a>
			<a href="https://zulip.scsok.io" target="_blank" alt="Zulip" type="button" class="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"><span class="absolute -inset-1.5"></span> <svg class="h-6 w-6" fill="none" viewBox="0 0 256 256" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><g><path d="M128,0 C198.692448,0 256,57.307552 256,128 C256,198.692448 198.692448,256 128,256 C57.307552,256 0,198.692448 0,128 C0,57.307552 57.307552,0 128,0 Z M121.679533,118.222163 L75.7877336,159.200897 C71.0603547,162.920702 67.9584879,169.060511 67.9584879,175.967416 C67.9584879,187.245548 76.232162,196.475047 86.3444303,196.475047 L172.590938,196.475047 C182.703207,196.475047 190.976881,187.245548 190.976881,175.967416 C190.976881,164.68624 182.703207,155.459784 172.590938,155.459784 L107.299534,155.459784 C106.331533,155.459784 105.719683,154.300009 106.191507,153.356359 L123.024994,119.652857 C123.639888,118.669635 122.531861,117.491595 121.679533,118.222163 Z M172.590938,59.3627915 L86.3444303,59.3627915 C76.232162,59.3627915 67.9584879,68.58925 67.9584879,79.870426 C67.9584879,91.1485579 76.232162,100.378058 86.3444303,100.378058 L86.3444303,100.378058 L151.635834,100.378058 C152.603836,100.378058 153.215686,101.537833 152.743861,102.481482 L152.743861,102.481482 L135.910374,136.184985 C135.29548,137.168207 136.403507,138.346246 137.255836,137.615679 L137.255836,137.615679 L183.147635,96.6308563 C187.875014,92.9080074 190.976881,86.7712425 190.976881,79.8643379 C190.976881,68.586206 182.703207,59.3567064 172.590938,59.3627915 L172.590938,59.3627915 Z" fill="#ccc"></path></g></svg></a>
		</div>
	</div>
	<div class="text-sm mt-5">
		<h6 class="text-gray-400">Single Cell and Spatial Omics Korea (SCSOK) 2025. All rights reserved.</h6>
	</div>
</Footer>