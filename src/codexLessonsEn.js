import { codexLessonDocs as zhDocs, codexLessonGroups as zhGroups } from "./codexLessons";

const groupNames = {
  "基础入门": "Foundations",
  "桌面端主线": "Desktop App Track",
  "工程工作流": "Engineering Workflow",
  "CLI 与终端": "CLI and Terminal",
  "IDE 与 Cloud": "IDE and Cloud",
  "核心概念": "Core Concepts",
  "配置与定制": "Configuration",
  "扩展能力": "Extensions",
  "真实项目工作流": "Real Project Workflow",
  "集成与自动化": "Integration and Automation",
  "安全与治理": "Security and Governance",
  "速查与附录": "Reference"
};

const lessons = {
  "codex-intro": ["What Codex Is", "Understand Codex as a coding agent that can read, change, run, and verify work."],
  "codex-forms": ["Ways to Use Codex", "Separate the App, CLI, IDE, Web, and Cloud entry points and know when each one fits."],
  "codex-vs": ["Codex vs. Other AI Coding Tools", "Decide when to use Codex, when to stay in the editor, and when a chat tool is enough."],
  "codex-when": ["Good and Bad Tasks for Codex", "Sort work into safe agent tasks, cautious tasks, and tasks that need human approval."],
  "account-auth": ["Account, Plan, and Authentication", "Understand login, API keys, organizations, local credentials, and account boundaries."],
  "first-task": ["Pick a Project and Run the First Task", "Use a low-risk project task to complete the first Codex loop end to end."],
  "model-environment-boundary": ["Model and Environment Boundaries", "Verify models, permissions, environment access, and cost against reliable sources."],
  "desktop-overview": ["Codex App Desktop Overview", "Use the desktop app as the main operating surface for multi-project Codex work."],
  "install-login": ["Install and Sign In", "Install Codex, sign in, choose a workspace, and run a read-only health check."],
  "app-interface": ["App Interface Tour", "Learn threads, input, diffs, terminal output, browser preview, and settings."],
  "thread-modes": ["Local, Worktree, and Cloud Thread Modes", "Choose the right thread mode so parallel tasks do not contaminate each other."],
  "parallel-threads": ["Multiple Projects and Parallel Threads", "Split work into parallel threads while keeping each one bounded and reviewable."],
  "settings": ["App Settings", "Configure appearance, notifications, Git, proxy, and permissions with a clear safety boundary."],
  "shortcuts": ["Shortcuts and Command Menu", "Use keyboard shortcuts and menus to speed up daily Codex operation."],
  "app-commands": ["App Slash Commands", "Control planning, review, status, permissions, and context from slash commands."],
  "git-diff": ["Git Diff and Change Review", "Turn every Codex result into a diff that you can inspect and approve."],
  "worktree-flow": ["Worktree Isolation Workflow", "Use separate worktrees to isolate parallel features, experiments, and risky changes."],
  "browser-preview": ["Built-in Browser and Local Preview", "Make Codex verify real pages instead of only trusting the build log."],
  "chrome-plugin": ["Chrome Plugin", "Use Chrome when a task needs real login state, extensions, or browser context."],
  "computer-use": ["Computer Use", "Let Codex operate desktop apps while keeping high-risk GUI actions under review."],
  "cli-install": ["Install Codex CLI", "Bring Codex into terminal, remote machine, and automation workflows."],
  "cli-basics": ["CLI Basics", "Learn codex, -C, -i, --help, and the basic ways to start a CLI session."],
  "cli-flags": ["Common Global Flags", "Control model choice, approvals, workspace access, and config overrides."],
  "cli-slash": ["CLI Slash Commands", "Use slash commands in the TUI to manage mode, model, plan, status, and context."],
  "cli-session": ["Session Management: Resume and Fork", "Resume, fork, and compact long Codex sessions without losing task boundaries."],
  "cli-exec": ["Non-interactive Mode: codex exec", "Connect stable, low-risk tasks to scripts and CI."],
  "ide-extension": ["Codex IDE Extension", "Use Codex inside the editor for current-file and small-scope changes."],
  "ide-workflow": ["IDE Workflow: Small Edits and Fast Verification", "Keep editor-based AI collaboration within a narrow file scope."],
  "cloud-web": ["Codex Web and Cloud Basics", "Understand cloud task inputs, containers, isolation, and review handoff."],
  "cloud-tasks": ["What Cloud Tasks Are Good For", "Move asynchronous long-running work to Cloud without relying on local private state."],
  "github-integration": ["GitHub Integration: Issue to PR", "Turn a clear issue into a small pull request that can be reviewed and rolled back."],
  "agent-loop": ["The Agent Loop", "Understand the observe, reason, act, verify, and continue loop behind Codex."],
  "thread-context": ["Thread, Turn, and Context", "Manage context size, task boundaries, and session continuity."],
  "sandbox-approval": ["Sandbox and Approval", "Separate read-only work, limited writes, command execution, and human approval."],
  "models-reasoning": ["Models and Reasoning Effort", "Choose the right reasoning effort and verification depth for each task."],
  "config-toml": ["config.toml", "Write user-level and project-level configuration that is understandable and reversible."],
  "permissions-profile": ["Permission Profiles", "Use permission profiles to control file access and command risk."],
  "rules": ["Rules", "Use rules to keep style, safety, testing, and delivery language consistent."],
  "hooks": ["Hooks Lifecycle Scripts", "Run controlled scripts around recurring workflow checkpoints."],
  "agents-md": ["AGENTS.md Project Guide", "Create a project guide that tells Codex how to work inside the repository."],
  "skills": ["Skills", "Package repeatable procedures so Codex can reuse them consistently."],
  "mcp": ["MCP Tool Connections", "Connect browsers, repositories, documents, and internal tools through permissioned MCP tools."],
  "plugins": ["Plugin Capabilities", "Use plugins to extend Codex into design, browser, GitHub, and other workflows."],
  "plugin-management": ["Plugin Management", "Install, evaluate, and remove plugins with a clear trust boundary."],
  "workflow-codebase": ["Understand an Unknown Codebase", "Ask Codex to map a repository before making changes."],
  "workflow-feature": ["Implement a Feature", "Move from requirement to small diff, verification, and review."],
  "workflow-bugfix": ["Fix a Bug", "Reproduce, isolate, patch, and verify a bug with Codex."],
  "workflow-test": ["Write Tests", "Use Codex to add focused tests that protect the changed behavior."],
  "workflow-review": ["Code Review", "Ask Codex to review for bugs, regressions, missing tests, and risky assumptions."],
  "workflow-refactor": ["Refactor and Migrate", "Make structural changes in small reviewable steps."],
  "workflow-frontend": ["Frontend UI Development and QA", "Build UI with responsive layout, screenshots, and visual checks."],
  "integration-collaboration": ["Collaboration Tool Integration", "Bring GitHub, Linear, documents, and browser context into the workflow."],
  "automation-ci": ["CI/CD and GitHub Actions", "Use Codex around CI failure triage, pull requests, and release checks."],
  "sdk": ["SDK and API Boundaries", "Know when to use Codex as a product surface and when to use APIs or SDKs."],
  "local-security": ["Local Security Checklist", "Protect credentials, accounts, production data, and destructive commands."],
  "enterprise-governance": ["Team Governance and Release Gates", "Set team-level review gates, permissions, and escalation rules."],
  "cli-cheatsheet": ["CLI Command Cheatsheet", "Keep the essential CLI commands in one practical reference."],
  "slash-cheatsheet": ["Slash Command Cheatsheet", "Use slash commands quickly during App and CLI sessions."],
  "faq": ["FAQ", "Answer the questions new Codex users ask most often."],
  "glossary": ["Glossary", "Define Codex, agent, sandbox, skill, MCP, thread, and related terms."]
};

