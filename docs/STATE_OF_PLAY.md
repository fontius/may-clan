# May-Clan — Project State of Play

> Single source of truth for the technical state of this project as of **October 2026**.
> Maintained to survive handoffs between developers and to document decisions that are hard to
> rediscover (especially the DNS situation).

---

## 1. TL;DR

May-Clan is a Toronto → Nigeria shipping / freight-forwarding company website. It is currently a
**single-page Next.js site** deployed on a **personal Vercel Hobby account** and reachable only at
the placeholder URL **`https://may-clan.vercel.app`**.

The real domain **`may-clan.com` is currently broken** — its DNS is served by **Cloudflare**, and the
apex/`www` return **raw WordPress PHP source** (PHP isn't executing on the origin). See §5.

The two highest-impact open issues are:

1. **The contact form is non-functional but reports success** — it posts to a placeholder Formspree
   endpoint (`mayclan-contact`) and never checks the HTTP response. Every enquiry on the live site is
   silently dropped while the user sees *"Message sent successfully!"*.
2. **The domain cannot be pointed at Vercel yet** — DNS lives in a **Cloudflare account we don't
   control** (believed owned by a previous developer), so the registrar-side Netfirms DNS panel is inert.

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js **15.5.27** (App Router) — upgraded to patch critical security CVEs |
| Runtime | React **19.0.0** |
| Styling | Tailwind CSS **v4** (`@import "tailwindcss"`, `@tailwindcss/postcss`) |
| Animation | framer-motion **12.x** |
| Forms | formik **2.4.6** + zod **3.25** + `zod-formik-adapter` |
| Toasts | react-toastify **11.x** |
| Scroll-spy | react-intersection-observer **9.x** |
| Icons | lucide-react (**primary**) + react-icons (used only by dead code — see §7) |
| Fonts | Inter via `next/font/google` (⚠️ **loaded but not applied** — see §7) |
| Email | **Not yet wired** — planned: Resend (see §6) |
| Package manager | npm (shrinkwrapped `package-lock.json`) |

## 3. Repository structure

```
app/
  layout.tsx                 # Root layout, metadata, ActiveSection provider, Cloudinary <Script>
  page.tsx                   # Single-page home (#home / #about / #services / #deals / <Contact/>)
  globals.css                # Tailwind v4 + CSS vars + fadeIn keyframe
components/
  Header.tsx                 # Fixed nav, framer-motion active-link indicator
  Contact.tsx                # Formik contact form (currently broken endpoint)
  Gallery.tsx                # Cloudinary product-gallery widget (orphaned section)
  AnimatedLogisticsBackground.tsx  # Looping hero animation (ships/trucks/packages)
  SubmitBtn.tsx              # DEAD — not imported anywhere
context/active-section-context.tsx  # Shared active-section + click-timestamp state
lib/
  data.ts                    # nav links array (source of truth for SectionName)
  types.ts                   # SectionName = (typeof links)[number]["name"]
  hooks.ts                   # useSectionInView (IntersectionObserver → active section)
  validations.ts             # zod schema (currently only email + message)
```

## 4. Deployment

- **Git remote:** `git@github.com:fontius/may-clan.git` (personal account). Branch: `main`.
- **No `.vercel` directory** → the project is **not** linked to the Vercel CLI locally; deploys
  happen via the GitHub → Vercel git integration.
- **Live placeholder URL:** `https://may-clan.vercel.app` (verified HTTP 200, `server: Vercel`,
  `x-vercel-id` region `iad1`, correct `<title>`).
- **Missing routes (all 404 today):** `/api/contact`, `/robots.txt`, `/sitemap.xml`.
- **Compliance flag:** Vercel **Hobby is non-commercial by ToS**. A live client business site
  belongs on **Pro**. Accepted for now; re-checked when the client decides Hobby vs Pro vs self-host.

## 5. Domain & DNS (⚠️ read carefully — this is non-obvious)

- **Registrar:** Netfirms. Registered `2015-02-21`, **expires `2028-02-21`, auto-renew ON**.
  - Domain Lock: OFF · **Expiry Protection ("Protect My Domain"): ON** (blocks a registrar
    *transfer*, not DNS repointing).
  - Domain admin email: `nikaaustrie@gmail.com` — a **previous developer**, not the client.
- **Authoritative DNS is Cloudflare, NOT Netfirms.** Custom nameservers were set `2025-02-16`:
  `kai.ns.cloudflare.com` / `maya.ns.cloudflare.com`.
  - ⚠️ Consequently the **Netfirms "DNS Records" panel is inert** — every record shown there (the
    2015-era `A @ 66.96.149.32`, etc.) is ignored. Editing it does nothing.
- **Live records (verified via dig / Google DoH):**

| Type | Name | Value | Notes |
|---|---|---|---|
| A | `@` | `172.67.192.182`, `104.21.60.63` | Cloudflare proxy IPs (orange-clouded) |
| A | `www` | same CF proxy IPs | proxied |
| A | `mail`/`webmail`/`cpanel`/`ftp`/`pop`/`imap`/`smtp` | same CF proxy IPs | likely a proxied `*` wildcard |
| MX | `@` | `30 mx.may-clan.com` | → `66.96.140.140/.141` (legacy Netfirms mail) |
| TXT | `@` | `v=spf1 ip4:66.96.128.0/18 include:websitewelcome.com ?all` | legacy HostGator SPF, **softfail** |
| TXT | (DKIM/DMARC) | *none* | no auth beyond that single SPF |
| CAA | — | *none* | no cert restriction (fine for Vercel) |

- **Current apex/`www` content is broken:** `https://may-clan.com` returns
  `content-type: application/x-httpd-lsphp` and the **raw `<?php ... wp-blog-header.php ...` source**
  of a WordPress `index.php`. The old WordPress origin (a LiteSpeed box) is no longer executing PHP.
- **Email:** the client **does not use `@may-clan.com` email** (confirmed). MX/SPF are dead legacy and
  can be freely repurposed for Resend / Cloudflare Email Routing.

### Takeover options (decision pending)

1. **Get the Cloudflare login** from `nikaaustrie` (reachable) — fastest, zero downtime, preserves the zone.
2. **Self-serve takeover:** create a new free Cloudflare account → add `may-clan.com` → change
   nameservers at Netfirms (we *do* have Netfirms panel access). Recreate ~5 records manually.
   Near-zero risk since the live site is already broken.
3. **Restore Netfirms default nameservers** — works but resurrects all legacy 2015 records; messiest.

### Cutover records (once we own DNS)

- `A @ → 76.76.21.21` (Vercel apex IP)
- `CNAME www → cname.vercel-dns.com`
- Both **DNS-only (grey cloud)**. If proxied instead, Cloudflare SSL/TLS must be **Full (strict)** or
  you get redirect loops.
- Clean up: retire the `*` wildcard routing `mail`/`cpanel`/`ftp`/… to the broken WP origin, and
  `mx.may-clan.com` if mail stays unused.

## 6. Email / contact-form plan (Resend)

- **Current:** `components/Contact.tsx` POSTs to `https://formspree.io/f/mayclan-contact` — a
  placeholder. No `app/api/` route, no `.env`, no email SDK installed.
- **Resend facts (verified from pricing/docs):**
  - Free = **3,000 emails/mo, 100/day, 3 custom domains**, 1 webhook endpoint, 30-day retention.
  - Supports verifying a **subdomain** instead of the root → use **`send.may-clan.com`** to keep the
    apex MX free for Cloudflare Email Routing.
- **Recommended architecture:**
  - **Receive:** Cloudflare Email Routing (free) → `info@may-clan.com` forwards to personal inbox
    (and optionally `vital_logistics@ymail.com`).
  - **Send:** `app/api/contact/route.ts` (server route handler — API key never reaches the browser) →
    Resend `from: noreply@send.may-clan.com`, `to: info@may-clan.com`, `replyTo: submitter`.
  - Fix apex SPF (`?all` softfail currently) + add DKIM/DMARC.
- **Account ownership:** client should own the Resend account (reputation isolation from the
  developer's unrelated Payload CMS app, handoff continuity, billing). Developer's personal Resend is
  fine as an **interim** for Phase A, migrated before public launch.

## 7. Known bugs & dead code (inventory)

1. **Contact form false success** — `Contact.tsx` never checks `res.ok`; toasts success on any status.
2. **Inter font never renders** — `globals.css` maps `--font-sans: var(--font-inter)` (line 18) but the
   `body` rule (line 32) hardcodes `font-family: Arial, Helvetica, sans-serif`, discarding the font.
3. **Dark mode is OS-only** — `@media (prefers-color-scheme: dark)` drives ~40 `dark:` variants; no
   toggle exists, contradicting the README's "Dark/light mode support" claim.
4. **No `metadataBase`** — OG image paths are relative → broken link previews. OG (`mayclan-og.webp`)
   and Twitter (`may-clan-og-large.png`) also point at two *different* assets.
5. **Orphaned `/deals` section** — still renders in `page.tsx` (with `<Gallery/>`) but removed from
   `lib/data.ts` nav; `layout.tsx` loads the Cloudinary script globally for every page.
6. **Dead component** `components/SubmitBtn.tsx` — nothing imports it (verified).
7. **Unused dependency** `react-confetti` — referenced nowhere.
8. **Redundant icon lib** react-icons — used only by the dead `SubmitBtn`; consolidate on lucide-react.
9. **`Gallery.tsx`** uses a `setInterval` polling loop + `console.log` spam instead of an `onload`.
10. **README is stale** — says "Next.js 14" and "Formspree for contact forms".

## 8. Environment variables (planned)

| Var | Scope | Notes |
|---|---|---|
| `RESEND_API_KEY` | server | Resend API key, Phase A |
| `CONTACT_TO_EMAIL` | server | recipient for the contact form |
| (later) `RESEND_FROM` / domain | server | `noreply@send.may-clan.com` etc. |

`.env*` is already gitignored; keep keys out of the browser entirely (server route handler only).

## 9. Tooling notes (nvm / repomix)

- Global CLI tools are installed **per Node version** via nvm. Active default is `v24.21.0`, which has
  **neither `repomix` nor `vercel`**.
  - `repomix` exists under `v20.12.2` and `v22.17.0`; `vercel`/`vc` under `v22.17.0` only.
  - Preferred fix: `npx repomix@latest` (reproducible) or add a `.nvmrc` pinning `22.17.0`.
- `repomix-output.xml` (generated 2025-06-09) is **committed and stale** — should be untracked and
  gitignored.

## 10. Roadmap

- **Phase A — Contact form (unblocked, start here):** `npm i resend` → `app/api/contact/route.ts` →
  extend `validations.ts` (`name`, `phone`, `shipmentType`, `origin`/`destination`) → fix `res.ok`
  bug → `.env.local`.
- **Phase B — `info@may-clan.com` (needs Cloudflare):** Email Routing + `send.may-clan.com` Resend
  verification + fix SPF/DKIM.
- **Phase C — Domain cutover (needs Cloudflare):** add domain in Vercel → set A/CNAME records → retire
  wildcard + legacy MX.
- **Phase D — Design fixes:** Inter font, dark-mode toggle, `metadataBase`/sitemap/robots, hero
  rebalance, `prefers-reduced-motion`, `/deals` decision.
- **Phase E — Cleanup/tooling:** delete `SubmitBtn.tsx`, drop `react-confetti`, consolidate icons,
  refresh README, `.nvmrc`, untrack `repomix-output.xml`.

## 11. Open decisions

- [ ] Cloudflare takeover path (get login vs self-serve nameserver change).
- [ ] Resend account owner (client vs developer interim).
- [ ] Contact-form recipient (personal — confirmed as interim; `info@may-clan.com` once routing exists).
- [ ] Redesign scope (polish single page vs multi-page restructure).
- [ ] Client hosting path (Vercel Pro vs self-host) — triggers a second domain cutover if they leave Hobby.