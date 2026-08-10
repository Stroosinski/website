# STOLMAR — Design System

A monochrome, deliberately *enigmatic* identity system for **STOLMAR**, a visual-merchandising production house.

---

## 1. Company & product context

For over thirty years STOLMAR has designed and produced **shop windows, furniture, exhibition stands and scenography for premium brands**. They combine creativity with production versatility — concept, prototyping, production, and on-site assembly, in one workshop.

- **What they make:** window displays, instore decorations, pop-up stores, exhibitions, event décor, prototypes.
- **How they make it:** 3D printing (resin & FDM), CNC milling, joinery, hand-painting, high-gloss/metallic finishing, lighting, mechanisms, stabilized moss, felt, leather — "combining technologies in unconventional ways."
- **Who they serve:** premium brands and their agencies, directly. Campaigns run **worldwide** — installs across Düsseldorf, Berlin (KaDeWe / Ku'damm), Hamburg, Stuttgart, Baden-Baden, Frankfurt, Munich, Prague, Vienna, and Paris (Printemps).
- **Legal entity:** STOLMAR Marian Czajkowski Sp. k., Hodowlana 7, 84230 Rumia, Poland.
- **Contact:** info@stolmar.co · +48 505 999 275 · stolmar.co

### The strategic constraint (drives the whole refresh)

STOLMAR works under NDA for premium clients and **cannot publish its portfolio online.** The brief asked for a refresh that is "a little more enigmatic / mysterious." So the system's central idea is **The Veil**: work is *named, not shown* — concealed by default, glimpsed on intent (hover/request). Restraint, darkness and negative space do the talking.

### Sources provided

- **Local folder `Claude design/`** — logos (`stolmar_logo*.ai/.eps/.pdf`, `Logotyp.png`, `LOGO SAMO*` emblem, white variant), stationery (`Stolmar-koperta-DL.tif`, `stolmar-papier-firmowy.tif`, `Stolmar-teczka*`, business card), `STOPKA-05-05-05-05.png` (footer w/ yellow rule), the full **Roboto** family (TTF), `Offer template.docx`, and **`STOLMAR_portfolio_2026_selected.pdf`** (28-page selected-projects deck — the basis for the deck template + website copy).
- Yellow accent **#EFD32B** was sampled directly from the footer artwork.

---

## 2. Content fundamentals (voice & copy)

- **Tone:** confident, terse, industrial. Short declaratives. Lets the work (and its absence) speak.
- **Person:** first-person plural — **"We produce…", "We're STOLMAR."** Addresses the client as "you" only in calls to action ("Tell us what you imagine").
- **Casing:** **UPPERCASE** for the wordmark, display headlines, eyebrows, labels and nav. Sentence case for body and standfirsts. Project titles in the portfolio are uppercase ("ANNIVERSARY CAMPAIGN").
- **Structure:** specs are listed as terse fielded pairs — `Elements & materials: 3D printed pods…`, `Locations: Düsseldorf, Berlin KaDeWe…`, scope as `/ PRODUCTION`, `/ PROTOTYPE`, `/ ASSEMBLY SUPERVISORING`.
- **Punctuation:** the **middot ·** is the brand's connective tissue ("Düsseldorf · Berlin KaDeWe · Paris"). Em-dashes for asides.
- **Numerals:** plain ("30+ years", "100 Years Celebration", chapter numbers "02", "06").
- **No emoji. No exclamation inflation.** Mystery over hype: "The work lives behind NDA.", "Behind closed windows", "Concealed", "Hover to reveal".
- **Signature lines:** `WE'RE STOLMAR.` · `From concept to installation.` · `One workshop. Concept to install.`

---

## 3. Visual foundations

- **Palette — monochrome + one signal.** Ink black `#0A0A0A` is the default *stage*; paper white `#FFFFFF`/warm off-white `#F4F2EC` is the document surface; **signal yellow `#EFD32B`** is the only hue, used sparingly as a marker (rules, focus, active dot, one CTA per view, accent words). **Never introduce a second hue.** Full scales in `tokens/colors.css`.
- **Type — one family, Roboto.** Expression comes from *weight contrast and tracking*, not many faces. Display = **Roboto Black, uppercase, −0.02em**, echoing the wordmark. Body = Roboto Regular/Light. Labels/eyebrows = Roboto Medium, uppercase, 0.18em. Lockups spaced to 0.34em. The STOLMAR wordmark itself is a **custom logotype shipped as artwork** (not a font). See `tokens/typography.css`.
- **Backgrounds.** Predominantly the **dark stage** — flat near-black, no gradients. The line-art **emblem** appears as a faint (6–16% opacity) oversized watermark/grain in corners. No photography in the public layer (the constraint); imagery, when cleared, sits *behind the veil* as the revealed state.
- **Layout.** Strict, architectural. 12-column thinking, generous margins (40px web / 72px deck), hairline dividers, fielded spec rows. Big type anchored bottom-left or centered. Content is set on a grid like a workshop drawing.
- **Corners.** Essentially **square** — `--radius-sm: 2px` for controls, `0` for panels. The only rounded element is the **pill** (tags / status dots). The brand is machined, not soft.
- **Borders & rules.** 1px hairlines (`--border-hair` on light, `--ink-700` on dark); 2px solid ink or **2px yellow** for emphasis rules and marker accents. A short yellow rule (40–240px) is a recurring "marker" motif.
- **Elevation.** Restrained and flat. Depth is a **seam** (`0 1px 0` hairline), not a float. Real shadows only for true overlays (`--shadow-overlay`). Cards are bordered, not floated.
- **Cards.** Flat, square, 1px-bordered, no drop shadow. On dark they use `--surface-stage-raised` (#161616) with an `--ink-700` border. Optional yellow corner rule.
- **Transparency & blur.** Used only for the sticky header (`rgba(10,10,10,.72)` + `blur(14px)`) and the veil's redaction bars. Never decorative glassmorphism.
- **Motion.** Precise and mechanical — **no bounce.** Easing `cubic-bezier(0.16,1,0.3,1)`; durations 120/200/420/720ms. The slow 720ms "curtain" is reserved for reveals. Reduced-motion disables entrance animation.
- **Hover states.** Buttons darken/lighten (primary → `--ink-700`, accent → `--signal-yellow-deep`); secondary inverts to solid ink. Veil tiles gain a 1px yellow border and the emblem grain brightens. No scale-up.
- **Press states.** A 1px downward nudge (`translateY(1px)`), never a shrink-bounce.
- **Focus.** The yellow line/ring (`--focus-ring`). On inputs the baseline rule turns yellow and the label brightens.
- **Imagery vibe (when used):** cool, low-key, high-contrast; materials and finishes (high-gloss, metallic, oak, moss) photographed close. Kept *behind* the veil.

---

## 4. Iconography

- **The emblem is the hero mark** — an interlocking line construction of craft tools (geometric weave, square-cut, single weight). Shipped as `assets/logo-mark.png` (black) and `assets/logo-mark-white.png` (reversed). Use as a standalone mark, a faint oversized watermark/grain, or a repeating texture. **Never recolor** — black, white, or yellow only. **Never redraw it** — always place the supplied artwork.
- **UI icons.** The source materials contain **no UI icon set**. Recommended substitution — **flag for approval**: **[Lucide](https://lucide.dev)** (CDN), whose thin (\~1.75px), geometric, square-cut line style matches the emblem. Use at 1.5–2px stroke, `currentColor`, square caps.

  ```html
  <script src="https://unpkg.com/lucide@latest"></script>
  ```
- **Unicode as icons.** Light interface affordances may use unicode glyphs in keeping with the spare aesthetic: `→` (continue/next), `·` (separator), `≡` (menu). Used in the website kit.
- **No emoji, ever.**

---

## 5. Index / manifest

**Root**

- `styles.css` — global entry (imports only). Consumers link this one file.
- `readme.md` — this guide. · `SKILL.md` — Agent-Skills wrapper.

**`tokens/`** — `fonts.css` (Roboto @font-face), `colors.css`, `typography.css`, `spacing.css` (spacing, radii, borders, elevation, motion).

**`assets/`** — `logo-full.png` (wordmark), `logo-mark.png` / `logo-mark-white.png` (emblem), `stopka.png` (footer w/ yellow rule), `fonts/` (Roboto TTFs).

**`guidelines/`** — foundation specimen cards (Design System tab): Colors (brand triad, ink, paper, signal), Type (display, body & lead, labels & meta, weights), Spacing (scale, radii & borders, elevation & motion), Brand (wordmark, emblem, **the veil**).

**`components/`** — reusable primitives (namespace `window.STOLMARDesignSystem_*`):

- `core/` — `Button`, `IconButton`, `Tag`, `Badge`
- `forms/` — `Input`
- `surfaces/` — `Card`, **`ProjectTile`** (the signature veil)

**`ui_kits/website/`** — refreshed **stolmar.co** (Home / Work / Studio / Contact), built from the primitives. `index.html` is the interactive entry; see its `README.md`.

**`templates/portfolio-deck/`** — `PortfolioDeck.dc.html`, a 1280×720 deck template (cover, statement, section divider, project, closing) for the NDA-safe project deck.

---

## 6. Caveats

- The STOLMAR **wordmark is a custom logotype** — always place `assets/logo-full.png`; do not attempt to set it in Roboto.
- **Lucide** is a *substituted* UI icon set (no native set existed). Confirm or supply preferred icons.
- The public layer intentionally contains **no project photography** — that is the concept, not an omission.
