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
  { label: "Codex", path: "/codex" },
  { label: "Founder IP", path: "/founder" }
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
  "WeChat draft creation requires account credentials, server isolation, and IP whitelist.",
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
    source: "AI PickGold 内容工作流"
  }
];

const viralBreakdown = [
  { label: "TL;DR", text: "把长教程压缩成一个可执行路线，而不是只做阅读摘要。" },
  { label: "目录", text: "基础设置、连接构建、自动化、实战包四段式推进。" },
  { label: "热度指标", text: "保留曝光、收藏、转发这类判断维度，但用作选题优先级。" },
  { label: "二次创作", text: "每篇爆款都转成清单、仓库链接、练习任务和发布包。" }
];

const brandPillars = [
  ["拾金笔记", "把工具、教程和真实发布流程沉淀成长期可复用的个人知识资产。"],
  ["创作者视角", "不只教编程，还教如何用 Codex 产出文章、卡片、脚本和交付包。"],
  ["安全门禁", "密钥、账号、生产发布和公开内容都先过边界检查。"],
  ["可交付路线", "每一章都落到提示词、检查清单、仓库链接和可验证输出。"]
];

const privateCommunity = [
  {
    title: "小红书",
    label: "二维码占位",
    text: "后续放小红书账号二维码，用于发布教程笔记、卡片版清单和日常更新。"
  },
  {
    title: "微信群",
    label: "二维码占位",
    text: "后续放学习群二维码，用于 Codex 打卡、问题答疑和案例共创。"
  }
];

const founderAssets = {
  avatar: routePath("/founder/avatar.png"),
  portrait: routePath("/founder/founder-photo.jpg"),
  workspace: routePath("/founder/founder-workspace.png"),
  banner: routePath("/founder/x-banner-1500x500.png"),
  xhsCover: routePath("/founder/xhs-cover-template.png"),
  personalCover: routePath("/founder/xhs-cover-personal-ip.jpg"),
  videoPoster: routePath("/founder/hyperframes-video-cover.jpg"),
  video: routePath("/founder/personal-ip-system-broll.mp4")
};

const founderRepos = [
  {
    name: "aipickgold-codex-tutorial",
    url: "https://github.com/soarsky1991/aipickgold-codex-tutorial",
    label: "Codex 教程",
    summary: "我把 Codex 学习路线、AGENTS.md、Skills、GitHub 自动化和内容工作流整理成中文教程。"
  },
  {
    name: "hyperframes-creator-kit",
    url: "https://github.com/soarsky1991/hyperframes-creator-kit",
    label: "视频教程",
    summary: "我用它沉淀 HyperFrames AI 视频教程、素材结构和可复用的创作者工作流。"
  },
  {
    name: "xhs-cover-committee-skill",
    url: "https://github.com/soarsky1991/xhs-cover-committee-skill",
    label: "小红书封面",
    summary: "我用 70+ 轮封面复盘，把小红书封面从感觉判断变成可执行的审查 Skill。"
  },
  {
    name: "skill-radar",
    url: "https://github.com/soarsky1991/skill-radar",
    label: "流量雷达",
    summary: "我持续追踪 AI Agent、Skills、MCP 和开源工具，用它抓选题、抓趋势、抓流量机会。"
  }
];

