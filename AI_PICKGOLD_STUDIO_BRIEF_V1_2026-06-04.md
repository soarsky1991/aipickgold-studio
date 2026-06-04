# AI PickGold Studio Brief V1

日期：2026-06-04
域名：https://www.aipickgold.com
状态：V1 执行版
用途：产品设计、前端开发、Linear 拆票、GitHub README、Figma 原型和商业化包装的统一 brief

## 0. 核心决定

V1 只做一件事：

> 把 AI PickGold 从 WxMD/CardMD 两个工具，升级成一个面向知识创作者的 AI 内容生产工作台。

北美跨境电商可以纳入，但放在 V2：

> V2 做 `AI PickGold Commerce Lab`，把跨境电商作为商品内容本地化、英文商品页、视频广告脚本、合规清单和卖家服务的垂直应用，不进入 V1 的主工作台范围。

V1 不做普通电商店铺，不做低价货架站，不做一键全平台自动发布，不做泛泛聊天机器人。

## 1. 产品一句话

AI PickGold Studio 是一个 Skill-first 内容生产工作台，帮助独立创作者把一个 Markdown 草稿变成公众号文章、小红书卡片、X 帖子、短视频脚本和人工发布包。

更短的页面文案：

> 一篇 Markdown，生成多平台可发布内容包。

更有个人 IP 味道的文案：

> 我不是展示 AI 有多神奇，而是把 AI 工作流拆成能复用、能审查、能交付、能变现的系统。

## 2. 为什么现在做

现有站点已经不是空白域名，已经具备 V1 的基础：

- `WxMD`：Markdown 转公众号排版。
- `CardMD`：小红书卡片生成。
- API：已有 `/api/convert` 方向。
- 商业信号：Pro、API Key、去水印、授权校验、GitHub Skill 安装路径。
- 运营资产：已有自媒体内容系统、平台风险审查、手动发布边界。
- 个人 IP：已经明确为 AI 工作流、内容变现、机会研究和风险清单。

真正缺的不是再加一个工具，而是把这些能力组织成一个用户能理解、能付费、能持续使用的 Studio。

## 3. V1 定位

### 目标用户

V1 主要服务中文知识创作者和 AI 创作者：

- 公众号作者。
- 小红书知识卡片作者。
- X/Twitter 内容创作者。
- AI 工具教程作者。
- 小团队内容运营。
- 想用 Codex/Claude/ChatGPT 写作和排版的人。

### 核心痛点

这些用户不是不会写内容，而是卡在最后一公里：

- 草稿写好了，但公众号排版麻烦。
- 小红书卡片要重新拆结构。
- X thread 要改写语气。
- 短视频脚本要重写开头和节奏。
- 不同平台要注意风险、AI 标识、封面、标题、CTA。
- 每次发布都要重新整理文件、图片、文案和检查清单。

### V1 价值

用户付费的不是主题样式，而是节省从“好草稿”到“可发布包”的 1-2 小时。

V1 的价值公式：

> Source idea + AI Skill + platform templates + review checklist = publish-ready package.

## 4. V1 产品范围

### Must Have

1. Studio Desk
   - 一个工作台页面。
   - 输入 Markdown 或 source unit。
   - 输出多平台内容包。
   - 展示发布包状态。

2. WxMD
   - 保留现有公众号 Markdown 排版能力。
   - 支持主题切换、预览、复制/导出。
   - 明确 API 转换会发送请求到服务端。

3. CardMD
   - 保留小红书卡片生成能力。
   - 支持 5-7 页知识卡片结构。
   - 支持封面、正文卡、清单卡、CTA 卡。

4. Skill Center
   - WxMD Skill。
   - CardMD Skill。
   - Creator Package Skill。
   - Review Skill。
   - HyperFrames Video Skill 作为早期入口，完整视频产品放 V2。

5. Publish Package
   - 每次生成一个内容包。
   - 包含公众号、小红书、X、短视频脚本。
   - 包含人工发布检查清单。
   - 状态包括 draft、needs review、ready for manual publish、blocked、exported。

