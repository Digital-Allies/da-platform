# Paula Scher Punk & Rock Poster Design System

## YAML Formatter

```yaml
title: Paula Scher Punk & Rock Poster Design System

when_to_use: |
  Use when developing high-impact, type-as-image digital layouts, event landings, or promotional modules that require a loud, authoritative, signature look. This system adapts the kinetic typography of Paula Scher (Public Theater) and merges it with a vintage, high-contrast, woodblock punk aesthetic.

core_identity_keys:
  - title: Type is the Art
    description: Text is never just copy; it is compressed, scaled, and treated as a physical architectural element that commands the layout.

  - title: Massive Focal Graphics
    description: Replaces passive background texture motifs with heavy, hard-edged, flat geometric silhouettes (e.g., stylized piano beds, angular broken-glass shards, massive lightning bolts, blocky vector shields).

  - title: High-Contrast Woodblock Distress
    description: Simulates the raw energy of screen printing, woodcut gig posters, and vintage letterpress textures.

core_design_principles:
  typography_stack:
    title: The Block-Squeezed & High-Contrast Typography Stack
    description: The headline dictates the entire structure of the layout. Characters are either ultra-condensed and stretched vertically, or styled into thick, blocky sans-serif configurations that lock together like a puzzle piece.

    approaches:
      - name: Stretched Condensed Stack
        description: Emulate the look seen in reference images. Words are stacked vertically with zero line gap.
        css_properties:
          font_family: "'Barlow Condensed', 'Impact', sans-serif"
          font_weight: 900
          text_transform: uppercase
          letter_spacing: "-0.04em"
          line_height: 0.85
          font_size: "clamp(4rem, 12vw, 11rem)"
          transform: "scaleY(1.15)"

      - name: Raw Sans-Serif Punch
        description: Utilize ultra-thick display fonts in all-caps, scaling single crucial words up to massive sizes.
        css_properties:
          font_family: "'Barlow Condensed', sans-serif"
          font_weight: 900
          text_transform: uppercase
          line_height: 0.9
          font_size: "clamp(5rem, 14vw, 13rem)"
          letter_spacing: "-0.02em"

      - name: Interlocking Effect
        description: Mix baseline angles or utilize wavy text paths to interlock line stacks seamlessly into one cohesive visual asset.

  focal_graphics:
    title: Focal Graphic Infrastructure (No More Outlines)
    description: Discard faint, transparent linear icons. Every graphic asset must be a solid, deliberate shape interacting boldly with the type blocks.

    techniques:
      - name: Angular Fractures & Shards
        description: Geometric breakdowns forming cohesive elements (like angular broken-shard rose silhouette or geometric guitar).

      - name: The Slanted Slice
        description: Crop motifs diagonally across the layout grids to establish motion.

      - name: Flat Iconography Overlays
        description: High-contrast color blocks with solid silhouettes positioned directly over or beneath contrasting color backgrounds.

  texture_distressing:
    title: Low-Fidelity Texture and Print Distressing
    description: Translate the punk and vintage gig aesthetic natively to CSS without overloading image resources using high-contrast SVG alpha masks or web-native blending filters.

  color_contrast:
    title: Hardcore Contrast Color Play (The 3-Tone Limit)
    description: Every card, zone, or landing block must strictly limit its visual environment to 2 or 3 solid colors maximum. Avoid smooth gradients; utilize flat, punchy contrasts.

    color_schemes:
      - name: Deep Velvet Midnight
        background: "#1A2744"
        background_name: Deep Navy
        text_color: "#F5EDDC"
        text_name: Cream
        accent_feature: "#E8A33D"
        accent_name: Warm Amber
        reference: "030_In_a_graphic_design_style_this_banner_announces_iSQgDV_T.png"

      - name: High-Voltage Acid
        background: "#1A1A1A"
        background_name: Near Black
        text_color: "#E8A33D"
        text_name: Warm Amber
        accent_feature: "#F5EDDC"
        accent_name: Cream Details
        reference: "032_In_a_vintage_poster_style_this_design_features_JTs1t_r9.png"

      - name: Raw Distressed Grunge
        background: "#4A0E17"
        background_name: Deep Burgundy
        text_color: "#F5EDDC"
        text_name: Cream Ink
        accent_feature: "#1A1A1A"
        accent_name: Solid Block Bars
        reference: "025_In_a_grunge_poster_style_this_artwork_features_a_4E4ZX208.png"

      - name: Atomic Vintage Metal
        background: "#0D0D0D"
        background_name: Pure Ink Black
        text_color: "#E8A33D"
        text_name: Vibrant Gold
        accent_feature: "#F5EDDC"
        accent_name: Stark White
        reference: "028_In_a_retro_rock_poster_style_this_image_displays_3_1oDse.png"

component_blueprint:
  description: Production-ready implementation of a full-bleed, high-contrast poster component using inline graphics.

  css_variables:
    bg_dark: "#0D0D0D"
    gold_ink: "#E8A33D"
    cream_ink: "#F5EDDC"
    burgundy_ink: "#4A0E17"
    font_family: "'Barlow Condensed', sans-serif"

  component_classes:
    punk_poster_card:
      background_color: "var(--bg-dark)"
      color: "var(--gold-ink)"
      padding: "2.5rem"
      border: "4px solid var(--bg-dark)"
      outline: "2px solid var(--cream-ink)"
      outline_offset: "-8px"
      position: relative
      overflow: hidden
      display: flex
      flex_direction: column
      justify_content: space_between
      min_height: "550px"

    punk_meta_top:
      font_weight: 900
      text_transform: uppercase
      font_size: "1.1rem"
      letter_spacing: "0.15em"
      border_bottom: "3px solid var(--gold-ink)"
      padding_bottom: "0.5rem"
      display: flex
      justify_content: space_between

    punk_headline_group:
      margin_top: "1.5rem"
      z_index: 2

    punk_title_stretch:
      font_family: "'Barlow Condensed', sans-serif"
      font_weight: 900
      text_transform: uppercase
      font_size: "clamp(4rem, 10vw, 8.5rem)"
      line_height: 0.8
      letter_spacing: "-0.04em"
      display: block
      color: "var(--cream-ink)"

    punk_title_accent:
      font_family: "'Barlow Condensed', sans-serif"
      font_weight: 900
      text_transform: uppercase
      font_size: "clamp(4.5rem, 11vw, 9.5rem)"
      line_height: 0.85
      letter_spacing: "-0.02em"
      display: block
      color: "var(--gold-ink)"

    punk_graphic_container:
      position: absolute
      bottom: "15%"
      right: "-5%"
      width: "60%"
      height: "50%"
      z_index: 1
      opacity: 0.85
      transform: "rotate(-12deg)"

    punk_footer_strip:
      z_index: 2
      background: "var(--cream-ink)"
      color: "var(--bg-dark)"
      margin_left: "-2.5rem"
      margin_right: "-2.5rem"
      margin_bottom: "-2.5rem"
      padding: "0.75rem 2.5rem"
      font_weight: 900
      text_transform: uppercase
      letter_spacing: "0.05em"
      font_size: "1.2rem"
      display: flex
      justify_content: space_between
      align_items: center

duda_integration:
  deployment_logic:
    - step: 1
      title: Scope Encapsulation
      description: Maintain all production styling nested inside unique root selectors (.sc-root-punk) to insulate client layouts completely from Duda's global grid rules.

    - step: 2
      title: Text Elongation Performance
      description: Utilize CSS transform scaleY() values or variable viewport width calculations (clamp()) to ensure headers expand to lock precisely to the outer edges of their containing grid blocks without overflowing.

    - step: 3
      title: Typography Engine
      description: Map your template's display styles directly to hard-hitting sans-serif components within Duda's Global Style Engine, or inject a scoped link tag targeting ultra-heavy fonts (Barlow Condensed 800/900) directly inside your custom layout header blocks.
```
