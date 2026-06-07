import { useEffect, useMemo, useState } from "react";
import {
  AppWindow,
  Brain,
  Cable,
  Cloud,
  Code2,
  Globe2,
  LayoutPanelLeft,
  ListChecks,
  ShieldCheck,
  Zap
} from "lucide-react";
import { codexLessonDocs, codexLessonGroups } from "./codexLessons";
import { codexLessonDocsEn, codexLessonGroupsEn } from "./codexLessonsEn";

const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function routePath(path) {
  if (!basePath) return path;
  return `${basePath}${path}`;
}

function currentRoute() {
  const pathname = window.location.pathname;
  const normalize = (path) => (path.length > 1 ? path.replace(/\/$/, "") : path);
  if (basePath && pathname.startsWith(basePath)) {
    return normalize(pathname.slice(basePath.length) || "/");
  }
  return normalize(pathname);
}

const localeLabels = {
  zh: {
    metaTitle: "AI PickGold Codex · Codex 中文学习站",
    metaDescription:
      "AI PickGold Codex 中文学习站：60 篇 Codex 实战教程，覆盖 AGENTS.md、Skills、MCP、插件、权限、Hooks 与 GitHub 自动化工作流。",
    navItems: [
      { label: "Codex", path: "/codex" },
      { label: "排版工具", path: "https://wxmd.aipickgold.com", external: true }
    ],
    headerAction: "学习仓库",
    languageLabel: "语言",
    heroBadge: "AI PickGold Codex 学习站",
    heroTitleLead: "Codex",
    heroTitle: "从入门到精通",
    heroText:
      "面向中文开发者的 Codex 完整教程。以桌面端 App 为主线，覆盖 CLI、IDE、Web / Cloud、AGENTS.md、Skills、MCP、插件、权限、Hooks、GitHub 自动化和真实项目工作流。",
    startLearning: "开始学习",
    browseCatalog: "浏览目录",
    metrics: [
      ["60", "篇教程"],
      ["12", "部分"],
      ["App", "主线"],
      ["CLI / Web", "补充"]
    ],
    deckToday: "today",
    deckTitle: "把一个项目交给 Codex 前，先建立上下文和边界。",
    deckLines: ["扫描项目结构、命令和风险", "写入 AGENTS.md 与公开内容门禁", "交付功能、测试、review 和上线检查"],
    deckFooter: ["读上下文", "做小任务", "验收结果"],
    why: {
      label: "Why Codex",
      title: "为什么选 Codex",
      text: "OpenAI 出品的 coding agent，桌面端、CLI、IDE、Cloud 一套到底；教程站要讲到能上手。"
    },
    curriculum: {
      label: "Full curriculum",
      title: "60 篇 Codex 教学文档",
      text: "公开站点只展示教程内容。每篇都包含实战情景、可复制提示词、操作步骤和验收清单。"
    },
    learning: {
      label: "Learning path",
      title: "30 分钟上手路线",
      text: "完整教程有 60 篇，但新手可以先按这条最短路径跑通一个真实项目。"
    },
    community: {
      label: "Study together",
      title: "跟着我学 Codex",
      text: "课程更新、实战复盘和学习交流都会放在这三个入口里。"
    },
    repo: {
      label: "Repository radar",
      title: "公开来源雷达",
      text: "公开页面只展示官方事实源和 AI PickGold 自有教程仓库。",
      columns: ["Repository", "Use", "Signal"]
    },
    tutorialSidebar: "完整目录",
    backToCatalog: "返回目录",
    officialDocs: "官方文档"
  },
  en: {
    metaTitle: "AI PickGold Codex · Practical Codex Learning Hub",
    metaDescription:
      "AI PickGold Codex is a practical 60-lesson Codex learning hub covering AGENTS.md, Skills, MCP, plugins, permissions, Hooks, and GitHub automation.",
    navItems: [
      { label: "Codex", path: "/codex" },
      { label: "Formatting Tool", path: "https://wxmd.aipickgold.com", external: true }
    ],
    headerAction: "Course Repo",
    languageLabel: "Language",
    heroBadge: "AI PickGold Codex Learning Hub",
    heroTitleLead: "Codex",
    heroTitle: "from beginner to operator",
    heroText:
      "A practical Codex learning hub for developers and builders. Start with the desktop app, then learn CLI, IDE, Web / Cloud, AGENTS.md, Skills, MCP, plugins, permissions, Hooks, GitHub automation, and real project workflows.",
    startLearning: "Start learning",
    browseCatalog: "Browse catalog",
    metrics: [
      ["60", "lessons"],
      ["12", "parts"],
      ["App", "main track"],
      ["CLI / Web", "extras"]
    ],
    deckToday: "today",
    deckTitle: "Before handing a project to Codex, define context and boundaries.",
    deckLines: ["Scan structure, commands, and risk", "Write AGENTS.md and public-content rules", "Ship changes, tests, review, and release checks"],
    deckFooter: ["Read context", "Do small tasks", "Verify results"],
    why: {
      label: "Why Codex",
      title: "Why Learn Codex",
      text: "Codex is OpenAI's coding agent surface across desktop, CLI, IDE, and Cloud. This course focuses on usable workflows, not abstract concepts."
    },
    curriculum: {
      label: "Full curriculum",
      title: "60 Practical Codex Lessons",
      text: "Each lesson includes a scenario, a copy-ready prompt, operating steps, and an acceptance checklist."
    },
    learning: {
      label: "Learning path",
      title: "A 30-minute starter path",
      text: "There are 60 lessons in the full course, but this path gets a new user through one real project loop first."
    },
    community: {
      label: "Study together",
      title: "Learn Codex with me",
      text: "Follow the updates, practice notes, and learning discussions through these three entry points."
    },
    repo: {
      label: "Repository radar",
      title: "Public Source Radar",
      text: "The public page only displays official sources and the AI PickGold tutorial repository.",
      columns: ["Repository", "Use", "Signal"]
    },
    tutorialSidebar: "Full catalog",
    backToCatalog: "Back to catalog",
    officialDocs: "Official docs"
  }
};

