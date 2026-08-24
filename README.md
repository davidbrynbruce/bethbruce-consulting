# Beth Bruce — Independent Commerce Media Analyst & Advisor

Site for Beth Bruce's two-engine brand: The Commerce Media Brief (analysis,
distributed via LinkedIn) and Commerce Growth Advisory (strategy, positioning,
executive advisory, speaking, workshops for retail media networks, CPGs,
agencies, and commerce tech). Built with Lovable's stack: Vite + React 18 +
TypeScript + Tailwind CSS.

## Status

- [x] Site scaffold with placeholder copy (drafted from public info)
- [x] Brand direction locked: Beth Bruce (analyst brand) + Commerce Growth Advisory (commercial engine) + The Commerce Media Brief (content engine)
- [ ] Content brief open items resolved (email, domain, bio approval, Brief home — brief lives in the private planning repo, not here)
- [ ] Lovable project created and GitHub connected
- [ ] Codebase transplanted into the Lovable-created repo
- [ ] Real copy, domain, and deploy

## Local development

```sh
npm install   # or: bun install
npm run dev
npm run build
```

## Connecting Lovable (one-time, done by a human)

Lovable can only sync repos **it creates** — it cannot import an existing repo.
So the flow is:

1. In Lovable: Settings → Connectors (Workspace settings) → **Connect GitHub**,
   authorize the Lovable GitHub App for the `davidbrynbruce` account.
2. Create a new Lovable project (a one-line prompt is fine; it will be
   overwritten). In the project, connect it to GitHub — Lovable creates a new
   repository (e.g. `bethbruce-consulting`).
3. Grant Claude access to that new repo (claude.ai → Settings → Connectors →
   GitHub, or the org's Claude GitHub App settings).
4. Tell Claude Code — it will clone the Lovable-created repo, replace its
   contents with this project (keeping `.git`), and push. From then on Lovable
   and Claude Code share the repo with two-way sync.

**Never rename, move, or delete the Lovable-created repo — that breaks the
sync permanently.**
