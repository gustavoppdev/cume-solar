# Design

## 1. Concept

Cume sells and installs residential photovoltaic systems in Brazil. The page speaks to a homeowner with a monthly electricity bill between R$150 and R$800, who has heard about solar from a neighbour and does not know where to start.

The category sells savings. Every competing page opens with a blue gradient, a guarantee seal, a smiling family and a number like "save up to 95%". Cume is built against that, and not for taste: **a bill does not become zero.** Part of it is energy drawn from the grid, which a system generates. The other part — the availability charge, public lighting, and the grid share that Lei 14.300/2022 phases in — keeps arriving every month whether or not there are panels on the roof.

So the page has one idea: **show the visitor what their bill actually is, before asking them for anything.** A slider takes the bill, the page splits it in two, and the figure the visitor just produced travels with them into the quote form. Nothing is promised. The premise behind every number is on screen next to it.

That is why the page looks like a measured drawing rather than an advertisement: a label in the left margin naming what each section measures, hairline rules, figures set large and aligned right. A homeowner comparing solar quotes is already reading spec tables — this page is one, and it is honest about the row the others leave out.

The brand is named after the ridge, the highest line of a roof, where the two slopes meet.

## 2. Color

Achromatic, with one accent. Photography carries all the colour the page has; the interface carries none. The accent appears **only where the page responds to the visitor** — the slider track and handle, the calculated figure, the focus ring, the CTA on hover — so colour is a signal, never decoration.

| Slot | Value | Hex |
|---|---|---|
| `background` | `oklch(0.972 0.004 85)` | `#F7F6F3` |
| `foreground` | `oklch(0.205 0.006 85)` | `#181714` |
| `card` / `popover` | `oklch(0.99 0.003 85)` | `#FDFCF9` |
| `primary` | `oklch(0.528 0.105 246)` | `#2F70A4` |
| `primary-foreground` | `oklch(0.972 0.004 85)` | `#F7F6F3` |
| `secondary` | `oklch(0.945 0.004 85)` | `#EEEDEA` |
| `secondary-foreground` | `oklch(0.265 0.008 85)` | `#272521` |
| `muted` | `oklch(0.955 0.004 85)` | `#F1F0ED` |
| `muted-foreground` | `oklch(0.465 0.008 85)` | `#5B5954` |
| `accent` | `oklch(0.935 0.02 246)` | `#DFEBF6` |
| `accent-foreground` | `oklch(0.37 0.07 246)` | `#1C4362` |
| `destructive` | `oklch(0.48 0.15 27)` | `#A1302B` |
| `success` | `oklch(0.508 0.105 246)` | `#296A9E` |
| `border` | `oklch(0.87 0.004 85)` | `#D5D4D1` |
| `input` | `oklch(0.6 0.008 85)` | `#82807B` |
| `ring` / `selection` | `oklch(0.528 0.105 246)` | `#2F70A4` |

The accent is **sampled from the sky in the hero photograph**, which is the page's only source of colour: the one hue the interface uses is the one the image already contains. The paper is warm rather than blue-white, so the terracotta in that same photograph sits on it without clashing, and the cool accent reads against both. Success is a deeper cut of the accent rather than the conventional green — there is no green anywhere on the page, and a confirmation is the page responding, which is what the accent already means.

### Validated pairs

| Pair | Ratio | Minimum |
|---|---|---|
| `foreground` / `background` | 16.52:1 | 4.5 |
| `card-foreground` / `card` | 17.41:1 | 4.5 |
| `popover-foreground` / `popover` | 17.41:1 | 4.5 |
| `primary-foreground` / `primary` | 4.87:1 | 4.5 |
| `secondary-foreground` / `secondary` | 13.03:1 | 4.5 |
| `accent-foreground` / `accent` | 8.59:1 | 4.5 |
| `success-foreground` / `success` | 5.31:1 | 4.5 |
| `muted-foreground` / `background` | 6.43:1 | 4.5 |
| `muted-foreground` / `muted` | 6.12:1 | 4.5 |
| `destructive` / `background` | 6.51:1 | 4.5 |
| `selection-foreground` / `selection` | 4.87:1 | 4.5 |
| `input` / `background` | 3.64:1 | 3 |
| `ring` / `background` | 4.87:1 | 3 |
| `primary` / `background` | 4.87:1 | 3 |

## 3. Typography

