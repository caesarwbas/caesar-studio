import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const allowed = new Set([".astro", ".css", ".js", ".mjs", ".ts", ".json"]);
const ignored = new Set(["node_modules", "dist", ".astro"]);
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (allowed.has(entry.name.slice(entry.name.lastIndexOf(".")))) files.push(path);
  }
}

await walk(root);
const failures = [];
for (const file of files) {
  const lines = (await readFile(file, "utf8")).split(/\r?\n/).length;
  if (lines > 200) failures.push(`${relative(root, file)}: ${lines}`);
}
if (failures.length) {
  console.error(`Files above 200 lines:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`${files.length} source files checked; all are 200 lines or fewer.`);
