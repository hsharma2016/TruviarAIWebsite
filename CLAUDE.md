# CLAUDE.md — Truviar AI Consulting
## Project Guide for Claude Code Sessions

Read this file fully before taking any action in this project. This is the single source of truth for how Claude should behave, what is being built, and how every decision should be made.

---

## 1. Business Context

**Business Name:** Truviar AI Consulting  
**Founder:** Hemant Sharma, Co-Founder  
**Location:** Noida, India (IST, UTC+5:30) — remote-first, serving clients globally  
**Website:** [update when live]  
**Contact Email:** hemant@truviar.com [confirm before deploying]  
**LinkedIn:** [insert URL before deploying]  

### What This Business Does
Truviar AI Consulting builds and operates outbound B2B sales systems for consulting firm owners. We guarantee 10 qualified sales appointments on a client's calendar every month, or the following month is free. We are not a marketing agency. We are not an ad agency. We are a predictable pipeline engine.

### Core Offer
- **Name:** B2B Sales Accelerator  
- **Price:** $3,500/month (retainer)  
- **Guarantee:** 10 qualified sales appointments per month or next month is free — no fine print  
- **Delivery:** Cold email outreach, LinkedIn campaigns, AI-powered follow-up sequences, prospect qualification, CRM setup and reporting, monthly optimisation  
- **Onboarding to first appointments:** 30 days  

### Target Client (ICP)
- **Who:** Owners, Managing Partners, or Principals of consulting firms  
- **Firm types:** Management, IT/technology, financial/CFO advisory, marketing/growth, engineering/operations, HR/organisational  
- **Firm size:** 1–50 consultants; high-ticket project model ($20k+ per engagement)  
- **Geography:** English-speaking markets globally  
- **Pain points:** Feast-or-famine revenue cycle, referral dependency, no scalable client acquisition system, too busy delivering to prospect consistently  
- **Values:** Predictability, proven process, measurable ROI, efficiency, scalability  

### Founder Credibility Framing
Hemant's background is Mechanical Engineering with experience at General Motors and BMW. Always frame this as **process rigour, analytical discipline, and B2B results accountability** — never engineering jargon. The narrative: complex systems only work when every variable is controlled, measured, and optimised — client acquisition is no different.

---

## 2. Website — Tech Stack & Design System

### Stack
- **Format:** Single-file HTML/CSS/JS unless a multi-page build is explicitly requested  
- **No frameworks** unless explicitly asked — no React, Vue, Tailwind, Bootstrap  
- **Fonts:** Google Fonts — `Cormorant Garamond` (headings, weights 400/500/600) + `DM Sans` (body, weights 300/400/500)  
- **Icons:** Unicode/emoji sparingly or inline SVG — no icon library CDN unless asked  
- **Forms:** Vanilla HTML. Form submit handler shows confirmation state without page reload  

### Design Tokens — always use these CSS variables, never hardcode colors
```css
:root {
  --navy:    #0B1A2E;   /* primary dark background */
  --navy2:   #162844;   /* secondary dark surface */
  --gold:    #C9A84C;   /* primary accent — CTAs, highlights */
  --gold-lt: #E8D49A;   /* light gold — text on dark backgrounds */
  --cream:   #F7F4EE;   /* warm off-white sections */
  --white:   #FFFFFF;
  --gray1:   #8A8F99;   /* muted body text */
  --gray2:   #D4D6DB;   /* borders, dividers */
  --text:    #1A1F2E;   /* default body text on light backgrounds */
  --radius:  4px;
  --max:     1160px;    /* max container width */
}
```

### Typography Rules
- `h1–h4`: `font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; line-height: 1.15;`  
- Body: `font-family: 'DM Sans', sans-serif; font-weight: 400; line-height: 1.7;`  
- Eyebrow labels: `font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--gold);`  
- `h1` responsive size: `clamp(2.8rem, 5vw, 4.4rem)`  
- `h2` responsive size: `clamp(2rem, 3.5vw, 3rem)`  
- Never use Arial, Inter, Roboto, or system-ui as primary fonts  

### Layout Rules
- Max container: `1160px`, centered, `padding: 0 24px`  
- Standard section padding: `96px 0`; compact: `64px 0`  
- Responsive grids: `repeat(auto-fit, minmax(Xpx, 1fr))`  
- Mobile breakpoint: `768px` — stack all multi-column layouts to single column  
- Nav: fixed, `z-index: 100`, navy background with gold accent  

