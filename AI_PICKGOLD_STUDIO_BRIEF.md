# AI PickGold Studio Brief

Date: 2026-06-03
Domain: https://www.aipickgold.com
Working name: AI PickGold Studio

## 1. Current Evidence

The domain is already a real Next.js product, not an empty site.

- Homepage: WxMD, a Markdown to WeChat article layout editor.
- CardMD: Xiaohongshu card generator.
- Pricing: free, monthly, annual, lifetime, and combined two-product plans.
- API docs: `/api/convert` with API key auth, Markdown input, theme selection, HTML output, and `wordCount`.
- Visible product APIs in client bundle: `/api/license/verify`, `/api/convert`, `/api/publish-wechat`, `/api/publish-wechat/verify`.
- Commercial signals: Pro unlock, API Key modal, watermark removal, unlimited export, WeChat draft publishing, GitHub Skill install path.
- Public repo signal: `aipickgold/md2wx` exists publicly and points homepage to `https://aipickgold.com`.

The strongest current differentiator is not "another web editor"; it is:

> Skill-first creator publishing: write in AI/Codex, render through WxMD/CardMD, produce platform-ready packages, and keep final account publishing under human control.

## 2. Product Positioning

### One-line positioning

AI PickGold Studio is a Skill-first content production workbench for independent creators: one Markdown idea becomes WeChat articles, Xiaohongshu cards, X threads, video scripts, and manual-publish packages.

### Why this has commercial value

The customer does not mainly pay for themes. They pay to save the recurring 1-2 hours between "good draft" and "publishable platform package".

### Founder IP angle

The founder story should be visible and concrete:

- Backend engineer.
- AI Coding practitioner.
- Real self-media operator.
- Built WxMD/CardMD because the pain came from daily content work.
- Product promise: practical creator tooling, not automated spam publishing.

## 3. Target Customers

Primary:

- Chinese independent creators writing in Markdown.
- WeChat public account writers.
- Xiaohongshu knowledge-card creators.
- AI Coding and tool-review creators.
- Small creator teams who need consistent publishing packages.

Secondary:

- Course creators.
- Product-marketing operators.
- Technical founders who publish weekly essays and launch notes.
- Agencies that need repeatable formatting and asset production.

## 4. Recommended Site Shape

The site should become a product workbench first, not a generic landing page.

### First screen

Keep the actual editor as the first experience, but add a small product switcher:

- Write
- Convert
- Package
- Publish handoff

The first screen should show:

- WxMD editor preview.
- CardMD preview.
- "Generate platform package with Codex Skill" as the main workflow.
- Pro/API key status.
- Clear privacy/publishing boundary.

### Main sections

1. Workbench
   - WxMD editor.
   - CardMD editor.
   - One-click package builder.

2. Skill Center
   - Install WxMD Skill.
   - Install CardMD Skill.
   - Example prompts.
   - GitHub repo links.

3. Publish Desk
   - Platform rows: WeChat, Xiaohongshu, X/Twitter, Bilibili/video account.
   - Status values: Draft only, needs review, ready for manual publish, published, blocked.
   - Never imply hidden account automation.

4. API
   - `/api/convert`.
   - License verification.
   - WeChat draft publishing proxy.
   - Usage examples for server-side callers.

5. Pricing
   - Free.
   - Pro.
   - Studio.
   - Custom workflow setup.

6. Case Library
   - Real examples from founder workflow.
   - Before: raw Markdown / messy content.
   - After: platform-ready article/card/thread/publish package.

## 5. Token And API Inventory Template

Do not store plaintext secrets in this document, GitHub, Linear, Figma, or chat.

Use this table for a redacted inventory only.

### Local env integration status

Created on 2026-06-03:

- Env file: `/Users/haochen/.config/aipickgold/env/aipickgold.secrets.env`
- Loader: `/Users/haochen/.config/aipickgold/env/load-aipickgold-env.zsh`
- Redacted inventory: `/Users/haochen/.config/aipickgold/env/aipickgold.secrets.redacted.md`
- Aliyun SSH private key: `/Users/haochen/.ssh/aipickgold_aliyun_ed25519`

Load into a shell only when needed:

```zsh
source ~/.config/aipickgold/env/load-aipickgold-env.zsh
```

