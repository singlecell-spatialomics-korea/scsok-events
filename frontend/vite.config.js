import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const ALLOWED_HOST = process.env.ALLOWED_HOST || 'localhost'

export default defineConfig({
	server: {
		allowedHosts: [ALLOWED_HOST, ],
	},
	plugins: [sveltekit()]
});