const learningSteps = [
  {
    title: "安装与登录",
    time: "04 min",
    summary: "确认 App、CLI、IDE 三个入口，先跑通最小练习项目。",
    output: "第一条只读扫描命令"
  },
  {
    title: "项目上下文",
    time: "05 min",
    summary: "把仓库目标、目录、测试命令和边界写成 Codex 能读懂的上下文。",
    output: "项目接管清单"
  },
  {
    title: "AGENTS.md",
    time: "06 min",
    summary: "用仓库级指令固定风格、测试、权限和交付口径。",
    output: "可复制的 AGENTS.md 骨架"
  },
  {
    title: "真实任务",
    time: "06 min",
    summary: "让 Codex 完成读代码、做功能、修 Bug、补测试和审 PR。",
    output: "可 review 的 diff"
  },
  {
    title: "GitHub / CI",
    time: "05 min",
    summary: "把 PR、review、CI 修复和发布检查接进真实仓库。",
    output: "Issue 到 PR 模板"
  },
  {
    title: "安全与治理",
    time: "04 min",
    summary: "把密钥、账号、生产发布和高风险命令放进人工确认边界。",
    output: "上线前检查清单"
  }
];

const repoRadar = [
  {
    name: "soarsky1991/aipickgold-codex-tutorial",
    url: "https://github.com/soarsky1991/aipickgold-codex-tutorial",
    kind: "本站学习仓库",
    language: "中文",
    stars: "new",
    license: "Apache-2.0",
    updatedAt: "2026-06-07",
    reuseMode: "原创教程 + 公开课程索引",
    summary: "AI PickGold 的 Codex 中文学习仓库，包含 60 篇公开教学文档和课程地图。",
    learningUse: "作为 codex.aipickgold.com 的公开教程内容底座。"
  },
  {
    name: "openai/codex",
    url: "https://github.com/openai/codex",
    kind: "官方主仓",
    language: "English",
    stars: "89.1k",
    license: "Apache-2.0",
    updatedAt: "2026-06-07",
    reuseMode: "事实源 + 安装/配置结构",
    summary: "Codex CLI 官方仓库，覆盖安装、认证、配置、沙盒、AGENTS.md、Skills 和命令模式。",
    learningUse: "作为教程结论的第一事实源。"
  },
  {
    name: "openai/skills",
    url: "https://github.com/openai/skills",
    kind: "官方 Skills 目录",
    language: "English",
    stars: "21.5k",
    license: "未声明",
    updatedAt: "2026-06-07",
    reuseMode: "链接与概念引用",
    summary: "Codex Skills Catalog，说明 Skills 的目录结构、安装方式和分发思路。",
    learningUse: "给 Skills 与扩展能力课程做入口。"
  },
  {
    name: "openai/codex-action",
    url: "https://github.com/openai/codex-action",
    kind: "GitHub 自动化",
    language: "English",
    stars: "1.0k",
    license: "Apache-2.0",
    updatedAt: "2026-06-07",
    reuseMode: "CI/PR 章节参考",
    summary: "Codex Action 示例，适合把仓库检查、PR 辅助和沙盒保护接进 GitHub。",
    learningUse: "作为自动化章节和执行模板来源。"
  }
];

