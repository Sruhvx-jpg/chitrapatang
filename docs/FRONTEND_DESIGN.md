# Chitrapatang Terminal — Unified Design System
## Version 1.0.0 • Reference Implementation: `apps/coming-soon/`

> **Visual Foundations, Component Anatomy, Color Tokens, and Glassmorphic Code Specs.**

---

## 🧭 Navigation
[⬅ Master Documentation Hub](README.md) • [Agile Scrum Guide](SCRUM.md) • [System Design](SYSTEM_DESIGN.md) • [Sprint Roadmap](SPRINT.md) • [API Reference](API_REFERENCE.md)

---

## 1. Brand Mark & Logo Rules

The identity of Chitra Patang centers on a **completely blue butterfly**. It is the sole graphical hero element.

### Asset Paths
- Raw Brand Variations: `apps/coming-soon/brand/`
- Production Mark: `apps/coming-soon/public/logo.png` (Dimensions: Symmetric, transparent boundary, high-resolution PNG).

### Safe Space & Constraints
- **Clear Space**: Maintain a minimum safe space of `100%` of the butterfly's width on all four sides. No text or overlapping shapes may encroach on this zone.
- **Minimum Size**: 
  - Desktop UI: `24px` width.
  - Mobile UI: `20px` width.
  - Landing Hero: `96px` width (max).
- **Prohibitions**:
  - **Never** apply gradients or multi-color fills to the butterfly. It must remain solid Cobalt Blue.
  - **Never** cover the butterfly logo with frosted glass or backdrop blurs. It must sit on the highest layout plane, remaining crisp.
  - **Never** rotate or skew the butterfly, except for the animated drift/float keyframes defined in the Motion section.

---

## 2. Colors & Semantic Tokens

All colors are defined as both hex codes and high-fidelity CSS OKLCH values for wide-gamut displays.

### Color Tokens Table

| Token Name | Hex Code | OKLCH Value | Semantic Role / Context |
| :--- | :--- | :--- | :--- |
| `--color-brand-blue` | `#0052FF` | `oklch(0.45 0.28 264.5)` | Brand Butterfly, primary CTAs, active focus indicators. |
| `--color-brand-blue-hover` | `#0041CC` | `oklch(0.39 0.25 264.5)` | Hover state for primary buttons. |
| `--color-brand-dark` | `#08090B` | `oklch(0.12 0.01 250.0)` | Core application canvas background (Dark Mode). |
| `--color-canvas-light` | `#F9F9FB` | `oklch(0.98 0.00 240.0)` | Core application canvas background (Light Mode). |
| `--color-glass-fill` | `rgba(255,255,255,0.035)`| `oklch(1.00 0.00 0.0 / 0.035)`| Base fill layer for frosted glass surfaces. |
| `--color-border-hairline` | `rgba(255,255,255,0.07)`| `oklch(1.00 0.00 0.0 / 0.07)`| Refractive borders for glass surfaces. |
| `--color-semantic-success` | `#10B981` | `oklch(0.72 0.17 150.0)` | Positive statuses, success notifications. |
| `--color-semantic-error` | `#EF4444` | `oklch(0.63 0.22 25.0)` | Blockers, alerts, input validation errors. |

### Contrast Guidelines (WCAG AA Compliance)
- Pure cobalt blue `#0052FF` text has weak contrast on near-black backgrounds. 
- **Rule**: Text elements that inherit the brand color on dark canvases must use a lighter tint (e.g., `#4D85FF` or `text-blue-400`). Primary CTAs must use pure white text on top of the blue background.

---

## 3. Typography Spec

Typography is the core of the interface. Tracking decreases as font size increases to preserve balance.

### Font Stacks
- **Brand Wordmark**: `Yatra One`, local fallback: `cursive`.
- **UI & System Headers**: `Geist Sans`, system fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`.
- **Monospace / Code**: `Geist Mono`, system fallback: `SFMono-Regular, Consolas, monospace`.

### Type Scale

| Element / Class | Font Family | Size (px / rem) | Weight | Tracking (Letter-Spacing) | Line-Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Hero Headline | Geist Sans | `64px / 4rem` | `500` | `-0.05em (tracking-tighter)`| `1.1` |
| Page / Section Header| Geist Sans | `36px / 2.25rem`| `400` | `-0.04em (tracking-tight)` | `1.2` |
| Card Title | Geist Sans | `18px / 1.125rem`| `500` | `-0.02em` | `1.4` |
| UI Body Text | Geist Sans | `14px / 0.875rem`| `400` | `0` | `1.6` |
| Captions & Labels | Geist Sans | `11px / 0.6875rem`| `600` | `0.05em (tracking-wider)` | `1.4` |
| Code & Telemetry | Geist Mono | `12px / 0.75rem` | `400` | `0` | `1.5` |

---

## 4. Spacing, Radius & Shadows

### Spacing Scale
Utilize a strict 8px logic:
- `4px` (xs) • `8px` (sm) • `16px` (md) • `24px` (lg) • `32px` (xl) • `48px` (2xl) • `64px` (3xl).

### Corner Radii
- Inputs & Buttons: `12px / 0.75rem (rounded-xl)`.
- Cards & Telemetry Pods: `16px / 1.0rem (rounded-2xl)`.
- Main Dashboard Chrome: `24px / 1.5rem (rounded-3xl)`.

### Elevation Shadows
- **Glass Drop Shadow**: `0 20px 40px -15px rgba(0, 0, 0, 0.5)`
- **macOS Window Shadow**: `0 30px 60px -20px rgba(0, 0, 0, 0.7)`

---

## 5. Apple-Grade Glassmorphism Spec

Frosted surfaces must emulate physical light refraction and saturation shifts.

```css
/* 1. Navigation Header Glass */
.glass-surface-nav {
  background-color: rgba(8, 9, 11, 0.7);
  backdrop-filter: blur(20px) saturate(190%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* 2. Hero Waitlist Card */
.glass-surface-hero {
  background-color: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(28px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
    0 20px 40px -15px rgba(0, 0, 0, 0.5);
}

/* 3. Value Proposition Card */
.glass-surface-card {
  background-color: rgba(255, 255, 255, 0.015);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.06),
    0 10px 30px -10px rgba(0, 0, 0, 0.4);
}

/* 4. Window Chrome (Heavy macOS-like container) */
.glass-surface-window {
  background-color: rgba(8, 9, 11, 0.35);
  backdrop-filter: blur(24px) saturate(210%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 30px 60px -20px rgba(0, 0, 0, 0.7);
}
```

---

## 6. Motion Principles

Motion should guide attention, never distract. Use custom cubic-bezier curves instead of linear movements.

### Keyframe Animation Parameters
- **Butterfly Hero Float**: Floating drift of 12px over 8 seconds.
  ```css
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(1.5deg); }
  }
  ```
- **Ambient Orb Pulse**: Soft pulsing of canvas light centers.
  ```css
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.35; }
  }
  ```

---

*Chitrapatang Terminal — Unified Design System Reference.*
