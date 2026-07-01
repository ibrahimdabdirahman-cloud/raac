// Assemble www/ for Capacitor from the flat static site.
// Clean URLs (/app, /driver) become directories so Capacitor's local server
// resolves them the same way Vercel's cleanUrls does.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

const pages = [
  ["index.html", "index.html"],
  ["app.html", "app/index.html"],
  ["driver.html", "driver/index.html"],
];

for (const [src, dest] of pages) {
  let html = readFileSync(join(root, src), "utf8");
  // No service worker inside the native shell — the app IS installed.
  html = html.replace(/if \("serviceWorker" in navigator && location\.protocol === "https:"\)/g, "if (false)");
  const out = join(www, dest);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

cpSync(join(root, "assets"), join(www, "assets"), { recursive: true });
cpSync(join(root, "manifest.webmanifest"), join(www, "manifest.webmanifest"));
console.log("www/ assembled");
