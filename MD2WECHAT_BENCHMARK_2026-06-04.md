# md2wechat Benchmark Baseline

Date: 2026-06-04
Scope: public docs plus non-publishing smoke tests for the provided deployment host.

## Source

- Public docs: https://www.md2wechat.cn/api-docs
- Smoke-test host: `http://111.231.20.31:8080`

## Public Positioning

md2wechat positions its Agent API as a publishing-oriented workflow for AI agents that need to turn Markdown into WeChat-ready outputs.

Observed public claims:

- Unified Agent API plan: CNY 199.
- Core docs mention `POST /api/v1/convert`.
- Publishing/material endpoints: `article-draft`, `newspic-draft`, `batch-upload`.
- Headers include `Md2wechat-API-Key`, `Wechat-Appid`, and `Wechat-App-Secret`.
- Documentation references `md2wechat-skill`, `md2wechat-lite`, Claude Code, OpenClaw, and custom server-side agent workflows.
- Themes include native styles, selected themes, and template-color/font combinations.

## Smoke-Test Results

The tests used redacted placeholder credentials only. No real WeChat draft was created.

| Endpoint | Method | Result |
| --- | --- | --- |
| `/` | GET | `404` |
| `/api/v1/convert` | GET | `404` |
| `/api/v1/convert` | POST | `404 page not found` |
| `/api/v1/article-draft` | POST | `INVALID_API_KEY` JSON |
| `/api/v1/newspic-draft` | POST | `INVALID_API_KEY` JSON |
| `/api/v1/batch-upload` | POST | `INVALID_API_KEY` JSON |
| `/article-draft` | POST | `404 page not found` |
| `/newspic-draft` | POST | `404 page not found` |
| `/batch-upload` | POST | `404 page not found` |

Interpretation:

- The provided host has active auth handling for the three publishing/material endpoints under `/api/v1`.
- `POST /api/v1/convert` is documented publicly but was not active on the provided host during this smoke test.
- A full `article-draft` success test requires real WeChat AppId/App Secret and a correctly configured WeChat IP whitelist. It should not be treated as a local/browser-only operation.

## Product Lessons For AI PickGold Studio

- md2wechat sells the API as a real publishing chain, not only a Markdown editor.
- AI PickGold Studio should keep V1 safer: package generation and manual publish handoff first; direct WeChat draft creation belongs behind a Pro/API status, explicit credential gate, and server-side safety copy.
- The `/studio` workbench should show masked API state, package manifest, manual checklist, and a clear boundary between local package export and server-side draft APIs.
- `/api` and `/skills` should eventually document two tiers: local package generation and credentialed publishing integrations.
- Pricing can benchmark against CNY 199 lifetime/unified API language, but AI PickGold should emphasize multi-platform package value rather than only WeChat draft creation.

## Monitor

Automation `monitor-md2wechat-api-docs` was created to check the public docs weekly for new endpoints, pricing, theme, Agent/Skill, and workflow changes.
