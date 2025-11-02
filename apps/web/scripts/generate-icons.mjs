// Generate PNG + ICO from public/logo.svg using sharp
import fs from "node:fs";
import path from "node:path";

async function ensureSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    console.warn("[icons] sharp not installed; skipping icon generation");
    process.exit(0);
  }
}

const sharp = await ensureSharp();

const root = process.cwd();
const src = path.join(root, "public", "logo.svg");
if (!fs.existsSync(src)) {
  console.error("[icons] Missing public/logo.svg");
  process.exit(1);
}

const out = path.join(root, "public");
const sizes = [16, 32, 180, 192, 512];

await Promise.all(
  sizes.map(async (size) => {
    const file =
      size === 180
        ? path.join(out, "apple-touch-icon.png")
        : size === 192
        ? path.join(out, "android-chrome-192x192.png")
        : size === 512
        ? path.join(out, "android-chrome-512x512.png")
        : path.join(out, `favicon-${size}x${size}.png`);

    await sharp(src)
      .resize(size, size, { fit: "cover" })
      .png()
      .toFile(file);

    console.log(`[icons] wrote ${path.basename(file)}`);
  })
);

// ICO (16 + 32)
try {
  const ico = path.join(out, "favicon.ico");
  const buf16 = await sharp(src).resize(16, 16).png().toBuffer();
  const buf32 = await sharp(src).resize(32, 32).png().toBuffer();
  const toIco = (await import("png-to-ico")).default;
  const icoBuf = await toIco([buf16, buf32]);
  fs.writeFileSync(ico, icoBuf);
  console.log("[icons] wrote favicon.ico");
} catch (e) {
  console.warn("[icons] ico generation skipped (png-to-ico not available):", e?.message || e);
}

console.log("[icons] done");