**One family: Archivo**, loaded once as a variable font with its width axis (`wdth`). The contrast between display and body comes from **width, not from a second typeface** — an industrial grotesque that can stretch is the whole type system.

Width carries meaning here, and the rule is narrow: **expanded is the brand and the numbers.** The wordmark, the margin labels and every figure the calculator returns are set at `wdth 125` (labels at 112). Prose of any size runs at the normal width. So when a reader sees a wide letterform, it is either the company's name or a measurement — never a decoration.

| Role | Family | Size | Line height | Tracking | Weight |
|---|---|---|---|---|---|
| `display` | Archivo, `wdth 125` | `clamp(2.5rem, 23.5vw, 19rem)` | 0.82 | −0.02em | 600 |
| `h1` | Archivo | `clamp(2.5rem, 1.9rem + 2.6vw, 4rem)` | 1.04 | −0.03em | 600 |
| `h2` | Archivo | `clamp(2rem, 1.6rem + 1.9vw, 3.25rem)` | 1.06 | −0.025em | 600 |
| `h3` | Archivo | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 1.3 | −0.005em | 600 |
| `lead` | Archivo | `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` | 1.55 | 0 | 400 |
| `body` | Archivo | `1rem` | 1.65 | 0 | 400 |
| `small` | Archivo | `0.875rem` | 1.5 | 0.01em | 400 |
| `stat` | Archivo, `wdth 125` | `clamp(2.25rem, 1.6rem + 3.2vw, 4.5rem)` | 0.95 | −0.03em | 600 |

`display` is sized against the viewport rather than in fixed steps because it does one job: the four letters of the wordmark span the page column exactly, at every width from 320px up. Measured, an expanded capital averages 0.947em, so `23.5vw` fills the column and `19rem` caps it once the column stops growing.

Case is reserved. The wordmark, the margin labels and table headers are uppercase; section headings are sentence case. A long Portuguese heading in capitals crowds its own accents — `Ç`, `Ã`, `Õ` — and reads slower, so capitals are spent where the text is two or three words and never where it is a sentence.

Figures are `tabular-nums` page-wide. Every table in the page aligns numbers on their right edge, and a proportional digit breaks that alignment the moment a value changes under the slider.

## 4. Shape & space

| Slot | Value |
|---|---|
| `radius-control` / `radius-card` / `radius-media` | `0px` |
| `shadow-card` | `0 0 0 1px oklch(0.87 0.004 85)` |
| `shadow-overlay` | `0 32px 80px -24px oklch(0.205 0.006 85 / 0.3)` |
| `spacing-section` | `clamp(5rem, 3rem + 7vw, 10rem)` |
| `spacing-gutter` | `clamp(1rem, 0.5rem + 3vw, 3rem)` |
| `container-page` | `78rem` |

Every corner is square, including images. There are no shadows on the page: a raised surface is marked by a rule, the way a drawing marks one, so `shadow-card` is a hairline outline rather than a blur. Only a dialog, which genuinely floats over the page, gets depth.

Whitespace is a material, not leftover. Sections are separated by space above the calculator and by a full-width hairline from the calculator down — the rule starts where the document starts, and the hero keeps its air.

## 5. Motion

Interaction timing: `--duration-fast` 110ms for presses and colour, `--duration-base` 220ms for hover movement and state changes, easing `cubic-bezier(0.2, 0.8, 0.2, 1)` throughout. Press scales to 0.985 — barely, because a square button that shrinks visibly looks like it broke.

**Required tier.** The hero sequence staggers the wordmark and the line under it; the wordmark is the LCP element, so it is painted on the first frame and only travels, never fades in. Hover is varied by what the element is: the CTA fills with the accent from transparent, a table row lifts its rule to full ink, a text link draws its underline. Focus is a two-pixel accent outline offset three pixels, designed rather than inherited.

**Menu items chosen:**

- **Growth from a shared baseline** for the bill split. The two parts of the bill grow from the same line, which is the one piece of choreography that states the page's argument instead of decorating it. The labels sit outside the growing bars, since `scaleY` would squash them. The band is 12px, a measured line rather than a slab: at 56px it was the darkest mass on the page and outweighed the figures it illustrates.
- **Counters** on the calculated figures. They are real numbers and they change as the slider moves, so the transition between values is required, not ornamental.
- **Section reveals**, varied between sections, and **child stagger** for table rows, which enter top to bottom the way a table is read.

Nothing else. No parallax, no marquee, no mask reveal: a page arguing for restraint in a category that shouts cannot itself shout. With reduced motion, the counters render their final value, the bars appear at full height and the reveals become instant.

