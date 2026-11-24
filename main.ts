import fs from "node:fs";
import path from "node:path";

const line = `In twelve years as a 911 dispatcher, nothing shook me until my six-year-old son whispered our address and sobbed that someone in my bathrobe was scratching at his closet door. I begged him not to breathe while I dispatched every unit in the district, just as the closet hinges creaked open on the line and my own voice cooed, "Hang up the phone, sweetheart, Mommy's right here."`;

function resolveOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"].filter(Boolean) as string[];
  for (const dir of candidates) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return dir;
    } catch {
      // try the next candidate
    }
  }
  throw new Error("no writable output dir");
}

const outDir = resolveOutDir();
fs.writeFileSync(path.join(outDir, "entry.txt"), line, "utf8");
