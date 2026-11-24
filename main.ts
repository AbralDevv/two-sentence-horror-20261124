// Two-Sentence Horror — u-suroto-two-sentence-horror-acea9253
// A horror story in exactly two sentences. The program writes it to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "My grandmother's photo album holds one picture of me at seven, standing in a garden I have never visited. " +
  "I turned the page today and found the same photograph again, dated last Tuesday, with me standing a little closer to the camera.";

// Gate: the scorer requires UTF-8 text of 1 to 400 characters, not only whitespace.
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`story must be 1-400 characters, got ${STORY.length}`);
}
if (STORY.trim().length === 0) {
  throw new Error("story must not be only whitespace");
}

// Gate: exactly two sentences, each ending in a period, with no other
// sentence-ending punctuation and no line breaks anywhere in the text.
if (/[\n\r]/.test(STORY)) {
  throw new Error("story must not contain line breaks");
}
const terminals = STORY.match(/[.!?]/g) ?? [];
if (terminals.length !== 2 || terminals.some((t) => t !== ".")) {
  throw new Error(
    `story must end exactly two sentences with periods, got ${terminals.length} terminal marks`,
  );
}
const sentences = STORY.split(/(?<=\.)\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2 || !sentences.every((s) => s.endsWith("."))) {
  throw new Error(`story must be exactly two sentences, got ${sentences.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");
console.log(`wrote /output/entry.txt (${STORY.length} chars, ${sentences.length} sentences)`);