## 6. Layout

Left-aligned throughout, on a single column capped at `78rem`. The left margin carries an annotation layer: a small uppercase label naming **what the section measures**, not merely what it is called — `CONSUMO. R$/MÊS`, `SISTEMA. kWp`, `OBRAS. 2024–2026`, `PROCESSO. DIAS`. A label that only repeated the heading would be decoration; one that names the unit tells the reader what kind of answer the section gives.

| # | Section | Desktop | Mobile |
|---|---|---|---|
| — | **Hero** | Wordmark edge to edge, a hairline under it, the margin label left and the promise right. Full-bleed photograph below. | Wordmark still spans the column; label and promise stack under the rule. |
| 1 | **Calculator** | Slider set as a datasheet row — label left, hairline, figure right. Result splits the bill into the part a system generates and the part that keeps arriving. | One column; the split stacks vertically, bars becoming full-width. |
| 2 | **System** | The roof and the inverter as a pair of photographs, notes 01–04 numbered under them, the hairline spec table across the full column below. | Photographs stack, each with its notes, then the table. |
| 3 | **Installs** | Table: city/UF, output, month, output right-aligned. | Rows become two lines, the figure keeping its right edge. |
| 4 | **Process** | Table with a Gantt track between stage and days: each stage a span on a shared 55-day axis, solid ink for Cume's stages, hatched outline for the utility's. The 30-day access request fills half the axis, so the lead's claim is visible before it is read. A total row closes it. | The track moves under each stage's text; days keep their right edge. |
| 5 | **Contact** | Two columns: the locked estimate summary on the left, sticky; the line explaining why the state is asked and the form on the right. The visitor fills the form beside their own figures. A full-bleed photograph closes the section: the hero's house at blue hour, lights on, panels dark — the hour the part that keeps arriving is drawn. It sits after the form so the CTA's jump lands on the form, not on a picture. | Single column: summary, line, form, photograph. |

```
DESKTOP                                   MOBILE (375)
┌──────────────────────────────────────┐  ┌────────────────┐
│ ◹ CUME      nav        [ orçamento ] │  │ ◹ CUME      ☰  │
│                                      │  ├────────────────┤
│  C   U   M   E                       │  │  C U M E       │
│ ──────────────────────────────────── │  │ ────────────── │
│ ENERGIA SOLAR…      a promessa, dir. │  │ ENERGIA SOLAR… │
│                                      │  │ a promessa     │
│ ┌──────────────────────────────────┐ │  │ ┌────────────┐ │
│ │      rooftop, full bleed         │ │  │ │  rooftop   │ │
│ └──────────────────────────────────┘ │  │ └────────────┘ │
│                                      │  ├────────────────┤
│ CONSUMO.   Conta por mês    R$ 280   │  │ CONSUMO.       │
│ R$/MÊS     ├───────●──────┤          │  │ Conta por mês  │
│                                      │  │        R$ 280  │
│            Um sistema gera   R$ 214  │  │ ├────●───────┤ │
│            Continua vindo     R$ 66  │  │ ████████░░░░░░ │
│            ████████████████░░░░░░░   │  │ gera    R$ 214 │
│            [ pedir orçamento     ↘ ] │  │ vindo    R$ 66 │
└──────────────────────────────────────┘  └────────────────┘
```

The margin label is the one device that cannot survive 375px, where there is no margin to put it in: below `lg` it becomes an overline directly above the section heading, keeping its case and tracking so the annotation layer still reads as one system.

The header sits transparent over the top of the hero and goes solid once it scrolls past. Because the wordmark area is paper rather than photograph, the header's own text is ink on paper and needs no scrim — the photograph carries no text at all.

## 7. Dependencies

No additions to the stack. The slider is the registry's (`@shadcn/slider`, on Base UI), restyled as a drawn scale: a one-pixel ink track, the chosen part in the accent, a square thumb with a 44px hit area. Keyboard, `aria-valuetext` in reais and dragging come with it. The connection override is the registry's radio group laid out as three ruled cells.

The premises sit in a native `<details>` under the estimate notice, closed by default, with their date on the summary line. The registry accordion was passed over because its panel is hidden until JavaScript runs; `<details>` opens without it.

The estimate the visitor produces lives in a small external store (`useSyncExternalStore`), so the quote form's summary shows the same figures the calculator does without either section owning the other.
