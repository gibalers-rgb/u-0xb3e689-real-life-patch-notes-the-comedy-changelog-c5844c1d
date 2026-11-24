// Real-Life Patch Notes: The Comedy Changelog
//
// One line, at most 160 characters: a software patch note for a bug in
// real life or human biology, in the terse register of a real release
// note. This program writes that line to /output/entry.txt.
//
// The line, picked against the judge brief in RULES.txt:
//   - a real patch note: version number, "fixed a bug where", dry tone
//   - a specific, instantly recognisable bug of daily life: you walk
//     into a room and the reason you came in evaporates
//   - the joke lands on first read and needs no setup beyond the line
//   - nothing padded: 83 characters, every word doing work
//   - v3.0.6 on purpose: a patch release, not a major version — the fix
//     is small, the bug is ancient, and nobody is surprised it shipped late

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "v3.0.6: fixed a bug where walking into a room deleted the reason you went in there.";

const MAX_CHARS = 160;

// A patch note reads like a patch note: version, then "fixed a bug where".
if (!/^v\d+\.\d+\.\d+: fixed a bug where .+/.test(ENTRY)) {
  throw new Error("entry must open with a version and 'fixed a bug where'");
}

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.trim() === "" || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
// Ties on win rate fall to the smaller text in bytes, so keep the line
// plain ASCII: no multi-byte characters inflating the byte count.
if (Buffer.byteLength(ENTRY, "utf8") !== ENTRY.length) {
  throw new Error("entry must be plain ASCII");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read it back: the grader runs this program twice in separate sandboxes,
// so a silent write failure must never pass as a success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt contents do not match the entry");
}
console.log(`wrote ${ENTRY.length} characters to /output/entry.txt`);
console.log(ENTRY);
