import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { codexLessonDocs } from "../src/codexLessons.js";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const index = join(dist, "index.html");
const indexHtml = readFileSync(index, "utf8");
const founderHtml = indexHtml
  .replace(/<title>.*?<\/title>/, "<title>智辰老师 · AI PickGold</title>")
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    '<meta name="description" content="智辰老师的 AI PickGold 个人主页：Codex 学习、AI 实战工作流、内容生产和长期复盘。" />'
  )
  .replace(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://myself.aipickgold.com/" />')
  .replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="智辰老师 · AI PickGold" />')
  .replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    '<meta property="og:description" content="智辰老师的 AI PickGold 个人主页：Codex 学习、AI 实战工作流、内容生产和长期复盘。" />'
  )
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://myself.aipickgold.com/" />');

copyFileSync(index, join(dist, "404.html"));
mkdirSync(join(dist, "codex"), { recursive: true });
mkdirSync(join(dist, "founder"), { recursive: true });
mkdirSync(join(dist, "tutorial"), { recursive: true });
copyFileSync(index, join(dist, "codex", "index.html"));
writeFileSync(join(dist, "founder", "index.html"), founderHtml);

for (const lesson of codexLessonDocs) {
  copyFileSync(index, join(dist, "tutorial", `${lesson.slug}.html`));
}