6. Pricing
   - Free。
   - Pro。
   - Studio。
   - Custom Setup。

7. Safety Copy
   - 不承诺收益。
   - 不荐股。
   - 不做隐藏账号自动化。
   - 不声称所有内容永远不经过服务器。
   - 不在 UI、文档或日志里展示明文密钥。

### Should Have

- 案例库首版。
- 模板库首版。
- API Playground。
- GitHub README 入口。
- Figma/Linear 路线入口。
- 公开 changelog。

### Not V1

- 北美跨境电商实物店铺。
- 全自动跨平台发布。
- 公开知识机器人。
- 完整 HyperFrames 视频课程。
- 团队协作后台。
- 客户私有部署。
- 投资/证券研究产品化。

## 5. V1 信息架构

建议主导航：

| 路径 | 页面 | V1 目的 |
| --- | --- | --- |
| `/studio` | Studio Desk | 第一工作台 |
| `/wxmd` | WxMD | 公众号排版 |
| `/cardmd` | CardMD | 小红书卡片 |
| `/skills` | Skill Center | Codex/Claude/ChatGPT 工作流入口 |
| `/api` | API | 开发者和高级用户 |
| `/cases` | Case Library | 信任和商业证明 |
| `/pricing` | Pricing | 收费入口 |
| `/about` | About | 个人 IP 和安全边界 |