The SSH key was validated with `ssh-keygen -y -f` and is readable only by the current user.

Smoke checks on 2026-06-03:

- GitHub token: HTTP 200 from GitHub user API.
- Cloudflare token: HTTP 200 from token verification API.
- md2wx API key: HTTP 200 from `https://www.aipickgold.com/api/convert`.
- cli-proxy management URL: HTTP 200.
- Temporary response files were deleted after status checks.

Important: the secrets were visible in Apple Notes / screen context. Rotate high-risk credentials after migration, especially Aliyun AccessKey, GitHub PAT, Cloudflare token, Render/cli-proxy key, md2wx API key, and the SSH private key.

| Service | Credential type | Purpose | Storage location | Scope | Rotation owner | Last 4 / fingerprint | Last verified | Risk | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Aliyun ECS | SSH key | Server access | Local keychain or `.ssh` | Server login | User | `****` | TBD | High | Confirm key name and rotate if shared |
| Aliyun RAM | AccessKey | DNS/ECS/OSS automation | Secret manager or env only | Least privilege | User | `****` | TBD | High | Prefer RAM sub-account |
| Domain/DNS | DNS credential | `aipickgold.com` records | Aliyun console | DNS only | User | `****` | TBD | Medium | Document registrar and DNS zone |
| Website | License key | Pro unlock | Database or server env | License verify | User | `****` | TBD | Medium | Separate license key from API key |
| Website API | API key | `/api/convert` access | Server env / customer delivery | Convert only | User | `****` | TBD | Medium | Add quota and revoke path |
| WeChat OA | AppID | Draft publishing | Browser local config or secure server path | Draft API | User | `****` | TBD | High | Clarify storage policy |
| WeChat OA | AppSecret | Draft publishing | Never commit; avoid logs | Draft API | User | `****` | TBD | High | Add warning and reset plan |
| GitHub | App/PAT/deploy key | Repo, deploy, issues | GitHub app or keychain | Repo-specific | User | `****` | TBD | Medium | Verify app has repo access |
| Figma | OAuth | Blueprints and screens | Figma connector | Design files | User | Connected | 2026-06-03 | Low | Use drafts unless project specified |
| Linear | OAuth | Roadmap/issues/docs | Linear connector | Haochen team | User | Connected | 2026-06-03 | Low | Create project and PRD |
| Tushare | Token | Public-equity data source | Local env only | Data API | User | `****` | TBD | Medium | Keep separate from creator site |
| Discord | Webhook/bot token | Notifications only | Local env only | Push summary | User | `****` | TBD | Medium | Notifications, not main console |

## 6. Privacy And Safety Copy

Use precise claims:

- Browser preview and ordinary rendering can be local-first.
- API conversion sends Markdown to the server for the request.
- WeChat draft publishing requires a server-side proxy call to WeChat official APIs.
- Secrets must not be logged, committed, or shown in UI except masked.
- Account-touching publish flows should stop at manual confirmation unless the user explicitly confirms a direct publish action.

Avoid saying "content never touches our server" on pages that advertise API conversion or draft publishing.

## 7. Codex Plugin Workflow

### Product Design

Use for:

- Confirming the Studio brief.
- Exploring three visual directions.
- Prototyping the Workbench first screen.

Design brief to confirm:

> Turn aipickgold.com from a two-tool editor into AI PickGold Studio: a Skill-first creator publishing workbench. Preserve the current WxMD/CardMD utility-first surface, add Studio packaging and manual-publish status, and make the founder IP/trust story visible without becoming a generic SaaS hero page.

### Creative Production

Use for:

- Positioning options.
- Offer packaging.
- Launch ads.
- Xiaohongshu/WeChat/X launch assets.

Recommended first path:

1. Positioning.
2. Offers.
3. Assets.

### GitHub

Use for:

- Repo access verification.
- README and Skill docs.
- Issue templates.
- Changelog and release notes.

Current note:

- GitHub connector is authenticated as `soarsky1991`.
- Connector search did not find `aipickgold/md2wx`, even though the public repo exists. This likely means the GitHub App is not installed on that repo/account scope.

### Figma

Use for:

- Product blueprint.
- Workbench screen directions.
- Design handoff.

