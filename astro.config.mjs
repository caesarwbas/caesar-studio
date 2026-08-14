import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://caesarstudio.com",
  base: process.env.BASE_URL || "/",
  output: "static",
  integrations: [sitemap()],
  build: { inlineStylesheets: "auto" },
  compressHTML: true,
  vite: { build: { cssMinify: "lightningcss" } },
});
