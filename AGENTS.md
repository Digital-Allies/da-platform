# da-platform — Digital Allies CMS monorepo

One repo, five codebases, full history preserved.

- sites/digitalallies — Digital Allies' own website
- sites/healthcare-training-center — client site
- sites/atomic-finds — client site
- packages/design-system — the shared DA design system
- tools/build-workflows — global CMS / site-build workflow system

Rules:
- Shared tokens/components/styles live ONLY in packages/design-system.
- Sites consume the design system; never copy components into a site.
- Platform-wide behavior belongs in tools/build-workflows.
- Workspace-wide conventions: see ../AGENTS.md
