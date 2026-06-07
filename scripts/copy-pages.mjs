import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { codexLessonDocs } from "../src/codexLessons.js";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const index = join(dist, "index.html");

copyFileSync(index, join(dist, "404.html"));
mkdirSync(join(dist, "codex"), { recursive: true });
mkdirSync(join(dist, "tutorial"), { recursive: true });
copyFileSync(index, join(dist, "codex", "index.html"));

for (const lesson of codexLessonDocs) {
  copyFileSync(index, join(dist, "tutorial", `${lesson.slug}.html`));
}
