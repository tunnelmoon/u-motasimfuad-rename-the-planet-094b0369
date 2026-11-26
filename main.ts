import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Saturn is now The Influencer: a ring light it never turns off, a hundred moons in the comments, and it still thinks the spotlight is about the planet.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back check: what landed on disk must be exactly the validated line.
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt does not match the validated line");
}
