// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Change this to the real domain when the site goes live (used for SEO links)
  site: "https://www.mercyfamilyclinic.com",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
