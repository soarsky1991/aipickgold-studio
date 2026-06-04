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

  if (route === "/founder" || route === "/about") {
    return <FounderPage />;
  }

  return <StudioApp />;
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