const codexFeatures = [
  {
    icon: AppWindow,
    symbol: "app.window",
    title: "桌面端主线",
    text: "用 Codex App 管多项目、多线程、本地预览、插件和云端任务。"
  },
  {
    icon: Brain,
    symbol: "brain",
    title: "真正执行",
    text: "不是只聊天，而是读文件、改代码、运行命令、给出可审查 diff。"
  },
  {
    icon: Cable,
    symbol: "cable.connector",
    title: "MCP 与插件",
    text: "把浏览器、GitHub、文档和内部工具按权限接进工作流。"
  },
  {
    icon: Zap,
    symbol: "bolt",
    title: "Skills 固化",
    text: "把重复工作流做成 Skill，让教程不止能看，还能被 Codex 调用。"
  },
  {
    icon: ShieldCheck,
    symbol: "checkmark.shield",
    title: "权限可控",
    text: "用 Sandbox、Approval、Rules、Hooks 和人工确认守住风险边界。"
  },
  {
    icon: Cloud,
    symbol: "icloud",
    title: "可自动化",
    text: "用 codex exec、GitHub Action、SDK 和云端任务做长期流程。"
  }
];

const communityCards = [
  {
    title: "小红书",
    label: "宸的 AI 复盘室",
    image: "/community/xiaohongshu-qr.jpg",
    imageClass: "square",
    alt: "宸的 AI 复盘室小红书二维码",
    text: "关注小红书，查看 Codex 学习笔记、实战复盘和工具使用记录。"
  },
  {
    title: "智辰个人微信",
    label: "添加好友",
    image: "/community/wechat-zhichen-qr-square.jpg",
    imageClass: "square",
    alt: "智辰个人微信二维码",
    text: "添加智辰微信，交流 Codex 学习路径、项目实践和自动化工作流。"
  },
  {
    title: "Codex 学习群",
    label: "扫码入群",
    image: "/community/codex-learning-group-qr.jpg",
    imageClass: "square",
    alt: "Codex 学习群二维码",
    text: "加入 Codex 学习群，跟着课程节奏完成练习、提问和复盘。"
  }
];

const englishLearningSteps = [
  {
    title: "Install and sign in",
    time: "04 min",
    summary: "Confirm the App, CLI, and IDE entry points, then run a tiny practice project.",
    output: "First read-only scan command"
  },
  {
    title: "Project context",
    time: "05 min",
    summary: "Write repository goals, directories, test commands, and boundaries in a way Codex can use.",
    output: "Project takeover checklist"
  },
  {
    title: "AGENTS.md",
    time: "06 min",
    summary: "Use repository instructions to lock style, tests, permissions, and delivery format.",
    output: "Copy-ready AGENTS.md skeleton"
  },
  {
    title: "Real tasks",
    time: "06 min",
    summary: "Let Codex read code, build features, fix bugs, add tests, and review pull requests.",
    output: "Reviewable diff"
  },
  {
    title: "GitHub / CI",
    time: "05 min",
    summary: "Connect issues, PR review, CI fixes, and release checks to a real repository.",
    output: "Issue-to-PR template"
  },
  {
    title: "Safety and governance",
    time: "04 min",
    summary: "Keep secrets, accounts, production releases, and high-risk commands behind approval.",
    output: "Pre-release checklist"
  }
];