### Button Classes
```css
.btn--gold   /* gold bg #C9A84C, navy text — primary CTA */
.btn--ghost  /* transparent, gold border, gold text — secondary CTA */
.btn--dark   /* navy bg, white text — used on gold/light backgrounds */
```
All buttons: `transition: opacity .2s, transform .15s` — hover lifts slightly.

### Card Pattern
- Border: `1px solid var(--gray2)`; border-radius: `var(--radius)`; padding: `32px`  
- Hover state: `border-color: var(--gold)` + `box-shadow: 0 4px 24px rgba(201,168,76,.1)`  

### Section Color Alternation
| Section | Background | Body text color |
|---|---|---|
| Hero | `--navy` | `rgba(255,255,255,.65)` |
| Trust bar | `--cream` | `--gray1` |
| Problem | `--white` | `--gray1` |
| Services | `--navy` | `rgba(255,255,255,.6)` |
| Guarantee | `--gold` | `rgba(11,26,46,.75)` |
| Process | `--white` | `--gray1` |
| About | `--cream` | `--gray1` |
| Testimonials | `--cream` | `--text` |
| Podcast | `--white` | inner card is `--navy` |
| FAQ | `--cream` | `--gray1` |
| Contact form | `--navy` | `rgba(255,255,255,.6)` |
| Footer | `#060E1A` | `rgba(255,255,255,.4)` |

---

## 3. Copy & Messaging Rules

### Voice & Tone
- **Professional and authoritative** — we understand the consulting firm owner's world  
- **Results-oriented** — every sentence points toward a measurable outcome  
- **Process-driven** — explain the "how" clearly; vagueness destroys trust at this price point  
- **Empathetic but not soft** — acknowledge the pain, then move immediately to the solution  
- **No hype** — never write "revolutionary," "game-changing," "world-class," or "cutting-edge" without hard evidence  
- **British spelling** for all consulting copy: optimise, recognised, behaviour, colour, programme  

### Headline Formula
Pain or aspiration → specific outcome → implied mechanism:
- "Stop Chasing Projects. Start Choosing Clients."
- "10 Qualified Sales Appointments. Guaranteed. Every Month."
- "Built on Engineering Rigour. Driven by Revenue Results."
- "From Sign-Off to Full Pipeline in 30 Days."

### CTA Copy Standards
| Use | Copy |
|---|---|
| Primary | "Book Your Strategy Session →" |
| Primary alt | "Schedule a Discovery Call →" |
| Guarantee CTA | "Hold Us to It — Book a Call" |
| Secondary | "See How It Works" / "Explore the Accelerator" |
| Never use | "Click here," "Learn more," "Sign up," "Get started" (too generic) |

### What to Never Write
- Engineering jargon (torque, tolerances, CAD, specifications) — unless directly asked  
- Position us as a "marketing agency," "ad agency," or "lead gen company"  
- Promises beyond the 10-appointment guarantee without my explicit sign-off  
- Invented specific metrics ("increased revenue by 340%") — use illustrative language only  
- First-person "we" in testimonials — those are client voices  
- Anything that implies episodes of the podcast are currently available (they are not)  

### Testimonial Disclaimer
Always append this when using placeholder/illustrative testimonials:
> *Testimonials are illustrative of the results and transformations we deliver. Client identities kept confidential at their request.*

---

## 4. Page Sections — Reference Order

The homepage follows this exact section order. Do not reorder without asking:

1. Fixed navigation (navy + gold)
2. Hero — headline, subhead, dual CTA, 3-stat proof bar
3. Trust bar — GM + BMW credential strip (cream)
4. Problem / Pain — 4 pain-point cards
5. Services / Solution — B2B Sales Accelerator 6-step breakdown (navy)
6. Guarantee — gold band, badge, copy, CTA
7. How It Works — 5-step vertical numbered timeline
8. About — 2-col: founder photo placeholder + story + bullet credentials
9. Testimonials — 3 cards + disclaimer note
10. Podcast — dark card: art + name + topics + CTAs
11. FAQ — `<details>` accordion, 7 questions minimum
12. Contact / CTA form — navy bg, full lead capture form
13. Footer — brand, 3 link columns, bottom bar

