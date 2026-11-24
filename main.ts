// Two-Sentence Horror — entry point.
// Writes the final two-sentence horror line verbatim to entry.txt
// inside the grader's output directory. Never writes under the repo,
// and never touches the grader's /output directory itself beyond the file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = `In twelve years as a 911 dispatcher, nothing shook me until my six-year-old son whispered our address and sobbed that someone in my bathrobe was scratching at his closet door. I begged him not to breathe while I dispatched every unit in the district, just as the closet hinges creaked open on the line and my own voice cooed, "Hang up the phone, sweetheart, Mommy's right here."`;

// Grader sets $MAKEFUN_OUTPUT_DIR; fall back to /output, then ./output.
// mkdir -p each candidate in order and use the first one that works.
function resolveOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"];
  for (const dir of candidates) {
    if (!dir) continue;
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // Not writable — try the next candidate.
    }
  }
  throw new Error("no writable output directory found");
}

const outDir = resolveOutDir();
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${LINE.length} chars) to ${outDir}`);
