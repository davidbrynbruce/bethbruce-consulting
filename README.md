# Beth Bruce — Independent Commerce Media Analyst & Advisor

Site for Beth Bruce's two-engine brand: The Commerce Media Brief (weekly
analysis, distributed via LinkedIn) and Commerce Growth Advisory (strategy,
positioning, executive advisory, speaking, workshops for retail media
networks, CPGs, agencies, and commerce tech). Built with Lovable's stack:
Vite + React 18 + TypeScript + Tailwind CSS, with react-router.

## Status

- [x] Site scaffold with placeholder copy (drafted from public info)
- [x] Brand direction locked: Beth Bruce (analyst brand) + Commerce Growth Advisory (commercial engine) + The Commerce Media Brief (content engine)
- [x] The Commerce Media Brief: archive at `/brief`, per-week sub-pages at `/brief/<date>`, first edition published
- [ ] Weekly Brief automation armed (Claude Routine — pending approval)
- [x] Contact form live — leads go to Beth via FormSubmit (first submission triggers a one-time activation email she must confirm)
- [ ] Content brief open items resolved (domain, bio approval, headshot — brief lives in the private planning repo, not here)
- [ ] Lovable GitHub sync connected
- [ ] Real copy, domain, and deploy

## Local development

```sh
npm install   # or: bun install
npm run dev
npm run build
```

## The Commerce Media Brief — how editions work

Editions are data, not pages. Each week is one file:

- `src/content/types.ts` — the `BriefEdition` type (stories, links, quick hits)
- `src/content/briefs/edition-YYYY-MM-DD.ts` — one file per edition,
  exporting `edition`
- `src/content/briefs/index.ts` — auto-discovers every `edition-*.ts` via
  `import.meta.glob` and sorts newest-first

Routes: `/` (home, shows the latest edition), `/brief` (archive),
`/brief/<slug>` (edition sub-page). Publishing a new edition = adding one
file and pushing; no other code changes.

### Weekly publishing runbook (automated via Claude)

Every Monday morning, a Claude run should:

1. Pull `origin main` first (Lovable may have pushed UI changes; never
   force-push — merge if needed).
2. Research the past 7 days in retail/commerce media via web search
   (Walmart Connect, Amazon Ads, Roundel, KPM, Instacart, Criteo and other
   RMNs/ad tech; ANA/IAB measurement & standards; agentic commerce;
   earnings and M&A), plus the retail-media items flagged in that week's
   "Beth's Job Search Brief" emails.
3. Write `src/content/briefs/edition-<date>.ts` in the established voice:
   4–6 stories, two short analyst paragraphs each, the second ending in a
   "The read:" takeaway, plus quick hits. **Only link URLs that actually
   appeared in search results — never construct or guess a URL.** Public
   reporting only.
4. Verify with `bun install && bun run build`.
5. Commit and push to `main`.
6. **Send the newsletter**: fetch active subscribers from the Supabase
   project `bethbruce-site` (`select email from brief_subscribers where
   unsubscribed_at is null`), process any "unsubscribe" replies in Gmail
   first (set `unsubscribed_at` for those emails), then send ONE Gmail
   message — To: davidbrynbruce@gmail.com, BCC: all subscribers — with
   subject "The Commerce Media Brief — <edition title>" and an HTML body
   rendering the edition (title, dek, stories with reads and coverage
   links, quick hits, link to the web edition) plus a footer:
   "You're receiving this because you subscribed at the site. Reply
   'unsubscribe' to stop." If Gmail or Supabase tools are unavailable in
   the automated run, skip the send and flag it for an interactive session.

Signups are stored in Supabase (`brief_subscribers`, insert-only for the
site's publishable key; the list is readable only with admin access).

### Welcome send (hourly)

New subscribers get the latest edition immediately-ish: an hourly Claude
run checks `brief_subscribers` for rows where `welcomed_at is null and
unsubscribed_at is null`, emails each one the latest edition (personal
To:, same unsubscribe footer), and sets `welcomed_at`. The Monday send
then covers everyone weekly. Instant-on-signup requires an email API key
(e.g. Resend) wired to a Supabase edge function — the planned upgrade.

## Site editor (basic CMS)

`/admin` is a lightweight content editor: sign in (email + password;
first visit uses "Create an account" with a one-time email confirmation)
and edit the homepage's hero, Brief intro, advisory offerings, about
bio/credentials, contact copy, and upload a headshot. Content lives in
Supabase (`site_content` row `site`; images in the public `site-assets`
bucket) and the site reads it at load time with the code's copy as
fallback — publishing an edit needs no rebuild. Anyone can create an
account, but row-level security only lets the allow-listed editor
emails save; add an editor by adding their email to the
`site_content`/`storage.objects` policies. Brief editions are not
edited here — they stay code-managed by the weekly automation.

## Connecting Lovable (one-time, done by a human)

Connect GitHub in Lovable (Settings → Connectors), point the project at this
repo, and enable Git sync in workspace Git settings. **Never rename, move,
or delete the synced repo — that breaks the sync permanently.**
