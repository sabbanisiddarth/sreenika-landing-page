---
name: SSS State-Grade Security
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c7d0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b919a'
  outline-variant: '#41474f'
  surface-tint: '#96ccff'
  primary: '#96ccff'
  on-primary: '#003353'
  primary-container: '#5b96c9'
  on-primary-container: '#002c48'
  inverse-primary: '#206393'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a29'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#cee5ff'
  primary-fixed-dim: '#96ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004a75'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: IBM Plex Sans
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.15em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered to project "state-grade" security—a visual language that implies absolute protection, high-tech surveillance, and unwavering reliability. The brand persona is that of a silent guardian: sophisticated, technical, and elite. 

The visual style merges **Editorial Minimalism** with **Tactile Glassmorphism**. Layouts utilize a sophisticated asymmetrical grid, drawing inspiration from high-end surveillance HUDs and aerospace control interfaces. Large areas of purposeful negative space (Matte Black) allow the content to breathe, while high-contrast Metallic Silver accents highlight critical data points. The aesthetic avoids clutter, opting for a "less but better" approach where every pixel serves a functional or hierarchical purpose.

Expect an interface that feels like a precision instrument: cold, calculated, and premium.

## Colors

This design system operates exclusively in a **Dark Mode** environment to reinforce the "security" and "stealth" narrative. 

- **Matte Black (#121212):** The foundational canvas. It provides a deep, non-reflective base that minimizes eye strain and maximizes contrast for critical alerts.
- **Steel Blue (#4682B4):** Used for primary actions, active states, and data visualizations. It represents the "technical pulse" of the system.
- **Metallic Silver (#C0C0C0):** Employed for high-level editorial typography, hairline borders, and iconography. It adds a physical, machined quality to the UI.
- **Charcoal (#171717):** Used for surface elevation and container backgrounds, subtly separating content from the true-black foundation.

## Typography

The typography is grounded in **IBM Plex Sans**, chosen for its industrial heritage and systematic clarity. It strikes a balance between humanistic curves and engineering-grade structure.

- **Display & Headlines:** Use IBM Plex Sans with tighter tracking to create an authoritative, "breaking news" or "state report" feel.
- **Body Text:** Optimized for legibility with generous line heights to ensure complex security reports are easily digestible.
- **Labels & Metadata:** The design system introduces **JetBrains Mono** for technical data, timestamps, and secondary labels. This monospaced addition reinforces the "technical precision" of the SSS brand.
- **Hierarchy:** Use "label-caps" (All-caps, high letter-spacing) for section headers to create a distinct editorial rhythm.

## Layout & Spacing

The layout philosophy follows a **12-column fixed-fluid hybrid grid**. While the outer margins are generous (64px on desktop) to evoke a premium editorial feel, the internal grid is strict and mathematical.

- **Asymmetry:** Key content should be weighted towards the left, with secondary data or "HUD-style" widgets floating on the right with significant white space between them.
- **Negative Space:** Do not fear "empty" black space. Large voids are used to direct the eye to critical alerts or primary navigation nodes.
- **Rhythm:** All spacing must be a multiple of the 4px base unit. Vertical rhythm is enforced through "stack" variables to maintain structural integrity across complex dashboards.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** and **Subtle Glassmorphism** rather than traditional drop shadows.

1. **Base:** Matte Black (#121212).
2. **Surface:** Charcoal (#171717) with a 1px hairline border in Metallic Silver (10% opacity).
3. **Overlays:** Semi-transparent Steel Blue or Silver panels with a 20px backdrop blur (`backdrop-filter: blur(20px)`). This creates a "frosted glass" effect that feels like a high-tech terminal.
4. **Active State:** Elements do not "glow" outward; they are "lit" from within using subtle inner gradients or high-contrast silver borders.

## Shapes

To maintain an aura of "state-grade" authority and technical rigidity, the design system utilizes **Sharp (0px)** corners for all primary containers, buttons, and input fields. 

Rounded corners are perceived as friendly or consumer-grade; sharp corners communicate "industrial," "military," and "uncompromising." 

- **Exceptions:** Very small data tags or status pips may use a 1px radius to prevent aliasing issues on low-resolution screens, but the visual intent must remain architectural and square.
- **Stroke:** Hairline borders (0.5px to 1px) are preferred over thick borders to maintain a precision-engineered look.

## Components

- **Buttons:** Sharp-edged. Primary buttons use a solid Steel Blue fill with white text. Secondary buttons are "Ghost" style: 1px Silver border with hover states that fill with a 10% Silver opacity.
- **Inputs:** Minimalist bottom-border only, or a fully enclosed box with a 5% Silver fill. Labels use the "label-caps" JetBrains Mono style above the field.
- **Cards:** No shadows. Uses a Charcoal background with a 1px hairline border. The header of the card should be separated by a Metallic Silver horizontal rule.
- **Data Visualization:** Use Steel Blue for primary data streams. Critical alerts must use a high-saturation red but restricted to small, high-impact icons or hairlines to avoid breaking the "stealth" aesthetic.
- **Status Indicators:** Small, square pips. A "pulse" animation (subtle opacity shift) can be used for live security feeds to indicate active monitoring.
- **Glass Panels:** Used for floating navigation or modal overlays, featuring a 40% opaque Charcoal background and a heavy backdrop blur.