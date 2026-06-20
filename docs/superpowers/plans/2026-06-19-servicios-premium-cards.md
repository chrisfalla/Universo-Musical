# Servicios Premium Cards Uniformes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all 4 service cards in the Servicios Premium section the same size with a 2×2 grid layout.

**Architecture:** Modify the CSS grid from `2fr 1fr 1fr` to `repeat(2, 1fr)`, remove the featured card spanning behavior, and unify padding across all cards.

**Tech Stack:** Astro (`.astro`), CSS3

---

### Task 1: Update HTML — Remove featured class from card 1

**Files:**
- Modify: `src/pages/index.astro:280`

- [ ] **Step 1: Remove `sc-featured` class from first service card**

Change line 280 from:
```astro
<div class="service-card sc-featured reveal-card" id="svc-store">
```
to:
```astro
<div class="service-card reveal-card" id="svc-store">
```

### Task 2: Update CSS — Grid, padding, and featured styles

**Files:**
- Modify: `src/styles/global.css:398-415`
- Modify: `src/styles/global.css:582-584` (responsive 1100px)
- Modify: `src/styles/global.css:671-673` (responsive 640px)

- [ ] **Step 1: Change grid to 2×2 and unify padding**

Change `.services-grid` from:
```css
.services-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: auto auto; gap: 24px; }
```
to:
```css
.services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
```

Change `.service-card` padding from `40px 36px` to `32px 28px`.

- [ ] **Step 2: Remove `.sc-featured` style block**

Remove the block:
```css
.sc-featured { grid-row: 1 / 3; background: linear-gradient(var(--black-3), var(--black-3)) padding-box, linear-gradient(135deg, var(--red), var(--yellow)) border-box; border: 1px solid transparent !important; }
```

- [ ] **Step 3: Update 1100px responsive**

Change from:
```css
.services-grid { grid-template-columns: 1fr 1fr; }
.sc-featured { grid-row: unset; grid-column: 1 / -1; }
```
to:
```css
.services-grid { grid-template-columns: repeat(2, 1fr); }
```

- [ ] **Step 4: Update 640px responsive — reduce padding**

Update the existing block (line 671-673):
```css
.services-grid { grid-template-columns: 1fr; gap: 16px; }
.services-section { padding: var(--section-pad-mobile) 0; }
.service-card { padding: 24px 20px; }
```

(No change needed — already correct.)

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: Build succeeds without errors.