Created FigJam blueprint:

- https://www.figma.com/board/kVqwcnYgfSx9MTemZc3vNu

### Linear

Use for:

- Roadmap project.
- PRD document.
- Execution issues.

Team:

- Haochen / HAO

Created project:

- https://linear.app/haochen1991/project/ai-pickgold-studio-1565b260cbd4

Created initial issues:

- HAO-14: Align privacy, API, and publishing safety copy.
- HAO-15: Design AI PickGold Studio first-screen workbench shell.
- HAO-16: Define Studio publish-package manifest.
- HAO-17: Build Skill Center page for WxMD and CardMD.
- HAO-18: Verify GitHub connector access and repo issue workflow.
- HAO-20: Rotate exposed high-risk credentials after local env migration.

## 8. Commercial Direction Analysis

Canonical V1 execution brief:

- `/Users/haochen/Documents/github/aipickgold-studio/AI_PICKGOLD_STUDIO_BRIEF_V1_2026-06-04.md`

Detailed report:

- `/Users/haochen/Documents/github/aipickgold-studio/商业化网站方向分析_2026-06-03.md`
- `/Users/haochen/Documents/github/aipickgold-studio/COMMERCIAL_WEBSITE_DIRECTIONS_2026-06-03.md`
- `/Users/haochen/Documents/github/aipickgold-studio/北美跨境电商网站调研_2026-06-04.md`

Core recommendation:

> Build AI PickGold Studio as a Skill-first creator operations workbench, then add Skill/API Center, Case Library, HyperFrames Video Lab, and finally a public-docs knowledge bot.

Commerce extension:

> If North American cross-border e-commerce is pursued, treat it as `AI PickGold Commerce Lab`: a content/tool/workflow validation layer for product pages, ad scripts, compliance checklists, and seller services, not as a first-step low-price DTC inventory business.

## 9. Execution Roadmap

### Phase 1: Trust and positioning cleanup

- Align API pricing copy across pricing and API docs.
- Replace over-broad privacy claims with precise local/API/draft-publish wording.
- Add a "Why Skill-first" explainer.
- Add founder IP block with real workflow examples.

### Phase 2: Studio shell

- Add product switcher: WxMD, CardMD, Studio Desk, Skill Center.
- Add publish status model: draft, needs review, ready for manual publish, blocked, published.
- Add package manifest shape for platform-ready exports.
- Add API/token status panel with masked values only.

### Phase 3: Commercial packaging

- Add Studio plan.
- Add custom workflow setup offer.
- Add case library and launch assets.
- Add GitHub README flow from install command to real output package.

### Phase 4: Analytics and operations

- Track free editor usage, Pro unlock attempts, conversions, package generation, API usage.
- Keep local creator content workflows as the system of record.
- Use Discord only for notifications, not as the main operating console.

## 9. Candidate Linear Issues

1. Align privacy and API copy for WxMD/CardMD
   - Fix contradictory local-only claims.
   - Mention API and WeChat draft publishing request boundaries.
   - Add no-plaintext-secret rule to docs.

2. Add AI PickGold Studio first-screen workbench shell
   - Preserve editor-first experience.
   - Add tabs for WxMD, CardMD, Studio Desk, Skill Center.
   - Show Pro/API status with masked credentials.

3. Create Studio publish-package manifest
   - Define platform, status, assets, copy, disclosure, and manual-publish checklist.
   - Support WeChat, Xiaohongshu, X/Twitter, and video platforms.

4. Build Skill Center page
   - Install commands.
   - Example prompts.
   - GitHub repo links.
   - Safe publishing boundary.

5. Create commercial offer page for Studio tier
   - Free, Pro, Studio, Custom.
   - Explain time saved, workflow value, and custom setup.

6. Verify GitHub connector access to `aipickgold/md2wx`
   - Confirm GitHub App installation scope.
   - Add issue templates after access is available.

## 10. Immediate Recommendation

The highest-value next build is not a new landing page. It is:

> A Studio Desk page that takes the current WxMD/CardMD engines and shows a multi-platform publish package with manual-confirmation status.

That single screen connects the existing product, personal IP, Codex skills, GitHub open-source growth, and self-media operations into one commercial story.
