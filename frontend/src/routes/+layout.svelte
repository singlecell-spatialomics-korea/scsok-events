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
		<img src="/kobra-logo.png" class="me-3 h-16 sm:h-20" alt="KOBRA Logo" />
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
			<a href="https://kobra.kr/">
				<img
					src="/kobra-logo.png"
					class="h-16 sm:h-20"
					alt="KOBRA Logo"
				/>
			</a>
		</div>
		<div
			class="flex !mt-3 space-x-6 rtl:space-x-reverse sm:justify-center sm:mt-0"
		>
			<FooterIcon href="https://www.facebook.com/KOBRA.newsletter">
				<FacebookSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon href="https://x.com/KOBRAlink">
				<XSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon href="https://www.linkedin.com/company/kobra.link">
				<LinkedinSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon href="https://www.youtube.com/@KOBRA-link">
				<YoutubeSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
		</div>
	</div>
	<div class="flex mt-7 text-sm">
		<div>
			<FooterLinkGroup>
				<FooterLink
					liClass="mb-4"
					href="https://kobra.kr/PRIVACY%20POLICY"
					>Privacy Policy</FooterLink
				>
			</FooterLinkGroup>
		</div>
		<div class="ml-6">
			<FooterLinkGroup>
				<FooterLink liClass="mb-4" href="https://kobra.kr/TERMS-OF-USE"
					>Terms & Conditions</FooterLink
				>
			</FooterLinkGroup>
		</div>
	</div>
	<hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
	<div class="text-sm">
		<h6>KOREA BIO RESEARCH ASSOCIATION</h6>
		<h6>
			ADDRESS : 501 Hongjae Building, Ajou University, 206 World Cup-ro,
			Yeongtong-gu, Suwon, Republic of Korea
		</h6>
		<h6>TEL: 82-31-219-7871 EMAIL: <a href="mailto:admin@kobra.kr">admin@kobra.kr</a></h6>
	</div>
</Footer>