function translateLesson(lesson) {
  const [title, summary] = lessons[lesson.slug] || [lesson.title, lesson.summary];
  return { ...lesson, title, summary };
}

export const codexLessonGroupsEn = zhGroups.map((group) => ({
  group: groupNames[group.group] || group.group,
  lessons: group.lessons.map(translateLesson)
}));

export const codexLessonDocsEn = zhDocs.map((doc) => {
  const [title, summary] = lessons[doc.slug] || [doc.title, doc.summary];
  return {
    ...doc,
    kicker: groupNames[doc.kicker] || doc.kicker,
    title,
    summary,
    map: ["readContext()", "runTask()", "verifyResult()"],
    sections: [
      {
        title: "What You Will Learn",
        list: [
          `Explain what "${title}" helps you accomplish in one sentence.`,
          "Decide when this capability is safe to use and when to stop for human approval.",
          "Write a clear, executable, and verifiable Codex prompt.",
          "Check the diff, command output, screenshot, or log evidence before accepting the result."
        ]
      },
      {
        title: "Practice Scenario",
        list: [
          "You are onboarding a real project and want to turn this concept into a small action that Codex can complete and you can verify."
        ]
      },
      {
        title: "Copy-ready Prompt",
        code: `I want to practice "${title}" in this repository.\nFirst inspect the project context, then propose a small low-risk task, execute only the agreed scope, and finish with changed files, verification evidence, and remaining risks.`
      },
      {
        title: "Acceptance Checklist",
        cards: [
          ["Clear scope", "The goal, files, and expected output are specific."],
          ["Safe boundary", "No secrets, private accounts, production writes, or destructive commands are used without approval."],
          ["Evidence included", "The final answer includes changed files, commands or screenshots, and remaining risk."]
        ]
      }
    ]
  };
});