const englishFeatures = [
  {
    icon: AppWindow,
    symbol: "app.window",
    title: "Desktop-first",
    text: "Use the Codex App to manage projects, threads, local previews, plugins, and cloud tasks."
  },
  {
    icon: Brain,
    symbol: "brain",
    title: "Real execution",
    text: "Codex reads files, edits code, runs commands, and returns reviewable diffs."
  },
  {
    icon: Cable,
    symbol: "cable.connector",
    title: "MCP and plugins",
    text: "Connect browsers, GitHub, Linear, Figma, docs, and internal tools with permission boundaries."
  },
  {
    icon: Zap,
    symbol: "bolt",
    title: "Skills",
    text: "Turn repeatable workflows into reusable skills that Codex can call later."
  },
  {
    icon: ShieldCheck,
    symbol: "checkmark.shield",
    title: "Controlled permissions",
    text: "Use sandboxing, approval, rules, hooks, and human checkpoints to control risk."
  },
  {
    icon: Cloud,
    symbol: "icloud",
    title: "Automation-ready",
    text: "Use codex exec, GitHub Actions, SDK boundaries, and cloud tasks for repeatable workflows."
  }
];

const englishRepoRadar = [
  {
    name: "soarsky1991/aipickgold-codex-tutorial",
    url: "https://github.com/soarsky1991/aipickgold-codex-tutorial",
    kind: "AI PickGold course repo",
    language: "Chinese / English",
    stars: "new",
    license: "Apache-2.0",
    updatedAt: "2026-06-07",
    reuseMode: "Original course index",
    summary: "The public AI PickGold Codex tutorial repository with a 60-lesson course map.",
    learningUse: "Used as the content base for codex.aipickgold.com."
  },
  {
    name: "openai/codex",
    url: "https://github.com/openai/codex",
    kind: "Official repository",
    language: "English",
    stars: "89.1k",
    license: "Apache-2.0",
    updatedAt: "2026-06-07",
    reuseMode: "Primary source",
    summary: "The official Codex repository for installation, authentication, configuration, sandboxing, AGENTS.md, Skills, and CLI behavior.",
    learningUse: "Used as the first source for factual claims."
  },
  {
    name: "openai/skills",
    url: "https://github.com/openai/skills",
    kind: "Official Skills catalog",
    language: "English",
    stars: "21.5k",
    license: "Not declared",
    updatedAt: "2026-06-07",
    reuseMode: "Concept and link reference",
    summary: "The Codex Skills catalog explains skill structure, installation, and distribution.",
    learningUse: "Used as the entry point for Skills lessons."
  },
  {
    name: "openai/codex-action",
    url: "https://github.com/openai/codex-action",
    kind: "GitHub automation",
    language: "English",
    stars: "1.0k",
    license: "Apache-2.0",
    updatedAt: "2026-06-07",
    reuseMode: "CI / PR reference",
    summary: "Codex Action examples for repository checks, PR assistance, and sandbox-aware automation.",
    learningUse: "Used for automation lessons and execution templates."
  }
];

const englishCommunityCards = [
  {
    title: "Xiaohongshu",
    label: "AI review notes",
    image: "/community/xiaohongshu-qr.jpg",
    imageClass: "square",
    alt: "AI PickGold Xiaohongshu QR code",
    text: "Follow short Codex notes, practice recaps, and AI workflow updates."
  },
  {
    title: "Zhichen WeChat",
    label: "Add WeChat",
    image: "/community/wechat-zhichen-qr-square.jpg",
    imageClass: "square",
    alt: "Zhichen WeChat QR code",
    text: "Add Zhichen on WeChat to discuss Codex learning paths and project workflows."
  },
  {
    title: "Codex Study Group",
    label: "Join the group",
    image: "/community/codex-learning-group-qr.jpg",
    imageClass: "square",
    alt: "Codex study group QR code",
    text: "Join the Codex study group for practice, questions, and review."
  }
];

const localeOptions = [
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" }
];

function normalizeLocale(value) {
  return value === "en" ? "en" : "zh";
}

function getLocaleFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang === "en" || lang === "zh" ? lang : null;
}

