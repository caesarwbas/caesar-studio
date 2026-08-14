import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const pages = [];

async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) await walk(full);
    else if (item.name.endsWith(".html")) pages.push(full);
  }
}

await walk(root);
const errors = [];
for (const page of pages) {
  const html = await readFile(page, "utf8");
  const relative = path.relative(root, page);
  const checks = {
    title: /<title>[^<]{10,}<\/title>/.test(html),
    description: /<meta name="description" content="[^"]{40,}"/.test(html),
    canonical: /<link rel="canonical" href="https:\/\/caesarstudio\.com\//.test(html),
    heading: /<h1[\s>]/.test(html),
    schema: /application\/ld\+json/.test(html),
    language: /<html lang="(ar|en)"/.test(html),
  };
  for (const [name, passed] of Object.entries(checks)) if (!passed) errors.push(`${relative}: ${name}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`${pages.length} generated pages passed the SEO output audit.`);
