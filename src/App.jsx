import { useMemo, useState } from "react";
import JSZip from "jszip";
import {
  AlertTriangle,
  Archive,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Code2,
  Copy,
  Download,
  FileJson,
  FileText,
  Globe2,
  Image,
  KeyRound,
  LayoutPanelLeft,
  ListChecks,
  MessageSquareText,
  Monitor,
  PackageCheck,
  PenLine,
  PlaySquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  X
} from "lucide-react";

const initialMarkdown = `# 如何用一篇内容打造多平台影响力

> 一份 Markdown 草稿，多平台分发手册。

## 核心思路
- 先做「一个足够好的原稿」
- 基于平台特性，进行「结构化改写」
- 人工审核后，手动发布
- 持续复盘迭代

## 适合谁
- 知识创作者
- AI 工作流搭建者
- 独立内容运营者

## 平台差异一览
| 平台 | 目标 | 结构 | 重点 |
| --- | --- | --- | --- |
| 微信公众号 | 深度阅读 | 总-分-总 | 观点 + 证据 |
| 小红书 | 快速种草 | 痛点-方案-步骤 | 视觉 + 情绪 |
| X | 传播讨论 | 观点传播 | 线程 + 金句 |
| 视频脚本 | 观看完播 | 钩子-展开-收尾 | 节奏 + 口播 |

## 行动清单
- 明确 1 个核心观点
- 提炼 3 个支撑证据
- 提供 1 个可执行步骤
- 形成多平台变体并人工审核
- 打包导出，手动发布`;

const founderOfferMarkdown = `# 把 AI 工作流做成可交付产品

> 个人 IP 不只展示能力，还要把能力包装成可购买的服务。

## 核心主张
- AI 工作流不是一堆提示词，而是一套可复用系统
- 每个输出都应该有审查清单和交付边界
- 免费样板建立信任，高级版承接 API、私有化和团队流程

## 适合谁
- 想把个人能力产品化的创作者
- 正在搭建 AI 工具或内容工作台的小团队
- 需要把交付流程从临时手工变成稳定系统的业务负责人

## 服务路径
| 服务 | 目标 | 交付 |
| --- | --- | --- |
| 工作流体检 | 找出流程断点 | 流程图 + 风险边界 + 改造清单 |
| 工作台搭建 | 做出可用工具 | 草稿入口 + 平台输出 + 导出包 |
| API 落地 | 支持高级集成 | 服务端调用 + 密钥隔离 + 人工门禁 |

## 下一步
- 选择一个真实内容流程
- 明确要服务的用户和商业目标
- 做出第一版可展示工作台
- 用真实发布包验证价值`;

const apiCaseMarkdown = `# md2wechat 高级接口怎么接进内容工作台

> API 不是直接自动发布，而是把草稿生成能力放进安全边界里。

## 业务目标
- 让创作者从 Markdown 快速生成公众号草稿
- 保持密钥、AppSecret 和 API Key 在服务端
- 保留人工审查和手动发布门禁

## 当前接口信号
| 能力 | 价值 | 风险边界 |
| --- | --- | --- |
| article-draft | Markdown 转公众号草稿 | 需要白名单和密钥隔离 |
| theme/fontSize | 样式标准化 | 不应该覆盖人工排版判断 |
| coverImageUrl | 封面同步 | 需要图片版权和平台合规检查 |

## 产品化建议
- 前端只展示 API 状态和审查结果
- 后端保存密钥并控制调用频率
- 每次调用生成 package manifest
- 发布动作保持人工确认`;

const starterDrafts = [
  {
    id: "creator",
    title: "创作者内容包",
    promise: "一篇草稿改成多平台发布包。",
    fileName: "multi_platform_playbook.md",
    markdown: initialMarkdown
  },
  {
    id: "founder",
    title: "个人 IP offer",
    promise: "把能力包装成可购买服务。",
    fileName: "founder_offer_system.md",
    markdown: founderOfferMarkdown
  },
  {
    id: "api",
    title: "高级 API 案例",
    promise: "把 md2wechat 接入安全边界。",
    fileName: "md2wechat_api_case.md",
    markdown: apiCaseMarkdown
  }
];

const platformTabs = [
  { id: "wechat", label: "WeChat", icon: MessageSquareText },
  { id: "xiaohongshu", label: "Xiaohongshu", icon: Image },
  { id: "x", label: "X", icon: X },
  { id: "video", label: "Video Script", icon: PlaySquare },
  { id: "package", label: "Package", icon: Archive }
];

const navItems = [
  { label: "Codex Lab", path: "/codex" },
  { label: "Studio Desk", path: "/studio" },
  { label: "Founder IP", path: "/founder" },
  { label: "WxMD", path: "/wxmd" },
  { label: "CardMD", path: "/cardmd" },
  { label: "Skills", path: "/skills" },
  { label: "API", path: "/api" }
];

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

const md2wechatSignals = [
  "Credentialed draft APIs stay behind server-side gates.",
  "WeChat draft creation requires AppId, App Secret, API key, and IP whitelist.",
  "V1 Studio exports a manual package before direct account actions."
];

