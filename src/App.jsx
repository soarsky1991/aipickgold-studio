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

const navItems = [
  { label: "Codex", path: "/codex" },
  { label: "排版工具", path: "https://wxmd.aipickgold.com", external: true }
];

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

const publicTutorialParts = codexLessonGroups.map((group, groupIndex) => ({
  number: `第 ${groupIndex + 1} 部分`,
  title: group.group,
  slug: `${String(group.lessons[0].number).padStart(2, "0")}-${group.lessons[0].slug}`,
  focus: `${group.lessons.length} 篇教程`,
  lessons: group.lessons.map((lesson) => lesson.title)
}));

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

export default function App() {
  const route = currentRoute();

  if (route.startsWith("/tutorial")) {
    return <CodexTutorialDetail />;
  }

  return <CodexLearningHome />;
}

function CodexLearningHome() {
  return (
    <div className="codex-shell">
      <CodexHeader />
      <main className="codex-home" aria-label="Codex learning portal">
        <section className="codex-hero" aria-labelledby="codex-hero-title">
          <div className="codex-hero-copy">
            <div className="codex-hero-badge">
              <span />
              AI PickGold Codex 学习站
            </div>
            <h1 id="codex-hero-title">
              <span>Codex</span>
              从入门到精通
            </h1>
            <p>
              面向中文开发者的 Codex 完整教程。以桌面端 App 为主线，覆盖 CLI、IDE、Web / Cloud、
              AGENTS.md、Skills、MCP、插件、权限、Hooks、GitHub 自动化和真实项目工作流。
            </p>
            <div className="codex-actions">
              <a className="primary-action" href={routePath("/tutorial/01-codex-intro.html")}>
                <ListChecks size={16} />
                开始学习
              </a>
              <a className="secondary-link" href="#parts">
                <LayoutPanelLeft size={16} />
                浏览目录
              </a>
            </div>
            <div className="codex-hero-stats">
              <CodexMetric value="60" label="篇教程" />
              <CodexMetric value="12" label="部分" />
              <CodexMetric value="App" label="主线" />
              <CodexMetric value="CLI / Web" label="补充" />
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
                  <span>today</span>
                  <strong>把一个项目交给 Codex 前，先建立上下文和边界。</strong>
                </div>
                <div className="deck-line">
                  <span>01</span>
                  <p>扫描项目结构、命令和风险</p>
                  <em>Read-only</em>
                </div>
                <div className="deck-line">
                  <span>02</span>
                  <p>写入 AGENTS.md 与公开内容门禁</p>
                  <em>Context</em>
                </div>
                <div className="deck-line active">
                  <span>03</span>
                  <p>交付功能、测试、review 和上线检查</p>
                  <em>Ship</em>
                </div>
              </div>
            </div>
            <div className="deck-footer">
              <span>读上下文</span>
              <span>做小任务</span>
              <span>验收结果</span>
            </div>
          </div>
        </section>

        <section className="codex-section codex-features">
          <SectionIntro
            label="Why Codex"
            title="为什么选 Codex"
            text="OpenAI 出品的 coding agent，桌面端、CLI、IDE、Cloud 一套到底；教程站要讲到能上手。"
          />
          <div className="feature-grid">
            {codexFeatures.map((feature) => {
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
            label="Full curriculum"
            title="60 篇 Codex 教学文档"
            text="公开站点只展示教程内容。每篇都包含实战情景、可复制提示词、操作步骤和验收清单。"
          />
          <div className="parts-grid">
            {publicTutorialParts.map((part) => (
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
            label="Learning path"
            title="30 分钟上手路线"
            text="完整教程有 60 篇，但新手可以先按这条最短路径跑通一个真实项目。"
          />
          <div className="path-grid">
            {learningSteps.map((step, index) => (
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
            label="Study together"
            title="跟着我学 Codex"
            text="课程更新、实战复盘和学习交流都会放在这三个入口里。"
          />
          <div className="community-grid">
            {communityCards.map((card) => (
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
            label="Repository radar"
            title="公开来源雷达"
            text="公开页面只展示官方事实源和 AI PickGold 自有教程仓库。"
            id="repo-radar-title"
          />
          <div className="repo-table" role="table" aria-label="Codex repository radar">
            <div className="repo-table-head" role="row">
              <span>Repository</span>
              <span>Use</span>
              <span>Signal</span>
            </div>
            {repoRadar.map((repo) => (
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

function CodexHeader({ current = "Codex" }) {
  return (
    <header className="codex-header">
      <a className="codex-brand" href={routePath("/codex")}>
        <span>
          <Code2 size={22} strokeWidth={2} aria-hidden="true" />
        </span>
        <strong>AI PickGold</strong>
      </a>
      <nav className="codex-nav" aria-label="Codex tutorial navigation">
        {navItems.map((item) => (
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
      <a className="codex-header-action" href="https://github.com/soarsky1991/aipickgold-codex-tutorial" target="_blank" rel="noreferrer">
        学习仓库
      </a>
    </header>
  );
}

function CodexTutorialDetail() {
  const slug = currentRoute().split("/").pop()?.replace(".html", "") || "01-codex-intro";
  const doc = codexLessonDocs.find((item) => item.slug === slug) || codexLessonDocs[0];

  return (
    <div className="codex-shell">
      <CodexHeader />
      <main className="tutorial-layout" aria-label="Codex tutorial detail">
        <aside className="tutorial-sidebar" aria-label="Tutorial sections">
          <strong>完整目录</strong>
          <nav>
            {publicTutorialParts.map((part) => (
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
                  返回目录
                </a>
                <a className="secondary-link" href="https://developers.openai.com/codex" target="_blank" rel="noreferrer">
                  <Globe2 size={16} />
                  官方文档
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
