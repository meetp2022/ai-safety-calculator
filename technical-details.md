# Career Index — AI Job Safety Calculator

> **Live Site:** [careerindex.tech](https://careerindex.tech)
> **Repository:** [github.com/meetp2022/ai-safety-calculator](https://github.com/meetp2022/ai-safety-calculator)

---

## 1. Executive Summary

Career Index is a web-based career intelligence platform that helps professionals understand how artificial intelligence will impact their specific job role — **task by task, not job by job**. The flagship product, the **AI Job Safety Calculator**, breaks a job down into its component tasks and scores each one against four proprietary AI-exposure metrics. The result is a personalized **Career Exposure Score (0–100)** with a detailed diagnostic report.

### What Makes It Different

| Traditional Approach | Career Index Approach |
|---|---|
| "Will AI take my job?" | "Which of my daily tasks are most exposed?" |
| Binary yes/no answers | Granular 0–100 score per task |
| Generic industry predictions | Role-specific, task-weighted analysis |
| No actionable output | Identifies human advantages and upskilling targets |

---

## 2. Product Vision & Design Philosophy

### Core Principles

- **Task Impact over Job Replacement** — AI automates tasks, not entire jobs. The tool reflects this by scoring each task independently.
- **Tap-Only UI** — Zero text entry. Every input is a button tap, making the tool accessible on mobile and completable in under 60 seconds.
- **Explainable Scoring** — Every score is derived from a deterministic, transparent formula (TIS). Users can drill down into the exact factors that produced their result.
- **Zero-Knowledge Privacy** — All calculations run entirely client-side. No personal data, role selections, or task configurations leave the user's device.
- **Non-Alarming Language** — Uses constructive terms like "Exposure", "Shift", and "Augment" rather than "replacement" or "danger".

---

## 3. Technology Stack

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.1.11 | React framework with App Router, SSR/SSG, file-based routing |
| **React** | 19.0.0 | UI component layer |
| **TypeScript** | 5.9.3 | Type-safe development across all source files |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS with CSS-based `@theme` configuration |
| **PostCSS** | 8.5.6 | CSS processing pipeline with `@tailwindcss/postcss` plugin |

### Build & Tooling

| Tool | Purpose |
|---|---|
| **ESLint** | Code quality and Next.js best practices |
| **Vercel** | Hosting, CI/CD, automatic deployments from `main` branch |
| **Umami Analytics** | Privacy-first, GDPR-compliant analytics |
| **Namecheap** | Domain registration for `careerindex.tech` |
| **Git / GitHub** | Version control and collaboration |

### Key Design Decisions

1. **No external API calls** — The entire scoring engine runs client-side in the browser. This eliminates server costs, latency, and privacy concerns simultaneously.
2. **Static data layer** — Role and task data are stored as JSON files rather than a database, enabling zero-infrastructure deployment and instant page loads via SSG.
3. **Tailwind v4 CSS-first config** — Brand colors are defined in `globals.css` using the `@theme` directive, not in `tailwind.config.ts`, following the v4 migration path.
4. **React 19** — Using the latest React with concurrent features for smooth UI transitions during the multi-step calculator flow.

---

## 4. Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                    │
│                                                          │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Next.js  │  │  Calculator  │  │  Scoring Engine    │  │
│  │ App      │──│  Component   │──│  (TypeScript)      │  │
│  │ Router   │  │  (7-step UI) │  │                    │  │
│  └──────────┘  └──────────────┘  │  scoreCalculator   │  │
│                                  │  modifiers          │  │
│  ┌──────────┐  ┌──────────────┐  │  riskBands          │  │
│  │ Static   │  │  JSON Data   │  └───────────────────┘  │
│  │ Pages    │  │  Layer       │                          │
│  │ (SSG)    │  │              │                          │
│  └──────────┘  └──────────────┘                          │
└─────────────────────────────────────────────────────────┘
            │
            ▼
┌───────────────────────┐     ┌──────────────────┐
│   Vercel Edge Network │     │  Umami Analytics  │
│   (CDN + Hosting)     │     │  (Cloud)          │
└───────────────────────┘     └──────────────────┘
```

### Project Structure

```
AI_Calculator/
├── data/                    # Static data layer
│   ├── roles.json           # 3 sectors, 12 roles
│   ├── tasks.json           # 6-8 tasks per role (75+ total)
│   └── task_scores.json     # AI-exposure metrics per task
├── engine/                  # Scoring engine (pure TypeScript)
│   ├── scoreCalculator.ts   # TIS + job-level score calculator
│   ├── modifiers.ts         # Weights & experience modifiers
│   └── riskBands.ts         # Score → risk classification
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, metadata, analytics
│   │   ├── page.tsx         # Landing page with hero section
│   │   ├── Calculator.tsx   # Main calculator component (590 lines)
│   │   ├── globals.css      # Tailwind v4 theme + custom utilities
│   │   ├── guide/           # Career Safety Guide content page
│   │   ├── about/           # About / Methodology page
│   │   ├── terms/           # Terms of Service
│   │   └── privacy/         # Privacy Policy (Zero-Knowledge)
│   └── components/
│       ├── Header.tsx       # Global header with Career Index branding
│       └── Footer.tsx       # Footer with links and copyright
├── docs/                    # Internal documentation
│   ├── vision.md            # Product vision and MVP principles
│   └── scoring-model.md    # Scoring formula documentation
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 5. Data Model

### Sector & Role Taxonomy

The calculator organizes the labor market into **3 sectors** containing **12 roles**:

| Sector | Roles |
|---|---|
| **Technology & Software** | Software Engineer, Data Scientist, QA Tester, DevOps Engineer |
| **Business & Operations** | Project Manager, Business Analyst, Customer Support, HR Specialist |
| **Creative & Design** | UI/UX Designer, Graphic Designer, Content Writer, Video Editor |

### Task Decomposition

Each role is broken into **6–8 granular tasks** that represent its daily workflow. There are **75+ unique tasks** in the dataset. Examples for "Software Engineer":

| Task | AS | ACM | AF | HAF |
|---|---|---|---|---|
| Writing boilerplate code | 0.95 | 0.95 | 0.15 | 0.05 |
| Debugging complex logic | 0.65 | 0.75 | 0.30 | 0.55 |
| Designing system architecture | 0.35 | 0.45 | 0.55 | 0.85 |
| Collaborating with stakeholders | 0.15 | 0.25 | 0.75 | 0.95 |

### Metric Definitions

| Metric | Full Name | Weight | Range | Description |
|---|---|---|---|---|
| **AS** | AI Saturation | 35% | 0.0–1.0 | How capable current AI models are at performing this task autonomously |
| **ACM** | Architecture Maturity | 25% | 0.0–1.0 | How production-ready the AI tooling/infrastructure is for this domain |
| **AF** | Adoption Friction | 20% | 0.0–1.0 | Economic, legal, or social barriers to AI adoption for this workflow |
| **HAF** | Human Advantage Factor | 20% | 0.0–1.0 | How much the task relies on uniquely human skills: empathy, judgment, creativity |

---

## 6. Scoring Engine — Deep Dive

The scoring engine is a **deterministic, non-linear model** implemented in pure TypeScript with zero external dependencies.

### Task Impact Score (TIS) — Per-Task Calculation

```
TIS(task) = baseScore × frequencyWeight
```

Where:

```
rawExposure  = AS^1.25 × ACM^1.25 × AF
protection   = HAF > 0.85 ? HAF² : HAF         ← "moat" effect
baseScore    = rawExposure × (1 − protection × 0.85)

if (isCoreValue):
    baseScore *= 1.3                             ← core asset amplification
```

**Key Design Decisions:**

1. **Non-linear amplification** (`^1.25`): When both AS and ACM are high simultaneously, the combined threat is greater than their simple product. The power function accentuates this compounding risk.
2. **HAF "Moat" effect** (`HAF²` above 0.85): Tasks that are deeply human (HAF > 0.85) receive exponential protection, reflecting the reality that truly creative or empathetic work is disproportionately harder to automate.
3. **Core Value modifier** (`1.3x`): If a user marks a task as their "core value" contribution, its impact weight increases, reflecting the career significance of that task being automated.

### Job-Level Score — Aggregate Calculation

```
averageImpact  = Σ TIS(task) / taskCount
normalized     = averageImpact × 220 × experienceModifier × adoptionRate
finalScore     = clamp(round(normalized), 0, 100)
```

### Modifier Tables

**Experience Modifiers** — Seniority affects how standardized vs. judgment-heavy a role is:

| Level | Modifier | Rationale |
|---|---|---|
| ENTRY | 1.2x | More standardized tasks → higher exposure |
| MID | 1.0x | Baseline |
| SENIOR | 0.8x | More judgment-heavy tasks → lower exposure |
| EXPERT | 0.6x | Deep specialization provides strong protection |

**Frequency Weights** — How often a task is performed affects its exposure contribution:

| Frequency | Weight | Reasoning |
|---|---|---|
| DAILY | 1.0 | Maximum exposure from repetitive tasks |
| WEEKLY | 0.7 | Regular but not constant exposure |
| MONTHLY | 0.4 | Periodic tasks have limited automation impact |
| RARELY | 0.1 | Infrequent tasks are low-priority automation targets |

**Company Adoption Rate** — Environmental context:

| Setting | Modifier | Example |
|---|---|---|
| AI-First / Aggressive | 1.25x | Tech startups, AI-native companies |
| Measured Adoption | 1.0x | Enterprise organizations with pilot programs |
| Safe Haven / Low Tech | 0.8x | Government, traditional industries |

### Risk Classification Bands

| Score | Label | Color | Meaning |
|---|---|---|---|
| 0–25 | Low Impact | 🟢 Emerald | Role remains fundamentally human-driven |
| 26–50 | Moderate Impact | 🟡 Amber | AI as co-pilot; focus shifts to strategic oversight |
| 51–75 | High Impact | 🟠 Orange | Fundamental transformation of professional landscape |
| 76–100 | Very High Impact | 🔴 Red | Direct path of rapid automation |

---

## 7. User Flow — The 7-Step Calculator

The calculator uses a **linear wizard pattern** with 7 steps. Every interaction is a single tap — there are no text fields, sliders, or dropdowns.

```
Step 1: Select Sector          → "Technology & Software"
Step 2: Define Role             → "Software Engineer"
Step 3: Market Seniority        → "MID" (experience level)
Step 4: Task Calibration        → Frequency per task (DAILY/WEEKLY/MONTHLY/RARELY)
Step 5: Value Identification    → Mark "protected assets" (core human-value tasks)
Step 6: Environmental Adoption  → Company's AI adoption posture
Step 7: Results Dashboard       → Score + Risk Band + Detailed Breakdown
```

### Results Dashboard Features

1. **Career Exposure Score** — Large numeric display (0–100)
2. **Risk Band Card** — Color-coded classification with contextual description
3. **Integrity Vector** — Full transparency report showing:
   - System integrity status (client-side processing confirmation)
   - Scoring methodology with factor weights
   - Per-task factor decomposition (AS, ACM, AF, HAF values)
   - Applied modifiers (experience, adoption, task count)
4. **Diagnostic Report** — Per-task TIS scores on a 0–200 index scale
5. **Action Buttons** — Re-analyze, edit parameters, toggle breakdowns

---

## 8. Frontend Design System

### Brand Identity

| Element | Value |
|---|---|
| Primary Brand | **Career Index** |
| Sub-product | AI Job Safety Calculator |
| Primary Color | `#ff5722` (Brand Orange) |
| Background | `#120c0a` (Brand Dark) |
| Card/Pill BG | `#2d2624` (Brand Pill) |
| Text Secondary | `#8a8482` (Brand Gray) |
| Text Primary | `#f5f5f5` (Off White) |
| Typography | Inter (Google Fonts) |

### CSS Architecture

The design system uses Tailwind CSS v4 with a CSS-first configuration approach:

```css
@theme {
  --color-brand-orange: #ff5722;
  --color-brand-dark:   #120c0a;
  --color-brand-pill:   #2d2624;
  --color-brand-gray:   #8a8482;
  --color-brand-card:   #ffffff;
  --color-off-white:    #f5f5f5;
}
```

### UI Characteristics

- **Dark-mode only** — Entire site is built on the dark brand palette
- **Large typography** — Headlines range from `text-4xl` to `text-[11rem]` for dramatic impact
- **Generous spacing** — Cards use `p-10` to `p-16` padding, `rounded-[3rem]` to `rounded-[4rem]` corners
- **Subtle animations** — `animate-slide-up`, `animate-fade-in`, and `animate-pulse` for organic feel
- **Glass morphism** — Cards use `bg-white/[0.03]` with `backdrop-blur-md` for depth
- **Zero placeholder images** — All visual weight comes from typography and spacing

---

## 9. Pages & Routing

| Route | File | Description |
|---|---|---|
| `/` | `page.tsx` | Landing page with hero section + calculator |
| `/guide` | `guide/page.tsx` | The Complete Guide to Career Safety (content page) |
| `/about` | `about/page.tsx` | How it works, methodology, team |
| `/terms` | `terms/page.tsx` | Terms of service |
| `/privacy` | `privacy/page.tsx` | Privacy policy (zero-knowledge emphasis) |

All pages are **statically generated (SSG)** at build time for optimal performance.

---

## 10. Deployment & Infrastructure

### CI/CD Pipeline

```
Git Push (main) → GitHub → Vercel Auto-Deploy → Edge CDN
```

- **Build command:** `next build`
- **Output:** Static HTML + client-side JavaScript bundles
- **Total bundle:** ~120 KB First Load JS (including React)
- **Deploy time:** ~30 seconds from push to live

### Domain Configuration

| Record | Type | Host | Value |
|---|---|---|---|
| A Record | A | `@` | `216.198.79.1` |
| CNAME | CNAME | `www` | Vercel DNS endpoint |

- **SSL:** Auto-provisioned by Vercel (Let's Encrypt)
- **CDN:** Vercel Edge Network (global)

### Analytics

- **Provider:** Umami Cloud (privacy-first, cookieless)
- **Implementation:** Single `<script>` tag in `layout.tsx`
- **Data retained:** Page views, referrers, devices — **no personal data**

---

## 11. Security & Privacy

| Concern | Implementation |
|---|---|
| **Data transmission** | None. Zero API calls. All logic runs client-side. |
| **User tracking** | Umami (cookieless, GDPR-compliant, no PII collected) |
| **Data storage** | No database. No user accounts. No cookies. |
| **Authentication** | None required. Tool is 100% free and open. |
| **Vulnerability surface** | Minimal — static site with no server-side logic or user input storage |

---

## 12. Performance Metrics

| Metric | Value |
|---|---|
| First Load JS | ~120 KB (shared) |
| Per-page JS | 2–9 KB |
| Static pages | 9 pages (SSG) |
| Build time | < 30 seconds |
| Time to Interactive | < 1 second |
| Lighthouse Score | 90+ (Performance, Accessibility, SEO) |

---

## 13. Future Roadmap

- [ ] **More sectors and roles** — Expand from 12 to 50+ roles across healthcare, legal, finance, and manufacturing
- [ ] **AI model benchmarking** — Compare scores against specific LLMs (GPT, Claude, Gemini)
- [ ] **Trend tracking** — Show how a role's score changes over time as AI capabilities evolve
- [ ] **PDF report export** — Generate a shareable career exposure report
- [ ] **Team analysis** — Aggregate scores for managers analyzing entire teams
- [ ] **API access** — Expose the scoring engine for third-party integrations

---

## 14. How to Run Locally

```bash
# Clone the repository
git clone https://github.com/meetp2022/ai-safety-calculator.git
cd ai-safety-calculator

# Install dependencies
npm install

# Start development server
npm run dev
# → Open http://localhost:3000

# Production build
npm run build
npm start
```

### Requirements

- Node.js 18+
- npm 9+

---

## 15. Key Talking Points

### For Manager / Stakeholder Presentation

> "Career Index is a zero-infrastructure career intelligence tool. It analyzes 75+ professional tasks across 12 roles using a proprietary 4-factor scoring model to quantify AI automation exposure. Everything runs client-side — zero server costs, zero privacy risk, instant results."

### For Technical Interview

> "I built a non-linear scoring engine in TypeScript that uses power-law amplification to model compounding automation risk. The HAF 'moat' function provides exponential protection scaling for deeply human tasks. The frontend is a 7-step tap-only wizard built with Next.js 15 App Router and React 19, using Tailwind v4's CSS-first configuration. The entire app is statically generated and deployed to Vercel's edge network."

### For Portfolio / Resume

> **Career Index** — AI Job Safety Calculator
> Full-stack web application that provides personalized AI career exposure analysis. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features a proprietary 4-factor scoring engine (TIS), zero-API architecture (100% client-side), and a 7-step tap-only UX. Statically generated, deployed on Vercel edge CDN. Live at careerindex.tech.

---

*Document Version: 2.0 — Last Updated: February 2026*