function guessLocaleFromBrowser() {
  const language = `${navigator.language || ""} ${(navigator.languages || []).join(" ")}`.toLowerCase();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (language.includes("zh") || timezone === "Asia/Shanghai" || timezone === "Asia/Chongqing" || timezone === "Asia/Urumqi") {
    return "zh";
  }
  return "en";
}

function localeFromCountry(countryCode) {
  return String(countryCode || "").toUpperCase() === "CN" ? "zh" : "en";
}

async function fetchJsonWithTimeout(url, timeout = 1200) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

async function detectLocaleByIp() {
  const localGeo = await fetchJsonWithTimeout("/api/geo", 900);
  if (localGeo?.country || localGeo?.country_code) {
    return localeFromCountry(localGeo.country || localGeo.country_code);
  }

  const remoteGeo = await fetchJsonWithTimeout("https://ipapi.co/json/", 1400);
  if (remoteGeo?.country || remoteGeo?.country_code) {
    return localeFromCountry(remoteGeo.country || remoteGeo.country_code);
  }

  return null;
}

function useLocale() {
  const [locale, setLocaleState] = useState(() => {
    const fromUrl = getLocaleFromUrl();
    if (fromUrl) return fromUrl;
    const savedManual = localStorage.getItem("aipickgold.locale.manual");
    if (savedManual) return normalizeLocale(savedManual);
    return guessLocaleFromBrowser();
  });

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  useEffect(() => {
    const fromUrl = getLocaleFromUrl();
    if (fromUrl) {
      localStorage.setItem("aipickgold.locale.manual", fromUrl);
      return;
    }
    if (localStorage.getItem("aipickgold.locale.manual")) return;

    let active = true;
    detectLocaleByIp().then((detected) => {
      if (active && detected) setLocaleState(detected);
    });

    return () => {
      active = false;
    };
  }, []);

  const setLocale = (nextLocale) => {
    const normalized = normalizeLocale(nextLocale);
    localStorage.setItem("aipickgold.locale.manual", normalized);
    setLocaleState(normalized);
  };

  return [locale, setLocale];
}

function buildParts(groups, locale) {
  return groups.map((group, groupIndex) => ({
    number: locale === "en" ? `Part ${groupIndex + 1}` : `第 ${groupIndex + 1} 部分`,
    title: group.group,
    slug: `${String(group.lessons[0].number).padStart(2, "0")}-${group.lessons[0].slug}`,
    focus: locale === "en" ? `${group.lessons.length} lessons` : `${group.lessons.length} 篇教程`,
    lessons: group.lessons.map((lesson) => lesson.title)
  }));
}

function getLocalizedContent(locale) {
  const isEnglish = locale === "en";
  const groups = isEnglish ? codexLessonGroupsEn : codexLessonGroups;
  return {
    copy: localeLabels[locale],
    groups,
    docs: isEnglish ? codexLessonDocsEn : codexLessonDocs,
    learningSteps: isEnglish ? englishLearningSteps : learningSteps,
    repoRadar: isEnglish ? englishRepoRadar : repoRadar,
    features: isEnglish ? englishFeatures : codexFeatures,
    communityCards: isEnglish ? englishCommunityCards : communityCards,
    tutorialParts: buildParts(groups, locale)
  };
}

export default function App() {
  const route = currentRoute();
  const [locale, setLocale] = useLocale();
  const content = useMemo(() => getLocalizedContent(locale), [locale]);

  useEffect(() => {
    document.title = content.copy.metaTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", content.copy.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", content.copy.metaTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", content.copy.metaDescription);
  }, [content]);

  if (route.startsWith("/tutorial")) {
    return <CodexTutorialDetail content={content} locale={locale} setLocale={setLocale} />;
  }

  return <CodexLearningHome content={content} locale={locale} setLocale={setLocale} />;
}

