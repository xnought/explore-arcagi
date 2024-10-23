import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 3000,
	},
	base: "/explore-arcagi/",
	plugins: [svelte()],
});