V2 预留：

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/video-lab` | HyperFrames Video Lab | V2 视频工作流 |
| `/commerce-lab` | AI PickGold Commerce Lab | V2 北美跨境电商内容工作台 |
| `/ask` | Knowledge Bot | V2 公开文档机器人 |

## 6. 第一屏设计 Brief

第一屏不要做传统 SaaS hero，不要一大段口号，不要空泛插画。

第一屏应该直接是工作台：

- 左侧：Markdown/source unit 输入。
- 中间：平台输出 tabs。
- 右侧：当前平台预览。
- 顶部：产品切换和 Pro/API 状态。
- 底部：发布包状态和人工发布检查。

建议 tabs：

- WeChat
- Xiaohongshu
- X
- Video Script
- Package

首屏需要出现的信号：

- 这是一个可用工具，不是营销页。
- 可以从一个草稿生成多平台版本。
- 发布不越权，最终由人确认。
- 可以通过 Skill/API 接入 Codex 工作流。

视觉方向：

- 轻、干净、工具感。
- 不要花哨渐变。
- 不要过度英雄页。
- 不要大面积装饰卡片。
- 用真实编辑器、预览、状态、导出这些产品元素建立信任。

## 7. 核心用户流程

### Flow 1：普通创作者

1. 用户进入 `/studio`。
2. 粘贴 Markdown 草稿。
3. 选择目标平台。
4. 生成公众号文章、小红书卡片、X 帖子和短视频脚本。
5. 查看风险清单。
6. 导出人工发布包。
7. 用户手动发布。

### Flow 2：公众号作者

1. 用户进入 `/wxmd`。
2. 粘贴 Markdown。
3. 选择主题。
4. 预览公众号排版。
5. 复制 HTML 或导出。
6. Pro 用户可使用更多主题和无限导出。

### Flow 3：小红书知识卡片作者

1. 用户进入 `/cardmd`。
2. 输入教程、清单或观点。
3. 生成 5-7 张卡片。
4. 调整封面标题和 CTA。
5. 导出图片。
6. 人工发布到小红书。

### Flow 4：高级用户/API 用户

1. 用户进入 `/skills` 或 `/api`。
2. 安装 Skill 或查看 API。
3. 使用 API key 调用转换。
4. 将输出接入自己的 Codex/Claude/ChatGPT 工作流。

## 8. Publish Package Manifest

V1 内容包建议字段：

```json
{
  "package_id": "pkg_20260604_001",
  "source_title": "用 AI 做一篇多平台内容",
  "source_markdown": "...",
  "audience": "AI creators",
  "platforms": {
    "wechat": {
      "status": "ready_for_review",
      "title": "...",
      "html": "...",
      "word_count": 1200
    },
    "xiaohongshu": {
      "status": "ready_for_review",
      "card_count": 7,
      "cover_title": "...",
      "caption": "..."
    },
    "x": {
      "status": "draft",
      "post": "...",
      "thread": []
    },
    "video": {
      "status": "draft",
      "hook": "...",
      "script": "...",
      "shot_list": []
    }
  },
  "review": {
    "ai_disclosure_required": true,
    "platform_risk": "low",
    "blocked_reasons": [],
    "manual_publish_required": true
  },
  "assets": [],
  "created_at": "2026-06-04T00:00:00+08:00"
}
```

V1 不需要一次实现完整数据库，可以先让 Studio Desk 生成可下载或可复制的结构化包。

## 9. Skill Center V1

V1 至少展示 4 个 Skill：

### WxMD Skill

用途：

- 输入 Markdown。
- 输出公众号排版 HTML。
- 返回 word count、theme、copy-ready content。

### CardMD Skill

用途：

- 输入教程或观点。
- 输出小红书 5-7 张卡片结构。
- 支持封面、正文、清单、总结、CTA。

### Creator Package Skill

用途：

- 输入一个 source unit。
- 输出公众号、小红书、X、短视频脚本。
- 附带风险清单和发布包 manifest。

### Review Skill

用途：

- 检查标题是否夸张。
- 检查 AI 标识。
- 检查平台风险词。
- 检查是否出现收益承诺、荐股、医疗/功效等风险。

V2 再扩展：

- Commerce Skill。
- Knowledge Bot Skill。
- Full HyperFrames Video Skill。

## 10. 定价 Brief

V1 可以先用简单档位测试。

| Plan | 目标用户 | 权益 |
| --- | --- | --- |
| Free | 试用者 | 有限主题、有限导出、保留水印或额度 |
| Pro | 个人创作者 | 无限 WxMD/CardMD 导出、更多主题、去水印 |
| Studio | 重度创作者 | 多平台发布包、Skill/API、模板库、历史记录 |
| Custom Setup | 小团队/创作者 | 定制工作流、品牌模板、私有 Skill、培训 |

建议早期价格区间：

- Pro：29-49 元/月。
- Studio：99-199 元/月。
- 早鸟终身版：399-899 元。
- Custom Setup：999-2999 元起。

V1 价格页不要承诺还没做完的功能。可以把 V2 功能放到 roadmap 或 waitlist。

## 11. 内容和案例库

V1 至少需要 3 个案例：

1. Markdown 文章转公众号排版。
2. 一篇教程转小红书 7 卡。
3. 一个选题转多平台发布包。

每个案例展示：

- 输入。
- 使用的工具或 Skill。
- 输出结果。
- 风险审查。
- 人工发布说明。
- 可复用模板。

案例库是 V1 的信任层，不是锦上添花。

## 12. 安全和隐私边界

必须写清楚：

- 普通浏览器预览可以本地优先。
- API 转换会把请求发到服务端。
- 微信草稿发布需要服务端代理调用官方接口。
- 用户密钥只显示 mask，不写入公开文档。
- 账号发布动作默认停在人工确认。
- 不用 cookie/TLS 绕过平台规则。
- 不生成虚假评论、虚假背书或虚假买家反馈。

必须避免：

- “内容永远不经过服务器”这类过宽说法。
- “一键自动发布全平台”这类高风险卖点。
- “AI 自动帮你赚钱”这类承诺。

## 13. V2 纳入：Commerce Lab

你刚才确认电商可以 V2 纳入，因此 V1 只做预留，不做实现。

### V2 定位

`AI PickGold Commerce Lab` 是跨境商品内容工作台，不是普通北美 DTC 店铺。

一句话：

> 用 AI/Codex 把一个中国商品，拆成北美买家能看懂、能相信、能下单的页面、视频和转化流程。

### V2 功能

- 北美选品研究。
- 英文商品页生成。
- Shopify landing page 原型。
- TikTok/Reels/Shorts 视频广告脚本。
- 产品图/场景图提示词。
- FTC/CBP/CPSC/FDA 风险初筛。
- landed cost / 毛利 / CAC 估算。
- 面向中国卖家的 B2B 服务页。

### V2 不做

- 低价小包直邮作为默认模型。
- 高监管品类。
- 假评论或虚假 UGC。
- 大量囤货。
- 把电商店铺放到主站首屏。

### 和 V1 的关系

- V1：内容生产工作台。
- V2 Commerce Lab：跨境商品内容的垂直工作台。
- V2 Video Lab：商品短视频和知识视频的垂直工作台。
- V2 Knowledge Bot：基于公开案例和模板回答工作流问题。

## 14. V1 成功指标

V1 上线后先看这些指标：

- 每日访问数。
- WxMD 转换次数。
- CardMD 导出次数。
- Studio package 生成次数。
- API key 创建/使用次数。
- Pro 试用或购买意向。
- Skill Center 点击和安装尝试。
- 案例页访问和停留。
- Custom Setup 咨询数。

V1 的成功不一定是马上大量付费，而是证明：

> 用户愿意把 AI 写作后的最后一公里交给 Studio。

## 15. 30 天执行计划

### Week 1：范围和文案

- 确认 V1 brief。
- 对齐隐私、API、发布边界。
- 写 Studio Desk 信息架构。
- 写 Publish Package manifest。
- 确认 V2 Commerce Lab 只作为预留。

### Week 2：界面和原型

- 做 `/studio` 工作台原型。
- 做 `/skills` 页面。
- 做 `/cases` 页面结构。
- 做 pricing 简化版。

### Week 3：功能集成

- 接入 WxMD 输出。
- 接入 CardMD 输出。
- 生成 Creator Package mock 或 MVP。
- 加人工发布 checklist。

### Week 4：案例和发布

- 准备 3 个案例。
- 写 README 和 Skill 安装说明。
- 发布首篇公众号/小红书/X 复盘。
- 收集第一批用户反馈。

## 16. 设计交付提示

给 Product Design / Figma 的 brief：

```text
Design AI PickGold Studio V1 as a utility-first creator workbench, not a marketing landing page.