function CodexLearningHome({ content, locale, setLocale }) {
  const { copy, features, tutorialParts, learningSteps: steps, repoRadar: repos, communityCards: cards } = content;

  return (
    <div className="codex-shell">
      <CodexHeader copy={copy} locale={locale} setLocale={setLocale} />
      <main className="codex-home" aria-label="Codex learning portal">
        <section className="codex-hero" aria-labelledby="codex-hero-title">
          <div className="codex-hero-copy">
            <div className="codex-hero-badge">
              <span />
              {copy.heroBadge}
            </div>
            <h1 id="codex-hero-title">
              <span>{copy.heroTitleLead}</span>
              {copy.heroTitle}
            </h1>
            <p>{copy.heroText}</p>
            <div className="codex-actions">
              <a className="primary-action" href={routePath("/tutorial/01-codex-intro.html")}>
                <ListChecks size={16} />
                {copy.startLearning}
              </a>
              <a className="secondary-link" href="#parts">
                <LayoutPanelLeft size={16} />
                {copy.browseCatalog}
              </a>
            </div>
            <div className="codex-hero-stats">
              {copy.metrics.map(([value, label]) => (
                <CodexMetric value={value} label={label} key={`${value}-${label}`} />
              ))}
            </div>
          </div>

          <div className="codex-hero-board" aria-label="Codex source board">
            <div className="command-deck">
              <div className="deck-topbar">
                <span />
                <span />
                <span />
                <strong>AI PickGold Command Deck</strong>
              </div>
              <div className="deck-body">
                <div className="deck-route">
                  <span>{copy.deckToday}</span>
                  <strong>{copy.deckTitle}</strong>
                </div>
                <div className="deck-line">
                  <span>01</span>
                  <p>{copy.deckLines[0]}</p>
                  <em>Read-only</em>
                </div>
                <div className="deck-line">
                  <span>02</span>
                  <p>{copy.deckLines[1]}</p>
                  <em>Context</em>
                </div>
                <div className="deck-line active">
                  <span>03</span>
                  <p>{copy.deckLines[2]}</p>
                  <em>Ship</em>
                </div>
              </div>
            </div>
            <div className="deck-footer">
              {copy.deckFooter.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="codex-section codex-features">
          <SectionIntro
            label={copy.why.label}
            title={copy.why.title}
            text={copy.why.text}
          />
          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="codex-feature-card" key={feature.title}>
                  <span className="sf-symbol" aria-label={feature.symbol} title={feature.symbol}>
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <h2>{feature.title}</h2>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="codex-section tutorial-parts" id="parts">
          <SectionIntro
            label={copy.curriculum.label}
            title={copy.curriculum.title}
            text={copy.curriculum.text}
          />
          <div className="parts-grid">
            {tutorialParts.map((part) => (
              <a className="part-card" href={routePath(`/tutorial/${part.slug}.html`)} key={part.title}>
                <span>{part.number}</span>
                <h2>{part.title}</h2>
                <p>{part.focus}</p>
                <ul>
                  {part.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>

        <section className="codex-section learning-path" id="learning-path">
          <SectionIntro
            label={copy.learning.label}
            title={copy.learning.title}
            text={copy.learning.text}
          />
          <div className="path-grid">
            {steps.map((step, index) => (
              <article className="path-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.summary}</p>
                  <strong>{step.output}</strong>
                </div>
                <em>{step.time}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="codex-section community-section" id="learn-with-me">
          <SectionIntro
            label={copy.community.label}
            title={copy.community.title}
            text={copy.community.text}
          />
          <div className="community-grid">
            {cards.map((card) => (
              <article className="community-card" key={card.title}>
                <div className={`community-image ${card.imageClass}`}>
                  <img src={routePath(card.image)} alt={card.alt} loading="lazy" />
                </div>
                <div className="community-copy">
                  <span>{card.label}</span>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="codex-section repo-radar" aria-labelledby="repo-radar-title">
          <SectionIntro
            label={copy.repo.label}
            title={copy.repo.title}
            text={copy.repo.text}
            id="repo-radar-title"
          />
          <div className="repo-table" role="table" aria-label="Codex repository radar">
            <div className="repo-table-head" role="row">
              {copy.repo.columns.map((column) => (
                <span key={column}>{column}</span>
              ))}
            </div>
            {repos.map((repo) => (
              <article className="repo-row" role="row" key={repo.name}>
                <div>
                  <a href={repo.url}>{repo.name}</a>
                  <p>{repo.summary}</p>
                </div>
                <div>
                  <span>{repo.kind}</span>
                  <strong>{repo.reuseMode}</strong>
                  <p>{repo.learningUse}</p>
                </div>
                <div className="repo-signal">
                  <span>{repo.language}</span>
                  <span>{repo.stars} stars</span>
                  <span>{repo.license}</span>
                  <span>{repo.updatedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CodexHeader({ copy, locale, setLocale, current = "Codex" }) {
  return (
    <header className="codex-header">
      <a className="codex-brand" href={routePath("/codex")}>
        <span>
          <Code2 size={22} strokeWidth={2} aria-hidden="true" />
        </span>
        <strong>AI PickGold</strong>
      </a>
      <nav className="codex-nav" aria-label="Codex tutorial navigation">
        {copy.navItems.map((item) => (
          <a
            className={item.label === current ? "active" : ""}
            href={item.external ? item.path : routePath(item.path)}
            key={item.label}
            rel={item.external ? "noreferrer" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="codex-header-tools">
        <div className="language-switch" aria-label={copy.languageLabel}>
          {localeOptions.map((option) => (
            <button
              className={option.code === locale ? "active" : ""}
              type="button"
              onClick={() => setLocale(option.code)}
              key={option.code}
            >
              {option.label}
            </button>
          ))}
        </div>
        <a className="codex-header-action" href="https://github.com/soarsky1991/aipickgold-codex-tutorial" target="_blank" rel="noreferrer">
          {copy.headerAction}
        </a>
      </div>
    </header>
  );
}

function CodexTutorialDetail({ content, locale, setLocale }) {
  const { copy, docs, tutorialParts } = content;
  const slug = currentRoute().split("/").pop()?.replace(".html", "") || "01-codex-intro";
  const doc = docs.find((item) => item.slug === slug) || docs[0];

  return (
    <div className="codex-shell">
      <CodexHeader copy={copy} locale={locale} setLocale={setLocale} />
      <main className="tutorial-layout" aria-label="Codex tutorial detail">
        <aside className="tutorial-sidebar" aria-label="Tutorial sections">
          <strong>{copy.tutorialSidebar}</strong>
          <nav>
            {tutorialParts.map((part) => (
              <a
                className={part.slug === doc.slug ? "active" : ""}
                href={routePath(`/tutorial/${part.slug}.html`)}
                key={part.title}
              >
                <span>{part.number}</span>
                {part.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="tutorial-article">
          <section className="tutorial-doc-hero">
            <div>
              <span>{doc.kicker}</span>
              <h1>{doc.title}</h1>
              <p>{doc.summary}</p>
              <div className="codex-actions">
                <a className="primary-action" href={routePath("/codex")}>
                  <LayoutPanelLeft size={16} />
                  {copy.backToCatalog}
                </a>
                <a className="secondary-link" href="https://developers.openai.com/codex" target="_blank" rel="noreferrer">
                  <Globe2 size={16} />
                  {copy.officialDocs}
                </a>
              </div>
            </div>
            <div className="tutorial-map" aria-label="Codex workflow map">
              <div className="map-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="map-body">
                <div className="map-rail">
                  <span className="active" />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="map-content">
                  <div className="thread-chip-row">
                    <span>Local</span>
                    <span>Worktree</span>
                    <span>Cloud</span>
                  </div>
                  <div className="map-line" />
                  <div className="map-line short" />
                  <div className="diff-preview">
                    {doc.map.map((item) => (
                      <p key={item}><strong>+</strong> {item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {doc.sections.map((section) => (
            <TutorialSection section={section} key={section.title} />
          ))}
        </article>
      </main>
    </div>
  );
}

function TutorialSection({ section }) {
  return (
    <section className="tutorial-doc-section">
      <h2>{section.title}</h2>
      {section.cards ? (
        <div className="tutorial-info-grid">
          {section.cards.map(([title, text]) => (
            <InfoCard title={title} text={text} key={title} />
          ))}
        </div>
      ) : null}
      {section.list ? (
        <ol>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : null}
      {section.code ? <pre>{section.code}</pre> : null}
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="tutorial-info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function CodexMetric({ value, label }) {
  return (
    <div className="codex-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionIntro({ label, title, text, id }) {
  return (
    <div className="codex-section-intro">
      <span>{label}</span>
      <h2 id={id}>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
