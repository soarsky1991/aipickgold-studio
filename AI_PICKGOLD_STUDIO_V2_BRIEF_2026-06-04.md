# AI PickGold Studio V2 Brief

Date: 2026-06-04
Live studio: https://soarsky1991.github.io/aipickgold-studio/studio/
Founder IP: https://soarsky1991.github.io/aipickgold-studio/founder/
Repository: https://github.com/soarsky1991/aipickgold-studio

## Product Judgment

V1 proved that one Markdown draft can be transformed into a multi-platform publishing package. V2 must make the product feel less like a component demo and more like a creator workbench with a clear user job, business path, and trust boundary.

## Target User

- Creator with an existing draft who does not want to restart in four different platform editors.
- Personal IP operator who needs repeatable content packaging, review, and manual publishing handoff.
- Small team or founder who needs an AI workflow that can become a paid service, not just a prompt demo.

## Core User Job

Turn one source draft into:

- platform-native WeChat, Xiaohongshu, X, and video outputs;
- a visible review checklist with blockers;
- a ZIP package for manual publishing;
- a repeatable history/API path for advanced users.

## Business Logic

- Free value: editable draft-to-package workbench.
- Paid upgrade: package history, API gateway, team review, private workflow configuration, and managed setup.
- Founder IP conversion: the founder page sells the operator's ability to turn AI workflows into systems that are reusable, reviewable, deliverable, and monetizable.

## Trust Boundary

The product must not imply unsafe account automation. V2 keeps final publishing manual by default. Credentialed account actions and md2wechat-style draft APIs stay gated behind server-side Pro/API paths.

## Shipped In This Iteration

- GitHub Pages deployment from `main` `/docs`.
- `/studio/` static route with V2 strategy strip: User, Job, Business, Trust.
- `/founder/` static route for personal IP promotion.
- Route normalization so `/studio`, `/studio/`, `/founder`, and `/founder/` resolve correctly.
- Desktop and mobile QA for layout width, rendered titles, and active navigation.

## Creative Positioning Routes For Next Iteration

1. Creator Operating Desk
   Promise: stop copy-pasting drafts into every platform.
   Use when selling to knowledge creators and self-media operators.

2. AI Workflow Productization
   Promise: turn repeated content operations into reusable product systems.
   Use when selling consulting, setup, and private workflow builds.

3. Manual-Publish Safety Layer
   Promise: AI helps package; the human still controls publishing.
   Use when earning trust around accounts, API keys, and platform risk.

4. Founder Proof Page
   Promise: the product demonstrates how High Soar works.
   Use when converting visitors into service leads or collaborators.

## Linear Sync Packet

Create or update a Linear issue when OAuth is restored:

Title: AI PickGold Studio V2 user/business/product redesign
Project: AI PickGold Studio
Team: Haochen
State: Done for this shipped slice; keep follow-up issues open.

Description:

- Shipped live Studio V2 IA and Founder IP route.
- Evidence: `/studio/` and `/founder/` both return 200 and render expected route content.
- User thesis: creator arrives with an existing draft and wants a reviewed package, not another blank editor.
- Business thesis: free utility leads to Pro package history, API gateway, team review, and managed setup.
- Product thesis: Studio must lead with the job and review state before advanced API controls.

Follow-up issues:

- Add package history and saved runs.
- Add server-side md2wechat draft API integration with secret storage.
- Add lead capture/contact CTA to Founder IP page.
- Add platform output quality controls and review presets.
- Add onboarding sample drafts for creator, consultant, and small-team use cases.
