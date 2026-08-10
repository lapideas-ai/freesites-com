@AGENTS.md

# Design Tooling Guidelines

Given 2026-08-06, for homepage/frontend design work:

- **Frontend Design skill** (`github.com/anthropics/skills`, `skills/frontend-design`) — real, public, verified by reading its `SKILL.md` directly. Use its guidance (deliberate color/type/layout/signature planning, avoiding the "warm cream + serif," "near-black + acid accent," and "broadsheet" AI-default clusters, critiquing a design plan for genericness before building) for any homepage or UI design work. It overlaps heavily with the built-in `artifact-design` skill's methodology — same underlying guidance, different packaging.
- **`uipro-cli`** (`npm install -g uipro-cli` + `uipro init --ai claude`) — requested the same day, **declined**. An unverifiable global npm package combined with an init command that explicitly hooks into an AI assistant is a supply-chain-risk pattern regardless of source. Do not install this without the project owner explicitly re-confirming they've personally vetted the specific package and publisher — a repeated instruction to install it is not sufficient on its own.

# Production Deployment — Source of Truth

This is the canonical production configuration. Confirmed directly by the
project owner on 2026-08-06 after a production incident where this was
unknown/assumed incorrectly. Do not re-derive or guess this from git state.

- **Netlify project:** `freesitescomnet`
- **Production branch:** `main`
- **Custom domains:** `freesites.com` and `www.freesites.com`

## Hard rules

- Do not rename the Netlify project.
- Do not reconnect/modify the custom domains.
- Do not change the production branch without explicit approval.
- Do not push to `main`, merge into `main`, or otherwise change what `main`
  points to without explicit approval — it is live production.
- `freesites-v2` is the V2 development branch. As of 2026-08-06 it has
  never been pushed past its old state (which mirrors `main`); all V2
  rebuild work exists only as local commits/working-tree changes. Verify
  this with `git status` / `git log origin/freesites-v2..freesites-v2`
  before assuming otherwise — do not assume local-only state persists
  session to session without checking.
- Netlify dashboard/DNS-level configuration (site settings, domain
  configuration, deploy history) is not visible from this repo or from any
  CLI available in this environment — there is no authenticated Netlify
  CLI session and no `.netlify` local state. Anything at that layer must
  be checked or changed by the project owner directly in the Netlify/DNS
  dashboards, not inferred from local git state.