const tutorialParts = [
  {
    number: "第 1 部分",
    title: "基础入门",
    slug: "1-codex-intro",
    focus: "Codex 是什么、使用形态、工具对比、第一条任务",
    lessons: ["Codex 是什么", "四种入口", "适合与不适合", "账号认证"]
  },
  {
    number: "第 2 部分",
    title: "桌面端入门",
    slug: "2-desktop-setup",
    focus: "Codex App、Local / Worktree / Cloud、多线程与命令菜单",
    lessons: ["安装登录", "界面总览", "多线程并行", "快捷命令"]
  },
  {
    number: "第 3 部分",
    title: "项目上下文",
    slug: "3-agents-context",
    focus: "AGENTS.md、项目规则、公开边界、验收标准",
    lessons: ["项目目标", "常用命令", "公开边界", "验收标准"]
  },
  {
    number: "第 4 部分",
    title: "CLI 与终端",
    slug: "4-cli-terminal",
    focus: "安装、Flags、Slash Commands、会话管理、codex exec",
    lessons: ["CLI 安装", "基础命令", "全局参数", "自动化执行"]
  },
  {
    number: "第 5 部分",
    title: "IDE 与 Cloud",
    slug: "5-cloud-github",
    focus: "IDE 扩展、Codex Web、云端任务和 GitHub 集成",
    lessons: ["IDE 工作流", "Cloud 入门", "云端任务", "Issue 到 PR"]
  },
  {
    number: "第 6 部分",
    title: "核心概念",
    slug: "6-sandbox-permissions",
    focus: "Agent Loop、Thread Context、Sandbox、Approval、模型推理",
    lessons: ["执行循环", "上下文", "权限边界", "推理强度"]
  },
  {
    number: "第 7 部分",
    title: "配置与定制",
    slug: "7-skills-mcp-plugins",
    focus: "config.toml、Permissions Profile、Rules、Hooks",
    lessons: ["配置文件", "权限档案", "命令规则", "生命周期脚本"]
  },
  {
    number: "第 8 部分",
    title: "扩展能力",
    slug: "8-agents-skills",
    focus: "AGENTS.md、Skills、MCP、插件中文速查",
    lessons: ["AGENTS.md", "Skills", "MCP", "插件管理"]
  },
  {
    number: "第 9 部分",
    title: "实战工作流",
    slug: "9-real-workflows",
    focus: "读代码、做功能、修 Bug、补测试、代码审查、前端 UI",
    lessons: ["接管代码库", "实现功能", "修复回归", "前端 QA"]
  },
  {
    number: "第 10 部分",
    title: "集成与自动化",
    slug: "10-automation",
    focus: "Slack / Linear、CI/CD、GitHub Action、SDK 与 App Server",
    lessons: ["Linear 集成", "CI 自动化", "SDK", "内部平台"]
  },
  {
    number: "第 11 部分",
    title: "安全与治理",
    slug: "11-security-governance",
    focus: "个人安全清单、企业治理、权限和审计边界",
    lessons: ["密钥边界", "审批策略", "团队规则", "上线检查"]
  },
  {
    number: "第 12 部分",
    title: "速查与附录",
    slug: "12-cheatsheets-faq",
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

const tutorialDocs = [
  {
    slug: "1-codex-intro",
    kicker: "从这里开始",
    title: "Codex 是什么",
    summary:
      "Codex 是 OpenAI 面向软件开发的 coding agent。它会读取文件、执行命令、修改代码，并把结果交给你 review。",
    map: ["readProjectContext()", "editFilesWithApproval()", "runVerification()"],
    sections: [
      {
        title: "Codex 不是什么",
        cards: [
          ["不是补全工具", "它不只在光标处给建议，而是会拆解任务、执行命令、检查结果。"],
          ["不是纯聊天机器人", "它会真实读写文件、调用工具和浏览器，而不是只输出文字。"],
          ["不是无人值守替代品", "所有高风险动作仍需要权限、审批、测试和人工判断。"]
        ]
      },
      {
        title: "最适合先学的 4 件事",
        list: [
          "用桌面端 App 创建一个项目，并让 Codex 只读扫描目录。",
          "写一份 AGENTS.md，告诉 Codex 如何运行测试和交付结果。",
          "让 Codex 完成一个小改动，并检查 diff 与命令输出。",
          "把一次重复工作沉淀成 Skill 或发布包模板。"
        ]
      },
      {
        title: "第一条安全提示词",
        code:
          "请先只读检查这个项目，告诉我技术栈、目录结构、启动方式、测试命令和风险点。\n不要修改文件。最后建议一个可以安全完成的小任务，等我确认后再执行。"
      }
    ]
  },
  {
    slug: "2-desktop-setup",
    kicker: "桌面端主线",
    title: "用 Codex App 建立第一个工作区",
    summary:
      "桌面端适合中文用户把本地仓库、浏览器预览、GitHub、Linear 和设计工具放进同一个工作流。",
    map: ["openWorkspace()", "scanWithoutEditing()", "verifyInBrowser()"],
    sections: [
      {
        title: "第一次打开先做什么",
        list: [
          "选择一个没有生产密钥的小项目作为练习仓库。",
          "确认 Codex 能看到 README、package.json、测试命令和主要源码目录。",
          "先要求只读总结项目，不要立刻改文件。",
          "把常用命令和禁止触碰的目录写入 AGENTS.md。"
        ]
      },
      {
        title: "本地、Worktree、Cloud 怎么选",
        cards: [
          ["Local", "适合需要本地预览、调试、浏览器验收的任务。"],
          ["Worktree", "适合并行做多个功能，保持每条线都有独立 diff。"],
          ["Cloud", "适合 Issue 到 PR 的远程执行，但要先确认仓库权限。"]
        ]
      },
      {
        title: "桌面端练习任务",
        code:
          "请用只读方式扫描当前项目，列出入口文件、启动命令、构建命令和潜在风险。\n然后提出 3 个适合新手练习的小任务，不要修改文件。"
      }
    ]
  },
  {
    slug: "3-agents-context",
    kicker: "项目上下文",
    title: "写一份让 Codex 真正懂项目的 AGENTS.md",
    summary:
      "AGENTS.md 是项目给 Codex 的工作说明书。它把命令、边界、风格和验收标准写成可复用上下文。",
    map: ["defineCommands()", "setBoundaries()", "recordAcceptance()"],
    sections: [
      {
        title: "AGENTS.md 至少写什么",
        list: [
          "项目目标：这个仓库解决什么问题。",
          "常用命令：安装、开发、构建、测试、预览。",
          "编辑边界：哪些目录可以改，哪些文件不能碰。",
          "验收标准：什么算完成，必须跑哪些检查。"
        ]
      },
      {
        title: "公开内容边界",
        cards: [
          ["内部策略不公开", "外部研究对象、采集目标、私密对话和商业判断不写进公开文档。"],
          ["许可先行", "来源不清楚的内容只做内部研究，不进入公开源码和页面。"],
          ["密钥零容忍", "token、SSH、OSS、DNS、env 路径都不能提交。"]
        ]
      },
      {
        title: "AGENTS.md 模板",
        code:
          "# Project Rules\n\n- Run `npm run build` before publishing.\n- Do not edit deployment secrets or env files.\n- Public copy must not reveal private research targets or collection targets.\n- Verify mobile width around 390px before final handoff."
      }
    ]
  },
  {
    slug: "4-cli-terminal",
    kicker: "终端自动化",
    title: "CLI 与终端工作流",
    summary:
      "CLI 适合把 Codex 放进终端、脚本、远程机器和批量检查流程里。先掌握权限，再追求自动化。",
    map: ["installCli()", "runFocusedTask()", "captureOutput()"],
    sections: [
      {
        title: "我建议先练这 4 件事",
        list: [
          "用 CLI 打开一个小项目，只读总结项目结构。",
          "练习传入明确任务、限制修改范围和要求输出验证结果。",
          "用 resume 或 fork 保留上下文，不要每次从零开始。",
          "把稳定任务变成可复用命令或脚本入口。"
        ]
      },
      {
        title: "CLI 适合做什么",
        cards: [
          ["批量检查", "例如文档链接、构建命令、测试命令、格式检查。"],
          ["远程任务", "在服务器或远程仓库里做明确、可回滚的小任务。"],
          ["自动化前置", "先让 Codex 输出计划和风险，再进入真正执行。"]
        ]
      },
      {
        title: "练习提示词",
        code:
          "请在当前目录只读检查项目。\n输出：入口文件、构建命令、测试命令、可自动化任务、风险边界。\n不要修改文件。"
      }
    ]
  },
  {
    slug: "5-cloud-github",
    kicker: "远程协作",
    title: "Cloud、GitHub 与 PR 工作流",
    summary:
      "Cloud 和 GitHub 适合把明确任务交给 Codex 远程执行，但前提是权限、分支、Review 和密钥边界清楚。",
    map: ["createIssue()", "runCloudTask()", "reviewPullRequest()"],
    sections: [
      {
        title: "Issue 到 PR 的最小流程",
        list: [
          "Issue 里写清楚目标、范围、验收标准。",
          "Codex 只改相关文件，不做顺手重构。",
          "PR 里必须说明 diff、测试结果和剩余风险。",
          "人工 review 后再合并。"
        ]
      },
      {
        title: "我会重点检查",
        cards: [
          ["权限", "仓库授权是否过宽，是否能看到不该看的内容。"],
          ["分支", "是否隔离在独立分支，是否容易回滚。"],
          ["证据", "是否有构建、测试、截图或日志作为验收依据。"]
        ]
      },
      {
        title: "Issue 模板",
        code:
          "目标：\n范围：\n不能修改：\n验收标准：\n必须运行的检查：\n交付：PR + 测试结果 + 风险说明"
      }
    ]
  },
  {
    slug: "6-sandbox-permissions",
    kicker: "安全边界",
    title: "Sandbox、权限与审批",
    summary:
      "能不能放心用 Codex，核心看权限边界。我的原则是：读多一点可以，写和发布必须有门禁。",
    map: ["limitScope()", "requestApproval()", "verifyBeforeShip()"],
    sections: [
      {
        title: "权限分层",
        list: [
          "只读：探索项目、总结风险、写计划。",
          "受限写入：只改指定文件或目录。",
          "命令执行：必须说明命令目的和预期结果。",
          "发布部署：必须保留人工确认和回滚路径。"
        ]
      },
      {
        title: "高风险内容",
        cards: [
          ["密钥", "token、cookie、SSH、OSS、DNS、env 文件不要进入公开仓库。"],
          ["账号", "涉及平台账号发布、支付、权限变更时保留人工操作。"],
          ["生产环境", "没有备份、回滚和验证，不让 AI 直接动。"]
        ]
      },
      {
        title: "安全提示词",
        code:
          "在执行前，请先列出本任务涉及的文件、命令、风险和回滚方式。\n未经我确认，不要执行部署、删除、账号发布或密钥相关操作。"
      }
    ]
  },
  {
    slug: "7-skills-mcp-plugins",
    kicker: "扩展能力",
    title: "Skills、MCP 与插件",
    summary:
      "Skills 固化方法，MCP 接入工具，插件扩展场景。学会它们，Codex 才能从写代码变成工作流中枢。",
    map: ["writeSkill()", "connectTool()", "verifyBoundary()"],
    sections: [
      {
        title: "三者怎么分工",
        cards: [
          ["Skills", "把重复步骤写成稳定方法，例如教程更新、截图验收、发布包制作。"],
          ["MCP", "把外部系统接进来，例如 GitHub、Linear、Figma、数据源。"],
          ["插件", "为具体场景提供更完整的能力，例如产品设计、创意生产、浏览器验收。"]
        ]
      },
      {
        title: "我的使用顺序",
        list: [
          "先用普通对话跑通流程。",
          "把重复步骤写成 Skill。",
          "需要真实系统数据时再接 MCP。",
          "涉及视觉、产品、浏览器时使用对应插件验收。"
        ]
      },
      {
        title: "练习任务",
        code:
          "请把这个重复流程整理成一个 Skill 草案。\n要求包含：触发场景、输入、步骤、安全边界、输出格式、验收标准。"
      }
    ]
  },
  {
    slug: "8-agents-skills",
    kicker: "扩展能力",
    title: "把重复工作流沉淀成 Skills",
    summary:
      "Skills 适合把重复出现的研究、写作、测试、发布和验收步骤固化，让 Codex 每次按同一套方法工作。",
    map: ["captureWorkflow()", "writeSkill()", "reuseSafely()"],
    sections: [
      {
        title: "什么任务适合做成 Skill",
        list: [
          "每周都会重复的资料整理、教程更新或发布包制作。",
          "需要固定安全边界的部署、账号、密钥相关流程。",
          "需要稳定输出格式的报告、清单、PR 描述和验收记录。"
        ]
      },
      {
        title: "Skill 不是万能脚本",
        cards: [
          ["先写边界", "明确哪些内容能公开，哪些只能内部使用。"],
          ["再写步骤", "步骤要短、可执行、能被验证。"],
          ["最后写验收", "让 Codex 知道什么时候该停、什么时候该交付。"]
        ]
      },
      {
        title: "内容生产 Skill 提示",
        code:
          "请把这篇教程改写成：公众号大纲、小红书卡片提纲、X 线程和视频脚本。\n保留人工审核清单，不自动发布，不暴露内部来源策略。"
      }
    ]
  },
  {
    slug: "9-real-workflows",
    kicker: "实战路线",
    title: "真实项目工作流",
    summary:
      "我不建议只学命令。你要把 Codex 放进真实项目：读代码、做功能、修 Bug、补测试、重构和前端验收。",
    map: ["understandCodebase()", "makeSmallChange()", "proveResult()"],
    sections: [
      {
        title: "项目接管顺序",
        list: [
          "先让 Codex 画出项目结构和运行方式。",
          "再找一个低风险小任务。",
          "每次只改一个目标，不顺手重构。",
          "用构建、测试、截图或日志证明结果。"
        ]
      },
      {
        title: "常见实战包",
        cards: [
          ["功能实现", "需求拆解、文件定位、最小改动、测试验证。"],
          ["Bug 修复", "复现、定位、补测试、解释根因。"],
          ["前端 QA", "移动端、溢出、图片加载、真实浏览器截图。"]
        ]
      },
      {
        title: "练习提示词",
        code:
          "请先只读定位实现这个功能需要看的文件。\n列出最小修改方案、风险点和验收方法。\n等我确认后再修改。"
      }
    ]
  },
  {
    slug: "10-automation",
    kicker: "自动化",
    title: "集成与自动化",
    summary:
      "自动化不是让 AI 乱跑，而是把已经验证过的流程交给机器重复执行。",
    map: ["defineTrigger()", "runChecks()", "publishEvidence()"],
    sections: [
      {
        title: "适合自动化的任务",
        list: [
          "定期检查仓库、文档和链接。",
          "根据 Issue 生成初版 PR。",
          "构建后生成验收报告。",
          "把教程拆成卡片、脚本和发布包草稿。"
        ]
      },
      {
        title: "我会保留的门禁",
        cards: [
          ["发布门禁", "账号发布、生产部署和付费动作保留人工确认。"],
          ["内容门禁", "公开文案先做来源和敏感信息检查。"],
          ["质量门禁", "构建、测试、截图或日志必须留下证据。"]
        ]
      },
      {
        title: "自动化任务模板",
        code:
          "触发条件：\n输入：\n允许修改：\n禁止修改：\n必须检查：\n输出证据：\n人工确认点："
      }
    ]
  },
  {
    slug: "11-security-governance",
    kicker: "治理",
    title: "安全与治理",
    summary:
      "越是想用 Codex 提效，越要把安全边界写清楚。安全不是阻碍效率，而是让流程能长期复用。",
    map: ["classifyRisk()", "protectSecrets()", "auditChanges()"],
    sections: [
      {
        title: "个人项目安全清单",
        list: [
          "本地密钥不进仓库。",
          "公开页面不暴露内部研究对象。",
          "部署前扫描敏感词和路径。",
          "高风险命令先解释再执行。"
        ]
      },
      {
        title: "团队治理清单",
        cards: [
          ["权限", "谁能让 Codex 读写哪些仓库。"],
          ["审计", "每次改动是否有记录、PR 和验证证据。"],
          ["回滚", "失败后如何恢复上一版。"]
        ]
      },
      {
        title: "上线前提示词",
        code:
          "请做上线前检查：构建结果、路由、移动端、图片视频、敏感信息、回滚路径。\n只汇报结果，不执行发布。"
      }
    ]
  },
  {
    slug: "12-cheatsheets-faq",
    kicker: "速查",
    title: "速查与 FAQ",
    summary:
      "最后给你一张速查表：遇到问题时，不要慌，先判断是上下文、权限、命令、网络还是产品意图没讲清楚。",
    map: ["checkContext()", "checkPermission()", "checkEvidence()"],
    sections: [
      {
        title: "常用排查顺序",
        list: [
          "上下文够不够：README、AGENTS.md、命令是否清楚。",
          "权限对不对：是否被 sandbox 或审批策略拦住。",
          "命令是否能跑：本地依赖、端口、网络是否正常。",
          "验收是否明确：有没有测试、截图或构建结果。"
        ]
      },
      {
        title: "FAQ",
        cards: [
          ["Codex 能不能直接部署？", "可以协助，但我建议保留人工确认和回滚路径。"],
          ["能不能复制别人的教程？", "不要。学结构和方法，公开内容要原创改写。"],
          ["新手先学什么？", "先学 App、AGENTS.md、小任务 diff、构建验收。"]
        ]
      },
      {
        title: "收尾提示词",
        code:
          "请总结本次任务：改了什么、为什么改、跑了哪些检查、还有什么风险、下一步建议是什么。"
      }
    ]
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

  if (route === "/studio") {
    return <StudioApp />;
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
                  <p>产出教程、卡片、脚本和发布包</p>
                  <em>Ship</em>
                </div>
              </div>
            </div>
            <div className="deck-footer">
              <span>绿色 = 执行</span>
              <span>金色 = 拾取价值</span>
              <span>黑色 = 安全边界</span>
            </div>
          </div>
        </section>

        <section className="codex-section founder-signature" aria-label="AI PickGold brand signature">
          <div className="signature-mark" aria-hidden="true">
            <span>Au</span>
          </div>
          <div className="signature-copy">
            <span>High Soar · 宸的拾金笔记</span>
            <h2>把 Codex 学成一套能交付、能发布、能复盘的工作流。</h2>
            <p>
              AI PickGold 的教程不追求堆概念，而是把真实项目接管、公开内容边界、创作者发布包和
              GitHub 自动化串成一条路线。绿色代表执行，金色代表从信息里拾出可复用的价值。
            </p>
          </div>
          <div className="signature-grid">
            {brandPillars.map(([title, text]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
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
              <a className="part-card" href={part.slug ? routePath(`/tutorial/${part.slug}.html`) : "#parts"} key={part.title}>
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
            text="公开来源只展示官方来源、AI PickGold 自有仓库，以及你明确允许公开的非外部研究对象。"
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
            title="把教程变成能拿走的实战包"
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

        <section className="codex-section private-community" id="learn-with-me" aria-label="Learn Codex with AI PickGold">
          <SectionIntro
            label="Community"
            title="想系统学习 Codex，可以从这里找我"
            text="教程负责打基础，学习群和小红书负责持续更新、答疑和案例共创。这里预留二维码位，后续直接替换成真实图片。"
          />
          <div className="qr-grid">
            {privateCommunity.map((item) => (
              <article className="qr-card" key={item.title}>
                <div className="qr-placeholder" aria-label={`${item.title} ${item.label}`}>
                  <span />
                  <span />
                  <span />
                  <strong>QR</strong>
                </div>
                <div>
                  <span>{item.label}</span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
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
        <span>Au</span>
        <strong>AI PickGold</strong>
      </a>
      <nav className="codex-nav" aria-label="Codex tutorial navigation">
        {navItems.map((item) => (
          <a
            className={item.label === current ? "active" : ""}
            href={routePath(item.path)}
            key={item.label}
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
  const slug = currentRoute().split("/").pop()?.replace(".html", "") || "1-codex-intro";
  const doc = tutorialDocs.find((item) => item.slug === slug) || tutorialDocs[0];

  return (
    <div className="codex-shell">
      <CodexHeader />
      <main className="tutorial-layout" aria-label="Codex tutorial detail">
        <aside className="tutorial-sidebar" aria-label="Tutorial sections">
          <strong>完整目录</strong>
          <nav>
            {tutorialParts.map((part) => (
              <a
                className={part.slug === doc.slug ? "active" : ""}
                href={part.slug ? routePath(`/tutorial/${part.slug}.html`) : routePath("/codex#parts")}
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
      <Header packageStatus={packageStatus} current="Workspace Lab" />
      <main className="studio-main" aria-label="AI PickGold Workspace Lab">
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

function Header({ packageStatus = "ready", current = "Workspace Lab" }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="mark">
          <Sparkles size={18} />
        </div>
        <strong>AI PickGold</strong>
        <span className="version">Codex</span>
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
      <CodexHeader current="Founder IP" />
      <main className="founder-page founder-page-redesign" aria-label="Founder IP profile">
        <section className="founder-hero-v2">
          <div className="founder-hero-text">
            <div className="founder-identity-row">
              <img src={founderAssets.avatar} alt="AI PickGold founder avatar" />
              <div>
                <strong>智辰老师</strong>
                <span>AI PickGold · Codex / 内容工作流</span>
              </div>
            </div>
            <h1>我是智辰老师，跟我学 Codex 和 AI 变现工作流。</h1>
            <p>
              我是一个 AI 知识博主，长期拆解 AI 内容生产、Codex 项目接管、跨平台发布和个人 IP 资产化。
              我紧抓流量机会，但不卖焦虑、不讲玄学，只给方法、证据、步骤和可复用模板。
            </p>
            <div className="founder-actions">
              <a className="primary-action founder-primary" href={routePath("/codex")}>
                <ListChecks size={16} />
                从 Codex 课程开始
              </a>
              <a className="secondary-link founder-secondary" href="#learn-with-founder">
                <MessageSquareText size={16} />
                找我学习
              </a>
            </div>
            <div className="founder-proof-strip" aria-label="Founder proof points">
              <span>AI 工作流</span>
              <span>内容资产</span>
              <span>风险清单</span>
              <span>变现实验</span>
            </div>
          </div>

          <div className="founder-portrait-stage">
            <img className="founder-portrait" src={founderAssets.portrait} alt="Founder at AI workflow desk" />
            <div className="founder-photo-note">
              <strong>长期主义 x 复利思维</strong>
              <span>先求正确，再求观点。</span>
            </div>
          </div>
        </section>

        <section className="founder-media-strip" aria-label="Founder visual assets">
          <img src={founderAssets.banner} alt="AI PickGold banner" />
          <img src={founderAssets.xhsCover} alt="AI PickGold Xiaohongshu cover template" />
          <img src={founderAssets.personalCover} alt="Personal IP cover" />
        </section>

        <section className="founder-story-grid">
          <article className="founder-work-card">
            <img src={founderAssets.workspace} alt="Codex learning and content workflow workspace" />
            <div>
              <span>Method</span>
              <h2>用 AI 把信息、工具和市场机会拆成可执行流程。</h2>
              <p>每个教程都落到一个可复制动作：如何扫描项目、写上下文、做发布包、留证据、复盘结果。</p>
            </div>
          </article>

          <article className="founder-video-card">
            <video
              src={founderAssets.video}
              poster={founderAssets.videoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div>
              <span>HyperFrames</span>
              <h2>把讲解、封面和视频流程做成作品证据。</h2>
              <p>不是只写教程，也会把教程变成短视频脚本、封面图、动态素材和发布包。</p>
            </div>
          </article>
        </section>

        <section className="founder-method-v2" aria-label="Founder method">
          <FounderBlock
            title="拆信息"
            body="把资料、仓库、工具和市场信号拆成清晰问题，不让 AI 乱跑。"
          />
          <FounderBlock
            title="做流程"
            body="把一次性操作写成 AGENTS.md、清单、Skill、教程和可复用模板。"
          />
          <FounderBlock
            title="留证据"
            body="用 GitHub、截图、构建、发布包和复盘记录证明每一步真的跑通。"
          />
        </section>

        <section className="founder-repo-section" aria-label="Founder open source repositories">
          <div className="founder-section-heading">
            <span>Open Source</span>
            <h2>我公开沉淀的 AI 教程和流量工具仓库</h2>
            <p>这些仓库不是摆样子，而是我的内容生产、教程交付和流量复盘证据。</p>
          </div>
          <div className="founder-repo-grid">
            {founderRepos.map((repo) => (
              <a className="founder-repo-card" href={repo.url} key={repo.name} target="_blank" rel="noreferrer">
                <span>{repo.label}</span>
                <h3>{repo.name}</h3>
                <p>{repo.summary}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="founder-learn-cta" id="learn-with-founder">
          <div>
            <h2>想系统学习 Codex、AI 内容生产和个人 IP 变现，来找我。</h2>
            <p>适合想把 AI 从“玩工具”变成“做项目、做内容、做开源仓库、做可复用资产”的人。</p>
          </div>
          <div className="founder-qr-row" aria-label="Founder learning QR placeholders">
            <div className="founder-mini-qr">
              <span>小红书</span>
              <strong>QR</strong>
            </div>
            <div className="founder-mini-qr">
              <span>学习群</span>
              <strong>QR</strong>
            </div>
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