---

## 5. Podcast

**Name:** The Consulting Growth Blueprint  
**Status:** Inaugural season in production — no public episodes yet  
**Audience:** Consulting firm owners, managing partners, principals  
**Topics:** AI in Consulting · Scaling Consulting Firms · Sales Automation · Predictable Client Acquisition · Business Growth Strategies  
**Purpose:** Thought leadership and guest visibility — not a direct sales channel  
**Guest CTA:** "Apply to Be a Guest"  
**Listener CTA:** "Notify Me on Launch"  

Never imply episodes are live or available until I explicitly confirm a launch date.

---

## 6. File & Folder Structure

```
truviar-website/
├── index.html              # Main website (single file)
├── CLAUDE.md               # This file — never delete or overwrite
├── assets/
│   ├── images/             # Founder photo, logos (add when available)
│   └── icons/              # Custom SVG icons if needed
├── .claude/
│   └── skills/             # Project-specific Claude Code skills
└── README.md               # Deploy instructions and checklist
```

- Never delete or modify CLAUDE.md  
- Flag all placeholder values with `<!-- TODO: update before deploy -->`  
- Never hotlink external images for production  
- Image placeholders use initials (HS) or geometric shapes inline  

---

## 7. Deployment Checklist (fill in before first deploy)

- [ ] Domain confirmed: `_______________`  
- [ ] Hosting platform: `_______________` (Vercel / Netlify / GitHub Pages / other)  
- [ ] Contact email confirmed and updated everywhere  
- [ ] LinkedIn URL inserted  
- [ ] Form backend connected: `_______________` (Tally / Formspree / Calendly embed / webhook)  
- [ ] Analytics added: `_______________` (GA4 / Plausible / none)  
- [ ] All `<!-- TODO -->` comments resolved  
- [ ] Mobile layout tested at 375px, 768px, 1280px  
- [ ] All CTAs tested end-to-end  

---

## 8. Scope — What Claude Can Do vs. Must Ask First

### Do Without Asking
- Edit copy, fix bugs, adjust styles within the established design system  
- Add new FAQ entries, testimonials, or feature bullets in the established voice  
- Improve responsiveness and accessibility  
- Add new sections that follow existing component and color patterns  

### Ask Before Doing
- Changing any CSS variable / design token  
- Adding a new JavaScript library or external CDN dependency  
- Restructuring page section order  
- Changing pricing, guarantee terms, or any stated business fact  
- Creating a new page (vs. a new section)  
- Integrating any third-party service (CRM, analytics, chat widget, email tool)  
- Adding cookies, localStorage, or sessionStorage  

### Never Do
- Hardcode colors instead of using CSS variables  
- Use `!important` without a comment explaining why  
- Write Lorem Ipsum — always write real on-brand copy or ask for content  
- Remove or soften the guarantee section or its language  
- Break mobile responsiveness  
- Skip `alt` attributes on images or use non-semantic HTML  

---

## 9. Session Startup Protocol

At the start of every Claude Code session, confirm:
1. What specific task is being worked on (new feature / bug fix / copy update / new page)?
2. Are there any `<!-- TODO -->` placeholders that affect this task?
3. Does this task require changing anything in Section 8's "Ask Before Doing" list?

If the task is ambiguous, ask **one focused clarifying question** before writing any code or copy.

---

## 10. Quick Reference Card

| Field | Value |
|---|---|
| Business | Truviar AI Consulting |
| Founder | Hemant Sharma |
| Offer name | B2B Sales Accelerator |
| Price | $3,500/month |
| Guarantee | 10 qualified appts/month or next month free |
| ICP | Consulting firm owners / MDs / principals |
| Credibility hook | Mechanical Engineer · General Motors · BMW |
| Podcast | The Consulting Growth Blueprint (not yet live) |
| Primary CTA | Book Your Strategy Session |
| Copy style | British spelling · professional · no hype |
| Primary accent | Gold `#C9A84C` on Navy `#0B1A2E` |
| Heading font | Cormorant Garamond |
| Body font | DM Sans |
| Max container | 1160px |

---

*Last updated: [add date before committing]*  
*Owner: Hemant Sharma · hemant@truviar.com*