const learningSteps = [
  {
    title: "安装与登录",
    time: "04 min",
    summary: "确认 CLI、Desktop、IDE 三个入口，先跑通最小项目。",
    output: "一条可复用的本机启动命令"
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
    title: "Skills",
    time: "06 min",
    summary: "把重复工作沉淀成可安装、可审查、可迁移的 Skill。",
    output: "第一个本地 Skill"
  },
  {
    title: "GitHub / CI",
    time: "05 min",
    summary: "把 PR、review、CI 修复和发布检查接进真实仓库。",
    output: "自动化任务模板"
  },
  {
    title: "桌面与移动工作流",
    time: "04 min",
    summary: "区分 Codex Web、CLI、Desktop、手机查看和人工确认边界。",
    output: "个人操作台路线图"
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
    reuseMode: "原创改写 + 来源标注",
    summary: "AI PickGold 自己的 Codex 中文学习仓库，沉淀教程、来源雷达、站点路线图和执行清单。",
    learningUse: "作为 codex.aipickgold.com 的公开内容底座和长期更新入口。"
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
    learningUse: "作为所有教程结论的第一事实源。"
  },
  {
    name: "leigegehaha/codex-chinese-tutorial",
    url: "https://github.com/leigegehaha/codex-chinese-tutorial",
    kind: "中文教程",
    language: "中文",
    stars: "18",
    license: "Apache-2.0",
    updatedAt: "2026-06-04",
    reuseMode: "中文结构种子，重写文案",
    summary: "面向新手的 Codex 中文教程，覆盖 CLI、桌面端、Skills、插件和自动化工作流。",
    learningUse: "抽取中文学习路径和章节顺序，改写为 AI PickGold 实战清单。"
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
    learningUse: "给 Skill Center 和自定义 Skill 课程做入口。"
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
  },
  {
    name: "ComposioHQ/awesome-codex-skills",
    url: "https://github.com/ComposioHQ/awesome-codex-skills",
    kind: "生态目录",
    language: "English",
    stars: "13.1k",
    license: "未声明",
    updatedAt: "2026-06-07",
    reuseMode: "仅作目录参考",
    summary: "社区 Codex Skills 资源目录，适合观察热门 Skill 分类与生态词汇。",
    learningUse: "只做选题雷达，不直接复制代码或文案。"
  }
];

const practicePacks = [
  {
    title: "Codex 新手包",
    audience: "第一次打开 Codex 的中文用户",
    deliverable: "安装命令、登录检查、首个修复任务、常见报错清单",
    source: "openai/codex + 中文教程改写"
  },
  {
    title: "项目接管包",
    audience: "要让 Codex 理解老项目的人",
    deliverable: "仓库扫描、AGENTS.md、测试命令、风险边界、交付模板",
    source: "官方 AGENTS.md 文档 + AI PickGold 工作台经验"
  },
  {
    title: "GitHub 自动化包",
    audience: "想把 PR、CI、review 交给 Codex 辅助的人",
    deliverable: "Action 示例、PR 检查口径、失败日志分流、人工合并门禁",
    source: "openai/codex-action"
  },
  {
    title: "AI PickGold 内容生产包",
    audience: "用 Codex 写教程、做卡片、发公众号的创作者",
    deliverable: "Markdown 主稿、XHS 卡片、X 线程、视频脚本、手动发布包",
    source: "Studio Desk + WxMD/CardMD"
  }
];

const viralBreakdown = [
  { label: "TL;DR", text: "把长教程压缩成一个可执行路线，而不是只做阅读摘要。" },
  { label: "目录", text: "基础设置、连接构建、自动化、实战包四段式推进。" },
  { label: "热度指标", text: "保留曝光、收藏、转发这类判断维度，但用作选题优先级。" },
  { label: "二次创作", text: "每篇爆款都转成清单、仓库链接、练习任务和发布包。" }
];

const tutorialParts = [
  {
    number: "第 1 部分",
    title: "基础入门",
    focus: "Codex 是什么、使用形态、工具对比、第一条任务",
    lessons: ["Codex 是什么", "四种入口", "适合与不适合", "账号认证"]
  },
  {
    number: "第 2 部分",
    title: "桌面端入门",
    focus: "Codex App、Local / Worktree / Cloud、多线程与命令菜单",
    lessons: ["安装登录", "界面总览", "多线程并行", "快捷命令"]
  },
  {
    number: "第 3 部分",
    title: "工程工作流",
    focus: "Git diff、Worktree、本地 Web 预览、Chrome 与 Computer Use",
    lessons: ["分支与 PR", "隔离开发", "浏览器预览", "桌面操作"]
  },
  {
    number: "第 4 部分",
    title: "CLI 与终端",
    focus: "安装、Flags、Slash Commands、会话管理、codex exec",
    lessons: ["CLI 安装", "基础命令", "全局参数", "自动化执行"]
  },
  {
    number: "第 5 部分",
    title: "IDE 与 Cloud",
    focus: "IDE 扩展、Codex Web、云端任务和 GitHub 集成",
    lessons: ["IDE 工作流", "Cloud 入门", "云端任务", "Issue 到 PR"]
  },
  {
    number: "第 6 部分",
    title: "核心概念",
    focus: "Agent Loop、Thread Context、Sandbox、Approval、模型推理",
    lessons: ["执行循环", "上下文", "权限边界", "推理强度"]
  },
  {
    number: "第 7 部分",
    title: "配置与定制",
    focus: "config.toml、Permissions Profile、Rules、Hooks",
    lessons: ["配置文件", "权限档案", "命令规则", "生命周期脚本"]
  },
  {
    number: "第 8 部分",
    title: "扩展能力",
    focus: "AGENTS.md、Skills、MCP、插件中文速查",
    lessons: ["AGENTS.md", "Skills", "MCP", "插件管理"]
  },
  {
    number: "第 9 部分",
    title: "实战工作流",
    focus: "读代码、做功能、修 Bug、补测试、代码审查、前端 UI",
    lessons: ["接管代码库", "实现功能", "修复回归", "前端 QA"]
  },
  {
    number: "第 10 部分",
    title: "集成与自动化",
    focus: "Slack / Linear、CI/CD、GitHub Action、SDK 与 App Server",
    lessons: ["Linear 集成", "CI 自动化", "SDK", "内部平台"]
  },
  {
    number: "第 11 部分",
    title: "安全与治理",
    focus: "个人安全清单、企业治理、权限和审计边界",
    lessons: ["密钥边界", "审批策略", "团队规则", "上线检查"]
  },
  {
    number: "第 12 部分",
    title: "速查与附录",
    focus: "CLI 速查、Slash 速查、FAQ、术语表",
    lessons: ["CLI 速查", "Slash 命令", "FAQ", "术语表"]
  }
];