Preserve WxMD and CardMD as real tools. Add a Studio Desk shell where one Markdown/source unit becomes WeChat, Xiaohongshu, X, and video-script outputs. Show manual publish package status, review checklist, and masked Pro/API state. Keep the design light, clean, practical, and product-led. V2 Commerce Lab should appear only as a roadmap/future module, not a first-screen priority.
```

给前端开发的 brief：

```text
Build /studio as the V1 hub. Use stable tabs for WeChat, Xiaohongshu, X, Video Script, and Package. Keep WxMD/CardMD existing flows accessible. Add a package manifest preview, manual publish checklist, and review status. Do not implement direct account posting in V1. Do not expose plaintext secrets.
```

给内容运营的 brief：

```text
Use real founder workflow cases. Each case should show raw input, AI/Codex step, platform output, review checklist, and manual publish handoff. The story is not "AI replaces creators"; the story is "AI turns content operations into repeatable systems."
```

## 17. Source Artifacts

This V1 brief consolidates:

- `/Users/haochen/Documents/github/aipickgold-studio/AI_PICKGOLD_STUDIO_BRIEF.md`
- `/Users/haochen/Documents/github/aipickgold-studio/商业化网站方向分析_2026-06-03.md`
- `/Users/haochen/Documents/github/aipickgold-studio/COMMERCIAL_WEBSITE_DIRECTIONS_2026-06-03.md`
- `/Users/haochen/Documents/github/aipickgold-studio/北美跨境电商网站调研_2026-06-04.md`

## 18. Final V1 Decision

V1 做：

> Studio Desk + WxMD + CardMD + Skill/API Center + Publish Package + Case Library。

V2 纳入：

> Commerce Lab + Video Lab + Knowledge Bot + Team/Analytics。

第一版最重要的产品判断：

> 先把“内容生产到人工发布包”做顺，再把电商、视频、机器人作为垂直扩展接进来。