const codexFeatures = [
  {
    icon: "🖥️",
    title: "桌面端主线",
    text: "用 Codex App 管多项目、多线程、本地预览、插件和云端任务。"
  },
  {
    icon: "🧠",
    title: "真正执行",
    text: "不是只聊天，而是读文件、改代码、运行命令、给出可审查 diff。"
  },
  {
    icon: "🔌",
    title: "MCP 与插件",
    text: "把浏览器、GitHub、Linear、Figma、文档和内部工具接进工作流。"
  },
  {
    icon: "⚡",
    title: "Skills 固化",
    text: "把重复工作流做成 Skill，让教程不止能看，还能被 Codex 调用。"
  },
  {
    icon: "🛡️",
    title: "权限可控",
    text: "用 Sandbox、Approval、Rules、Hooks 和人工确认守住风险边界。"
  },
  {
    icon: "☁️",
    title: "可自动化",
    text: "用 codex exec、GitHub Action、SDK 和云端任务做长期流程。"
  }
];

function getTitle(markdown) {
  const heading = markdown
    .split("\n")
    .find((line) => line.trim().startsWith("# "));
  return heading ? heading.replace(/^#\s+/, "").trim() : "Untitled source";
}

function getSummary(markdown) {
  const quote = markdown
    .split("\n")
    .find((line) => line.trim().startsWith(">"));
  if (quote) return quote.replace(/^>\s?/, "").trim();
  return "One Markdown, multi-platform publish package.";
}

function getWordCount(markdown) {
  const latin = markdown.match(/[A-Za-z0-9_]+/g) ?? [];
  const cjk = markdown.match(/[\u4e00-\u9fa5]/g) ?? [];
  return latin.length + cjk.length;
}

function makeOutputs(markdown, checklist) {
  const title = getTitle(markdown);
  const summary = getSummary(markdown);
  const hasRiskTodo = checklist.some((item) => item.severity === "warning" && !item.done);

  return {
    wechat: {
      status: hasRiskTodo ? "needs_review" : "ready_for_review",
      title,
      subtitle: summary,
      html: `<section><h1>${title}</h1><p>${summary}</p><p>Studio package keeps final publishing under human control.</p></section>`,
      word_count: getWordCount(markdown)
    },
    xiaohongshu: {
      status: "ready_for_review",
      card_count: 7,
      cover_title: title.slice(0, 24),
      caption: `${summary}\n\n#AI工作流 #内容运营 #知识创作`,
      cards: [
        "封面: 一篇内容，多平台影响力",
        "痛点: 草稿不是发布包",
        "方法: 先做主稿，再做平台改写",
        "清单: 标题、封面、CTA、风险词",
        "案例: 公众号 + 小红书 + X + 视频",
        "复盘: 数据和评论回收",
        "CTA: 保存这套发布流程"
      ]
    },
    x: {
      status: "draft",
      post: `${title}\n\n${summary}\n\nThe useful unit is not a post. It is a reviewed publish package.`,
      thread: [
        "1/ Start from one source idea, not four blank editors.",
        "2/ Rewrite by platform: depth for WeChat, cards for Xiaohongshu, hooks for X, rhythm for video.",
        "3/ Keep final publishing manual. Review first, export second, publish last."
      ]
    },
    video: {
      status: "draft",
      hook: "别再把同一篇草稿复制到每个平台了。",
      script: [
        "开场: 一篇好草稿还不是一个发布包。",
        "展开: 每个平台需要不同结构、封面、CTA 和风险检查。",
        "演示: Studio 把 Markdown 拆成公众号、小红书、X 和视频脚本。",
        "收尾: 最后一步仍然是人工审核和手动发布。"
      ].join("\n"),
      shot_list: ["桌面编辑器", "平台 tab 切换", "审核清单", "导出 ZIP 包"]
    }
  };
}

function createChecklist() {
  return [
    {
      id: "accuracy",
      label: "Content accuracy",
      note: "Facts, data, examples",
      done: true,
      severity: "ok"
    },
    {
      id: "platform",
      label: "Platform fit",
      note: "Title, rhythm, format",
      done: true,
      severity: "ok"
    },
    {
      id: "risk",
      label: "Sensitive/risk terms",
      note: "One phrase needs review",
      done: false,
      severity: "warning"
    },
    {
      id: "visuals",
      label: "Cover and layout",
      note: "Images and card copy",
      done: false,
      severity: "neutral"
    },
    {
      id: "cta",
      label: "CTA and attribution",
      note: "Follow, collect, share",
      done: false,
      severity: "neutral"
    },
    {
      id: "human",
      label: "Final human review",
      note: "manual publish required",
      done: false,
      severity: "warning"
    }
  ];
}

function makeManifest(markdown, outputs, checklist) {
  const blockedReasons = checklist
    .filter((item) => item.severity === "warning" && !item.done)
    .map((item) => item.label);

  return {
    package_id: "pkg_20260604_studio_001",
    source_title: getTitle(markdown),
    source_markdown: markdown,
    audience: "AI creators and knowledge operators",
    platforms: outputs,
    review: {
      ai_disclosure_required: true,
      platform_risk: blockedReasons.length ? "medium" : "low",
      blocked_reasons: blockedReasons,
      manual_publish_required: true
    },
    assets: [],
    created_at: "2026-06-04T10:30:00+08:00"
  };
}

function statusLabel(status) {
  return status.replaceAll("_", " ");
}

function App() {
  const route = currentRoute();

  if (route === "/" || route === "/codex") {
    return <CodexLearningHome />;
  }

  if (route.startsWith("/tutorial")) {
    return <CodexTutorialDetail />;
  }

  if (route === "/founder" || route === "/about") {
    return <FounderPage />;
  }

  return <StudioApp />;
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
              AGENTS.md、Skills、MCP、插件、权限、Hooks、GitHub 自动化和 AI PickGold 内容发布包。
            </p>
            <div className="codex-actions">
              <a className="primary-action" href={routePath("/tutorial/1-codex-intro.html")}>
                <ListChecks size={16} />
                开始学习
              </a>
              <a className="secondary-link" href="#parts">
                <LayoutPanelLeft size={16} />
                浏览目录
              </a>
            </div>
            <div className="codex-hero-stats">
              <CodexMetric value="60" label="小节" />
              <CodexMetric value="12" label="大部分" />
              <CodexMetric value="App" label="主线" />
              <CodexMetric value="CLI / Web" label="补充" />
            </div>
          </div>

          <div className="codex-hero-board" aria-label="Codex source board">
            <div className="board-title">
              <span>source standard</span>
              <strong>公开来源校验，改写成 AI PickGold 版本</strong>
            </div>
            <div className="source-stack">
              {repoRadar.slice(0, 3).map((repo) => (
                <a className="source-row" href={repo.url} key={repo.name}>
                  <span>{repo.kind}</span>
                  <strong>{repo.name}</strong>
                  <em>{repo.license}</em>
                </a>
              ))}
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
            {codexFeatures.map((feature) => (
              <article className="codex-feature-card" key={feature.title}>
                <span>{feature.icon}</span>
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="codex-section tutorial-parts" id="parts">
          <SectionIntro
            label="Full curriculum"
            title="完整目录"
            text="按系统化教程站的深度设计课程；先做首页目录，后续可生成每个章节页。"
          />
          <div className="parts-grid">
            {tutorialParts.map((part) => (
              <article className="part-card" key={part.title}>
                <span>{part.number}</span>
                <h2>{part.title}</h2>
                <p>{part.focus}</p>
                <ul>
                  {part.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="codex-section learning-path" id="learning-path">
          <SectionIntro
            label="Learning path"
            title="30 分钟上手路线"
            text="保留完整教程站的目录深度，但首页先给新手一条最短可执行路径。"
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

        <section className="codex-section repo-radar" aria-labelledby="repo-radar-title">
          <SectionIntro
            label="Repository radar"
            title="公开来源雷达"
            text="所有公开来源都标注许可、用途和复用边界；许可不明确的内容不进入公开素材。"
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

        <section className="codex-section viral-system">
          <SectionIntro
            label="Content workflow"
            title="把教程变成 AI PickGold 的实战拆解"
            text="这里呈现的是本站自己的学习组织方式：摘要、目录、行动清单和二次创作入口。"
          />
          <div className="viral-grid">
            {viralBreakdown.map((item) => (
              <article className="viral-card" key={item.label}>
                <span>{item.label}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="codex-section practice-packs">
          <SectionIntro
            label="Practice packs"
            title="把学习站接回 AI PickGold 的产品能力"
            text="用户不是只读教程，而是拿走可运行的模板、发布包和工作流。"
          />
          <div className="pack-grid">
            {practicePacks.map((pack) => (
              <article className="pack-card" key={pack.title}>
                <div className="pack-icon">
                  <PackageCheck size={18} />
                </div>
                <h2>{pack.title}</h2>
                <p>{pack.audience}</p>
                <strong>{pack.deliverable}</strong>
                <span>{pack.source}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CodexHeader() {
  return (
    <header className="codex-header">
      <a className="codex-brand" href={routePath("/codex")}>
        <span>Cx</span>
        <strong>Codex 深度教程</strong>
      </a>
      <nav className="codex-nav" aria-label="Codex tutorial navigation">
        <a className="active" href={routePath("/codex")}>首页</a>
        <a href={routePath("/tutorial/1-codex-intro.html")}>教程</a>
        <a href="https://developers.openai.com/codex" target="_blank" rel="noreferrer">官方文档</a>
        <a href="https://github.com/soarsky1991/aipickgold-codex-tutorial" target="_blank" rel="noreferrer">学习仓库</a>
        <a href={routePath("/studio")}>Studio Desk</a>
      </nav>
      <a className="codex-header-action" href="https://github.com/soarsky1991/aipickgold-codex-tutorial" target="_blank" rel="noreferrer">
        GitHub
      </a>
    </header>
  );
}

function CodexTutorialDetail() {
  return (
    <div className="codex-shell">
      <CodexHeader />
      <main className="tutorial-layout" aria-label="Codex tutorial detail">
        <aside className="tutorial-sidebar" aria-label="Tutorial sections">
          <strong>完整目录</strong>
          <nav>
            {tutorialParts.map((part) => (
              <a href={part.number === "第 1 部分" ? routePath("/tutorial/1-codex-intro.html") : "#parts"} key={part.title}>
                <span>{part.number}</span>
                {part.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="tutorial-article">
          <section className="tutorial-doc-hero">
            <div>
              <span>从这里开始</span>
              <h1>Codex 是什么</h1>
              <p>
                Codex 是 OpenAI 面向软件开发的 coding agent。它会读取文件、执行命令、修改代码，
                并通过多轮工具调用完成真实任务。本教程把桌面端 App 作为主线，把 CLI、IDE、Cloud 作为补充。
              </p>
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
                    <p><strong>+</strong> readProjectContext()</p>
                    <p><strong>+</strong> editFilesWithApproval()</p>
                    <p><strong>+</strong> runVerification()</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="tutorial-doc-section">
            <h2>Codex 不是什么</h2>
            <div className="tutorial-info-grid">
              <InfoCard title="不是补全工具" text="它不只在光标处给建议，而是会拆解任务、执行命令、检查结果。" />
              <InfoCard title="不是纯聊天机器人" text="它会真实读写文件、调用工具和浏览器，而不是只输出文字。" />
              <InfoCard title="不是无人值守替代品" text="所有高风险动作仍需要权限、审批、测试和人工判断。" />
            </div>
          </section>

          <section className="tutorial-doc-section">
            <h2>最适合先学的 4 件事</h2>
            <ol>
              <li>用桌面端 App 创建一个项目，并让 Codex 只读扫描目录。</li>
              <li>写一份 AGENTS.md，告诉 Codex 如何运行测试和交付结果。</li>
              <li>让 Codex 完成一个小改动，并检查 diff 与命令输出。</li>
              <li>把一次重复工作沉淀成 Skill 或发布包模板。</li>
            </ol>
          </section>

          <section className="tutorial-doc-section">
            <h2>第一条安全提示词</h2>
            <pre>{`请先只读检查这个项目，告诉我技术栈、目录结构、启动方式、测试命令和风险点。
不要修改文件。最后建议一个可以安全完成的小任务，等我确认后再执行。`}</pre>
          </section>
        </article>
      </main>
    </div>
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

function StudioApp() {
  const [markdown, setMarkdown] = useState(starterDrafts[0].markdown);
  const [selectedStarter, setSelectedStarter] = useState(starterDrafts[0].id);
  const [activeTab, setActiveTab] = useState("wechat");
  const [checklist, setChecklist] = useState(createChecklist);
  const [copied, setCopied] = useState("");
  const [exporting, setExporting] = useState(false);
  const [lastExport, setLastExport] = useState(null);

  const outputs = useMemo(() => makeOutputs(markdown, checklist), [markdown, checklist]);
  const manifest = useMemo(
    () => makeManifest(markdown, outputs, checklist),
    [markdown, outputs, checklist]
  );

  const completedChecks = checklist.filter((item) => item.done).length;
  const reviewBlocked = manifest.review.blocked_reasons.length > 0;
  const packageStatus = reviewBlocked
    ? "needs review"
    : completedChecks === checklist.length
      ? "ready for manual publish"
      : "ready for review";

  async function copyText(text, key) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 1200);
  }

  function selectStarter(starterId) {
    const starter = starterDrafts.find((item) => item.id === starterId);
    if (!starter) return;
    setSelectedStarter(starterId);
    setMarkdown(starter.markdown);
    setActiveTab("wechat");
    setChecklist(createChecklist());
    setLastExport(null);
  }

  async function exportPackage() {
    setExporting(true);
    const zip = new JSZip();
    zip.file("manifest.json", JSON.stringify(manifest, null, 2));
    zip.file("source.md", markdown);
    zip.file("wechat.md", `# ${outputs.wechat.title}\n\n${outputs.wechat.subtitle}\n\n${outputs.wechat.html}`);
    zip.file("xiaohongshu-cards.json", JSON.stringify(outputs.xiaohongshu, null, 2));
    zip.file("x-thread.txt", [outputs.x.post, ...outputs.x.thread].join("\n\n"));
    zip.file("video-script.txt", outputs.video.script);
    zip.file(
      "manual-publish-checklist.json",
      JSON.stringify(
        {
          manual_publish_required: true,
          checklist,
          blocked_reasons: manifest.review.blocked_reasons
        },
        null,
        2
      )
    );

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${manifest.package_id}.zip`;
    link.click();
    URL.revokeObjectURL(url);
    setLastExport({ size: blob.size, at: new Date().toLocaleTimeString() });
    setExporting(false);
  }

  return (
    <div className="studio-shell">
      <Header packageStatus={packageStatus} current="Studio Desk" />
      <main className="studio-main" aria-label="AI PickGold Studio Desk">
        <section className="workspace-title">
          <div>
            <p className="muted small">/studio · V2 direction</p>
            <h1>Turn a creator draft into a reviewed business asset</h1>
          </div>
          <div className="workspace-actions">
            <button className="icon-button" aria-label="Refresh package">
              <RefreshCw size={16} />
            </button>
            <button className="primary-action" onClick={exportPackage}>
              <Download size={16} />
              {exporting ? "Exporting..." : "Export Package"}
            </button>
          </div>
        </section>

        <section className="strategy-strip" aria-label="Studio strategy">
          <StrategyCard
            icon={UserRound}
            label="User"
            text="For creators who already have a draft, but need platform-native output without starting over."
          />
          <StrategyCard
            icon={Target}
            label="Job"
            text="Move from raw Markdown to WeChat, Xiaohongshu, X, video, and a checked handoff package."
          />
          <StrategyCard
            icon={PackageCheck}
            label="Business"
            text="Free proves utility; Studio sells package history, API workflows, and custom setup."
          />
          <StrategyCard
            icon={ShieldCheck}
            label="Trust"
            text="Account publishing remains gated. Users review, export, then publish manually."
          />
        </section>

        <section className="desk-grid">
          <SourcePanel
            markdown={markdown}
            setMarkdown={setMarkdown}
            starterDrafts={starterDrafts}
            selectedStarter={selectedStarter}
            onSelectStarter={selectStarter}
          />
          <OutputPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            outputs={outputs}
            manifest={manifest}
            copyText={copyText}
            copied={copied}
          />
          <ReviewPanel
            activeTab={activeTab}
            outputs={outputs}
            checklist={checklist}
            setChecklist={setChecklist}
            manifest={manifest}
          />
        </section>

        <StatusStrip
          packageStatus={packageStatus}
          reviewBlocked={reviewBlocked}
          completedChecks={completedChecks}
          totalChecks={checklist.length}
          manifest={manifest}
          lastExport={lastExport}
          exportPackage={exportPackage}
          exporting={exporting}
        />
      </main>
    </div>
  );
}

function Header({ packageStatus = "ready", current = "Studio Desk" }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="mark">
          <Sparkles size={18} />
        </div>
        <strong>AI PickGold Studio</strong>
        <span className="version">V1</span>
      </div>
      <nav className="product-switcher" aria-label="Product switcher">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={item.label === current ? "active" : ""}
            href={routePath(item.path)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="account-state">
        <span className="status-pill">
          <ShieldCheck size={14} />
          Pro
          <strong>••••••</strong>
        </span>
        <span className="status-pill">
          <KeyRound size={14} />
          API key: sk-...9A2
        </span>
        <span className="package-state">{packageStatus}</span>
      </div>
    </header>
  );
}

function StrategyCard({ icon: Icon, label, text }) {
  return (
    <article className="strategy-card">
      <span>
        <Icon size={15} />
      </span>
      <div>
        <strong>{label}</strong>
        <p>{text}</p>
      </div>
    </article>
  );
}

function FounderPage() {
  return (
    <div className="studio-shell founder-shell">
      <Header packageStatus="founder IP" current="Founder IP" />
      <main className="founder-page" aria-label="Founder IP profile">
        <section className="founder-hero">
          <div className="founder-copy">
            <p className="muted small">High Soar · AI workflow operator</p>
            <h1>
              我把 AI 工作流产品化：
              <br />
              可复用、可审查、
              <br />
              可交付、可变现。
            </h1>
            <p>
              AI PickGold Studio 不是展示 AI 魔法，而是把内容生产、风险审查、多平台分发和商业化包装变成一套可运营的工作台。
            </p>
            <div className="founder-actions">
              <a className="primary-action" href={routePath("/studio")}>
                <LayoutPanelLeft size={16} />
                Open Studio Desk
              </a>
              <a className="secondary-link" href="https://github.com/soarsky1991/aipickgold-studio">
                <Globe2 size={16} />
                GitHub project
              </a>
            </div>
          </div>

          <aside className="founder-proof">
            <div>
              <span>Positioning</span>
              <strong>AI 内容工作流产品化顾问</strong>
            </div>
            <div>
              <span>Proof assets</span>
              <p>WxMD、CardMD、Studio package、md2wechat benchmark、Figma prototype、Linear delivery loop</p>
            </div>
            <div>
              <span>Boundary</span>
              <p>生成、审查、导出、交付；账号发布和密钥调用保持人工/服务端控制。</p>
            </div>
          </aside>
        </section>

        <section className="founder-grid">
          <FounderBlock
            title="我服务谁"
            body="个人 IP、知识创作者、AI 工具创业者，以及需要把内容生产从临时发挥变成稳定流程的小团队。"
          />
          <FounderBlock
            title="我解决什么"
            body="从一篇草稿开始，拆成平台化输出、审查清单、导出包、复盘入口和后续 API/自动化能力。"
          />
          <FounderBlock
            title="我怎么商业化"
            body="免费工作台建立信任；高级版销售发布包历史、团队协作、API 托管、私有化配置和顾问式搭建。"
          />
          <FounderBlock
            title="我为什么可信"
            body="我把 brief、设计、工程、上线、Figma、Linear、竞品 API 测试和交付证据放在同一个可追踪闭环里。"
          />
        </section>

        <section className="service-offers" aria-label="Founder service offers">
          <div className="section-kicker">
            <p className="muted small">Commercial paths</p>
            <h2>从一次流程体检，到一个可上线的 AI 工作台。</h2>
          </div>
          <div className="offer-cards">
            <FounderOffer
              icon={ListChecks}
              title="AI 工作流体检"
              audience="适合已经在做内容，但流程分散、难复用的人。"
              deliverable="交付流程地图、风险边界、7 天改造清单。"
            />
            <FounderOffer
              icon={LayoutPanelLeft}
              title="内容发布工作台搭建"
              audience="适合个人 IP、知识创作者和小团队。"
              deliverable="交付草稿入口、平台输出、审查清单、导出包。"
            />
            <FounderOffer
              icon={KeyRound}
              title="高级版 API 落地"
              audience="适合要接入 md2wechat、私有密钥和团队协作的业务。"
              deliverable="交付服务端调用边界、密钥隔离、人工发布门禁。"
            />
          </div>
        </section>

        <section className="offer-band">
          <div>
            <p className="muted small">Current offer</p>
            <h2>把你的内容流程做成一个可展示、可复用、可交付的 AI 工作台。</h2>
          </div>
          <div className="offer-actions">
            <a className="primary-action" href={routePath("/studio")}>
              <PackageCheck size={16} />
              See the product
            </a>
            <a
              className="secondary-link"
              href="https://github.com/soarsky1991/aipickgold-studio/issues/new?title=AI%20workflow%20audit%20request"
            >
              <MessageSquareText size={16} />
              Start a brief
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function FounderBlock({ title, body }) {
  return (
    <article className="founder-block">
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}

function FounderOffer({ icon: Icon, title, audience, deliverable }) {
  return (
    <article className="founder-offer">
      <div className="offer-icon">
        <Icon size={18} />
      </div>
      <h3>{title}</h3>
      <p>{audience}</p>
      <strong>{deliverable}</strong>
    </article>
  );
}

function SourcePanel({
  markdown,
  setMarkdown,
  starterDrafts: starters,
  selectedStarter,
  onSelectStarter
}) {
  const currentStarter = starters.find((starter) => starter.id === selectedStarter) ?? starters[0];

  return (
    <article className="panel source-panel">
      <PanelHeading
        index="1"
        title="Source Draft"
        icon={FileText}
        action={<button className="secondary-action">Stats</button>}
      />
      <div className="file-row">
        <Code2 size={16} />
        <span>{currentStarter.fileName}</span>
        <span className="save-state">
          <CheckCircle2 size={14} />
          Saved 10:42
        </span>
      </div>
      <div className="starter-strip" aria-label="Starter intents">
        {starters.map((starter) => (
          <button
            key={starter.id}
            className={starter.id === selectedStarter ? "active" : ""}
            onClick={() => onSelectStarter(starter.id)}
          >
            <strong>{starter.title}</strong>
            <span>{starter.promise}</span>
          </button>
        ))}
      </div>
      <textarea
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        spellCheck="false"
        aria-label="Markdown source editor"
      />
      <footer className="panel-footer">
        <span>Lines {markdown.split("\n").length}</span>
        <span>Words {getWordCount(markdown).toLocaleString()}</span>
        <span>Chars {markdown.length.toLocaleString()}</span>
      </footer>
    </article>
  );
}

function OutputPanel({ activeTab, setActiveTab, outputs, manifest, copyText, copied }) {
  const current = outputs[activeTab] ?? manifest;

  return (
    <article className="panel output-panel">
      <PanelHeading index="2" title="Platform Outputs" icon={LayoutPanelLeft} />
      <div className="tabs" role="tablist" aria-label="Platform outputs">
        {platformTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={activeTab === id ? "active" : ""}
            onClick={() => setActiveTab(id)}
            role="tab"
            aria-selected={activeTab === id}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
      <div className="output-card">
        {activeTab === "wechat" && (
          <WeChatOutput
            output={current}
            copyText={copyText}
            copied={copied}
          />
        )}
        {activeTab === "xiaohongshu" && <XhsOutput output={current} />}
        {activeTab === "x" && <XOutput output={current} />}
        {activeTab === "video" && <VideoOutput output={current} />}
        {activeTab === "package" && <PackageOutput manifest={manifest} copyText={copyText} copied={copied} />}
      </div>
    </article>
  );
}

function WeChatOutput({ output, copyText, copied }) {
  return (
    <>
      <div className="output-title-row">
        <div>
          <h2>WeChat Article</h2>
          <span className="review-tag">{statusLabel(output.status)}</span>
        </div>
        <div className="toolbar-actions">
          <button onClick={() => copyText(output.html, "wechat")}>
            {copied === "wechat" ? <Check size={15} /> : <Copy size={15} />}
            Copy
          </button>
          <button className="gated-action" title="Requires server-side WeChat credentials">
            <Globe2 size={15} />
            Draft API gated
          </button>
        </div>
      </div>
      <Field label="Title" value={output.title} meta={`${output.title.length}/64`} />
      <Field label="Subtitle" value={output.subtitle} meta={`${output.subtitle.length}/120`} />
      <div className="rich-editor">
        <div className="format-row">
          <button>H</button>
          <button>B</button>
          <button>I</button>
          <button>•</button>
          <button>"</button>
          <button>Link</button>
        </div>
        <div className="article-preview">
          <h3>{output.title}</h3>
          <p>{output.subtitle}</p>
          <h4>核心思路</h4>
          <ul>
            <li>先做一个足够好的原稿</li>
            <li>基于平台特性进行结构化改写</li>
            <li>人工审核后，手动发布</li>
          </ul>
        </div>
      </div>
      <div className="adaptation-note">
        <Sparkles size={15} />
        WeChat draft APIs are visible as a Pro/API path, but final account publishing is not automatic in V1.
      </div>
    </>
  );
}

function XhsOutput({ output }) {
  return (
    <div className="xhs-grid">
      {output.cards.map((card, index) => (
        <div className="mini-card" key={card}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{card}</strong>
        </div>
      ))}
      <div className="caption-box">
        <strong>Caption</strong>
        <p>{output.caption}</p>
      </div>
    </div>
  );
}

function XOutput({ output }) {
  return (
    <div className="thread-list">
      <div className="thread-root">{output.post}</div>
      {output.thread.map((item) => (
        <div className="thread-item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}

function VideoOutput({ output }) {
  return (
    <div className="script-layout">
      <div className="hook-card">
        <span>Hook</span>
        <strong>{output.hook}</strong>
      </div>
      <pre>{output.script}</pre>
      <div className="shot-list">
        {output.shot_list.map((shot) => (
          <span key={shot}>{shot}</span>
        ))}
      </div>
    </div>
  );
}

function PackageOutput({ manifest, copyText, copied }) {
  return (
    <div className="manifest-card">
      <div className="output-title-row">
        <div>
          <h2>Package Manifest</h2>
          <span className="review-tag">manual publish required</span>
        </div>
        <button onClick={() => copyText(JSON.stringify(manifest, null, 2), "manifest")}>
          {copied === "manifest" ? <Check size={15} /> : <Clipboard size={15} />}
          Copy JSON
        </button>
      </div>
      <pre>{JSON.stringify(manifest, null, 2)}</pre>
    </div>
  );
}

function ReviewPanel({ activeTab, outputs, checklist, setChecklist, manifest }) {
  const output = outputs[activeTab] ?? outputs.wechat;

  function toggle(id) {
    setChecklist((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  return (
    <aside className="review-column">
      <article className="panel live-preview">
        <PanelHeading
          index="3"
          title="Preview"
          icon={Monitor}
          action={
            <div className="device-toggle">
              <button className="active" aria-label="Desktop preview">
                <Monitor size={14} />
              </button>
              <button aria-label="Mobile preview">
                <PenLine size={14} />
              </button>
            </div>
          }
        />
        <div className="phone-preview">
          <h2>{outputs.wechat.title}</h2>
          <p className="byline">PickGold Studio · 2026-06-04 · manual handoff</p>
          <blockquote>{outputs.wechat.subtitle}</blockquote>
          <h3>核心思路</h3>
          <ul>
            <li>一个 Markdown source unit</li>
            <li>平台化输出与审查清单</li>
            <li>导出 ZIP 包，手动发布</li>
          </ul>
        </div>
      </article>

      <article className="panel checklist-panel">
        <PanelHeading
          index="4"
          title="Review Checklist"
          icon={ListChecks}
          action={<span className="danger-text">manual publish required</span>}
        />
        <div className="check-table">
          {checklist.map((item) => (
            <label className="check-row" key={item.id}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
              />
              <span className={`check-dot ${item.severity}`} />
              <strong>{item.label}</strong>
              <em>{item.done ? "passed" : item.severity === "warning" ? "needs review" : "pending"}</em>
              <small>{item.note}</small>
            </label>
          ))}
        </div>
        <div className="safety-callout">
          <AlertTriangle size={16} />
          Account publishing stops here until human review passes.
        </div>
      </article>

      <article className="panel api-boundary">
        <PanelHeading index="5" title="API Boundary" icon={Boxes} />
        <div className="signal-list">
          {md2wechatSignals.map((signal) => (
            <p key={signal}>
              <ShieldCheck size={14} />
              {signal}
            </p>
          ))}
        </div>
        <div className="api-status">
          <span>Current tab</span>
          <strong>{activeTab}</strong>
        </div>
        <div className="api-status">
          <span>Output state</span>
          <strong>{statusLabel(output.status ?? manifest.review.platform_risk)}</strong>
        </div>
      </article>
    </aside>
  );
}

function StatusStrip({
  packageStatus,
  reviewBlocked,
  completedChecks,
  totalChecks,
  manifest,
  lastExport,
  exportPackage,
  exporting
}) {
  const steps = [
    { label: "Draft", done: true },
    { label: "Needs Review", done: reviewBlocked },
    { label: "Ready for Manual Publish", done: !reviewBlocked && completedChecks === totalChecks },
    { label: "Exported", done: Boolean(lastExport) }
  ];

  return (
    <section className="status-strip">
      <div className="strip-progress">
        {steps.map((step, index) => (
          <div className="progress-step" key={step.label}>
            <span className={step.done ? "done" : ""}>{index + 1}</span>
            <strong>{step.label}</strong>
            <em>
              {index === 1 && reviewBlocked ? "ready for review" : step.done ? "complete" : "pending"}
            </em>
          </div>
        ))}
      </div>
      <div className="manifest-summary">
        <FileJson size={28} />
        <div>
          <strong>manifest.json</strong>
          <span>{manifest.review.blocked_reasons.length} blockers · {packageStatus}</span>
        </div>
      </div>
      <button className="primary-action export-wide" onClick={exportPackage}>
        <PackageCheck size={17} />
        {exporting ? "Exporting..." : "Export Package ZIP"}
        <ChevronDown size={16} />
      </button>
      <div className="last-export">
        <span>Last export</span>
        <strong>{lastExport ? lastExport.at : "--"}</strong>
        <small>{lastExport ? `${Math.ceil(lastExport.size / 1024)} KB` : "Size --"}</small>
      </div>
    </section>
  );
}

function Field({ label, value, meta }) {
  return (
    <label className="field">
      <span>
        {label}
        <em>{meta}</em>
      </span>
      <input value={value} readOnly />
    </label>
  );
}

function PanelHeading({ index, title, icon: Icon, action }) {
  return (
    <header className="panel-heading">
      <div>
        <span>{index}</span>
        <Icon size={17} />
        <h2>{title}</h2>
      </div>
      {action}
    </header>
  );
}

export default App;
