/* @ds-bundle: {"format":4,"namespace":"DigitalAlliesDesignSystem_611984","components":[{"name":"ContentCalendar","sourcePath":"ui_kits/website/ContentCalendar.jsx"}],"sourceHashes":{"client-docs/doc-page.js":"371bab66f42d","cms/_archive/connected/admin.jsx":"d8bc1ecfd323","cms/_archive/connected/app.jsx":"ad4bfca5471a","cms/_archive/connected/icons.jsx":"05a34cc83944","cms/_archive/connected/site.jsx":"e0e29fb4611f","cms/_archive/connected/store.js":"d1a5965bd64e","cms/_archive/connected/tweaks-panel.jsx":"6591467622ed","cms/_archive/connected/workspace/content-tabs.jsx":"53bb850b5817","cms/_archive/connected/workspace/content.jsx":"7e137b44fecb","cms/_archive/connected/workspace/icons-ext.jsx":"36f44394b260","cms/_archive/connected/workspace/palette.jsx":"4bdbbb10db95","cms/_archive/connected/workspace/projects.jsx":"db559be2f72d","cms/_archive/connected/workspace/shell.jsx":"dea932169c26","cms/_archive/connected/workspace/store.js":"49a5947f4cce","cms/_archive/connected/workspace/views.jsx":"4603446bb5dc","cms/app.js":"e44b9d9daeee","social/AEO.jsx":"2cbf598790c0","social/Atoms.jsx":"39e18fb81884","social/Kingman.jsx":"55687765c9df","social/Strategy.jsx":"f988978d78dc","social/design-canvas.jsx":"3b0e985041dd","ui_kits/website/ContentCalendar.jsx":"6fcbe5a085b7","ui_kits/website/Departments.jsx":"5a1fb1b1de39","ui_kits/website/Diagrams.jsx":"2ef376b61dec","ui_kits/website/FieldNotes.jsx":"b6568defa0ec","ui_kits/website/Footer.jsx":"29f8851f9d16","ui_kits/website/Hero.jsx":"c14118abc65d","ui_kits/website/JargonJar.jsx":"0bb1011651dd","ui_kits/website/Nav.jsx":"dde49a8d0d79","ui_kits/website/Pricing.jsx":"0c8fab87e151","ui_kits/website/Primitives.jsx":"9b64780c9f2a","ui_kits/website/Reliability.jsx":"cd10d47b9ca3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DigitalAlliesDesignSystem_611984 = window.DigitalAlliesDesignSystem_611984 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// client-docs/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "client-docs/doc-page.js", error: String((e && e.message) || e) }); }

// cms/_archive/connected/admin.jsx
try { (() => {
/* ============================================================
   ADMIN CMS — Site Admin for Digital Allies.
   Exports window.AdminApp({ data, actions, layout, chrome,
                             section, setSection, onViewSite })
   layout: 'topbar' | 'sidebar' | 'rail'
   chrome: 'dark' | 'light'
   ============================================================ */
(function () {
  const {
    useState,
    useEffect
  } = React;
  const Icon = window.Icon;
  const NAV = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard'
  }, {
    id: 'posts',
    label: 'Posts',
    icon: 'fileText'
  }, {
    id: 'services',
    label: 'The Departments',
    icon: 'briefcase'
  }, {
    id: 'testimonials',
    label: 'Field Notes',
    icon: 'star'
  }, {
    id: 'messages',
    label: 'Command Center',
    icon: 'message'
  }, {
    id: 'settings',
    label: 'Settings',
    icon: 'settings'
  }];
  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '—';
  const fmtAgo = d => {
    if (!d) return '';
    const diff = (Date.now() - new Date(d).getTime()) / 1000;
    if (diff < 3600) return Math.max(1, Math.floor(diff / 60)) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  // ── Reusable field ──────────────────────────────────────────
  function Field({
    label,
    hint,
    children
  }) {
    return /*#__PURE__*/React.createElement("label", {
      className: "afield"
    }, /*#__PURE__*/React.createElement("span", {
      className: "afield__label"
    }, label, hint && /*#__PURE__*/React.createElement("em", {
      className: "afield__hint"
    }, hint)), children);
  }
  function PageHead({
    title,
    sub,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "apage__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "apage__title"
    }, title), sub && /*#__PURE__*/React.createElement("p", {
      className: "apage__sub"
    }, sub)), /*#__PURE__*/React.createElement("div", {
      className: "apage__actions"
    }, children));
  }

  // ── Dashboard ───────────────────────────────────────────────
  function Dashboard({
    data,
    setSection,
    onViewSite
  }) {
    const unread = data.messages.filter(m => !m.read).length;
    const drafts = data.posts.filter(p => p.status === 'draft').length;
    const stats = [{
      label: 'Blog Posts',
      value: data.posts.length,
      sub: drafts + ' draft' + (drafts === 1 ? '' : 's'),
      id: 'posts',
      icon: 'fileText'
    }, {
      label: 'Departments',
      value: data.services.length,
      sub: 'live on site',
      id: 'services',
      icon: 'briefcase'
    }, {
      label: 'Field Notes',
      value: data.testimonials.length,
      sub: 'published',
      id: 'testimonials',
      icon: 'star'
    }, {
      label: 'Unread Transmissions',
      value: unread,
      sub: data.messages.length + ' total',
      id: 'messages',
      icon: 'message',
      alert: unread > 0
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "apage"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: "Dashboard",
      sub: "Everything you change here goes live on the site."
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--ghost",
      onClick: onViewSite
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 13
    }), " View site")), /*#__PURE__*/React.createElement("div", {
      className: "stat-grid"
    }, stats.map(s => /*#__PURE__*/React.createElement("button", {
      className: 'stat-card' + (s.alert ? ' stat-card--alert' : ''),
      key: s.id,
      onClick: () => setSection(s.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-card__top"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 15
    }), s.alert && /*#__PURE__*/React.createElement("span", {
      className: "da-signal-dot stat-card__dot"
    })), /*#__PURE__*/React.createElement("span", {
      className: "stat-card__val"
    }, s.value), /*#__PURE__*/React.createElement("span", {
      className: "stat-card__label"
    }, s.label), /*#__PURE__*/React.createElement("span", {
      className: "stat-card__sub"
    }, s.sub)))), /*#__PURE__*/React.createElement("h2", {
      className: "asubhead"
    }, "Quick actions"), /*#__PURE__*/React.createElement("div", {
      className: "quick-grid"
    }, /*#__PURE__*/React.createElement("button", {
      className: "quick-card",
      onClick: () => setSection('posts:new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "New blog post"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "quick-card",
      onClick: () => setSection('services')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "briefcase",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Edit a Department"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "quick-card",
      onClick: () => setSection('settings')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Edit site settings"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "quick-card",
      onClick: () => setSection('messages')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "message",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Read transmissions"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    }))), /*#__PURE__*/React.createElement("div", {
      className: "da-pinned dash-pin"
    }, /*#__PURE__*/React.createElement("strong", null, "Connected, not copied."), " This admin and the public site read from the same source. Save a change here, switch to ", /*#__PURE__*/React.createElement("em", null, "Live Site"), ", and it\u2019s already there."));
  }

  // ── Posts ───────────────────────────────────────────────────
  function slugify(t) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  }
  function PostsList({
    data,
    setSection,
    onEdit
  }) {
    const posts = [...data.posts].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return /*#__PURE__*/React.createElement("div", {
      className: "apage"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: "Posts",
      sub: "The Journal \u2014 long-form notes from the desk."
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: () => setSection('posts:new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " New post")), /*#__PURE__*/React.createElement("div", {
      className: "alist"
    }, posts.map(p => /*#__PURE__*/React.createElement("button", {
      className: "arow",
      key: p.id,
      onClick: () => onEdit(p)
    }, /*#__PURE__*/React.createElement("span", {
      className: 'pill ' + (p.status === 'published' ? 'pill--live' : 'pill--draft')
    }, p.status), /*#__PURE__*/React.createElement("span", {
      className: "arow__main"
    }, /*#__PURE__*/React.createElement("span", {
      className: "arow__title"
    }, p.title), /*#__PURE__*/React.createElement("span", {
      className: "arow__meta"
    }, "/", p.slug, " \xB7 updated ", fmtDate(p.updated_at))), /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 15,
      className: "arow__go"
    }))), !posts.length && /*#__PURE__*/React.createElement("p", {
      className: "empty"
    }, "No posts yet. Write the first one.")));
  }
  function PostEditor({
    post,
    actions,
    onDone
  }) {
    const isNew = !post;
    const [title, setTitle] = useState(post?.title ?? '');
    const [slug, setSlug] = useState(post?.slug ?? '');
    const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
    const [content, setContent] = useState(post?.content ?? '');
    const [status, setStatus] = useState(post?.status ?? 'draft');
    const editRef = React.useRef(null);
    useEffect(() => {
      if (editRef.current) editRef.current.innerHTML = post?.content ?? '';
    }, []);
    function onTitle(e) {
      setTitle(e.target.value);
      if (isNew) setSlug(slugify(e.target.value));
    }
    function exec(cmd, val) {
      document.execCommand(cmd, false, val);
      editRef.current.focus();
    }
    function save() {
      const html = editRef.current ? editRef.current.innerHTML : content;
      actions.savePost({
        id: post?.id,
        title,
        slug: slug || slugify(title),
        excerpt,
        content: html,
        status,
        published_at: status === 'published' ? post?.published_at ?? new Date().toISOString() : null
      });
      onDone();
    }
    const Tb = ({
      cmd,
      val,
      icon,
      title
    }) => /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "tb-btn",
      title: title,
      onMouseDown: e => {
        e.preventDefault();
        exec(cmd, val);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 14
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "apage apage--narrow"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: isNew ? 'New post' : 'Edit post'
    }, !isNew && /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--danger",
      onClick: () => {
        if (confirm('Delete this post?')) {
          actions.deletePost(post.id);
          onDone();
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    }), " Delete"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--ghost",
      onClick: onDone
    }, "Cancel"), /*#__PURE__*/React.createElement("select", {
      className: "ainput ainput--select",
      value: status,
      onChange: e => setStatus(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "draft"
    }, "Draft"), /*#__PURE__*/React.createElement("option", {
      value: "published"
    }, "Published")), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: save,
      disabled: !title.trim()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save")), /*#__PURE__*/React.createElement("div", {
      className: "editor-stack"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Title"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ainput ainput--lg",
      value: title,
      onChange: onTitle,
      placeholder: "Post title"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Slug"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ainput mono",
      value: slug,
      onChange: e => setSlug(e.target.value),
      placeholder: "post-url-slug"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Excerpt",
      hint: "(shown in the blog list)"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ainput",
      rows: 2,
      value: excerpt,
      onChange: e => setExcerpt(e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rte"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rte__toolbar"
    }, /*#__PURE__*/React.createElement(Tb, {
      cmd: "bold",
      icon: "bold",
      title: "Bold"
    }), /*#__PURE__*/React.createElement(Tb, {
      cmd: "italic",
      icon: "italic",
      title: "Italic"
    }), /*#__PURE__*/React.createElement("span", {
      className: "rte__sep"
    }), /*#__PURE__*/React.createElement(Tb, {
      cmd: "formatBlock",
      val: "<h2>",
      icon: "heading",
      title: "Heading"
    }), /*#__PURE__*/React.createElement(Tb, {
      cmd: "formatBlock",
      val: "<blockquote>",
      icon: "quote",
      title: "Quote"
    }), /*#__PURE__*/React.createElement(Tb, {
      cmd: "insertUnorderedList",
      icon: "list",
      title: "List"
    })), /*#__PURE__*/React.createElement("div", {
      className: "rte__area prose-da",
      contentEditable: true,
      ref: editRef,
      suppressContentEditableWarning: true
    })))));
  }

  // ── Departments (services) ──────────────────────────────────
  const ICONS = ['compass', 'cog', 'timer', 'radar'];
  function Services({
    data,
    actions,
    editing,
    setEditing
  }) {
    const list = [...data.services].sort((a, b) => a.display_order - b.display_order);
    if (editing) return /*#__PURE__*/React.createElement(ServiceEditor, {
      svc: editing === 'new' ? null : editing,
      count: list.length,
      actions: actions,
      onDone: () => setEditing(null)
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "apage"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: "The Departments",
      sub: "Four distinct operations. One point of contact."
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: () => setEditing('new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " Add department")), /*#__PURE__*/React.createElement("div", {
      className: "svc-list"
    }, list.map((svc, i) => /*#__PURE__*/React.createElement("div", {
      className: "svc-item",
      key: svc.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "svc-item__icon"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: svc.icon,
      size: 22,
      stroke: 1.4
    })), /*#__PURE__*/React.createElement("div", {
      className: "svc-item__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "svc-item__top"
    }, /*#__PURE__*/React.createElement("h3", null, svc.title), /*#__PURE__*/React.createElement("span", {
      className: "svc-item__price"
    }, svc.price)), /*#__PURE__*/React.createElement("p", null, svc.description)), /*#__PURE__*/React.createElement("div", {
      className: "svc-item__ctrls"
    }, /*#__PURE__*/React.createElement("button", {
      className: "iconbtn",
      disabled: i === 0,
      onClick: () => actions.moveService(svc.id, -1),
      title: "Move up"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 15,
      style: {
        transform: 'rotate(180deg)'
      }
    })), /*#__PURE__*/React.createElement("button", {
      className: "iconbtn",
      disabled: i === list.length - 1,
      onClick: () => actions.moveService(svc.id, 1),
      title: "Move down"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 15
    })), /*#__PURE__*/React.createElement("button", {
      className: "iconbtn",
      onClick: () => setEditing(svc),
      title: "Edit"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 15
    })))))));
  }
  function ServiceEditor({
    svc,
    count,
    actions,
    onDone
  }) {
    const isNew = !svc;
    const [f, setF] = useState(svc || {
      title: '',
      description: '',
      price: 'From $',
      icon: 'compass'
    });
    const set = k => e => setF(p => ({
      ...p,
      [k]: e.target.value
    }));
    function save() {
      actions.saveService({
        ...f,
        id: svc?.id,
        display_order: svc?.display_order ?? count
      });
      onDone();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "apage apage--narrow"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: isNew ? 'New department' : 'Edit department'
    }, !isNew && /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--danger",
      onClick: () => {
        if (confirm('Delete this department?')) {
          actions.deleteService(svc.id);
          onDone();
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    }), " Delete"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--ghost",
      onClick: onDone
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: save,
      disabled: !f.title.trim()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save")), /*#__PURE__*/React.createElement("div", {
      className: "editor-stack"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Department name"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ainput ainput--lg",
      value: f.title,
      onChange: set('title'),
      placeholder: "The Design Bureau"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Artifact icon"
    }, /*#__PURE__*/React.createElement("div", {
      className: "icon-picker"
    }, ICONS.map(ic => /*#__PURE__*/React.createElement("button", {
      key: ic,
      className: 'icon-opt' + (f.icon === ic ? ' is-on' : ''),
      onClick: () => setF(p => ({
        ...p,
        icon: ic
      })),
      type: "button"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 22,
      stroke: 1.4
    }))))), /*#__PURE__*/React.createElement(Field, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ainput",
      rows: 3,
      value: f.description,
      onChange: set('description')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Price",
      hint: "(use the From $X convention)"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ainput mono",
      value: f.price,
      onChange: set('price'),
      placeholder: "From $2,400"
    }))));
  }

  // ── Field Notes (testimonials) ──────────────────────────────
  function FieldNotes({
    data,
    actions,
    editing,
    setEditing
  }) {
    const list = [...data.testimonials].sort((a, b) => a.display_order - b.display_order);
    if (editing) return /*#__PURE__*/React.createElement(NoteEditor, {
      note: editing === 'new' ? null : editing,
      count: list.length,
      actions: actions,
      onDone: () => setEditing(null)
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "apage"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: "Field Notes",
      sub: "Testimonials from the people you have helped."
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: () => setEditing('new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " Add note")), /*#__PURE__*/React.createElement("div", {
      className: "notes-admin"
    }, list.map(t => /*#__PURE__*/React.createElement("button", {
      className: "note-admin",
      key: t.id,
      onClick: () => setEditing(t)
    }, /*#__PURE__*/React.createElement("div", {
      className: "note-admin__stars"
    }, Array.from({
      length: t.rating || 5
    }).map((_, i) => /*#__PURE__*/React.createElement(Icon, {
      key: i,
      name: "star",
      size: 12,
      color: "var(--signal)",
      style: {
        fill: 'var(--signal)'
      }
    }))), /*#__PURE__*/React.createElement("p", {
      className: "note-admin__quote"
    }, "\u201C", t.content, "\u201D"), /*#__PURE__*/React.createElement("div", {
      className: "note-admin__by"
    }, /*#__PURE__*/React.createElement("strong", null, t.author_name), /*#__PURE__*/React.createElement("span", null, t.author_role)), /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 14,
      className: "note-admin__edit"
    })))));
  }
  function NoteEditor({
    note,
    count,
    actions,
    onDone
  }) {
    const isNew = !note;
    const [f, setF] = useState(note || {
      author_name: '',
      author_role: '',
      content: '',
      rating: 5
    });
    const set = k => e => setF(p => ({
      ...p,
      [k]: e.target.value
    }));
    function save() {
      actions.saveTestimonial({
        ...f,
        id: note?.id,
        rating: Number(f.rating),
        display_order: note?.display_order ?? count
      });
      onDone();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "apage apage--narrow"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: isNew ? 'New field note' : 'Edit field note'
    }, !isNew && /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--danger",
      onClick: () => {
        if (confirm('Delete this note?')) {
          actions.deleteTestimonial(note.id);
          onDone();
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    }), " Delete"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--ghost",
      onClick: onDone
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: save,
      disabled: !f.content.trim()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save")), /*#__PURE__*/React.createElement("div", {
      className: "editor-stack"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Quote"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ainput",
      rows: 4,
      value: f.content,
      onChange: set('content'),
      placeholder: "What did they say?"
    })), /*#__PURE__*/React.createElement("div", {
      className: "afield-row"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Author name"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ainput",
      value: f.author_name,
      onChange: set('author_name')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Rating"
    }, /*#__PURE__*/React.createElement("select", {
      className: "ainput ainput--select",
      value: f.rating,
      onChange: set('rating')
    }, [5, 4, 3, 2, 1].map(n => /*#__PURE__*/React.createElement("option", {
      key: n,
      value: n
    }, n, " stars"))))), /*#__PURE__*/React.createElement(Field, {
      label: "Author role / business"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ainput",
      value: f.author_role,
      onChange: set('author_role'),
      placeholder: "Vance & Daughters Hardware \xB7 Kingman"
    }))));
  }

  // ── Command Center (messages) ───────────────────────────────
  function Messages({
    data,
    actions
  }) {
    const list = [...data.messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [open, setOpen] = useState(list[0]?.id ?? null);
    const active = list.find(m => m.id === open);
    return /*#__PURE__*/React.createElement("div", {
      className: "apage"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: "The Command Center",
      sub: "Transmissions from the contact form arrive here."
    }), /*#__PURE__*/React.createElement("div", {
      className: "cc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cc__list"
    }, list.map(m => /*#__PURE__*/React.createElement("button", {
      className: 'cc__item' + (m.id === open ? ' is-open' : '') + (!m.read ? ' is-unread' : ''),
      key: m.id,
      onClick: () => {
        setOpen(m.id);
        if (!m.read) actions.markRead(m.id, true);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cc__item-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cc__from"
    }, !m.read && /*#__PURE__*/React.createElement("span", {
      className: "da-signal-dot cc__unread"
    }), m.name), /*#__PURE__*/React.createElement("span", {
      className: "cc__time"
    }, fmtAgo(m.created_at))), /*#__PURE__*/React.createElement("span", {
      className: "cc__subj"
    }, m.subject || '(no subject)'), /*#__PURE__*/React.createElement("span", {
      className: "cc__snip"
    }, m.message))), !list.length && /*#__PURE__*/React.createElement("p", {
      className: "empty"
    }, "No transmissions yet.")), active ? /*#__PURE__*/React.createElement("div", {
      className: "cc__detail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cc__detail-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, active.subject || '(no subject)'), /*#__PURE__*/React.createElement("p", {
      className: "cc__detail-from"
    }, active.name, " \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: 'mailto:' + active.email
    }, active.email), active.phone && ' · ' + active.phone)), /*#__PURE__*/React.createElement("div", {
      className: "cc__detail-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "iconbtn",
      title: active.read ? 'Mark unread' : 'Mark read',
      onClick: () => actions.markRead(active.id, !active.read)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 15
    })), /*#__PURE__*/React.createElement("button", {
      className: "iconbtn",
      title: "Delete",
      onClick: () => {
        if (confirm('Delete this transmission?')) {
          actions.deleteMessage(active.id);
          setOpen(null);
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 15
    })))), /*#__PURE__*/React.createElement("p", {
      className: "cc__body"
    }, active.message), /*#__PURE__*/React.createElement("div", {
      className: "cc__reply"
    }, /*#__PURE__*/React.createElement("a", {
      className: "abtn abtn--primary",
      href: 'mailto:' + active.email
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 13
    }), " Reply by email"), /*#__PURE__*/React.createElement("span", {
      className: "cc__received"
    }, "Received ", fmtDate(active.created_at)))) : /*#__PURE__*/React.createElement("div", {
      className: "cc__detail cc__detail--empty"
    }, "Select a transmission to read it.")));
  }

  // ── Settings ────────────────────────────────────────────────
  const SETTING_GROUPS = [{
    title: 'Identity',
    fields: [{
      key: 'site_title',
      label: 'Business name'
    }, {
      key: 'tagline',
      label: 'Tagline',
      type: 'textarea'
    }, {
      key: 'brand_color',
      label: 'Brand color',
      type: 'color'
    }]
  }, {
    title: 'The Lobby (hero)',
    fields: [{
      key: 'hero_title',
      label: 'Hero headline',
      type: 'textarea'
    }, {
      key: 'hero_subtitle',
      label: 'Hero subheading',
      type: 'textarea'
    }, {
      key: 'hero_cta_text',
      label: 'Hero button text'
    }]
  }, {
    title: 'About',
    fields: [{
      key: 'about_title',
      label: 'About title'
    }, {
      key: 'about_body',
      label: 'About text',
      type: 'textarea',
      rows: 5
    }]
  }, {
    title: 'Contact',
    fields: [{
      key: 'phone',
      label: 'Phone'
    }, {
      key: 'email',
      label: 'Email'
    }, {
      key: 'address',
      label: 'Location line',
      type: 'textarea'
    }, {
      key: 'business_hours',
      label: 'Business hours'
    }]
  }];
  const SWATCHES = ['#3A7BD5', '#C5301A', '#1F8A5B', '#7A5AE0', '#B7791F'];
  function Settings({
    data,
    actions,
    onToast
  }) {
    const [v, setV] = useState(data.settings);
    const [dirty, setDirty] = useState(false);
    const set = k => e => {
      setV(p => ({
        ...p,
        [k]: e.target.value
      }));
      setDirty(true);
    };
    const setVal = (k, val) => {
      setV(p => ({
        ...p,
        [k]: val
      }));
      setDirty(true);
    };
    function save() {
      actions.saveSettings(v);
      setDirty(false);
      onToast && onToast('Settings saved · Live site updated');
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "apage apage--narrow"
    }, /*#__PURE__*/React.createElement(PageHead, {
      title: "Site Settings",
      sub: "The words and identity of the public site."
    }, dirty && /*#__PURE__*/React.createElement("span", {
      className: "dirty-dot"
    }, "Unsaved"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn--primary",
      onClick: save,
      disabled: !dirty
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save changes")), SETTING_GROUPS.map(g => /*#__PURE__*/React.createElement("section", {
      className: "settings-group",
      key: g.title
    }, /*#__PURE__*/React.createElement("h2", {
      className: "asubhead"
    }, g.title), /*#__PURE__*/React.createElement("div", {
      className: "settings-card"
    }, g.fields.map(fld => /*#__PURE__*/React.createElement(Field, {
      key: fld.key,
      label: fld.label
    }, fld.type === 'textarea' ? /*#__PURE__*/React.createElement("textarea", {
      className: "ainput",
      rows: fld.rows || 2,
      value: v[fld.key] || '',
      onChange: set(fld.key)
    }) : fld.type === 'color' ? /*#__PURE__*/React.createElement("div", {
      className: "color-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "color-chip",
      style: {
        background: v[fld.key]
      }
    }), SWATCHES.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      type: "button",
      className: 'swatch' + (v[fld.key] === c ? ' is-on' : ''),
      style: {
        background: c
      },
      onClick: () => setVal(fld.key, c)
    })), /*#__PURE__*/React.createElement("input", {
      className: "ainput mono color-hex",
      value: v[fld.key] || '',
      onChange: set(fld.key)
    })) : /*#__PURE__*/React.createElement("input", {
      className: "ainput",
      value: v[fld.key] || '',
      onChange: set(fld.key)
    })))))));
  }

  // ── Nav chrome ──────────────────────────────────────────────
  function Brand({
    collapsed
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "admin-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse"
    }), !collapsed && /*#__PURE__*/React.createElement("span", null, "Site Admin"));
  }
  function NavItems({
    section,
    go,
    collapsed
  }) {
    const cur = section.split(':')[0];
    return NAV.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: 'navitem' + (cur === n.id ? ' is-active' : ''),
      onClick: () => go(n.id),
      title: n.label
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 15
    }), !collapsed && /*#__PURE__*/React.createElement("span", null, n.label)));
  }
  function AdminApp({
    data,
    actions,
    layout = 'topbar',
    chrome = 'dark',
    section,
    setSection,
    onViewSite,
    onToast
  }) {
    const base = section.split(':')[0];
    const sub = section.split(':')[1];
    const [svcEditing, setSvcEditing] = useState(null);
    const [noteEditing, setNoteEditing] = useState(null);
    const go = id => {
      setSection(id);
      setSvcEditing(null);
      setNoteEditing(null);
    };

    // posts editor state derived from section ("posts:new" or "posts:edit")
    const [editingPost, setEditingPost] = useState(null);
    useEffect(() => {
      if (base !== 'posts') setEditingPost(null);
      if (section === 'posts:new') setEditingPost('new');
    }, [section]);
    let content;
    if (base === 'dashboard') content = /*#__PURE__*/React.createElement(Dashboard, {
      data: data,
      setSection: go,
      onViewSite: onViewSite
    });else if (base === 'posts') {
      if (editingPost === 'new') content = /*#__PURE__*/React.createElement(PostEditor, {
        actions: actions,
        onDone: () => {
          setEditingPost(null);
          setSection('posts');
        }
      });else if (editingPost) content = /*#__PURE__*/React.createElement(PostEditor, {
        post: editingPost,
        actions: actions,
        onDone: () => {
          setEditingPost(null);
          setSection('posts');
        }
      });else content = /*#__PURE__*/React.createElement(PostsList, {
        data: data,
        setSection: go,
        onEdit: p => setEditingPost(p)
      });
    } else if (base === 'services') content = /*#__PURE__*/React.createElement(Services, {
      data: data,
      actions: actions,
      editing: svcEditing,
      setEditing: setSvcEditing
    });else if (base === 'testimonials') content = /*#__PURE__*/React.createElement(FieldNotes, {
      data: data,
      actions: actions,
      editing: noteEditing,
      setEditing: setNoteEditing
    });else if (base === 'messages') content = /*#__PURE__*/React.createElement(Messages, {
      data: data,
      actions: actions
    });else if (base === 'settings') content = /*#__PURE__*/React.createElement(Settings, {
      data: data,
      actions: actions,
      onToast: onToast
    });
    const unread = data.messages.filter(m => !m.read).length;
    return /*#__PURE__*/React.createElement("div", {
      className: 'admin admin--' + layout + ' admin--' + chrome
    }, layout === 'topbar' && /*#__PURE__*/React.createElement("header", {
      className: "admin-topbar"
    }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("nav", {
      className: "admin-topbar__nav"
    }, /*#__PURE__*/React.createElement(NavItems, {
      section: section,
      go: go
    })), /*#__PURE__*/React.createElement("div", {
      className: "admin-topbar__right"
    }, unread > 0 && /*#__PURE__*/React.createElement("span", {
      className: "admin-badge"
    }, unread), /*#__PURE__*/React.createElement("button", {
      className: "admin-user",
      onClick: onViewSite,
      title: "View live site"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 13
    }), " View site"))), (layout === 'sidebar' || layout === 'rail') && /*#__PURE__*/React.createElement("aside", {
      className: 'admin-side' + (layout === 'rail' ? ' admin-side--rail' : '')
    }, /*#__PURE__*/React.createElement(Brand, {
      collapsed: layout === 'rail'
    }), /*#__PURE__*/React.createElement("nav", {
      className: "admin-side__nav"
    }, /*#__PURE__*/React.createElement(NavItems, {
      section: section,
      go: go,
      collapsed: layout === 'rail'
    })), /*#__PURE__*/React.createElement("button", {
      className: "navitem navitem--foot",
      onClick: onViewSite,
      title: "View live site"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 15
    }), layout !== 'rail' && /*#__PURE__*/React.createElement("span", null, "View live site"))), /*#__PURE__*/React.createElement("main", {
      className: "admin-main"
    }, content));
  }
  window.AdminApp = AdminApp;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/admin.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/app.jsx
try { (() => {
/* ============================================================
   SHELL — browser chrome, Admin <-> Live Site, device toggle,
   connected-save feedback, Tweaks. Mounts the whole prototype.
   ============================================================ */
(function () {
  const {
    useState,
    useEffect,
    useCallback
  } = React;
  const Icon = window.Icon;
  const Store = window.CMSStore;
  function useStore() {
    const [data, setData] = useState(Store.get());
    useEffect(() => Store.subscribe(s => setData({
      ...s
    })), []);
    return data;
  }

  // ── Toast ───────────────────────────────────────────────────
  function Toast({
    msg
  }) {
    if (!msg) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "toast",
      key: msg.id
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse toast__dot"
    }), /*#__PURE__*/React.createElement("span", null, msg.text));
  }
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "adminLayout": "topbar",
    "adminChrome": "dark",
    "startMode": "admin"
  } /*EDITMODE-END*/;
  function App() {
    const data = useStore();
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const [mode, setMode] = useState(t.startMode === 'site' ? 'site' : 'admin');
    const [device, setDevice] = useState('desktop');
    const [section, setSection] = useState('dashboard');
    const [toast, setToast] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const fireToast = useCallback(text => {
      setToast({
        id: Date.now(),
        text
      });
      setSyncing(true);
      setTimeout(() => setSyncing(false), 1100);
      setTimeout(() => setToast(cur => cur && Date.now() - cur.id >= 3200 ? null : cur), 3300);
    }, []);

    // honor startMode tweak when changed in panel
    useEffect(() => {
      setMode(t.startMode === 'site' ? 'site' : 'admin');
    }, [t.startMode]);

    // ── Store actions ─────────────────────────────────────────
    const actions = {
      saveSettings(next) {
        Store.update(d => {
          d.settings = {
            ...d.settings,
            ...next
          };
        });
      },
      savePost(post) {
        Store.update(d => {
          if (post.id) {
            const i = d.posts.findIndex(p => p.id === post.id);
            d.posts[i] = {
              ...d.posts[i],
              ...post,
              updated_at: new Date().toISOString()
            };
          } else {
            d.posts.unshift({
              ...post,
              id: Store.uid('post'),
              updated_at: new Date().toISOString()
            });
          }
        });
        fireToast(post.status === 'published' ? 'Post published · Live on the site' : 'Draft saved');
      },
      deletePost(id) {
        Store.update(d => {
          d.posts = d.posts.filter(p => p.id !== id);
        });
        fireToast('Post deleted');
      },
      saveService(svc) {
        Store.update(d => {
          if (svc.id) {
            const i = d.services.findIndex(x => x.id === svc.id);
            d.services[i] = {
              ...d.services[i],
              ...svc
            };
          } else d.services.push({
            ...svc,
            id: Store.uid('svc')
          });
        });
        fireToast('Department saved · Live site updated');
      },
      deleteService(id) {
        Store.update(d => {
          d.services = d.services.filter(x => x.id !== id);
        });
        fireToast('Department removed');
      },
      moveService(id, dir) {
        Store.update(d => {
          const arr = [...d.services].sort((a, b) => a.display_order - b.display_order);
          const i = arr.findIndex(x => x.id === id);
          const j = i + dir;
          if (j < 0 || j >= arr.length) return;
          [arr[i].display_order, arr[j].display_order] = [arr[j].display_order, arr[i].display_order];
        });
      },
      saveTestimonial(t2) {
        Store.update(d => {
          if (t2.id) {
            const i = d.testimonials.findIndex(x => x.id === t2.id);
            d.testimonials[i] = {
              ...d.testimonials[i],
              ...t2
            };
          } else d.testimonials.push({
            ...t2,
            id: Store.uid('tst')
          });
        });
        fireToast('Field note saved · Live site updated');
      },
      deleteTestimonial(id) {
        Store.update(d => {
          d.testimonials = d.testimonials.filter(x => x.id !== id);
        });
        fireToast('Field note removed');
      },
      markRead(id, read) {
        Store.update(d => {
          const m = d.messages.find(x => x.id === id);
          if (m) m.read = read;
        });
      },
      deleteMessage(id) {
        Store.update(d => {
          d.messages = d.messages.filter(x => x.id !== id);
        });
        fireToast('Transmission deleted');
      },
      addMessage(form) {
        Store.update(d => {
          d.messages.unshift({
            ...form,
            id: Store.uid('msg'),
            read: false,
            created_at: new Date().toISOString()
          });
        });
        fireToast('Transmission received · Now in the Command Center');
      }
    };
    const url = mode === 'admin' ? 'https://digitalallies.net/admin/' + section.split(':')[0].replace('dashboard', '') : 'https://digitalallies.net';
    return /*#__PURE__*/React.createElement("div", {
      className: "shell"
    }, /*#__PURE__*/React.createElement("div", {
      className: "strip"
    }, /*#__PURE__*/React.createElement("div", {
      className: "strip__brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse"
    }), /*#__PURE__*/React.createElement("span", {
      className: "strip__name"
    }, "Digital Allies"), /*#__PURE__*/React.createElement("span", {
      className: "strip__tag"
    }, "Connected CMS")), /*#__PURE__*/React.createElement("div", {
      className: "seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: mode === 'admin' ? 'is-on' : '',
      onClick: () => setMode('admin')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 13
    }), " Admin"), /*#__PURE__*/React.createElement("button", {
      className: mode === 'site' ? 'is-on' : '',
      onClick: () => setMode('site')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 13
    }), " Live Site")), /*#__PURE__*/React.createElement("div", {
      className: "strip__right"
    }, /*#__PURE__*/React.createElement("span", {
      className: 'sync' + (syncing ? ' sync--on' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse sync__dot"
    }), syncing ? 'Syncing…' : 'Connected'), mode === 'site' && /*#__PURE__*/React.createElement("div", {
      className: "seg seg--device"
    }, /*#__PURE__*/React.createElement("button", {
      className: device === 'desktop' ? 'is-on' : '',
      onClick: () => setDevice('desktop'),
      title: "Desktop"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "monitor",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: device === 'phone' ? 'is-on' : '',
      onClick: () => setDevice('phone'),
      title: "Phone"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "smartphone",
      size: 14
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "bw"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bw__bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bw__lights"
    }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "bw__url"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 11
    }), /*#__PURE__*/React.createElement("span", null, url)), /*#__PURE__*/React.createElement("div", {
      className: "bw__bar-right"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refresh",
      size: 13
    }))), /*#__PURE__*/React.createElement("div", {
      className: 'bw__view' + (mode === 'site' && device === 'phone' ? ' bw__view--stage' : '')
    }, mode === 'admin' ? /*#__PURE__*/React.createElement(AdminApp, {
      data: data,
      actions: actions,
      layout: t.adminLayout,
      chrome: t.adminChrome,
      section: section,
      setSection: setSection,
      onViewSite: () => setMode('site'),
      onToast: fireToast
    }) : device === 'phone' ? /*#__PURE__*/React.createElement("div", {
      className: "phone"
    }, /*#__PURE__*/React.createElement("div", {
      className: "phone__notch"
    }), /*#__PURE__*/React.createElement("div", {
      className: "phone__screen"
    }, /*#__PURE__*/React.createElement(PublicSite, {
      data: data,
      device: "phone",
      onSubmitMessage: actions.addMessage
    }))) : /*#__PURE__*/React.createElement(PublicSite, {
      data: data,
      device: "desktop",
      onSubmitMessage: actions.addMessage
    }))), /*#__PURE__*/React.createElement(Toast, {
      msg: toast
    }), /*#__PURE__*/React.createElement(window.TweaksPanel, null, /*#__PURE__*/React.createElement(window.TweakSection, {
      label: "Admin layout"
    }), /*#__PURE__*/React.createElement(window.TweakRadio, {
      label: "Navigation",
      value: t.adminLayout,
      options: [{
        value: 'topbar',
        label: 'Top bar'
      }, {
        value: 'sidebar',
        label: 'Sidebar'
      }, {
        value: 'rail',
        label: 'Rail'
      }],
      onChange: v => {
        setTweak('adminLayout', v);
        setMode('admin');
      }
    }), /*#__PURE__*/React.createElement(window.TweakRadio, {
      label: "Chrome",
      value: t.adminChrome,
      options: [{
        value: 'dark',
        label: 'Dark'
      }, {
        value: 'light',
        label: 'Light'
      }],
      onChange: v => {
        setTweak('adminChrome', v);
        setMode('admin');
      }
    }), /*#__PURE__*/React.createElement(window.TweakSection, {
      label: "Brand color"
    }), /*#__PURE__*/React.createElement(window.TweakColor, {
      label: "Accent (re-themes the site)",
      value: data.settings.brand_color,
      options: ['#3A7BD5', '#C5301A', '#1F8A5B', '#7A5AE0', '#B7791F'],
      onChange: v => {
        actions.saveSettings({
          brand_color: v
        });
      }
    }), /*#__PURE__*/React.createElement(window.TweakSection, {
      label: "Demo"
    }), /*#__PURE__*/React.createElement(window.TweakRadio, {
      label: "Start on",
      value: t.startMode,
      options: [{
        value: 'admin',
        label: 'Admin'
      }, {
        value: 'site',
        label: 'Live Site'
      }],
      onChange: v => setTweak('startMode', v)
    }), /*#__PURE__*/React.createElement(window.TweakButton, {
      label: "Reset demo content",
      onClick: () => {
        Store.reset();
        fireToast('Demo content reset');
      }
    })));
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/app.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/icons.jsx
try { (() => {
/* Shared line-art icon set — 1.5px stroke, square caps, matches the
   Digital Allies "Artifact Icon" aesthetic. Lucide-derived paths. */
(function () {
  const P = {
    // department artifacts
    compass: '<circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="12" y1="14" y2="9"/><circle cx="12" cy="14" r="8"/>',
    radar: '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/>',
    // ui
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrowRight: '<line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    plus: '<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>',
    x: '<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    bold: '<path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>',
    italic: '<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>',
    list: '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    heading: '<path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    grid: '<rect width="7" height="7" x="3" y="3"/><rect width="7" height="7" x="14" y="3"/><rect width="7" height="7" x="14" y="14"/><rect width="7" height="7" x="3" y="14"/>',
    plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>'
  };
  function Icon({
    name,
    size = 18,
    stroke = 1.6,
    color = 'currentColor',
    style,
    className
  }) {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className,
      style,
      dangerouslySetInnerHTML: {
        __html: P[name] || ''
      }
    });
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/icons.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/site.jsx
try { (() => {
/* ============================================================
   PUBLIC SITE — digitalallies.net, rendered live from the store.
   Exports window.PublicSite({ data, device, onSubmitMessage })
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const Icon = window.Icon;
  const ICON_FOR = {
    compass: 'compass',
    cog: 'cog',
    timer: 'timer',
    radar: 'radar'
  };
  function Eyebrow({
    children,
    tone
  }) {
    return /*#__PURE__*/React.createElement("span", {
      className: 'da-eyebrow' + (tone ? ' da-eyebrow--' + tone : '')
    }, children);
  }
  function Bracket({
    children,
    primary,
    href,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("a", {
      className: 'site-btn' + (primary ? ' site-btn--primary' : ''),
      href: href || '#',
      onClick: onClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "["), /*#__PURE__*/React.createElement("span", null, children), /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "]"));
  }

  // ── Nav ─────────────────────────────────────────────────────
  function SiteNav({
    s,
    compact,
    onNav
  }) {
    return /*#__PURE__*/React.createElement("header", {
      className: "site-nav"
    }, /*#__PURE__*/React.createElement("a", {
      className: "site-brand",
      href: "#top",
      onClick: e => {
        e.preventDefault();
        onNav('top');
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse"
    }), /*#__PURE__*/React.createElement("span", {
      className: "site-brand__word"
    }, s.site_title)), !compact && /*#__PURE__*/React.createElement("nav", {
      className: "site-nav__links"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#departments",
      onClick: e => {
        e.preventDefault();
        onNav('departments');
      }
    }, "The Departments"), /*#__PURE__*/React.createElement("a", {
      href: "#fieldnotes",
      onClick: e => {
        e.preventDefault();
        onNav('fieldnotes');
      }
    }, "Field Notes"), /*#__PURE__*/React.createElement("a", {
      href: "#journal",
      onClick: e => {
        e.preventDefault();
        onNav('journal');
      }
    }, "The Journal"), /*#__PURE__*/React.createElement("span", {
      className: "site-nav__lang",
      style: {
        color: "rgb(45, 45, 45)"
      }
    }, "EN ", /*#__PURE__*/React.createElement("span", null, "|"), " ES")), /*#__PURE__*/React.createElement("a", {
      className: "site-btn site-btn--primary site-nav__cta",
      href: "#contact",
      onClick: e => {
        e.preventDefault();
        onNav('contact');
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "["), /*#__PURE__*/React.createElement("span", null, s.hero_cta_text || 'Inquire Within'), /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "]")));
  }

  // ── Hero / The Lobby ────────────────────────────────────────
  function SiteHero({
    s,
    onNav
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "site-hero",
      id: "top"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, s.address), /*#__PURE__*/React.createElement("h1", {
      className: "site-hero__title da-display"
    }, s.hero_title), /*#__PURE__*/React.createElement("p", {
      className: "site-hero__sub"
    }, s.hero_subtitle), /*#__PURE__*/React.createElement("div", {
      className: "site-hero__cta"
    }, /*#__PURE__*/React.createElement(Bracket, {
      primary: true,
      href: "#contact",
      onClick: e => {
        e.preventDefault();
        onNav('contact');
      }
    }, s.hero_cta_text || 'Inquire Within'), /*#__PURE__*/React.createElement(Bracket, {
      href: "#departments",
      onClick: e => {
        e.preventDefault();
        onNav('departments');
      }
    }, "View the Departments")), /*#__PURE__*/React.createElement("div", {
      className: "da-pinned site-hero__pin"
    }, "Clean engineering, clear communication, and follow-through that won\u2019t require follow up."));
  }

  // ── The Departments ─────────────────────────────────────────
  function SiteDepartments({
    services
  }) {
    if (!services.length) return null;
    return /*#__PURE__*/React.createElement("section", {
      className: "site-section",
      id: "departments"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-section__head"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "blue"
    }, "The Departments"), /*#__PURE__*/React.createElement("h2", {
      className: "site-section__title"
    }, "Four distinct operations. One point of contact.")), /*#__PURE__*/React.createElement("div", {
      className: "dept-grid"
    }, services.map(svc => /*#__PURE__*/React.createElement("article", {
      className: "dept-card",
      key: svc.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "dept-card__icon"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ICON_FOR[svc.icon] || 'compass',
      size: 26,
      stroke: 1.4
    }), /*#__PURE__*/React.createElement("span", {
      className: "dept-card__dot"
    })), /*#__PURE__*/React.createElement("h3", {
      className: "dept-card__title"
    }, svc.title), /*#__PURE__*/React.createElement("p", {
      className: "dept-card__desc"
    }, svc.description), /*#__PURE__*/React.createElement("div", {
      className: "dept-card__price"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dept-card__price-label"
    }, "Transparency Table"), /*#__PURE__*/React.createElement("span", {
      className: "dept-card__price-val"
    }, svc.price))))));
  }

  // ── About ───────────────────────────────────────────────────
  function SiteAbout({
    s
  }) {
    if (!s.about_body) return null;
    return /*#__PURE__*/React.createElement("section", {
      className: "site-section site-about",
      id: "about"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-about__col"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Field Manual \xB7 01"), /*#__PURE__*/React.createElement("h2", {
      className: "site-section__title"
    }, s.about_title)), /*#__PURE__*/React.createElement("div", {
      className: "site-about__col"
    }, s.about_body.split('\n\n').map((para, i) => /*#__PURE__*/React.createElement("p", {
      className: "site-about__p",
      key: i
    }, para))));
  }

  // ── Field Notes (testimonials) ──────────────────────────────
  function SiteFieldNotes({
    items
  }) {
    if (!items.length) return null;
    return /*#__PURE__*/React.createElement("section", {
      className: "site-section",
      id: "fieldnotes"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-section__head"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "blue"
    }, "Archive: Field Notes"), /*#__PURE__*/React.createElement("h2", {
      className: "site-section__title"
    }, "What the neighbors say.")), /*#__PURE__*/React.createElement("div", {
      className: "notes-grid"
    }, items.map(t => /*#__PURE__*/React.createElement("figure", {
      className: "note-card",
      key: t.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "note-card__stars"
    }, Array.from({
      length: t.rating || 5
    }).map((_, i) => /*#__PURE__*/React.createElement(Icon, {
      key: i,
      name: "star",
      size: 13,
      stroke: 0,
      color: "var(--signal)",
      style: {
        fill: 'var(--signal)'
      }
    }))), /*#__PURE__*/React.createElement("blockquote", {
      className: "note-card__quote"
    }, "\u201C", t.content, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
      className: "note-card__by"
    }, /*#__PURE__*/React.createElement("span", {
      className: "note-card__name"
    }, t.author_name), t.author_role && /*#__PURE__*/React.createElement("span", {
      className: "note-card__role"
    }, t.author_role))))));
  }

  // ── The Journal (published posts) ───────────────────────────
  function SiteJournal({
    posts
  }) {
    const live = posts.filter(p => p.status === 'published');
    if (!live.length) return null;
    const fmt = d => d ? new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : '';
    return /*#__PURE__*/React.createElement("section", {
      className: "site-section",
      id: "journal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-section__head"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "blue"
    }, "The Journal"), /*#__PURE__*/React.createElement("h2", {
      className: "site-section__title"
    }, "Notes from the desk.")), /*#__PURE__*/React.createElement("div", {
      className: "journal-list"
    }, live.map(p => /*#__PURE__*/React.createElement("article", {
      className: "journal-row",
      key: p.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "journal-row__meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "journal-row__date"
    }, fmt(p.published_at))), /*#__PURE__*/React.createElement("div", {
      className: "journal-row__body"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "journal-row__title"
    }, p.title), p.excerpt && /*#__PURE__*/React.createElement("p", {
      className: "journal-row__excerpt"
    }, p.excerpt), /*#__PURE__*/React.createElement("span", {
      className: "journal-row__more"
    }, "Read the post ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 13
    })))))));
  }

  // ── The Command Center (contact) ────────────────────────────
  function SiteContact({
    s,
    onSubmitMessage
  }) {
    const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    const [sent, setSent] = useState(false);
    const set = k => e => setForm(f => ({
      ...f,
      [k]: e.target.value
    }));
    function submit(e) {
      e.preventDefault();
      if (!form.name || !form.email || !form.message) return;
      onSubmitMessage(form);
      setSent(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSent(false), 4000);
    }
    return /*#__PURE__*/React.createElement("section", {
      className: "site-section site-contact",
      id: "contact"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-contact__intro"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "blue"
    }, "The Command Center"), /*#__PURE__*/React.createElement("h2", {
      className: "site-section__title"
    }, "Send a Transmission."), /*#__PURE__*/React.createElement("p", {
      className: "site-contact__lead",
      style: {
        color: "rgb(249, 246, 240)"
      }
    }, "I am historically easy to reach. I live in Kingman. If you call, I answer."), /*#__PURE__*/React.createElement("ul", {
      className: "site-contact__lines"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 15
    }), " ", s.phone), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 15
    }), " ", s.email), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 15
    }), " ", s.business_hours))), /*#__PURE__*/React.createElement("form", {
      className: "transmission",
      onSubmit: submit
    }, /*#__PURE__*/React.createElement("div", {
      className: "transmission__row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "field__label"
    }, "Name"), /*#__PURE__*/React.createElement("input", {
      className: "field__input",
      value: form.name,
      onChange: set('name'),
      required: true
    })), /*#__PURE__*/React.createElement("label", {
      className: "field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "field__label"
    }, "Email"), /*#__PURE__*/React.createElement("input", {
      className: "field__input",
      type: "email",
      value: form.email,
      onChange: set('email'),
      required: true
    }))), /*#__PURE__*/React.createElement("div", {
      className: "transmission__row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "field__label"
    }, "Phone ", /*#__PURE__*/React.createElement("em", null, "(optional)")), /*#__PURE__*/React.createElement("input", {
      className: "field__input",
      value: form.phone,
      onChange: set('phone')
    })), /*#__PURE__*/React.createElement("label", {
      className: "field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "field__label"
    }, "Subject"), /*#__PURE__*/React.createElement("input", {
      className: "field__input",
      value: form.subject,
      onChange: set('subject')
    }))), /*#__PURE__*/React.createElement("label", {
      className: "field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "field__label"
    }, "Message"), /*#__PURE__*/React.createElement("textarea", {
      className: "field__input",
      rows: 4,
      value: form.message,
      onChange: set('message'),
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "transmission__foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "site-btn site-btn--primary",
      type: "submit"
    }, /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "["), /*#__PURE__*/React.createElement("span", null, "Submit Transmission"), /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "]")), sent && /*#__PURE__*/React.createElement("span", {
      className: "transmission__sent"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14
    }), " Received. Anthony will reply in person."))));
  }

  // ── Footer ──────────────────────────────────────────────────
  function SiteFooter({
    s
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      className: "site-footer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-footer__main"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "site-footer__big"
    }, "Need a strategic ally?"), /*#__PURE__*/React.createElement("a", {
      className: "site-btn site-btn--primary",
      href: "#contact"
    }, /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "["), /*#__PURE__*/React.createElement("span", null, "Inquire Within"), /*#__PURE__*/React.createElement("span", {
      className: "site-btn__bracket"
    }, "]"))), /*#__PURE__*/React.createElement("div", {
      className: "site-footer__meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse"
    }), /*#__PURE__*/React.createElement("span", {
      className: "site-brand__word"
    }, s.site_title)), /*#__PURE__*/React.createElement("p", null, s.address), /*#__PURE__*/React.createElement("p", null, s.phone, " \xB7 ", s.email), /*#__PURE__*/React.createElement("p", {
      className: "site-footer__fine"
    }, "High-end engineering delivered with the enthusiasm of a librarian on a Tuesday."))));
  }
  function PublicSite({
    data,
    device,
    onSubmitMessage
  }) {
    const s = data.settings;
    const scrollRef = React.useRef(null);
    const compact = device === 'phone';
    function onNav(id) {
      const root = scrollRef.current;
      if (!root) return;
      const el = id === 'top' ? root : root.querySelector('#' + id);
      if (el) root.scrollTo({
        top: id === 'top' ? 0 : el.offsetTop - 12,
        behavior: 'smooth'
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      className: 'site-root' + (compact ? ' site-root--phone' : ''),
      style: {
        '--accent': s.brand_color,
        '--site-accent': s.brand_color
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "site-scroll da-lace",
      ref: scrollRef
    }, /*#__PURE__*/React.createElement(SiteNav, {
      s: s,
      compact: compact,
      onNav: onNav
    }), /*#__PURE__*/React.createElement(SiteHero, {
      s: s,
      onNav: onNav
    }), /*#__PURE__*/React.createElement(SiteDepartments, {
      services: [...data.services].sort((a, b) => a.display_order - b.display_order)
    }), /*#__PURE__*/React.createElement(SiteAbout, {
      s: s
    }), /*#__PURE__*/React.createElement(SiteFieldNotes, {
      items: [...data.testimonials].sort((a, b) => a.display_order - b.display_order)
    }), /*#__PURE__*/React.createElement(SiteJournal, {
      posts: data.posts
    }), /*#__PURE__*/React.createElement(SiteContact, {
      s: s,
      onSubmitMessage: onSubmitMessage
    }), /*#__PURE__*/React.createElement(SiteFooter, {
      s: s
    })));
  }
  window.PublicSite = PublicSite;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/site.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/store.js
try { (() => {
/* ============================================================
   Connected CMS — shared data store
   A tiny observable store, persisted to localStorage, that BOTH
   the admin CMS and the public site read from. Editing in admin
   mutates this store; the live site re-renders from it. That is
   the "connected" magic.
   ============================================================ */
(function () {
  const LS_KEY = 'da_connected_cms_v1';

  // ── Seed content — Digital Allies, the real brand ──────────────
  const SEED = {
    settings: {
      site_title: 'Digital Allies',
      tagline: 'Technological Solutions for People with Better Things to Do.',
      site_description: 'A one-person technology shop in Kingman, AZ. I build systems that work and explain them in plain English.',
      phone: '(928) 228-5769',
      email: 'contact@digitalallies.net',
      address: 'Based in Kingman, AZ · Serving Everywhere Else',
      business_hours: 'Mon–Fri · 8a–6p MST · I answer the phone.',
      brand_color: '#3A7BD5',
      hero_title: 'Technological Solutions for People with Better Things to Do.',
      hero_subtitle: "I build systems that don't require a master's degree to operate. Clean engineering, clear communication, and follow-through that won't require follow up.",
      hero_cta_text: 'Inquire Within',
      hero_cta_link: '#contact',
      about_title: 'The Knowledgeable Neighbor',
      about_body: "I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called \u201CDoing My Job.\u201D\n\nStrategy is free. Execution is paid. All quotes are given before work begins \u2014 no surprises, no silent scope creep."
    },
    // The Departments
    services: [{
      id: 'svc-1',
      title: 'The Design Bureau',
      icon: 'compass',
      price: 'From $2,400',
      description: 'Your logo, site, and words look like they know each other. Brand, identity, and a website that earns its keep.',
      display_order: 0
    }, {
      id: 'svc-2',
      title: 'Dept. of Cooperation',
      icon: 'cog',
      price: 'From $1,800',
      description: 'Your apps talk to each other. You don\u2019t have to. Integrations that quietly move data where it needs to go.',
      display_order: 1
    }, {
      id: 'svc-3',
      title: 'The Self-Governing Bureau',
      icon: 'timer',
      price: 'From $1,200',
      description: 'Repetitive tasks are for machines. Go take a real lunch break. Automation that runs without you watching.',
      display_order: 2
    }, {
      id: 'svc-4',
      title: 'The Permanent Observation Post',
      icon: 'radar',
      price: 'From $300/mo',
      description: 'Monitoring runs 24/7. If something breaks at 2am, that\u2019s my problem \u2014 not yours.',
      display_order: 3
    }],
    // Field Notes
    testimonials: [{
      id: 'tst-1',
      author_name: 'Marguerite Vance',
      author_role: 'Vance & Daughters Hardware · Kingman',
      rating: 5,
      content: 'He picked up the phone on the first ring, every single time. The new ordering system saved my Saturdays. I do not know what half of it does and I do not need to.',
      display_order: 0
    }, {
      id: 'tst-2',
      author_name: 'Dr. Elias Knox',
      author_role: 'Knox Family Dental',
      rating: 5,
      content: 'No jargon, no runaround. He explained the whole thing in plain English, gave the quote before starting, and finished early. Rare.',
      display_order: 1
    }, {
      id: 'tst-3',
      author_name: 'Pilar Ortega',
      author_role: 'Ortega Route 66 Diner',
      rating: 5,
      content: 'The reservations and the website finally talk to each other. My host stand stopped double-booking tables. Worth every dollar.',
      display_order: 2
    }],
    // Posts
    posts: [{
      id: 'post-1',
      title: 'Why I answer the phone',
      slug: 'why-i-answer-the-phone',
      excerpt: 'A short defense of a radical business practice: being reachable.',
      content: '<p>There is a strange idea in this industry that being hard to reach makes you important. I disagree. If you call, I answer. If I am on a roof fixing an antenna, I will call you back before the end of the day.</p><h2>The whole pitch</h2><p>Going quiet is not part of my service model. If I take your project, I finish it. If something changes, I tell you.</p>',
      status: 'published',
      published_at: '2025-02-18T15:00:00Z',
      updated_at: '2025-02-18T15:00:00Z'
    }, {
      id: 'post-2',
      title: 'The Jargon Jar: a translation guide',
      slug: 'the-jargon-jar',
      excerpt: 'Corporate speak, translated into things a human being would actually say.',
      content: '<p>"Leverage synergies across touchpoints" means "make the parts work together." That is the whole jar.</p><p>If I ever reach for the left column, rewrite me using the right.</p>',
      status: 'published',
      published_at: '2025-01-30T15:00:00Z',
      updated_at: '2025-01-30T15:00:00Z'
    }, {
      id: 'post-3',
      title: 'On the Reciprocity Loop (draft)',
      slug: 'the-reciprocity-loop',
      excerpt: 'Strategy is free. Execution is paid. Here is why that works.',
      content: '<p>I do not charge for conversations or clarity. Call it a professional courtesy.</p>',
      status: 'draft',
      published_at: null,
      updated_at: '2025-03-02T18:30:00Z'
    }],
    // The Command Center — incoming transmissions
    messages: [{
      id: 'msg-1',
      name: 'Theodore Brandt',
      email: 'theo@brandtmotors.com',
      phone: '(928) 555-0147',
      subject: 'Website + booking for the shop',
      message: 'Saw your site. My current one is held together with tape. Can we talk about a rebuild and an online booking thing for the garage?',
      read: false,
      created_at: '2025-03-04T17:42:00Z'
    }, {
      id: 'msg-2',
      name: 'Ruth Calloway',
      email: 'ruth.calloway@gmail.com',
      phone: null,
      subject: 'Automating invoices',
      message: 'I spend every Friday typing invoices by hand. A friend said you might be able to make that stop happening. Please.',
      read: false,
      created_at: '2025-03-03T09:12:00Z'
    }, {
      id: 'msg-3',
      name: 'Sam Whitfield',
      email: 'sam@whitfieldlaw.net',
      phone: '(602) 555-0190',
      subject: 'Quick question on monitoring',
      message: 'What does the Permanent Observation Post actually cover? Do you watch the site overnight?',
      read: true,
      created_at: '2025-02-28T20:05:00Z'
    }]
  };

  // ── Persistence ───────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  let state = load();
  const listeners = new Set();
  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function emit() {
    listeners.forEach(fn => fn(state));
  }
  const Store = {
    get: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    // mutate with an updater fn that returns a (possibly new) state
    update(mutator) {
      const draft = JSON.parse(JSON.stringify(state));
      const next = mutator(draft) || draft;
      state = next;
      persist();
      emit();
    },
    reset() {
      state = JSON.parse(JSON.stringify(SEED));
      persist();
      emit();
    },
    uid(prefix) {
      return (prefix || 'id') + '-' + Math.random().toString(36).slice(2, 9);
    }
  };
  window.CMSStore = Store;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/store.js", error: String((e && e.message) || e) }); }

// cms/_archive/connected/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/content-tabs.jsx
try { (() => {
/* ============================================================
   CONTENT SUB-TABS — Articles · Departments · Field Notes ·
   Command Center · Settings. Client-scoped. Exported on window.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const Icon = window.Icon;
  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '—';
  const fmtAgo = d => {
    if (!d) return '';
    const s = (Date.now() - new Date(d).getTime()) / 1000;
    if (s < 3600) return Math.max(1, Math.floor(s / 60)) + 'm';
    if (s < 86400) return Math.floor(s / 3600) + 'h';
    return Math.floor(s / 86400) + 'd';
  };
  const slugify = t => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  function Field({
    label,
    hint,
    children
  }) {
    return /*#__PURE__*/React.createElement("label", {
      className: "ws-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-field__label"
    }, label, hint && /*#__PURE__*/React.createElement("em", {
      className: "ws-field__hint"
    }, hint)), children);
  }

  // ── Articles (The Journal) ──────────────────────────────────
  function ContentArticles({
    client,
    actions
  }) {
    const [editing, setEditing] = useState(null);
    const list = [...(client.site.articles || [])].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    if (editing) return /*#__PURE__*/React.createElement(ArticleEditor, {
      article: editing === 'new' ? null : editing,
      actions: actions,
      onDone: () => setEditing(null)
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head",
      style: {
        border: 0,
        marginBottom: 16,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 17
      }
    }, "Articles"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "The Journal \u2014 long-form notes.")), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: () => setEditing('new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    }), " New article")), /*#__PURE__*/React.createElement("div", {
      className: "ws-list"
    }, list.map(p => /*#__PURE__*/React.createElement("button", {
      className: "ws-row",
      key: p.id,
      onClick: () => setEditing(p)
    }, /*#__PURE__*/React.createElement("span", {
      className: 'ws-pill ws-pill--' + (p.status === 'published' ? 'live' : 'draft')
    }, p.status), /*#__PURE__*/React.createElement("span", {
      className: "ws-row__main"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-row__title"
    }, p.title), /*#__PURE__*/React.createElement("span", {
      className: "ws-row__meta"
    }, "/", p.slug, " \xB7 updated ", fmtDate(p.updated_at))), /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 15,
      className: "ws-row__go"
    }))), !list.length && /*#__PURE__*/React.createElement("div", {
      className: "ws-empty"
    }, "No articles yet.")));
  }
  function ArticleEditor({
    article,
    actions,
    onDone
  }) {
    const isNew = !article;
    const [f, setF] = useState(article || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      status: 'draft'
    });
    const set = k => e => setF(p => ({
      ...p,
      [k]: e.target.value,
      ...(k === 'title' && isNew ? {
        slug: slugify(e.target.value)
      } : {})
    }));
    function save() {
      actions.saveArticle({
        ...f,
        id: article?.id,
        slug: f.slug || slugify(f.title)
      });
      onDone();
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 720
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 18
      }
    }, isNew ? 'New article' : 'Edit article')), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, !isNew && /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--danger ws-btn--sm",
      onClick: () => {
        if (confirm('Delete this article?')) {
          actions.deleteArticle(article.id);
          onDone();
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--ghost ws-btn--sm",
      onClick: onDone
    }, "Cancel"), /*#__PURE__*/React.createElement("select", {
      className: "ws-input ws-input--select",
      style: {
        width: 'auto'
      },
      value: f.status,
      onChange: set('status')
    }, /*#__PURE__*/React.createElement("option", {
      value: "draft"
    }, "Draft"), /*#__PURE__*/React.createElement("option", {
      value: "published"
    }, "Published")), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: save,
      disabled: !f.title.trim()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save"))), /*#__PURE__*/React.createElement(Field, {
      label: "Title"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ws-input ws-input--lg",
      value: f.title,
      onChange: set('title'),
      placeholder: "Article title"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Slug"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ws-input",
      style: {
        fontFamily: 'var(--font-details)'
      },
      value: f.slug,
      onChange: set('slug')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Excerpt",
      hint: "(blog list)"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ws-input",
      rows: 2,
      value: f.excerpt,
      onChange: set('excerpt')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Body",
      hint: "(plain text / HTML)"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ws-input",
      rows: 9,
      value: f.content,
      onChange: set('content')
    })));
  }

  // ── Departments ─────────────────────────────────────────────
  const DEPT_ICONS = ['compass', 'cog', 'timer', 'radar'];
  function ContentDepartments({
    client,
    actions
  }) {
    const [editing, setEditing] = useState(null);
    const list = [...(client.site.departments || [])].sort((a, b) => a.display_order - b.display_order);
    if (editing) return /*#__PURE__*/React.createElement(DeptEditor, {
      svc: editing === 'new' ? null : editing,
      count: list.length,
      actions: actions,
      onDone: () => setEditing(null)
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head",
      style: {
        border: 0,
        marginBottom: 16,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 17
      }
    }, "The Departments"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "Service offerings shown on the site.")), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: () => setEditing('new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    }), " Add department")), /*#__PURE__*/React.createElement("div", {
      className: "ws-list"
    }, list.map((svc, i) => /*#__PURE__*/React.createElement("div", {
      className: "ws-row",
      key: svc.id,
      style: {
        cursor: 'default'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        display: 'grid',
        placeItems: 'center',
        width: 38,
        height: 38,
        border: 'var(--border-1)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: svc.icon,
      size: 20,
      stroke: 1.4
    })), /*#__PURE__*/React.createElement("span", {
      className: "ws-row__main"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-row__title"
    }, svc.title, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-details)',
        fontSize: 11,
        color: 'var(--accent)',
        fontWeight: 400
      }
    }, svc.price)), /*#__PURE__*/React.createElement("span", {
      className: "ws-row__meta"
    }, svc.description.slice(0, 80), "\u2026")), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-icon-btn",
      disabled: i === 0,
      onClick: () => actions.moveDepartment(svc.id, -1)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 14,
      style: {
        transform: 'rotate(180deg)'
      }
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-icon-btn",
      disabled: i === list.length - 1,
      onClick: () => actions.moveDepartment(svc.id, 1)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-icon-btn",
      onClick: () => setEditing(svc)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 14
    }))))), !list.length && /*#__PURE__*/React.createElement("div", {
      className: "ws-empty"
    }, "No departments. Add one to show a services grid on the site.")));
  }
  function DeptEditor({
    svc,
    count,
    actions,
    onDone
  }) {
    const isNew = !svc;
    const [f, setF] = useState(svc || {
      title: '',
      description: '',
      price: 'From $',
      icon: 'compass'
    });
    const set = k => e => setF(p => ({
      ...p,
      [k]: e.target.value
    }));
    function save() {
      actions.saveDepartment({
        ...f,
        id: svc?.id,
        display_order: svc?.display_order ?? count
      });
      onDone();
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 620
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 18
      }
    }, isNew ? 'New department' : 'Edit department')), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, !isNew && /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--danger ws-btn--sm",
      onClick: () => {
        if (confirm('Delete?')) {
          actions.deleteDepartment(svc.id);
          onDone();
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--ghost ws-btn--sm",
      onClick: onDone
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: save,
      disabled: !f.title.trim()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save"))), /*#__PURE__*/React.createElement(Field, {
      label: "Department name"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ws-input ws-input--lg",
      value: f.title,
      onChange: set('title'),
      placeholder: "The Design Bureau"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Icon"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, DEPT_ICONS.map(ic => /*#__PURE__*/React.createElement("button", {
      key: ic,
      type: "button",
      className: "ws-icon-btn",
      style: {
        width: 44,
        height: 44,
        background: f.icon === ic ? 'var(--accent-soft)' : 'var(--bg)'
      },
      onClick: () => setF(p => ({
        ...p,
        icon: ic
      }))
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 22,
      stroke: 1.4
    }))))), /*#__PURE__*/React.createElement(Field, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ws-input",
      rows: 3,
      value: f.description,
      onChange: set('description')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Price",
      hint: "(From $X)"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ws-input",
      style: {
        fontFamily: 'var(--font-details)'
      },
      value: f.price,
      onChange: set('price')
    })));
  }

  // ── Field Notes ─────────────────────────────────────────────
  function ContentNotes({
    client,
    actions
  }) {
    const [editing, setEditing] = useState(null);
    const list = [...(client.site.fieldNotes || [])].sort((a, b) => a.display_order - b.display_order);
    if (editing) return /*#__PURE__*/React.createElement(NoteEditor, {
      note: editing === 'new' ? null : editing,
      count: list.length,
      actions: actions,
      onDone: () => setEditing(null)
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head",
      style: {
        border: 0,
        marginBottom: 16,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 17
      }
    }, "Field Notes"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "Testimonials from people you have helped.")), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: () => setEditing('new')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    }), " Add note")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 14
      }
    }, list.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setEditing(t),
      className: "da-pinned",
      style: {
        textAlign: 'left',
        cursor: 'pointer',
        padding: '30px 18px 16px',
        background: 'var(--bg-alt)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 2,
        marginBottom: 8
      }
    }, Array.from({
      length: t.rating || 5
    }).map((_, i) => /*#__PURE__*/React.createElement(Icon, {
      key: i,
      name: "star",
      size: 12,
      color: "var(--signal)",
      style: {
        fill: 'var(--signal)'
      }
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontStyle: 'italic',
        fontSize: 13,
        lineHeight: 1.6
      }
    }, "\u201C", t.content, "\u201D"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("strong", null, t.author_name), " \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fg-muted)'
      }
    }, t.author_role)))), !list.length && /*#__PURE__*/React.createElement("div", {
      className: "ws-empty",
      style: {
        gridColumn: '1 / -1'
      }
    }, "No field notes yet.")));
  }
  function NoteEditor({
    note,
    count,
    actions,
    onDone
  }) {
    const isNew = !note;
    const [f, setF] = useState(note || {
      author_name: '',
      author_role: '',
      content: '',
      rating: 5
    });
    const set = k => e => setF(p => ({
      ...p,
      [k]: e.target.value
    }));
    function save() {
      actions.saveNote({
        ...f,
        id: note?.id,
        rating: Number(f.rating),
        display_order: note?.display_order ?? count
      });
      onDone();
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 620
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 18
      }
    }, isNew ? 'New field note' : 'Edit field note')), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, !isNew && /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--danger ws-btn--sm",
      onClick: () => {
        if (confirm('Delete?')) {
          actions.deleteNote(note.id);
          onDone();
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--ghost ws-btn--sm",
      onClick: onDone
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: save,
      disabled: !f.content.trim()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save"))), /*#__PURE__*/React.createElement(Field, {
      label: "Quote"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "ws-input",
      rows: 4,
      value: f.content,
      onChange: set('content')
    })), /*#__PURE__*/React.createElement("div", {
      className: "ws-field-row"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Author name"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ws-input",
      value: f.author_name,
      onChange: set('author_name')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Rating"
    }, /*#__PURE__*/React.createElement("select", {
      className: "ws-input ws-input--select",
      value: f.rating,
      onChange: set('rating')
    }, [5, 4, 3, 2, 1].map(n => /*#__PURE__*/React.createElement("option", {
      key: n,
      value: n
    }, n, " stars"))))), /*#__PURE__*/React.createElement(Field, {
      label: "Role / business"
    }, /*#__PURE__*/React.createElement("input", {
      className: "ws-input",
      value: f.author_role,
      onChange: set('author_role'),
      placeholder: "Vance & Daughters Hardware \xB7 Kingman"
    })));
  }

  // ── Command Center (messages) ───────────────────────────────
  function ContentMessages({
    client,
    actions
  }) {
    const list = [...(client.site.messages || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [open, setOpen] = useState(list[0]?.id ?? null);
    const active = list.find(m => m.id === open);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head",
      style: {
        border: 0,
        marginBottom: 16,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 17
      }
    }, "The Command Center"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "Transmissions from the contact form."))), /*#__PURE__*/React.createElement("div", {
      className: "ws-cc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-cc__list"
    }, list.map(m => /*#__PURE__*/React.createElement("button", {
      key: m.id,
      className: 'ws-cc__item' + (m.id === open ? ' is-open' : ''),
      onClick: () => {
        setOpen(m.id);
        if (!m.read) actions.markRead(m.id, true);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-cc__top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-cc__from"
    }, !m.read && /*#__PURE__*/React.createElement("span", {
      className: "da-signal-dot"
    }), m.name), /*#__PURE__*/React.createElement("span", {
      className: "ws-cc__time"
    }, fmtAgo(m.created_at))), /*#__PURE__*/React.createElement("span", {
      className: "ws-cc__subj"
    }, m.subject || '(no subject)'), /*#__PURE__*/React.createElement("span", {
      className: "ws-cc__snip"
    }, m.message))), !list.length && /*#__PURE__*/React.createElement("div", {
      className: "ws-empty"
    }, "No transmissions yet.")), active ? /*#__PURE__*/React.createElement("div", {
      className: "ws-cc__detail"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, active.subject || '(no subject)'), /*#__PURE__*/React.createElement("p", {
      className: "ws-cc__detail-from"
    }, active.name, " \xB7 ", /*#__PURE__*/React.createElement("a", {
      href: 'mailto:' + active.email,
      style: {
        color: 'var(--accent)'
      }
    }, active.email), active.phone && ' · ' + active.phone)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-icon-btn",
      title: active.read ? 'Mark unread' : 'Mark read',
      onClick: () => actions.markRead(active.id, !active.read)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 15
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-icon-btn",
      title: "Delete",
      onClick: () => {
        if (confirm('Delete?')) {
          actions.deleteMessage(active.id);
          setOpen(null);
        }
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 15
    })))), /*#__PURE__*/React.createElement("p", {
      className: "ws-cc__body"
    }, active.message), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      href: 'mailto:' + active.email
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 13
    }), " Reply by email"), /*#__PURE__*/React.createElement("span", {
      className: "da-small"
    }, "Received ", fmtDate(active.created_at)))) : /*#__PURE__*/React.createElement("div", {
      className: "ws-cc__detail ws-cc__detail--empty"
    }, "Select a transmission.")));
  }

  // ── Settings ────────────────────────────────────────────────
  const GROUPS = [{
    title: 'Identity',
    fields: [{
      key: 'site_title',
      label: 'Business name'
    }, {
      key: 'tagline',
      label: 'Tagline',
      type: 'textarea'
    }]
  }, {
    title: 'The Lobby (hero)',
    fields: [{
      key: 'hero_title',
      label: 'Hero headline',
      type: 'textarea'
    }, {
      key: 'hero_subtitle',
      label: 'Hero subheading',
      type: 'textarea'
    }, {
      key: 'hero_cta_text',
      label: 'Hero button'
    }]
  }, {
    title: 'About',
    fields: [{
      key: 'about_title',
      label: 'About title'
    }, {
      key: 'about_body',
      label: 'About text',
      type: 'textarea',
      rows: 5
    }]
  }, {
    title: 'Contact',
    fields: [{
      key: 'phone',
      label: 'Phone'
    }, {
      key: 'email',
      label: 'Email'
    }, {
      key: 'address',
      label: 'Location'
    }, {
      key: 'business_hours',
      label: 'Hours'
    }]
  }];
  function ContentSettings({
    client,
    actions,
    onToast
  }) {
    const [v, setV] = useState(client.site.settings || {});
    const [dirty, setDirty] = useState(false);
    const set = k => e => {
      setV(p => ({
        ...p,
        [k]: e.target.value
      }));
      setDirty(true);
    };
    function save() {
      actions.saveSettings(v);
      setDirty(false);
      onToast && onToast('Settings saved · Live site updated');
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 680
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head",
      style: {
        border: 0,
        marginBottom: 16,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 17
      }
    }, "Site settings"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "The words and identity of ", client.domain, ".")), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, dirty && /*#__PURE__*/React.createElement("span", {
      className: "ws-dirty"
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-signal-dot",
      style: {
        width: 8,
        height: 8
      }
    }), " Unsaved"), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: save,
      disabled: !dirty
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save changes"))), GROUPS.map(g => /*#__PURE__*/React.createElement("section", {
      key: g.title,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-subhead",
      style: {
        margin: '0 0 12px'
      }
    }, g.title), /*#__PURE__*/React.createElement("div", {
      style: {
        border: 'var(--border-1)',
        background: 'var(--bg)',
        padding: 20
      }
    }, g.fields.map(fld => /*#__PURE__*/React.createElement(Field, {
      key: fld.key,
      label: fld.label
    }, fld.type === 'textarea' ? /*#__PURE__*/React.createElement("textarea", {
      className: "ws-input",
      rows: fld.rows || 2,
      value: v[fld.key] || '',
      onChange: set(fld.key)
    }) : /*#__PURE__*/React.createElement("input", {
      className: "ws-input",
      value: v[fld.key] || '',
      onChange: set(fld.key)
    })))))));
  }
  Object.assign(window, {
    ContentArticles,
    ContentDepartments,
    ContentNotes,
    ContentMessages,
    ContentSettings
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/content-tabs.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/content.jsx
try { (() => {
/* ============================================================
   CONTENT MODULE — "The Press Office"
   Tabs: Pages (page builder) · Articles · Departments ·
         Field Notes · Command Center · Settings
   window.ContentModule({ client, actions, onToast })
   Sub-tab components live in content-tabs.jsx (window.*).
   ============================================================ */
(function () {
  const {
    useState,
    useRef,
    useEffect
  } = React;
  const Icon = window.Icon;

  // ── Inline-editable text (commits on blur) ──────────────────
  function InlineText({
    value,
    onCommit,
    tag = 'div',
    className,
    placeholder,
    multiline
  }) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && ref.current.textContent !== (value || '')) ref.current.textContent = value || '';
    }, [value]);
    return React.createElement(tag, {
      ref,
      className: 'ws-edit ' + (className || ''),
      contentEditable: true,
      suppressContentEditableWarning: true,
      'data-ph': placeholder,
      onBlur: e => onCommit(e.currentTarget.textContent),
      onKeyDown: e => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }
    });
  }
  const BLOCK_TYPES = [{
    type: 'hero',
    label: 'Hero',
    icon: 'layout'
  }, {
    type: 'richtext',
    label: 'Text',
    icon: 'fileText'
  }, {
    type: 'departments',
    label: 'Departments',
    icon: 'briefcase'
  }, {
    type: 'fieldNotes',
    label: 'Field Notes',
    icon: 'star'
  }, {
    type: 'cta',
    label: 'Call to action',
    icon: 'send'
  }];

  // ── Block preview (inline-editable) ─────────────────────────
  function BlockPreview({
    block,
    client,
    onChange
  }) {
    const d = block.data || {};
    const set = k => val => onChange({
      ...d,
      [k]: val
    });
    if (block.type === 'hero') {
      return /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-hero"
      }, /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-eyebrow",
        value: d.eyebrow,
        onCommit: set('eyebrow'),
        placeholder: "EYEBROW"
      }), /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-h",
        value: d.heading,
        onCommit: set('heading'),
        placeholder: "Headline",
        multiline: true
      }), /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-body",
        value: d.body,
        onCommit: set('body'),
        placeholder: "Supporting line",
        multiline: true
      }), d.cta != null && /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-cta"
      }, /*#__PURE__*/React.createElement(InlineText, {
        tag: "span",
        value: d.cta,
        onCommit: set('cta'),
        placeholder: "Button"
      })));
    }
    if (block.type === 'richtext') {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-h",
        style: {
          fontSize: 20
        },
        value: d.heading,
        onCommit: set('heading'),
        placeholder: "Section heading"
      }), /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-body",
        value: d.body,
        onCommit: set('body'),
        placeholder: "Body text\u2026",
        multiline: true
      }));
    }
    if (block.type === 'departments') {
      const list = [...(client.site.departments || [])].sort((a, b) => a.display_order - b.display_order).slice(0, 4);
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-h",
        style: {
          fontSize: 18
        },
        value: d.heading,
        onCommit: set('heading'),
        placeholder: "The Departments"
      }), /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-body",
        value: d.sub,
        onCommit: set('sub'),
        placeholder: "Subhead"
      }), list.length ? /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-grid"
      }, list.map(s => /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-card",
        key: s.id
      }, /*#__PURE__*/React.createElement("h5", null, s.title), /*#__PURE__*/React.createElement("span", null, s.price), /*#__PURE__*/React.createElement("p", null, s.description.slice(0, 70), "\u2026")))) : /*#__PURE__*/React.createElement("p", {
        className: "ws-pv-body",
        style: {
          fontStyle: 'italic',
          marginTop: 8
        }
      }, "No departments yet \u2014 add them in the Departments tab."));
    }
    if (block.type === 'fieldNotes') {
      const list = (client.site.fieldNotes || []).slice(0, 2);
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-h",
        style: {
          fontSize: 18
        },
        value: d.heading,
        onCommit: set('heading'),
        placeholder: "Field Notes"
      }), /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-grid"
      }, list.map(n => /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-card",
        key: n.id
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontStyle: 'italic'
        }
      }, "\u201C", n.content.slice(0, 80), "\u2026\u201D"), /*#__PURE__*/React.createElement("h5", {
        style: {
          marginTop: 6
        }
      }, n.author_name))), !list.length && /*#__PURE__*/React.createElement("p", {
        className: "ws-pv-body",
        style: {
          fontStyle: 'italic'
        }
      }, "No field notes yet.")));
    }
    if (block.type === 'cta') {
      return /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-cta-block"
      }, /*#__PURE__*/React.createElement(InlineText, {
        className: "ws-pv-h",
        style: {
          fontSize: 20
        },
        value: d.heading,
        onCommit: set('heading'),
        placeholder: "Call to action"
      }), /*#__PURE__*/React.createElement("div", {
        className: "ws-pv-cta",
        style: {
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement(InlineText, {
        tag: "span",
        value: d.button,
        onCommit: set('button'),
        placeholder: "Button"
      })));
    }
    return null;
  }

  // ── Page builder ────────────────────────────────────────────
  function PageBuilder({
    page,
    client,
    actions,
    onDone
  }) {
    const [sel, setSel] = useState(null);
    const [dragI, setDragI] = useState(null);
    const [overI, setOverI] = useState(null);
    const blocks = page.blocks || [];
    function onDrop(to) {
      if (dragI === null || dragI === to) {
        setDragI(null);
        setOverI(null);
        return;
      }
      actions.moveBlock(page.id, dragI, to);
      setDragI(null);
      setOverI(null);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page ws-page--full",
      style: {
        maxWidth: 1180
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head__eyebrow da-eyebrow da-eyebrow--muted"
    }, "The Press Office \xB7 Page"), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement(InlineText, {
      tag: "span",
      value: page.title,
      onCommit: v => actions.savePage({
        ...page,
        title: v
      }),
      placeholder: "Page title"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, client.domain, page.slug)), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--ghost",
      onClick: onDone
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronLeft",
      size: 14
    }), " All pages"), /*#__PURE__*/React.createElement("select", {
      className: "ws-input ws-input--select",
      style: {
        width: 'auto'
      },
      value: page.status,
      onChange: e => actions.savePage({
        ...page,
        status: e.target.value
      })
    }, /*#__PURE__*/React.createElement("option", {
      value: "draft"
    }, "Draft"), /*#__PURE__*/React.createElement("option", {
      value: "published"
    }, "Published")), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary",
      onClick: () => actions.savePage(page, true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "save",
      size: 13
    }), " Save & publish"))), /*#__PURE__*/React.createElement("div", {
      className: "ws-builder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-canvas"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-canvas__bar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-canvas__url"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 11
    }), client.domain, page.slug), /*#__PURE__*/React.createElement("span", {
      className: "da-small"
    }, "Drag ", /*#__PURE__*/React.createElement(Icon, {
      name: "grip",
      size: 12,
      style: {
        verticalAlign: 'middle'
      }
    }), " to reorder \xB7 click text to edit")), /*#__PURE__*/React.createElement("div", {
      className: "ws-blocks"
    }, blocks.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: 'ws-block' + (sel === b.id ? ' is-sel' : '') + (dragI === i ? ' is-drag' : '') + (overI === i ? ' is-over' : ''),
      onClick: () => setSel(b.id),
      onDragOver: e => {
        e.preventDefault();
        setOverI(i);
      },
      onDrop: () => onDrop(i)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-block__bar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-block__handle",
      draggable: true,
      onDragStart: () => setDragI(i),
      onDragEnd: () => {
        setDragI(null);
        setOverI(null);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "grip",
      size: 14
    })), /*#__PURE__*/React.createElement("span", {
      className: "ws-block__type"
    }, b.type), /*#__PURE__*/React.createElement("button", {
      className: "ws-block__del",
      title: "Delete block",
      onClick: e => {
        e.stopPropagation();
        actions.deleteBlock(page.id, b.id);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ws-block__body"
    }, /*#__PURE__*/React.createElement(BlockPreview, {
      block: b,
      client: client,
      onChange: data => actions.updateBlock(page.id, b.id, data)
    })))), /*#__PURE__*/React.createElement(AddBlock, {
      onAdd: type => actions.addBlock(page.id, type)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ws-insp"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-insp__head"
    }, "Add a section"), /*#__PURE__*/React.createElement("div", {
      className: "ws-insp__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-palette"
    }, BLOCK_TYPES.map(bt => /*#__PURE__*/React.createElement("button", {
      key: bt.type,
      onClick: () => actions.addBlock(page.id, bt.type)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: bt.icon,
      size: 18,
      stroke: 1.4
    }), bt.label))), /*#__PURE__*/React.createElement("div", {
      className: "da-pinned",
      style: {
        marginTop: 20,
        padding: '24px 16px 14px',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Connected."), " Saving publishes straight to ", client.domain, ". Departments & Field Notes blocks pull live from their tabs.")))));
  }
  function AddBlock({
    onAdd
  }) {
    const [open, setOpen] = useState(false);
    if (!open) return /*#__PURE__*/React.createElement("button", {
      className: "ws-block__add",
      onClick: () => setOpen(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " Add a section");
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-block",
      style: {
        borderStyle: 'dashed'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-block__bar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-block__type"
    }, "Choose a block"), /*#__PURE__*/React.createElement("button", {
      className: "ws-block__del",
      onClick: () => setOpen(false)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 13
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ws-block__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-palette"
    }, BLOCK_TYPES.map(bt => /*#__PURE__*/React.createElement("button", {
      key: bt.type,
      onClick: () => {
        onAdd(bt.type);
        setOpen(false);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: bt.icon,
      size: 18,
      stroke: 1.4
    }), bt.label)))));
  }

  // ── Pages list ──────────────────────────────────────────────
  function PagesTab({
    client,
    actions,
    onOpen
  }) {
    const pages = client.site.pages || [];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head",
      style: {
        border: 0,
        marginBottom: 16,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-headers)',
        fontSize: 17
      }
    }, "Pages")), /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary ws-btn--sm",
      onClick: () => actions.addPage(onOpen)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    }), " New page")), /*#__PURE__*/React.createElement("div", {
      className: "ws-list"
    }, pages.map(p => /*#__PURE__*/React.createElement("button", {
      className: "ws-row",
      key: p.id,
      onClick: () => onOpen(p.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: 'ws-pill ws-pill--' + (p.status === 'published' ? 'live' : 'draft')
    }, p.status), /*#__PURE__*/React.createElement("span", {
      className: "ws-row__main"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-row__title"
    }, p.title), /*#__PURE__*/React.createElement("span", {
      className: "ws-row__meta"
    }, client.domain, p.slug, " \xB7 ", (p.blocks || []).length, " blocks \xB7 updated ", fmtDate(p.updated_at))), /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 15,
      className: "ws-row__go"
    }))), !pages.length && /*#__PURE__*/React.createElement("div", {
      className: "ws-empty"
    }, "No pages yet. Build the first one.")));
  }
  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }) : '—';

  // ── Module shell ────────────────────────────────────────────
  const TABS = [{
    id: 'pages',
    label: 'Pages'
  }, {
    id: 'articles',
    label: 'Articles'
  }, {
    id: 'departments',
    label: 'Departments'
  }, {
    id: 'notes',
    label: 'Field Notes'
  }, {
    id: 'messages',
    label: 'Command Center'
  }, {
    id: 'settings',
    label: 'Settings'
  }];
  function ContentModule({
    client,
    actions,
    onToast,
    initialTab
  }) {
    const [tab, setTab] = useState(initialTab || 'pages');
    const [openPage, setOpenPage] = useState(null);
    useEffect(() => {
      setOpenPage(null);
    }, [client.id]);
    useEffect(() => {
      if (initialTab) setTab(initialTab);
    }, [initialTab]);
    const page = openPage ? (client.site.pages || []).find(p => p.id === openPage) : null;
    if (tab === 'pages' && page) return /*#__PURE__*/React.createElement(PageBuilder, {
      page: page,
      client: client,
      actions: actions,
      onDone: () => setOpenPage(null)
    });
    const counts = {
      pages: (client.site.pages || []).length,
      articles: (client.site.articles || []).length,
      departments: (client.site.departments || []).length,
      notes: (client.site.fieldNotes || []).length,
      messages: (client.site.messages || []).filter(m => !m.read).length
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head__eyebrow da-eyebrow da-eyebrow--muted"
    }, "Content"), /*#__PURE__*/React.createElement("h1", null, "The Press Office"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "Everything that lives on ", client.domain, ". Edit here, it goes live."))), /*#__PURE__*/React.createElement("div", {
      className: "ws-tabs"
    }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: 'ws-tab' + (tab === t.id ? ' is-on' : ''),
      onClick: () => setTab(t.id)
    }, t.label, counts[t.id] != null && counts[t.id] > 0 && /*#__PURE__*/React.createElement("span", {
      className: "ws-tab__count"
    }, counts[t.id])))), tab === 'pages' && /*#__PURE__*/React.createElement(PagesTab, {
      client: client,
      actions: actions,
      onOpen: setOpenPage
    }), tab === 'articles' && /*#__PURE__*/React.createElement(window.ContentArticles, {
      client: client,
      actions: actions
    }), tab === 'departments' && /*#__PURE__*/React.createElement(window.ContentDepartments, {
      client: client,
      actions: actions
    }), tab === 'notes' && /*#__PURE__*/React.createElement(window.ContentNotes, {
      client: client,
      actions: actions
    }), tab === 'messages' && /*#__PURE__*/React.createElement(window.ContentMessages, {
      client: client,
      actions: actions
    }), tab === 'settings' && /*#__PURE__*/React.createElement(window.ContentSettings, {
      client: client,
      actions: actions,
      onToast: onToast
    }));
  }
  window.ContentModule = ContentModule;
  window.InlineText = InlineText;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/content.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/icons-ext.jsx
try { (() => {
/* Extra line-art icons for the workspace, layered over window.Icon.
   Keeps the 1.5px Artifact aesthetic. */
(function () {
  const EXTRA = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    grip: '<circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    sparkle: '<path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v5.5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7 14h10"/>',
    column: '<rect width="6" height="18" x="4" y="3" rx="1"/><rect width="6" height="18" x="14" y="3" rx="1"/>'
  };
  const base = window.Icon;
  window.Icon = function Icon(props) {
    const {
      name,
      size = 18,
      stroke = 1.6,
      color = 'currentColor',
      style,
      className
    } = props || {};
    if (EXTRA[name]) {
      return React.createElement('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: color,
        strokeWidth: stroke,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
        style,
        dangerouslySetInnerHTML: {
          __html: EXTRA[name]
        }
      });
    }
    return base(props);
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/icons-ext.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/palette.jsx
try { (() => {
/* ============================================================
   Command palette — ⌘K / Ctrl-K. Receives a flat list of
   commands; filters, keyboard-navigates, runs.
   window.CmdPalette({ open, onClose, commands })
   command: { id, label, sub, icon, group, run() }
   ============================================================ */
(function () {
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;
  const Icon = window.Icon;
  function CmdPalette({
    open,
    onClose,
    commands
  }) {
    const [q, setQ] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    useEffect(() => {
      if (open) {
        setQ('');
        setActive(0);
        setTimeout(() => inputRef.current && inputRef.current.focus(), 20);
      }
    }, [open]);
    const filtered = useMemo(() => {
      const s = q.trim().toLowerCase();
      if (!s) return commands;
      return commands.filter(c => (c.label + ' ' + (c.sub || '') + ' ' + (c.group || '')).toLowerCase().includes(s));
    }, [q, commands]);
    useEffect(() => {
      setActive(0);
    }, [q]);

    // group while preserving order
    const grouped = useMemo(() => {
      const out = [];
      const idx = {};
      filtered.forEach(c => {
        const g = c.group || 'Actions';
        if (!(g in idx)) {
          idx[g] = out.length;
          out.push({
            label: g,
            items: []
          });
        }
        out[idx[g]].items.push(c);
      });
      return out;
    }, [filtered]);
    function run(c) {
      onClose();
      setTimeout(() => c.run && c.run(), 0);
    }
    function onKey(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(a => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(a => Math.max(a - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[active]) run(filtered[active]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }
    useEffect(() => {
      if (!listRef.current) return;
      const el = listRef.current.querySelector('.is-active');
      if (el) el.scrollIntoView({
        block: 'nearest'
      });
    }, [active]);
    if (!open) return null;
    let counter = -1;
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-cmdk",
      onMouseDown: e => {
        if (e.target === e.currentTarget) onClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-cmdk__box",
      onKeyDown: onKey
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-cmdk__input-row"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 17,
      color: "var(--fg-muted)"
    }), /*#__PURE__*/React.createElement("input", {
      ref: inputRef,
      className: "ws-cmdk__input",
      placeholder: "Search actions, clients, content\u2026",
      value: q,
      onChange: e => setQ(e.target.value)
    }), /*#__PURE__*/React.createElement("kbd", {
      style: {
        fontFamily: 'var(--font-details)',
        fontSize: 10,
        color: 'var(--fg-soft)',
        border: '1px solid var(--field-border)',
        padding: '1px 6px'
      }
    }, "esc")), /*#__PURE__*/React.createElement("div", {
      className: "ws-cmdk__list",
      ref: listRef
    }, grouped.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.label
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-cmdk__group"
    }, g.label), g.items.map(c => {
      counter += 1;
      const i = counter;
      return /*#__PURE__*/React.createElement("button", {
        key: c.id,
        className: 'ws-cmdk__item' + (i === active ? ' is-active' : ''),
        onMouseEnter: () => setActive(i),
        onClick: () => run(c)
      }, /*#__PURE__*/React.createElement(Icon, {
        name: c.icon || 'arrowRight',
        size: 15,
        color: "var(--fg-muted)"
      }), /*#__PURE__*/React.createElement("span", null, c.label), c.sub && /*#__PURE__*/React.createElement("span", {
        className: "ws-cmdk__item-sub"
      }, c.sub));
    }))), !filtered.length && /*#__PURE__*/React.createElement("div", {
      className: "ws-cmdk__empty"
    }, "No matches for \u201C", q, "\u201D"))));
  }
  window.CmdPalette = CmdPalette;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/palette.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/projects.jsx
try { (() => {
/* ============================================================
   PROJECTS MODULE — drag kanban with inline edit.
   window.ProjectsModule({ client, actions })
   actions: moveTask, addTask, updateTask, deleteTask, addProject
   ============================================================ */
(function () {
  const {
    useState,
    useEffect
  } = React;
  const Icon = window.Icon;
  const InlineText = window.InlineText;
  const PRIOS = ['Low', 'Medium', 'High'];
  function Card({
    task,
    projectId,
    actions,
    onDrag,
    dragId
  }) {
    const [open, setOpen] = useState(false);
    return /*#__PURE__*/React.createElement("div", {
      className: 'ws-card' + (dragId === task.id ? ' is-drag' : ''),
      draggable: true,
      onDragStart: e => {
        e.dataTransfer.effectAllowed = 'move';
        onDrag(task.id);
      },
      onDragEnd: () => onDrag(null)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-card__title"
    }, /*#__PURE__*/React.createElement(InlineText, {
      tag: "span",
      value: task.title,
      onCommit: v => v.trim() && actions.updateTask(projectId, task.id, {
        title: v
      })
    })), /*#__PURE__*/React.createElement("div", {
      className: "ws-card__meta"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'ws-prio ws-prio--' + task.priority.toLowerCase(),
      title: "Cycle priority",
      onClick: () => {
        const n = PRIOS[(PRIOS.indexOf(task.priority) + 1) % 3];
        actions.updateTask(projectId, task.id, {
          priority: n
        });
      }
    }, task.priority), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-card__due"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 10,
      style: {
        verticalAlign: 'middle',
        marginRight: 3
      }
    }), task.due ? task.due.slice(5) : '—'), /*#__PURE__*/React.createElement("button", {
      className: "ws-block__del",
      onClick: () => actions.deleteTask(projectId, task.id),
      title: "Delete"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 12
    })))));
  }
  function Column({
    col,
    tasks,
    projectId,
    actions,
    dragId,
    setDragId
  }) {
    const [over, setOver] = useState(false);
    const [adding, setAdding] = useState(false);
    const [val, setVal] = useState('');
    function commitAdd() {
      if (val.trim()) actions.addTask(projectId, col, val.trim());
      setVal('');
      setAdding(false);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-col__head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-col__title"
    }, col), /*#__PURE__*/React.createElement("span", {
      className: "ws-col__count"
    }, tasks.length)), /*#__PURE__*/React.createElement("div", {
      className: 'ws-col__body' + (over ? ' is-over' : ''),
      onDragOver: e => {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop: () => {
        setOver(false);
        if (dragId) actions.moveTask(projectId, dragId, col);
        setDragId(null);
      }
    }, tasks.map(t => /*#__PURE__*/React.createElement(Card, {
      key: t.id,
      task: t,
      projectId: projectId,
      actions: actions,
      onDrag: setDragId,
      dragId: dragId
    })), !tasks.length && !over && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--fg-soft)',
        textAlign: 'center',
        padding: '10px 0'
      }
    }, "Drop here")), adding ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 8,
        borderTop: 'var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      autoFocus: true,
      className: "ws-input",
      rows: 2,
      value: val,
      placeholder: "Task title\u2026",
      onChange: e => setVal(e.target.value),
      onBlur: commitAdd,
      onKeyDown: e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          commitAdd();
        }
        if (e.key === 'Escape') {
          setVal('');
          setAdding(false);
        }
      }
    })) : /*#__PURE__*/React.createElement("button", {
      className: "ws-col__add",
      onClick: () => setAdding(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    }), " Add task"));
  }
  function ProjectsModule({
    client,
    actions
  }) {
    const projects = client.site.projects || [];
    const [pid, setPid] = useState(projects[0]?.id ?? null);
    const [dragId, setDragId] = useState(null);
    useEffect(() => {
      setPid((client.site.projects || [])[0]?.id ?? null);
    }, [client.id]);
    const project = projects.find(p => p.id === pid) || projects[0];
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page ws-page--full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head__eyebrow da-eyebrow da-eyebrow--muted"
    }, "Projects"), /*#__PURE__*/React.createElement("h1", null, "Project boards"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "Track builds for ", client.name, ". Drag cards between columns.")), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--primary",
      onClick: () => {
        const id = actions.addProject();
        if (id) setPid(id);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 13
    }), " New board"))), !projects.length ? /*#__PURE__*/React.createElement("div", {
      className: "ws-empty",
      style: {
        border: 'var(--border-1)'
      }
    }, "No boards yet. Create the first one.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ws-proj-bar"
    }, /*#__PURE__*/React.createElement("select", {
      className: "ws-input ws-input--select",
      style: {
        width: 'auto',
        minWidth: 240
      },
      value: pid || '',
      onChange: e => setPid(e.target.value)
    }, projects.map(p => /*#__PURE__*/React.createElement("option", {
      key: p.id,
      value: p.id
    }, p.name))), /*#__PURE__*/React.createElement("span", {
      className: "da-small"
    }, project.description)), /*#__PURE__*/React.createElement("div", {
      className: "ws-kanban"
    }, project.columns.map(col => /*#__PURE__*/React.createElement(Column, {
      key: col,
      col: col,
      tasks: project.tasks.filter(t => t.column === col),
      projectId: project.id,
      actions: actions,
      dragId: dragId,
      setDragId: setDragId
    })))));
  }
  window.ProjectsModule = ProjectsModule;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/projects.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/shell.jsx
try { (() => {
/* ============================================================
   SHELL — orchestrates the CMS workspace.
   Top bar (brand · client switcher · ⌘K · sync), module nav with
   plan-gating, content/projects/dashboard routing, embed view,
   command palette, tweaks, toast. Mounts everything.
   ============================================================ */
(function () {
  const {
    useState,
    useEffect,
    useCallback,
    useRef
  } = React;
  const Icon = window.Icon;
  const Store = window.CMSWorkspace;
  function useStore() {
    const [s, setS] = useState(Store.get());
    useEffect(() => Store.subscribe(x => setS({
      ...x
    })), []);
    return s;
  }
  const BLOCK_DEFAULTS = {
    hero: {
      eyebrow: 'BASED IN KINGMAN, AZ',
      heading: 'A headline worth reading',
      body: 'One clear supporting sentence underneath.',
      cta: 'Inquire Within'
    },
    richtext: {
      heading: 'Section heading',
      body: 'Write something plain and useful here.'
    },
    departments: {
      heading: 'The Departments',
      sub: 'Four distinct operations. One point of contact.'
    },
    fieldNotes: {
      heading: 'Field Notes'
    },
    cta: {
      heading: 'Need a strategic ally?',
      button: 'Send a Transmission'
    }
  };
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    navLayout: 'sidebar',
    startClient: 'da'
  } /*EDITMODE-END*/;
  function App() {
    const data = useStore();
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const [moduleId, setModuleId] = useState('dashboard');
    const [contentTab, setContentTab] = useState('pages');
    const [embed, setEmbed] = useState(false);
    const [clientMenu, setClientMenu] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const client = data.clients.find(c => c.id === data.activeClient) || data.clients[0];
    useEffect(() => {
      if (t.startClient && t.startClient !== data.activeClient) Store.setActive(t.startClient);
    }, [t.startClient]);
    const fireToast = useCallback(text => {
      setToast({
        id: Date.now(),
        text
      });
      setSyncing(true);
      setTimeout(() => setSyncing(false), 1000);
      setTimeout(() => setToast(c => c && Date.now() - c.id >= 2900 ? null : c), 3000);
    }, []);

    // ── ⌘K listener ───────────────────────────────────────────
    useEffect(() => {
      const h = e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setCmdOpen(o => !o);
        }
      };
      window.addEventListener('keydown', h);
      return () => window.removeEventListener('keydown', h);
    }, []);

    // ── Store mutation helpers (scoped to active client) ──────
    const mut = fn => Store.update(d => {
      const c = d.clients.find(x => x.id === d.activeClient);
      fn(c.site, c, d);
    });
    const touch = page => {
      page.updated_at = new Date().toISOString();
    };
    const actions = {
      // pages / builder
      savePage(page, publish) {
        mut(site => {
          const i = site.pages.findIndex(p => p.id === page.id);
          const next = {
            ...page,
            status: publish ? 'published' : page.status
          };
          touch(next);
          if (i >= 0) site.pages[i] = next;else site.pages.unshift(next);
        });
        if (publish) fireToast('Page published · Live on ' + client.domain);
      },
      deletePage(id) {
        mut(site => {
          site.pages = site.pages.filter(p => p.id !== id);
        });
        fireToast('Page deleted');
      },
      addPage(onOpen) {
        const id = Store.uid('pg');
        mut(site => {
          site.pages.unshift({
            id,
            title: 'Untitled page',
            slug: '/' + (site.pages.length + 1),
            status: 'draft',
            updated_at: new Date().toISOString(),
            blocks: [{
              id: Store.uid('blk'),
              type: 'hero',
              data: {
                ...BLOCK_DEFAULTS.hero
              }
            }]
          });
        });
        if (onOpen) setTimeout(() => onOpen(id), 0);
      },
      updateBlock(pageId, blockId, dataObj) {
        mut(site => {
          const p = site.pages.find(x => x.id === pageId);
          const b = p.blocks.find(x => x.id === blockId);
          b.data = dataObj;
          touch(p);
        });
      },
      addBlock(pageId, type) {
        mut(site => {
          const p = site.pages.find(x => x.id === pageId);
          p.blocks.push({
            id: Store.uid('blk'),
            type,
            data: {
              ...BLOCK_DEFAULTS[type]
            }
          });
          touch(p);
        });
      },
      deleteBlock(pageId, blockId) {
        mut(site => {
          const p = site.pages.find(x => x.id === pageId);
          p.blocks = p.blocks.filter(b => b.id !== blockId);
          touch(p);
        });
      },
      moveBlock(pageId, from, to) {
        mut(site => {
          const p = site.pages.find(x => x.id === pageId);
          const a = p.blocks;
          const [m] = a.splice(from, 1);
          a.splice(to, 0, m);
          touch(p);
        });
      },
      // articles
      saveArticle(a) {
        mut(site => {
          const i = site.articles.findIndex(x => x.id === a.id);
          const next = {
            ...a,
            updated_at: new Date().toISOString(),
            published_at: a.status === 'published' ? a.published_at || new Date().toISOString() : null
          };
          if (i >= 0) site.articles[i] = {
            ...site.articles[i],
            ...next
          };else site.articles.unshift({
            ...next,
            id: Store.uid('post')
          });
        });
        fireToast(a.status === 'published' ? 'Article published' : 'Draft saved');
      },
      deleteArticle(id) {
        mut(site => {
          site.articles = site.articles.filter(x => x.id !== id);
        });
        fireToast('Article deleted');
      },
      // departments
      saveDepartment(s) {
        mut(site => {
          const i = site.departments.findIndex(x => x.id === s.id);
          if (i >= 0) site.departments[i] = {
            ...site.departments[i],
            ...s
          };else site.departments.push({
            ...s,
            id: Store.uid('svc')
          });
        });
        fireToast('Department saved · Live site updated');
      },
      deleteDepartment(id) {
        mut(site => {
          site.departments = site.departments.filter(x => x.id !== id);
        });
        fireToast('Department removed');
      },
      moveDepartment(id, dir) {
        mut(site => {
          const arr = [...site.departments].sort((a, b) => a.display_order - b.display_order);
          const i = arr.findIndex(x => x.id === id);
          const j = i + dir;
          if (j < 0 || j >= arr.length) return;
          [arr[i].display_order, arr[j].display_order] = [arr[j].display_order, arr[i].display_order];
        });
      },
      // notes
      saveNote(n) {
        mut(site => {
          const i = site.fieldNotes.findIndex(x => x.id === n.id);
          if (i >= 0) site.fieldNotes[i] = {
            ...site.fieldNotes[i],
            ...n
          };else site.fieldNotes.push({
            ...n,
            id: Store.uid('tst')
          });
        });
        fireToast('Field note saved · Live site updated');
      },
      deleteNote(id) {
        mut(site => {
          site.fieldNotes = site.fieldNotes.filter(x => x.id !== id);
        });
        fireToast('Field note removed');
      },
      // messages
      markRead(id, read) {
        mut(site => {
          const m = site.messages.find(x => x.id === id);
          if (m) m.read = read;
        });
      },
      deleteMessage(id) {
        mut(site => {
          site.messages = site.messages.filter(x => x.id !== id);
        });
        fireToast('Transmission deleted');
      },
      // settings
      saveSettings(next) {
        mut(site => {
          site.settings = {
            ...site.settings,
            ...next
          };
        });
      },
      // projects
      moveTask(projectId, taskId, toCol) {
        mut(site => {
          const p = site.projects.find(x => x.id === projectId);
          const tk = p.tasks.find(x => x.id === taskId);
          if (tk) tk.column = toCol;
        });
      },
      addTask(projectId, column, title) {
        mut(site => {
          const p = site.projects.find(x => x.id === projectId);
          p.tasks.push({
            id: Store.uid('t'),
            title,
            column,
            priority: 'Medium',
            due: ''
          });
        });
      },
      updateTask(projectId, taskId, patch) {
        mut(site => {
          const p = site.projects.find(x => x.id === projectId);
          const tk = p.tasks.find(x => x.id === taskId);
          Object.assign(tk, patch);
        });
      },
      deleteTask(projectId, taskId) {
        mut(site => {
          const p = site.projects.find(x => x.id === projectId);
          p.tasks = p.tasks.filter(x => x.id !== taskId);
        });
      },
      addProject() {
        const id = Store.uid('prj');
        const name = prompt('Board name:');
        if (!name) return null;
        mut(site => {
          site.projects.push({
            id,
            name,
            description: '',
            columns: ['Backlog', 'In Progress', 'Review', 'Done'],
            tasks: []
          });
        });
        return id;
      },
      // plan / clients
      setPlan(planId) {
        mut((site, c) => {
          c.plan = planId;
        });
        fireToast('Plan changed to ' + Store.plan(planId).name);
      }
    };
    function go(mod, tab) {
      setEmbed(false);
      if (!Store.can(client, mod)) {
        setModuleId(mod);
        return;
      } // locked → upsell renders
      setModuleId(mod);
      if (mod === 'content' && tab) setContentTab(tab);
    }
    function switchClient(id) {
      Store.setActive(id);
      setClientMenu(false);
      setModuleId('dashboard');
      setEmbed(false);
    }

    // ── Command palette commands ──────────────────────────────
    const commands = [];
    Store.MODULES.forEach(m => commands.push({
      id: 'nav-' + m.id,
      group: 'Go to',
      icon: m.icon,
      label: m.brand,
      sub: Store.can(client, m.id) ? '' : 'locked',
      run: () => go(m.id)
    }));
    commands.push({
      id: 'nav-site',
      group: 'Go to',
      icon: 'external',
      label: 'View live site',
      run: () => setEmbed(true)
    });
    commands.push({
      id: 'new-page',
      group: 'Create',
      icon: 'layout',
      label: 'New page',
      run: () => {
        go('content', 'pages');
        actions.addPage();
      }
    });
    commands.push({
      id: 'new-article',
      group: 'Create',
      icon: 'fileText',
      label: 'New article',
      run: () => go('content', 'articles')
    });
    data.clients.forEach(c => {
      if (c.id !== client.id) commands.push({
        id: 'cli-' + c.id,
        group: 'Switch client',
        icon: 'user',
        label: c.name,
        sub: c.domain,
        run: () => switchClient(c.id)
      });
    });

    // ── Render main ───────────────────────────────────────────
    let main;
    if (embed) main = /*#__PURE__*/React.createElement(window.WsEmbed, {
      client: client,
      onBack: () => setEmbed(false)
    });else if (moduleId === 'dashboard') main = /*#__PURE__*/React.createElement(window.WsDashboard, {
      client: client,
      go: go,
      onViewSite: () => setEmbed(true)
    });else if (!Store.can(client, moduleId)) main = /*#__PURE__*/React.createElement(window.WsUpsell, {
      client: client,
      moduleId: moduleId,
      onPlan: actions.setPlan
    });else if (moduleId === 'content') main = /*#__PURE__*/React.createElement(window.ContentModule, {
      client: client,
      actions: actions,
      onToast: fireToast,
      initialTab: contentTab
    });else if (moduleId === 'projects') main = /*#__PURE__*/React.createElement(window.ProjectsModule, {
      client: client,
      actions: actions
    });else if (moduleId === 'research') main = /*#__PURE__*/React.createElement(ResearchPlaceholder, {
      client: client
    });else if (moduleId === 'development') main = /*#__PURE__*/React.createElement(DevPlaceholder, {
      client: client
    });
    const layoutClass = t.navLayout === 'rail' ? 'ws-nav--rail' : 'ws-nav--sidebar';
    return /*#__PURE__*/React.createElement("div", {
      className: "ws"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-top__brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse",
      style: {
        borderColor: 'rgba(255,255,255,.4)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "ws-top__name"
    }, "Digital Allies"), /*#__PURE__*/React.createElement("span", {
      className: "ws-top__tag"
    }, "CMS")), /*#__PURE__*/React.createElement("div", {
      className: "ws-client"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-client__btn",
      onClick: () => setClientMenu(o => !o)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-avatar",
      style: {
        background: client.brand_color
      }
    }, client.initials), /*#__PURE__*/React.createElement("span", {
      className: "ws-client__meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-client__name"
    }, client.name), /*#__PURE__*/React.createElement("span", {
      className: "ws-client__dom"
    }, client.domain)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 14,
      color: "rgba(255,255,255,.6)"
    })), clientMenu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 50
      },
      onClick: () => setClientMenu(false)
    }), /*#__PURE__*/React.createElement("div", {
      className: "ws-client__menu"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-client__head"
    }, /*#__PURE__*/React.createElement("span", null, "Your sites"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-details)'
      }
    }, data.clients.length)), data.clients.map(c => /*#__PURE__*/React.createElement("button", {
      key: c.id,
      className: 'ws-client__opt' + (c.id === client.id ? ' is-on' : ''),
      onClick: () => switchClient(c.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-avatar",
      style: {
        background: c.brand_color
      }
    }, c.initials), /*#__PURE__*/React.createElement("span", {
      className: "ws-client__opt-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-client__opt-name"
    }, c.name, c.owner && ' ·', c.owner && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        fontSize: 10
      }
    }, " you")), /*#__PURE__*/React.createElement("span", {
      className: "ws-client__opt-dom"
    }, c.domain)), /*#__PURE__*/React.createElement("span", {
      className: 'ws-plan-tag ws-plan-tag--' + c.plan
    }, Store.plan(c.plan).name))), /*#__PURE__*/React.createElement("button", {
      className: "ws-client__add",
      onClick: () => fireToast('Demo · client onboarding is an Agency feature')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " Add a client site")))), /*#__PURE__*/React.createElement("div", {
      className: "ws-top__spacer"
    }), /*#__PURE__*/React.createElement("button", {
      className: "ws-cmd",
      onClick: () => setCmdOpen(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 14
    }), " Search & commands ", /*#__PURE__*/React.createElement("kbd", null, "\u2318K")), /*#__PURE__*/React.createElement("span", {
      className: 'ws-sync' + (syncing ? ' ws-sync--on' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse"
    }), syncing ? 'Syncing…' : 'Connected')), /*#__PURE__*/React.createElement("div", {
      className: "ws-body"
    }, /*#__PURE__*/React.createElement("nav", {
      className: 'ws-nav ' + layoutClass
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-nav__group"
    }, t.navLayout === 'rail' ? '—' : 'Modules'), Store.MODULES.map(m => {
      const locked = !Store.can(client, m.id);
      const active = moduleId === m.id && !embed;
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'ws-navitem' + (active ? ' is-active' : '') + (locked ? ' is-locked' : ''),
        onClick: () => go(m.id),
        title: m.brand
      }, /*#__PURE__*/React.createElement(Icon, {
        name: m.icon,
        size: 16
      }), t.navLayout !== 'rail' && /*#__PURE__*/React.createElement("span", {
        className: "ws-navitem__label"
      }, m.brand), t.navLayout !== 'rail' && locked && /*#__PURE__*/React.createElement(Icon, {
        name: "lock",
        size: 12,
        className: "ws-navitem__lock"
      }));
    }), /*#__PURE__*/React.createElement("div", {
      className: "ws-nav__foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-nav__viewsite",
      onClick: () => setEmbed(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, "View live site")))), /*#__PURE__*/React.createElement("div", {
      className: "ws-main"
    }, main)), toast && /*#__PURE__*/React.createElement("div", {
      className: "ws-toast",
      key: toast.id
    }, /*#__PURE__*/React.createElement("span", {
      className: "da-pulse"
    }), toast.text), /*#__PURE__*/React.createElement(window.CmdPalette, {
      open: cmdOpen,
      onClose: () => setCmdOpen(false),
      commands: commands
    }), /*#__PURE__*/React.createElement(window.TweaksPanel, null, /*#__PURE__*/React.createElement(window.TweakSection, {
      label: "Navigation"
    }), /*#__PURE__*/React.createElement(window.TweakRadio, {
      label: "Nav layout",
      value: t.navLayout,
      options: [{
        value: 'sidebar',
        label: 'Sidebar'
      }, {
        value: 'rail',
        label: 'Icon rail'
      }],
      onChange: v => setTweak('navLayout', v)
    }), /*#__PURE__*/React.createElement(window.TweakSection, {
      label: "Demo"
    }), /*#__PURE__*/React.createElement(window.TweakRadio, {
      label: "Start on client",
      value: t.startClient,
      options: data.clients.map(c => ({
        value: c.id,
        label: c.initials
      })),
      onChange: v => {
        setTweak('startClient', v);
        switchClient(v);
      }
    }), /*#__PURE__*/React.createElement(window.TweakButton, {
      label: "Reset demo content",
      onClick: () => {
        Store.reset();
        fireToast('Demo content reset');
      }
    })));
  }

  // ── Locked-module placeholders (Studio/Agency) — but if plan
  //    allows, show a tidy "coming together" stub so nav works. ─
  function ResearchPlaceholder({
    client
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head__eyebrow da-eyebrow da-eyebrow--muted"
    }, "Research"), /*#__PURE__*/React.createElement("h1", null, "Research & Notes"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "A notebook archive for ", client.name, "."))), /*#__PURE__*/React.createElement("div", {
      className: "da-pinned",
      style: {
        padding: '30px 20px 16px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Unlocked on ", client.name, "."), " Notebooks, tagged notes, and exportable research live here \u2014 wired the same connected way as Content. This module is mapped in the build plan and ready to flesh out next."));
  }
  function DevPlaceholder({
    client
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head__eyebrow da-eyebrow da-eyebrow--muted"
    }, "Development"), /*#__PURE__*/React.createElement("h1", null, "The Workshop"), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, "Feature, bug & milestone tracker for ", client.name, "."))), /*#__PURE__*/React.createElement("div", {
      className: "da-pinned",
      style: {
        padding: '30px 20px 16px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Agency module."), " The Workshop tracks features, bugs and launch milestones against each site \u2014 the dev counterpart to the Projects board. Mapped in the build plan."));
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/shell.jsx", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/store.js
try { (() => {
/* ============================================================
   Digital Allies — CMS Workspace store
   Multi-client, plan-aware. One observable store persisted to
   localStorage. Each CLIENT owns its own site content (pages,
   articles, departments, field notes, messages, projects).
   The admin edits a client; the "live site" reads the same data.
   ============================================================ */
(function () {
  const LS_KEY = 'da_cms_workspace_v1';

  // ── Plans ─────────────────────────────────────────────────────
  const PLANS = [{
    id: 'starter',
    name: 'Starter',
    price: '$0',
    tier: 0,
    blurb: 'One site. Pages, articles, settings.',
    modules: ['dashboard', 'content']
  }, {
    id: 'studio',
    name: 'Studio',
    price: 'From $49/mo',
    tier: 1,
    blurb: 'Add project boards and a research archive.',
    modules: ['dashboard', 'content', 'projects', 'research']
  }, {
    id: 'agency',
    name: 'Agency',
    price: 'From $149/mo',
    tier: 2,
    blurb: 'Everything, plus multi-client and the dev workshop.',
    modules: ['dashboard', 'content', 'projects', 'research', 'development'],
    perks: ['Manage unlimited client sites', 'White-label the admin', 'The Workshop (dev tracker)']
  }];
  const MODULES = [{
    id: 'dashboard',
    label: 'Dashboard',
    brand: 'Dashboard',
    icon: 'dashboard',
    generic: true
  }, {
    id: 'content',
    label: 'Content',
    brand: 'The Press Office',
    icon: 'fileText',
    generic: false
  }, {
    id: 'projects',
    label: 'Projects',
    brand: 'Projects',
    icon: 'grid',
    generic: true
  }, {
    id: 'research',
    label: 'Research',
    brand: 'Research',
    icon: 'briefcase',
    generic: true
  }, {
    id: 'development',
    label: 'Development',
    brand: 'The Workshop',
    icon: 'plug',
    generic: true
  }];

  // ── Page-builder block factory ────────────────────────────────
  const uid = p => (p || 'id') + '-' + Math.random().toString(36).slice(2, 9);

  // ── Owner site (Digital Allies) — rich seed ───────────────────
  const DA_SETTINGS = {
    site_title: 'Digital Allies',
    tagline: 'Technological Solutions for People with Better Things to Do.',
    phone: '(928) 228-5769',
    email: 'contact@digitalallies.net',
    address: 'Based in Kingman, AZ · Serving Everywhere Else',
    business_hours: 'Mon–Fri · 8a–6p MST · I answer the phone.',
    hero_title: 'Technological Solutions for People with Better Things to Do.',
    hero_subtitle: "I build systems that don't require a master's degree to operate. Clean engineering, clear communication, and follow-through that won't require follow up.",
    hero_cta_text: 'Inquire Within',
    about_title: 'The Knowledgeable Neighbor',
    about_body: "I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called \u201CDoing My Job.\u201D\n\nStrategy is free. Execution is paid. All quotes are given before work begins \u2014 no surprises, no silent scope creep."
  };
  const DA_PAGES = [{
    id: 'pg-home',
    title: 'Home',
    slug: '/',
    status: 'published',
    updated_at: '2025-03-01T12:00:00Z',
    blocks: [{
      id: uid('blk'),
      type: 'hero',
      data: {
        eyebrow: 'BASED IN KINGMAN, AZ · SERVING EVERYWHERE ELSE',
        heading: DA_SETTINGS.hero_title,
        body: DA_SETTINGS.hero_subtitle,
        cta: 'Inquire Within'
      }
    }, {
      id: uid('blk'),
      type: 'departments',
      data: {
        heading: 'The Departments',
        sub: 'Four distinct operations. One point of contact.'
      }
    }, {
      id: uid('blk'),
      type: 'fieldNotes',
      data: {
        heading: 'Field Notes'
      }
    }, {
      id: uid('blk'),
      type: 'cta',
      data: {
        heading: 'Need a strategic ally?',
        button: 'Send a Transmission'
      }
    }]
  }, {
    id: 'pg-about',
    title: 'About',
    slug: '/about',
    status: 'published',
    updated_at: '2025-02-20T12:00:00Z',
    blocks: [{
      id: uid('blk'),
      type: 'richtext',
      data: {
        heading: 'The Knowledgeable Neighbor',
        body: DA_SETTINGS.about_body
      }
    }, {
      id: uid('blk'),
      type: 'cta',
      data: {
        heading: 'Have something to build?',
        button: 'Inquire Within'
      }
    }]
  }, {
    id: 'pg-services',
    title: 'Services',
    slug: '/services',
    status: 'draft',
    updated_at: '2025-03-04T09:00:00Z',
    blocks: [{
      id: uid('blk'),
      type: 'departments',
      data: {
        heading: 'The Departments',
        sub: 'Pick a bureau.'
      }
    }]
  }];
  const DA_DEPARTMENTS = [{
    id: 'svc-1',
    title: 'The Design Bureau',
    icon: 'compass',
    price: 'From $2,400',
    description: 'Your logo, site, and words look like they know each other. Brand, identity, and a website that earns its keep.',
    display_order: 0
  }, {
    id: 'svc-2',
    title: 'Dept. of Cooperation',
    icon: 'cog',
    price: 'From $1,800',
    description: 'Your apps talk to each other. You don\u2019t have to. Integrations that quietly move data where it needs to go.',
    display_order: 1
  }, {
    id: 'svc-3',
    title: 'The Self-Governing Bureau',
    icon: 'timer',
    price: 'From $1,200',
    description: 'Repetitive tasks are for machines. Go take a real lunch break. Automation that runs without you watching.',
    display_order: 2
  }, {
    id: 'svc-4',
    title: 'The Permanent Observation Post',
    icon: 'radar',
    price: 'From $300/mo',
    description: 'Monitoring runs 24/7. If something breaks at 2am, that\u2019s my problem \u2014 not yours.',
    display_order: 3
  }];
  const DA_NOTES = [{
    id: 'tst-1',
    author_name: 'Marguerite Vance',
    author_role: 'Vance & Daughters Hardware · Kingman',
    rating: 5,
    content: 'He picked up the phone on the first ring, every single time. The new ordering system saved my Saturdays.',
    display_order: 0
  }, {
    id: 'tst-2',
    author_name: 'Dr. Elias Knox',
    author_role: 'Knox Family Dental',
    rating: 5,
    content: 'No jargon, no runaround. He explained the whole thing in plain English, gave the quote before starting, and finished early. Rare.',
    display_order: 1
  }, {
    id: 'tst-3',
    author_name: 'Pilar Ortega',
    author_role: 'Ortega Route 66 Diner',
    rating: 5,
    content: 'The reservations and the website finally talk to each other. My host stand stopped double-booking tables.',
    display_order: 2
  }];
  const DA_ARTICLES = [{
    id: 'post-1',
    title: 'Why I answer the phone',
    slug: 'why-i-answer-the-phone',
    excerpt: 'A short defense of a radical business practice: being reachable.',
    content: '<p>There is a strange idea in this industry that being hard to reach makes you important. I disagree. If you call, I answer.</p>',
    status: 'published',
    published_at: '2025-02-18T15:00:00Z',
    updated_at: '2025-02-18T15:00:00Z'
  }, {
    id: 'post-2',
    title: 'The Jargon Jar: a translation guide',
    slug: 'the-jargon-jar',
    excerpt: 'Corporate speak, translated into things a human being would actually say.',
    content: '<p>"Leverage synergies across touchpoints" means "make the parts work together." That is the whole jar.</p>',
    status: 'published',
    published_at: '2025-01-30T15:00:00Z',
    updated_at: '2025-01-30T15:00:00Z'
  }, {
    id: 'post-3',
    title: 'On the Reciprocity Loop (draft)',
    slug: 'the-reciprocity-loop',
    excerpt: 'Strategy is free. Execution is paid. Here is why that works.',
    content: '<p>I do not charge for conversations or clarity. Call it a professional courtesy.</p>',
    status: 'draft',
    published_at: null,
    updated_at: '2025-03-02T18:30:00Z'
  }];
  const DA_MESSAGES = [{
    id: 'msg-1',
    name: 'Theodore Brandt',
    email: 'theo@brandtmotors.com',
    phone: '(928) 555-0147',
    subject: 'Website + booking for the shop',
    message: 'Saw your site. My current one is held together with tape. Can we talk about a rebuild and an online booking thing for the garage?',
    read: false,
    created_at: '2025-03-04T17:42:00Z'
  }, {
    id: 'msg-2',
    name: 'Ruth Calloway',
    email: 'ruth.calloway@gmail.com',
    phone: null,
    subject: 'Automating invoices',
    message: 'I spend every Friday typing invoices by hand. A friend said you might be able to make that stop happening. Please.',
    read: false,
    created_at: '2025-03-03T09:12:00Z'
  }, {
    id: 'msg-3',
    name: 'Sam Whitfield',
    email: 'sam@whitfieldlaw.net',
    phone: '(602) 555-0190',
    subject: 'Quick question on monitoring',
    message: 'What does the Permanent Observation Post actually cover? Do you watch the site overnight?',
    read: true,
    created_at: '2025-02-28T20:05:00Z'
  }];
  const DA_PROJECTS = [{
    id: 'prj-1',
    name: 'Brandt Motors — rebuild',
    description: 'Full site rebuild + online booking for the garage.',
    columns: ['Backlog', 'In Progress', 'Review', 'Done'],
    tasks: [{
      id: 't1',
      title: 'Sitemap + content inventory',
      column: 'Done',
      priority: 'High',
      due: '2025-03-08'
    }, {
      id: 't2',
      title: 'Homepage layout in CMS',
      column: 'In Progress',
      priority: 'High',
      due: '2025-03-14'
    }, {
      id: 't3',
      title: 'Booking integration (Calendly)',
      column: 'In Progress',
      priority: 'Medium',
      due: '2025-03-18'
    }, {
      id: 't4',
      title: 'Migrate 6 service pages',
      column: 'Backlog',
      priority: 'Medium',
      due: '2025-03-22'
    }, {
      id: 't5',
      title: 'Launch checklist + DNS',
      column: 'Backlog',
      priority: 'Low',
      due: '2025-03-28'
    }]
  }, {
    id: 'prj-2',
    name: 'Knox Dental — automation',
    description: 'Invoice + reminder automation.',
    columns: ['Backlog', 'In Progress', 'Review', 'Done'],
    tasks: [{
      id: 't6',
      title: 'Map current invoice flow',
      column: 'Done',
      priority: 'High',
      due: '2025-03-05'
    }, {
      id: 't7',
      title: 'Zapier → QuickBooks bridge',
      column: 'Review',
      priority: 'High',
      due: '2025-03-12'
    }, {
      id: 't8',
      title: 'SMS appointment reminders',
      column: 'Backlog',
      priority: 'Medium',
      due: '2025-03-20'
    }]
  }];

  // ── Client sites ──────────────────────────────────────────────
  function emptySite(over) {
    return Object.assign({
      settings: {},
      pages: [],
      articles: [],
      departments: [],
      fieldNotes: [],
      messages: [],
      projects: []
    }, over);
  }
  const SEED = {
    activeClient: 'da',
    clients: [{
      id: 'da',
      name: 'Digital Allies',
      domain: 'digitalallies.net',
      initials: 'DA',
      plan: 'agency',
      brand_color: '#3A7BD5',
      owner: true,
      live_url: 'https://digitalallies.net',
      admin_url: 'https://da-webwssite-build-workflows.vercel.app/',
      site: emptySite({
        settings: DA_SETTINGS,
        pages: DA_PAGES,
        articles: DA_ARTICLES,
        departments: DA_DEPARTMENTS,
        fieldNotes: DA_NOTES,
        messages: DA_MESSAGES,
        projects: DA_PROJECTS
      })
    }, {
      id: 'brandt',
      name: 'Brandt Motors',
      domain: 'brandtmotors.com',
      initials: 'BM',
      plan: 'starter',
      brand_color: '#C5301A',
      live_url: 'https://digitalallies.net',
      admin_url: '',
      site: emptySite({
        settings: {
          site_title: 'Brandt Motors',
          tagline: 'Honest repair since 1986. Kingman, AZ.',
          phone: '(928) 555-0147',
          email: 'theo@brandtmotors.com',
          address: 'Andy Devine Ave · Kingman, AZ',
          hero_title: 'Your truck, back on the road by Friday.',
          hero_subtitle: 'Diagnostics, brakes, and the stuff that goes wrong on Route 66. Book online — we answer the phone too.',
          hero_cta_text: 'Book a service',
          about_title: 'Three bays. Two mechanics. No surprises.',
          about_body: 'We tell you what it needs and what it costs before we touch it.'
        },
        pages: [{
          id: 'bm-home',
          title: 'Home',
          slug: '/',
          status: 'published',
          updated_at: '2025-03-04T10:00:00Z',
          blocks: [{
            id: uid('blk'),
            type: 'hero',
            data: {
              eyebrow: 'KINGMAN, AZ · SINCE 1986',
              heading: 'Your truck, back on the road by Friday.',
              body: 'Diagnostics, brakes, and the stuff that goes wrong on Route 66.',
              cta: 'Book a service'
            }
          }, {
            id: uid('blk'),
            type: 'cta',
            data: {
              heading: 'Need it looked at?',
              button: 'Book a service'
            }
          }]
        }, {
          id: 'bm-svc',
          title: 'Services',
          slug: '/services',
          status: 'draft',
          updated_at: '2025-03-04T10:30:00Z',
          blocks: [{
            id: uid('blk'),
            type: 'richtext',
            data: {
              heading: 'What we do',
              body: 'Brakes. Diagnostics. A/C. Tires. Pre-trip inspections.'
            }
          }]
        }],
        articles: [],
        departments: [],
        fieldNotes: [{
          id: 'bm-n1',
          author_name: 'Dale R.',
          author_role: 'Regular since 2009',
          rating: 5,
          content: 'Fixed in a day, charged what they quoted. Nobody does that anymore.',
          display_order: 0
        }],
        messages: [{
          id: 'bm-m1',
          name: 'Cindy Ross',
          email: 'cindy@example.com',
          phone: null,
          subject: 'Brake noise',
          message: 'Grinding when I stop. Can I come in Thursday?',
          read: false,
          created_at: '2025-03-05T08:00:00Z'
        }],
        projects: []
      })
    }, {
      id: 'knox',
      name: 'Knox Family Dental',
      domain: 'knoxfamilydental.com',
      initials: 'KD',
      plan: 'studio',
      brand_color: '#1F8A5B',
      live_url: 'https://digitalallies.net',
      admin_url: '',
      site: emptySite({
        settings: {
          site_title: 'Knox Family Dental',
          tagline: 'Gentle dentistry for the whole family.',
          phone: '(928) 555-0202',
          email: 'front@knoxfamilydental.com',
          address: 'Stockton Hill Rd · Kingman, AZ',
          hero_title: 'A dentist your kids won\u2019t dread.',
          hero_subtitle: 'Cleanings, checkups, and same-week emergencies. New patients welcome.',
          hero_cta_text: 'Request appointment',
          about_title: 'Dr. Elias Knox, DDS',
          about_body: 'Twenty years keeping Kingman smiling.'
        },
        pages: [{
          id: 'kd-home',
          title: 'Home',
          slug: '/',
          status: 'published',
          updated_at: '2025-03-02T11:00:00Z',
          blocks: [{
            id: uid('blk'),
            type: 'hero',
            data: {
              eyebrow: 'KINGMAN, AZ · NEW PATIENTS WELCOME',
              heading: 'A dentist your kids won\u2019t dread.',
              body: 'Cleanings, checkups, and same-week emergencies.',
              cta: 'Request appointment'
            }
          }, {
            id: uid('blk'),
            type: 'fieldNotes',
            data: {
              heading: 'What patients say'
            }
          }]
        }],
        articles: [{
          id: 'kd-a1',
          title: 'When should kids see a dentist?',
          slug: 'kids-first-visit',
          excerpt: 'Sooner than you think.',
          content: '<p>By the first birthday, ideally.</p>',
          status: 'published',
          published_at: '2025-02-10T15:00:00Z',
          updated_at: '2025-02-10T15:00:00Z'
        }],
        departments: [],
        fieldNotes: [{
          id: 'kd-n1',
          author_name: 'The Ortega family',
          author_role: 'Patients since 2018',
          rating: 5,
          content: 'Three kids, zero meltdowns. The staff is unreasonably kind.',
          display_order: 0
        }],
        messages: [],
        projects: [{
          id: 'kd-p1',
          name: 'Patient portal',
          description: 'Online forms + reminders.',
          columns: ['Backlog', 'In Progress', 'Review', 'Done'],
          tasks: [{
            id: 'kt1',
            title: 'Intake form builder',
            column: 'In Progress',
            priority: 'High',
            due: '2025-03-15'
          }, {
            id: 'kt2',
            title: 'SMS reminders',
            column: 'Backlog',
            priority: 'Medium',
            due: '2025-03-22'
          }]
        }]
      })
    }]
  };

  // ── Persistence ───────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  let state = load();
  const listeners = new Set();
  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function emit() {
    listeners.forEach(fn => fn(state));
  }
  const Store = {
    PLANS,
    MODULES,
    get: () => state,
    plan: id => PLANS.find(p => p.id === id),
    activeClient: () => state.clients.find(c => c.id === state.activeClient),
    can(clientOrId, moduleId) {
      const c = typeof clientOrId === 'string' ? state.clients.find(x => x.id === clientOrId) : clientOrId;
      if (!c) return false;
      const pl = PLANS.find(p => p.id === c.plan);
      return !!pl && pl.modules.includes(moduleId);
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    update(mutator) {
      const draft = JSON.parse(JSON.stringify(state));
      state = mutator(draft) || draft;
      persist();
      emit();
    },
    setActive(id) {
      Store.update(d => {
        d.activeClient = id;
      });
    },
    reset() {
      state = JSON.parse(JSON.stringify(SEED));
      persist();
      emit();
    },
    uid
  };
  window.CMSWorkspace = Store;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/store.js", error: String((e && e.message) || e) }); }

// cms/_archive/connected/workspace/views.jsx
try { (() => {
/* ============================================================
   VIEWS — Dashboard · Upsell (plan gate) · Embed (live site/admin)
   Exported on window.
   ============================================================ */
(function () {
  const {
    useState,
    useRef
  } = React;
  const Icon = window.Icon;
  const Store = window.CMSWorkspace;

  // ── Dashboard ───────────────────────────────────────────────
  function Dashboard({
    client,
    go,
    onViewSite
  }) {
    const s = client.site;
    const unread = (s.messages || []).filter(m => !m.read).length;
    const drafts = (s.pages || []).filter(p => p.status === 'draft').length + (s.articles || []).filter(a => a.status === 'draft').length;
    const tasks = (s.projects || []).reduce((n, p) => n + p.tasks.length, 0);
    const canProjects = Store.can(client, 'projects');
    const stats = [{
      label: 'Pages',
      value: (s.pages || []).length,
      sub: drafts + ' draft' + (drafts === 1 ? '' : 's'),
      icon: 'fileText',
      go: () => go('content', 'pages')
    }, {
      label: 'Articles',
      value: (s.articles || []).length,
      sub: 'in the Journal',
      icon: 'book',
      go: () => go('content', 'articles')
    }, {
      label: 'Open tasks',
      value: canProjects ? tasks : '—',
      sub: canProjects ? 'across boards' : 'Studio plan',
      icon: 'grid',
      go: () => go('projects')
    }, {
      label: 'Unread',
      value: unread,
      sub: (s.messages || []).length + ' transmissions',
      icon: 'message',
      alert: unread > 0,
      go: () => go('content', 'messages')
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ws-head__eyebrow da-eyebrow da-eyebrow--muted"
    }, "Dashboard"), /*#__PURE__*/React.createElement("h1", null, client.name), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__sub"
    }, client.domain, " \xB7 ", Store.plan(client.plan).name, " plan")), /*#__PURE__*/React.createElement("div", {
      className: "ws-head__actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-btn",
      onClick: onViewSite
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 13
    }), " View live site"))), /*#__PURE__*/React.createElement("div", {
      className: "ws-stat-grid"
    }, stats.map(st => /*#__PURE__*/React.createElement("button", {
      className: "ws-stat",
      key: st.label,
      onClick: st.go
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-stat__top"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: st.icon,
      size: 15
    }), st.alert && /*#__PURE__*/React.createElement("span", {
      className: "da-signal-dot",
      style: {
        width: 10,
        height: 10
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "ws-stat__val"
    }, st.value), /*#__PURE__*/React.createElement("span", {
      className: "ws-stat__label"
    }, st.label), /*#__PURE__*/React.createElement("span", {
      className: "ws-stat__sub"
    }, st.sub)))), /*#__PURE__*/React.createElement("div", {
      className: "ws-subhead"
    }, "Quick actions"), /*#__PURE__*/React.createElement("div", {
      className: "ws-quick-grid"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-quick",
      onClick: () => go('content', 'pages')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layout",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Build a page"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-quick",
      onClick: () => go('content', 'articles')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Write an article"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-quick",
      onClick: () => go('content', 'settings')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Edit site settings"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "ws-quick",
      onClick: () => go('content', 'messages')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "message",
      size: 16
    }), /*#__PURE__*/React.createElement("span", null, "Read transmissions"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 14
    }))), /*#__PURE__*/React.createElement("div", {
      className: "da-pinned",
      style: {
        marginTop: 32,
        padding: '30px 20px 16px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Connected, not copied."), " This workspace and ", client.domain, " read from the same source. Save a change, hit ", /*#__PURE__*/React.createElement("em", null, "View live site"), ", and it\u2019s already there."));
  }

  // ── Upsell (plan gate) ──────────────────────────────────────
  function Upsell({
    client,
    moduleId,
    onPlan
  }) {
    const mod = Store.MODULES.find(m => m.id === moduleId);
    const target = Store.PLANS.find(p => p.modules.includes(moduleId));
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-upsell"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-upsell__lock"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 22
    })), /*#__PURE__*/React.createElement("h1", null, mod.brand, " is a ", target.name, " feature"), /*#__PURE__*/React.createElement("p", null, client.name, " is on the ", /*#__PURE__*/React.createElement("strong", null, Store.plan(client.plan).name), " plan. Upgrade to ", /*#__PURE__*/React.createElement("strong", null, target.name), " to unlock ", mod.brand.toLowerCase(), " \u2014 and everything below it."), /*#__PURE__*/React.createElement("div", {
      className: "ws-plans"
    }, Store.PLANS.map(pl => {
      const isCur = pl.id === client.plan;
      const isTarget = pl.id === target.id;
      return /*#__PURE__*/React.createElement("div", {
        key: pl.id,
        className: 'ws-plan' + (isCur ? ' is-current' : '') + (isTarget && !isCur ? ' is-target' : '')
      }, /*#__PURE__*/React.createElement("div", {
        className: "ws-plan__name"
      }, pl.name, isCur && /*#__PURE__*/React.createElement("span", {
        className: "ws-plan-tag ws-plan-tag--studio"
      }, "Current")), /*#__PURE__*/React.createElement("div", {
        className: "ws-plan__price"
      }, pl.price), /*#__PURE__*/React.createElement("div", {
        className: "ws-plan__blurb"
      }, pl.blurb), /*#__PURE__*/React.createElement("div", {
        className: "ws-plan__mods"
      }, Store.MODULES.map(m => {
        const on = pl.modules.includes(m.id);
        return /*#__PURE__*/React.createElement("div", {
          key: m.id,
          className: 'ws-plan__mod' + (on ? '' : ' is-off')
        }, /*#__PURE__*/React.createElement(Icon, {
          name: on ? 'check' : 'x',
          size: 13,
          color: on ? 'var(--accent)' : 'currentColor'
        }), m.brand);
      })), /*#__PURE__*/React.createElement("div", {
        className: "ws-plan__cta"
      }, isCur ? /*#__PURE__*/React.createElement("button", {
        className: "ws-btn ws-btn--sm",
        disabled: true,
        style: {
          width: '100%'
        }
      }, "You\u2019re here") : /*#__PURE__*/React.createElement("button", {
        className: "ws-btn ws-btn--primary ws-btn--sm",
        style: {
          width: '100%'
        },
        onClick: () => onPlan(pl.id)
      }, "Switch to ", pl.name)));
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 20,
        fontSize: 11
      }
    }, "Demo \u2014 switching plans is instant and reversible from the client switcher.")));
  }

  // ── Embed (live site / admin panel) ─────────────────────────
  function Embed({
    client,
    onBack
  }) {
    const hasAdmin = !!client.admin_url;
    const [view, setView] = useState('live');
    const frameRef = useRef(null);
    const url = view === 'live' ? client.live_url : client.admin_url;
    return /*#__PURE__*/React.createElement("div", {
      className: "ws-embed"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ws-embed__bar"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ws-btn ws-btn--ghost ws-btn--sm",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronLeft",
      size: 14
    }), " Back to workspace"), /*#__PURE__*/React.createElement("div", {
      className: "ws-embed__seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: view === 'live' ? 'is-on' : '',
      onClick: () => setView('live')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 13
    }), " Live site"), /*#__PURE__*/React.createElement("button", {
      className: view === 'admin' ? 'is-on' : '',
      onClick: () => setView('admin'),
      disabled: !hasAdmin,
      title: hasAdmin ? '' : 'No admin panel linked'
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 13
    }), " Admin panel")), /*#__PURE__*/React.createElement("div", {
      className: "ws-embed__url"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 11
    }), /*#__PURE__*/React.createElement("span", null, url)), /*#__PURE__*/React.createElement("button", {
      className: "ws-icon-btn",
      title: "Reload",
      onClick: () => {
        if (frameRef.current) frameRef.current.src = frameRef.current.src;
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refresh",
      size: 14
    })), /*#__PURE__*/React.createElement("a", {
      className: "ws-btn ws-btn--sm",
      href: url,
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 13
    }), " Open")), view === 'admin' && !hasAdmin ? /*#__PURE__*/React.createElement("div", {
      className: "ws-embed__frame",
      style: {
        display: 'grid',
        placeItems: 'center',
        background: 'var(--bg-alt)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plug",
      size: 28,
      color: "var(--fg-soft)"
    }), /*#__PURE__*/React.createElement("p", {
      className: "da-small",
      style: {
        marginTop: 12
      }
    }, "No external admin panel linked for ", client.name, ". This client is managed entirely inside the workspace."))) : /*#__PURE__*/React.createElement("iframe", {
      ref: frameRef,
      className: "ws-embed__frame",
      src: url,
      title: view + ' view',
      loading: "lazy",
      referrerPolicy: "no-referrer"
    }));
  }
  Object.assign(window, {
    WsDashboard: Dashboard,
    WsUpsell: Upsell,
    WsEmbed: Embed
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/_archive/connected/workspace/views.jsx", error: String((e && e.message) || e) }); }

// cms/app.js
try { (() => {
// Digital Allies Business Management Dashboard
class BusinessDashboard {
  constructor() {
    // In-memory data storage (not using localStorage as per requirements)
    this.data = {
      projects: [],
      content: [],
      notes: [],
      development: [],
      notifications: [],
      contentCalendar: [],
      pages: [],
      settings: {
        siteName: 'Digital Allies',
        siteTagline: 'Close the technology gap',
        contactEmail: 'contact@digitalallies.net',
        primaryColor: '#3A7BD5',
        signalColor: '#C5301A',
        accentColor: '#FADEEB',
        twitterUrl: 'https://twitter.com/DigitalAlliesAZ',
        linkedinUrl: 'https://linkedin.com/company/digital-allies',
        instagramUrl: 'https://instagram.com/digitalalliesaz',
        githubUrl: 'https://github.com/Digital-Allies'
      }
    };

    // Current state
    this.currentSection = 'dashboard';
    this.currentProject = null;
    this.editingNote = null;
    this.editingDevTask = null;
    this.init();
  }
  init() {
    this.loadSampleData();
    this.bindEvents();
    this.updateDashboardStats();
    this.renderContent();
    this.renderProjects();
    this.renderNotes();
    this.renderDevelopment();
    this.renderContentCalendar();
    this.renderPages();
    this.displaySettings();
  }
  loadSampleData() {
    // Sample pages
    this.data.pages = [{
      id: 1,
      title: 'Home',
      slug: 'home',
      metaDesc: 'Digital Allies — Close the technology gap for your business',
      content: 'Welcome to Digital Allies. We help small businesses, nonprofits, and everyday people get professional-grade technology tools without the confusion.',
      status: 'Published',
      createdDate: '2025-10-01'
    }, {
      id: 2,
      title: 'About Us',
      slug: 'about',
      metaDesc: 'Learn about Digital Allies and our mission to empower small businesses',
      content: 'Digital Allies exists to close the technology gap. We believe technology should work for you — quietly, reliably, and without requiring a master\'s degree to operate.',
      status: 'Published',
      createdDate: '2025-10-02'
    }, {
      id: 3,
      title: 'Services',
      slug: 'services',
      metaDesc: 'Web design, automation, and digital strategy for your business',
      content: 'Our services include web design, business automation, digital strategy, and ongoing support. Everything tailored to your needs.',
      status: 'Published',
      createdDate: '2025-10-03'
    }];
    // Load sample data from the provided JSON
    this.data.projects = [{
      id: 1,
      name: "Website Launch",
      description: "Complete Digital Allies website development and launch",
      columns: ["Backlog", "In Progress", "Review", "Done"],
      tasks: [{
        id: 1,
        title: "Design homepage mockup",
        column: "Done",
        priority: "High",
        dueDate: "2025-10-15"
      }, {
        id: 2,
        title: "Implement contact form",
        column: "In Progress",
        priority: "Medium",
        dueDate: "2025-10-20"
      }, {
        id: 3,
        title: "SEO optimization",
        column: "Backlog",
        priority: "Low",
        dueDate: "2025-10-25"
      }]
    }, {
      id: 2,
      name: "Content Marketing",
      description: "Blog posts and social media content creation",
      columns: ["Ideas", "Writing", "Review", "Published"],
      tasks: [{
        id: 4,
        title: "Write about business automation",
        column: "Writing",
        priority: "High",
        dueDate: "2025-10-18"
      }, {
        id: 5,
        title: "Social media campaign",
        column: "Ideas",
        priority: "Medium",
        dueDate: "2025-10-22"
      }]
    }];
    this.data.content = [{
      id: 1,
      title: "Why Bilingual Websites Matter for Kingman Businesses",
      type: "Blog Post",
      status: "Published",
      tags: ["bilingual", "web design", "local business"],
      content: "For small businesses in Kingman, Arizona, serving both English and Spanish-speaking customers is no longer optional—it's essential. This guide explains why bilingual websites drive growth, build trust, and expand your market reach.\n\nThe Market Reality\nMohave County has a significant Spanish-speaking population. If your website only serves English speakers, you're leaving money on the table. Our research shows that customers are more likely to do business with companies that communicate in their language.\n\nBeyond Translation\nA bilingual website isn't just a translation. It's a complete redesign that respects both languages and cultures. From form validation to SEO, every detail matters. When you get it right, you're saying: \"I see you. I value you. You belong here.\"\n\nThe Digital Allies Approach\nWe don't bolt Spanish onto English sites. We rebuild bilingual from the start. Same brand, same voice, both languages. Human review of every word. Real results in customer engagement and conversions.\n\nReady to go bilingual? Let's talk.",
      createdDate: "2025-10-08",
      publishDate: "2025-10-10"
    }, {
      id: 2,
      title: "Digital Allies Announces Bilingual Web Design Service for Kingman Businesses",
      type: "Press Release",
      status: "Published",
      tags: ["press release", "company news", "service launch"],
      content: "KINGMAN, AZ — October 10, 2025 — Digital Allies today announced the launch of its comprehensive bilingual web design service, bringing professional-grade digital tools to English and Spanish-speaking businesses in Kingman and Mohave County.\n\nThe new service addresses a critical gap in the local market: most small business websites serve only English speakers, leaving Spanish-speaking customers unable to fully engage.\n\n\"We're not translating websites. We're rebuilding them bilingual from the ground up,\" said Anthony, founder of Digital Allies. \"When you speak someone's language, you're saying their business matters. That's the Digital Allies standard.\"\n\nThe bilingual web design service includes:\n- Complete website redesign with bilingual architecture\n- Human review of all Spanish and English copy\n- Bilingual form setup and validation\n- SEO optimization in both languages\n- Ongoing content support and strategy\n\nAbout Digital Allies\nDigital Allies exists to close the technology gap for small businesses, nonprofits, and everyday people who deserve professional-grade tools without the professional-grade confusion. Based in Kingman, Arizona, we specialize in web design, automation, and digital strategy for local and remote clients.",
      createdDate: "2025-10-09",
      publishDate: "2025-10-10"
    }, {
      id: 3,
      title: "Case Study: Local Restaurant Increases Spanish-Speaking Customer Engagement by 40%",
      type: "Case Study",
      status: "Published",
      tags: ["case study", "bilingual", "results"],
      content: "Client: Casa Buena, Local Restaurant\nChallenge: Despite having a diverse customer base, Casa Buena's website only served English speakers. Spanish-speaking customers couldn't access menus, make reservations, or find basic information online.\n\nSolution: Digital Allies rebuilt Casa Buena's website with complete bilingual support. We redesigned the navigation, translated menus and content with human review, set up bilingual reservation forms, and optimized both versions for local search.\n\nResults:\n- 40% increase in Spanish-language website traffic\n- 25% increase in online reservations from Spanish-speaking customers\n- Improved local search rankings for Spanish keywords\n- Positive customer feedback about feeling welcomed\n\nCustomer Testimonial:\n\"Before the redesign, we were turning away customers who couldn't navigate our site in Spanish. Now, both communities feel welcomed. It's made a real difference in our business.\" — Maria, Owner, Casa Buena\n\nKey Takeaway:\nWhen you speak your customer's language, you're not just improving your website. You're showing respect, building trust, and growing your business. That's the bilingual difference.",
      createdDate: "2025-10-07",
      publishDate: "2025-10-10"
    }];
    this.data.notes = [{
      id: 1,
      title: "Market Research - Small Business Needs",
      notebook: "Research",
      tags: ["market-research", "small-business", "needs-analysis"],
      content: "Key findings from small business survey:\n- 67% struggle with digital presence\n- Main pain points: time management, tech adoption\n- Opportunity: simplified automation solutions",
      createdDate: "2025-10-09"
    }, {
      id: 2,
      title: "Competitor Analysis - TechSolutions Inc",
      notebook: "Competitive Intelligence",
      tags: ["competitor", "analysis", "techsolutions"],
      content: "TechSolutions Inc Analysis:\nStrengths: Strong enterprise focus, robust platform\nWeaknesses: Complex pricing, poor small business support\nOpportunity: Target their underserved small business segment",
      createdDate: "2025-10-08"
    }];
    this.data.development = [{
      id: 1,
      title: "User Authentication System",
      type: "Feature",
      status: "In Progress",
      priority: "High",
      description: "Implement secure login and user management",
      dueDate: "2025-10-20"
    }, {
      id: 2,
      title: "Contact form not submitting",
      type: "Bug",
      status: "Open",
      priority: "Medium",
      description: "Form validation errors preventing submission",
      dueDate: "2025-10-15"
    }];

    // 30-day marketing content calendar
    this.data.contentCalendar = [
    // Week 1: Local Data
    {
      day: 1,
      week: 1,
      category: "Local data",
      topic: "Mohave County Market Overview",
      hook: "67% of local businesses say their digital presence needs work.",
      caption: "New market research shows digital gaps in Mohave County. We surveyed 200+ small business owners about their tech challenges.",
      cta: "Ask for a bilingual audit",
      promptRef: "Day 1 · Bilingual storefront audit",
      status: "draft",
      scheduledDate: "2025-10-15"
    }, {
      day: 2,
      week: 1,
      category: "Local data",
      topic: "Mobile vs Desktop Usage",
      hook: "Local users prefer mobile. Your site isn't ready.",
      caption: "70% of Kingman-area searches happen on phones. Most local websites weren't built for mobile-first users.",
      cta: "Audit your site's mobile UX",
      promptRef: "Day 2 · Phone mockup showing slow load",
      status: "draft",
      scheduledDate: "2025-10-16"
    }, {
      day: 3,
      week: 1,
      category: "Local data",
      topic: "Spanish-Speaking Market Size",
      hook: "You're leaving money on the table if you ignore Spanish.",
      caption: "18,000+ Spanish speakers in Mohave County. That's not a niche—that's your market.",
      cta: "See how bilingual helps",
      promptRef: "Day 3 · Bilingual website comparison",
      status: "approved",
      scheduledDate: "2025-10-17"
    }, {
      day: 4,
      week: 1,
      category: "Local data",
      topic: "Search Behavior Analysis",
      hook: "Local Spanish speakers search differently than English speakers.",
      caption: "Keyword research shows distinct search patterns. 'Fontanero' vs 'plumber.' Get both right.",
      cta: "Request bilingual SEO audit",
      promptRef: "Day 4 · Search console heatmap",
      status: "draft",
      scheduledDate: "2025-10-18"
    }, {
      day: 5,
      week: 1,
      category: "Local data",
      topic: "Business Owner Pain Points",
      hook: "What keeps Kingman business owners up at night?",
      caption: "Tech confusion, staffing, time. Not fancy features. Solution: simplicity.",
      cta: "Let's talk about your pain points",
      promptRef: "Day 5 · Conversation graphic",
      status: "draft",
      scheduledDate: "2025-10-19"
    }, {
      day: 6,
      week: 1,
      category: "Local data",
      topic: "Competitor Blind Spots",
      hook: "Your competitors are ignoring Spanish speakers.",
      caption: "We analyzed 50+ local websites. Most treat Spanish like an afterthought.",
      cta: "See the competitive advantage",
      promptRef: "Day 6 · Competitor comparison chart",
      status: "scheduled",
      scheduledDate: "2025-10-20"
    },
    // Week 2: Machine Translation
    {
      day: 7,
      week: 2,
      category: "Machine translation",
      topic: "Translation Mistakes",
      hook: "'Embarazada' doesn't mean embarrassed. Your translator knows that. Google Translate doesn't.",
      caption: "False cognates trip up automated translation. A human review catches these before they embarrass your brand.",
      cta: "Request a manual review of your translations",
      promptRef: "Day 7 · Side-by-side translation fails",
      status: "draft",
      scheduledDate: "2025-10-21"
    }, {
      day: 8,
      week: 2,
      category: "Machine translation",
      topic: "Context Matters",
      hook: "Machine translation misses context every time.",
      caption: "'Send a transmission' means something specific to DA. Google Translate will butcher it.",
      cta: "Learn how human review protects your voice",
      promptRef: "Day 8 · Voice tone comparison",
      status: "draft",
      scheduledDate: "2025-10-22"
    }, {
      day: 9,
      week: 2,
      category: "Machine translation",
      topic: "Public vs Private",
      hook: "Machine translation is fine for your notes. Not for your website.",
      caption: "First drafts? Sure, use automation. Public-facing copy? That needs a human.",
      cta: "See where translation quality matters",
      promptRef: "Day 9 · Flowchart: when to automate",
      status: "approved",
      scheduledDate: "2025-10-23"
    }, {
      day: 10,
      week: 2,
      category: "Machine translation",
      topic: "Cost of Bad Translation",
      hook: "A $200 translation mistake can cost you $20,000 in lost sales.",
      caption: "One misplaced accent. One wrong word. Your credibility vanishes.",
      cta: "Talk to us about translation budgets",
      promptRef: "Day 10 · ROI infographic",
      status: "draft",
      scheduledDate: "2025-10-24"
    }, {
      day: 11,
      week: 2,
      category: "Machine translation",
      topic: "Cultural Nuance",
      hook: "Language isn't just words—it's culture.",
      caption: "DA gets Kingman. We know the difference between Spanish and 'translated English.'",
      cta: "Discuss cultural fit for your brand",
      promptRef: "Day 11 · Kingman culture grid",
      status: "scheduled",
      scheduledDate: "2025-10-25"
    }, {
      day: 12,
      week: 2,
      category: "Machine translation",
      topic: "Technical Terms",
      hook: "Your industry has jargon. Translators who know your industry translate better.",
      caption: "We specialize in tech, automation, and integrations. We speak both languages AND the terminology.",
      cta: "Request industry-specific translation",
      promptRef: "Day 12 · Technical glossary example",
      status: "draft",
      scheduledDate: "2025-10-26"
    },
    // Week 3: Trust & Culture
    {
      day: 13,
      week: 3,
      category: "Trust and culture",
      topic: "Bilingual is Respect",
      hook: "Bilingual isn't a feature. It's respect.",
      caption: "When you speak someone's language, you're saying: 'You matter. Your business matters. I'm not too busy for you.'",
      cta: "See what bilingual trust looks like",
      promptRef: "Day 13 · Community testimonial",
      status: "draft",
      scheduledDate: "2025-10-27"
    }, {
      day: 14,
      week: 3,
      category: "Trust and culture",
      topic: "Details Build Trust",
      hook: "Small things signal big things.",
      caption: "A menu that works in Spanish. Forms that accept Spanish characters. These aren't nice extras—they're proof you care.",
      cta: "Audit your site for cultural details",
      promptRef: "Day 14 · Checklist: bilingual details",
      status: "draft",
      scheduledDate: "2025-10-28"
    }, {
      day: 15,
      week: 3,
      category: "Trust and culture",
      topic: "One Business, Two Languages",
      hook: "You don't have a 'Spanish site.' You have one business that serves two languages.",
      caption: "DA doesn't translate websites. We rebuild them bilingual from the start. Same brand, same voice, both languages.",
      cta: "See the difference in approach",
      promptRef: "Day 15 · Architecture diagram",
      status: "approved",
      scheduledDate: "2025-10-29"
    }, {
      day: 16,
      week: 3,
      category: "Trust and culture",
      topic: "Local Stories",
      hook: "Spanish speakers in Kingman have different stories than English speakers.",
      caption: "Same town, different context. Same business, different language = different conversation.",
      cta: "Tell your bilingual story",
      promptRef: "Day 16 · Story structure template",
      status: "scheduled",
      scheduledDate: "2025-10-30"
    }, {
      day: 17,
      week: 3,
      category: "Trust and culture",
      topic: "Community Impact",
      hook: "Being bilingual isn't business. It's community.",
      caption: "When you get Spanish right, you're not just selling. You're saying: 'I see you. I value you. Welcome here.'",
      cta: "Join us in building bilingual community",
      promptRef: "Day 17 · Impact story",
      status: "draft",
      scheduledDate: "2025-10-31"
    }, {
      day: 18,
      week: 3,
      category: "Trust and culture",
      topic: "Voice & Authenticity",
      hook: "Don't sound like a translator. Sound like yourself—in Spanish.",
      caption: "DA's voice is sharp, straight-talking, authentic. That doesn't change in Spanish. It gets stronger.",
      cta: "Hear the difference authenticity makes",
      promptRef: "Day 18 · Voice comparison audio",
      status: "draft",
      scheduledDate: "2025-11-01"
    },
    // Week 4: Digital Allies Standard
    {
      day: 19,
      week: 4,
      category: "Digital Allies standard",
      topic: "The Rebuild, Not the Patch",
      hook: "We don't bolt Spanish onto English sites. We rebuild.",
      caption: "New architecture. New flows. New content. Same brand, complete bilingual integration.",
      cta: "See the rebuild process",
      promptRef: "Day 19 · Before/after comparison",
      status: "draft",
      scheduledDate: "2025-11-02"
    }, {
      day: 20,
      week: 4,
      category: "Digital Allies standard",
      topic: "Human-Reviewed Standard",
      hook: "Every word reviewed by a human who knows your business.",
      caption: "Machine translation gets 95% there. Anthony gets it the rest of the way.",
      cta: "Understand the review process",
      promptRef: "Day 20 · Review workflow diagram",
      status: "approved",
      scheduledDate: "2025-11-03"
    }, {
      day: 21,
      week: 4,
      category: "Digital Allies standard",
      topic: "Bilingual Forms",
      hook: "Forms should work in both languages. Most don't.",
      caption: "Character support. Field labels. Validation messages. All of it, both languages.",
      cta: "Check your form setup",
      promptRef: "Day 21 · Form checklist",
      status: "scheduled",
      scheduledDate: "2025-11-04"
    }, {
      day: 22,
      week: 4,
      category: "Digital Allies standard",
      topic: "SEO Both Ways",
      hook: "Spanish search and English search are different animals.",
      caption: "Keywords, metadata, schema—all of it bilingual. You rank in both markets.",
      cta: "Request bilingual SEO audit",
      promptRef: "Day 22 · SEO comparison",
      status: "draft",
      scheduledDate: "2025-11-05"
    }, {
      day: 23,
      week: 4,
      category: "Digital Allies standard",
      topic: "Ongoing Support",
      hook: "Launch bilingual isn't the end. It's the start.",
      caption: "Content updates, form monitoring, strategy refinement. DA is here for the long game.",
      cta: "Discuss long-term partnership",
      promptRef: "Day 23 · Support roadmap",
      status: "draft",
      scheduledDate: "2025-11-06"
    }, {
      day: 24,
      week: 4,
      category: "Digital Allies standard",
      topic: "Measurable Results",
      hook: "Bilingual should increase conversions. If it doesn't, something's broken.",
      caption: "We track both languages. New traffic. Better engagement. Actual sales.",
      cta: "See the metrics that matter",
      promptRef: "Day 24 · Results dashboard",
      status: "draft",
      scheduledDate: "2025-11-07"
    }, {
      day: 25,
      week: 4,
      category: "Digital Allies standard",
      topic: "Pricing That Works",
      hook: "Strategy is free. Execution is paid. No surprises.",
      caption: "DA quotes are clear. No scope creep. You know what you're getting.",
      cta: "Request a quote",
      promptRef: "Day 25 · Pricing breakdown",
      status: "scheduled",
      scheduledDate: "2025-11-08"
    }, {
      day: 26,
      week: 4,
      category: "Digital Allies standard",
      topic: "Kingman to Everywhere",
      hook: "We're local. We serve everywhere.",
      caption: "Based in Kingman. Native Spanish. Understanding of both markets.",
      cta: "Let's talk about your market",
      promptRef: "Day 26 · Service map",
      status: "draft",
      scheduledDate: "2025-11-09"
    }, {
      day: 27,
      week: 4,
      category: "Digital Allies standard",
      topic: "First Call Is Free",
      hook: "Call. No obligation. Just talk.",
      caption: "Anthony picks up. (928) 228-5769. He'll ask smart questions. No sales pitch.",
      cta: "Call for a free consultation",
      promptRef: "Day 27 · Phone hero graphic",
      status: "approved",
      scheduledDate: "2025-11-10"
    }, {
      day: 28,
      week: 4,
      category: "Digital Allies standard",
      topic: "No Ghosting",
      hook: "We finish what we start.",
      caption: "The No-Ghosting Guarantee. If we take your project, it gets done. If something changes, we tell you first.",
      cta: "Build with someone who delivers",
      promptRef: "Day 28 · Guarantee graphic",
      status: "draft",
      scheduledDate: "2025-11-11"
    }, {
      day: 29,
      week: 4,
      category: "Digital Allies standard",
      topic: "Case Study: Local Business",
      hook: "See what bilingual did for a Kingman business like yours.",
      caption: "Real results. Real numbers. Real impact on their bottom line.",
      cta: "Read the full case study",
      promptRef: "Day 29 · Case study hero image",
      status: "draft",
      scheduledDate: "2025-11-12"
    }, {
      day: 30,
      week: 4,
      category: "Digital Allies standard",
      topic: "Next Steps",
      hook: "You now know why bilingual matters. What's next?",
      caption: "Audit. Strategy. Build. Launch. Support. Let's walk through where you are and where you're going.",
      cta: "Schedule your free audit",
      promptRef: "Day 30 · Call-to-action hero",
      status: "scheduled",
      scheduledDate: "2025-11-13"
    }];

    // Sample notifications
    this.data.notifications = [{
      id: 1,
      title: "Contact form bug assigned to you",
      message: "Priority: Medium, Due: Oct 15",
      timestamp: "2 hours ago",
      type: "bug"
    }, {
      id: 2,
      title: "New content published",
      message: "Digital Transformation Guide is now live",
      timestamp: "4 hours ago",
      type: "content"
    }, {
      id: 3,
      title: "Project milestone reached",
      message: "Homepage mockup completed",
      timestamp: "1 day ago",
      type: "project"
    }];

    // Set current project to first project
    this.currentProject = this.data.projects[0];
  }
  bindEvents() {
    // Navigation
    document.querySelectorAll('.ws-navitem').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const section = link.dataset.section;
        this.navigateToSection(section);
      });
    });

    // Client Switcher
    const clientBtn = document.getElementById('da-client-btn');
    const clientMenu = document.getElementById('da-client-menu');
    if (clientBtn && clientMenu) {
      clientBtn.addEventListener('click', e => {
        e.stopPropagation();
        clientMenu.style.display = clientMenu.style.display === 'none' ? 'block' : 'none';
      });
      document.addEventListener('click', () => {
        if (clientMenu.style.display === 'block') {
          clientMenu.style.display = 'none';
        }
      });
      clientMenu.addEventListener('click', e => {
        e.stopPropagation();
      });
    }

    // Global search
    document.getElementById('searchBtn').addEventListener('click', () => {
      this.performGlobalSearch();
    });
    document.getElementById('globalSearch').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.performGlobalSearch();
      }
    });

    // Close search modal
    document.getElementById('closeSearchModal').addEventListener('click', () => {
      document.getElementById('searchModal').classList.add('hidden');
    });

    // Quick actions
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const action = e.target.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Content management
    this.bindContentEvents();
    this.bindProjectEvents();
    this.bindResearchEvents();
    this.bindDevelopmentEvents();
    this.bindPagesEvents();
    this.bindSettingsEvents();
  }
  bindPagesEvents() {
    document.getElementById('newPageBtn').addEventListener('click', () => {
      this.showPageForm();
    });
    document.getElementById('newPageForm').addEventListener('submit', e => {
      e.preventDefault();
      this.savePage();
    });
    document.getElementById('cancelPageEdit').addEventListener('click', () => {
      this.hidePageForm();
    });
    document.getElementById('pageSearch').addEventListener('input', () => {
      this.filterPages();
    });
    document.getElementById('pageStatusFilter').addEventListener('change', () => {
      this.filterPages();
    });
  }
  bindSettingsEvents() {
    document.getElementById('settingsForm').addEventListener('submit', e => {
      e.preventDefault();
      this.saveSettings();
    });
    document.getElementById('resetSettings').addEventListener('click', () => {
      if (confirm('Reset all settings to default?')) {
        this.loadDefaultSettings();
      }
    });
  }
  bindContentEvents() {
    // Content tabs
    document.querySelectorAll('.content-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchContentTab(btn.dataset.tab);
      });
    });

    // Content form
    document.getElementById('contentForm').addEventListener('submit', e => {
      e.preventDefault();
      this.saveContent();
    });

    // Content search and filters
    document.getElementById('contentSearch').addEventListener('input', () => {
      this.filterContent();
    });
    document.getElementById('contentTypeFilter').addEventListener('change', () => {
      this.filterContent();
    });
    document.getElementById('contentStatusFilter').addEventListener('change', () => {
      this.filterContent();
    });

    // Clear content form
    document.getElementById('clearContentForm').addEventListener('click', () => {
      document.getElementById('contentForm').reset();
    });

    // New content button
    document.getElementById('newContentBtn').addEventListener('click', () => {
      this.switchContentTab('create');
    });

    // Calendar filters
    if (document.getElementById('weekFilter')) {
      document.getElementById('weekFilter').addEventListener('change', () => {
        this.filterCalendar();
      });
    }
    if (document.getElementById('categoryFilter')) {
      document.getElementById('categoryFilter').addEventListener('change', () => {
        this.filterCalendar();
      });
    }
    if (document.getElementById('statusFilter')) {
      document.getElementById('statusFilter').addEventListener('change', () => {
        this.filterCalendar();
      });
    }
  }
  bindProjectEvents() {
    // Project selector
    document.getElementById('projectSelect').addEventListener('change', e => {
      const projectId = parseInt(e.target.value);
      this.currentProject = this.data.projects.find(p => p.id === projectId);
      this.renderKanbanBoard();
    });

    // New project button
    document.getElementById('newProjectBtn').addEventListener('click', () => {
      this.createNewProject();
    });
  }
  bindResearchEvents() {
    // Note form
    document.getElementById('noteForm').addEventListener('submit', e => {
      e.preventDefault();
      this.saveNote();
    });

    // Notes search
    document.getElementById('notesSearch').addEventListener('input', () => {
      this.filterNotes();
    });

    // New note button
    document.getElementById('newNoteBtn').addEventListener('click', () => {
      this.showNoteEditor();
    });

    // Cancel note edit
    document.getElementById('cancelNoteEdit').addEventListener('click', () => {
      this.hideNoteEditor();
    });

    // Export notes
    document.getElementById('exportNotesBtn').addEventListener('click', () => {
      this.exportNotes();
    });
  }
  bindDevelopmentEvents() {
    // Development tabs
    document.querySelectorAll('.dev-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchDevTab(btn.dataset.tab);
      });
    });

    // Development form
    document.getElementById('devForm').addEventListener('submit', e => {
      e.preventDefault();
      this.saveDevTask();
    });

    // Development filters
    document.getElementById('devStatusFilter').addEventListener('change', () => {
      this.filterDevTasks();
    });
    document.getElementById('devPriorityFilter').addEventListener('change', () => {
      this.filterDevTasks();
    });

    // New development task button
    document.getElementById('newDevTaskBtn').addEventListener('click', () => {
      this.showDevTaskForm();
    });

    // Cancel dev task
    document.getElementById('cancelDevTask').addEventListener('click', () => {
      this.hideDevTaskForm();
    });
  }
  navigateToSection(section) {
    // Update navigation
    document.querySelectorAll('.ws-navitem').forEach(link => {
      link.classList.remove('is-active');
    });
    const activeLink = document.querySelector(`[data-section="${section}"]`);
    if (activeLink) activeLink.classList.add('is-active');

    // Update sections
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`).classList.add('active');

    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb');
    const sectionNames = {
      dashboard: 'Dashboard',
      content: 'Content Management',
      projects: 'Project Organization',
      research: 'Research & Documentation',
      development: 'Website Development'
    };
    breadcrumb.textContent = sectionNames[section] || section;
    this.currentSection = section;
  }
  updateDashboardStats() {
    document.getElementById('totalProjects').textContent = this.data.projects.length;
    document.getElementById('totalContent').textContent = this.data.content.length;
    document.getElementById('totalNotes').textContent = this.data.notes.length;
    document.getElementById('totalTasks').textContent = this.data.development.length;
  }
  performGlobalSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    if (!query) return;
    const results = [];

    // Search content
    this.data.content.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query) || item.tags.some(tag => tag.toLowerCase().includes(query))) {
        results.push({
          type: 'Content',
          title: item.title,
          excerpt: item.content.substring(0, 100) + '...',
          section: 'content'
        });
      }
    });

    // Search notes
    this.data.notes.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query) || item.tags.some(tag => tag.toLowerCase().includes(query))) {
        results.push({
          type: 'Note',
          title: item.title,
          excerpt: item.content.substring(0, 100) + '...',
          section: 'research'
        });
      }
    });

    // Search projects and tasks
    this.data.projects.forEach(project => {
      if (project.name.toLowerCase().includes(query)) {
        results.push({
          type: 'Project',
          title: project.name,
          excerpt: project.description,
          section: 'projects'
        });
      }
      project.tasks.forEach(task => {
        if (task.title.toLowerCase().includes(query)) {
          results.push({
            type: 'Task',
            title: task.title,
            excerpt: `Project: ${project.name}`,
            section: 'projects'
          });
        }
      });
    });

    // Search development tasks
    this.data.development.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
        results.push({
          type: 'Dev Task',
          title: item.title,
          excerpt: item.description,
          section: 'development'
        });
      }
    });
    this.displaySearchResults(results);
  }
  displaySearchResults(results) {
    const modal = document.getElementById('searchModal');
    const resultsContainer = document.getElementById('searchResults');
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
      resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="app.navigateToSection('${result.section}')">
                    <h4 class="search-result-title">
                        <span class="search-result-type">${result.type}</span>
                        ${result.title}
                    </h4>
                    <p class="search-result-excerpt">${result.excerpt}</p>
                </div>
            `).join('');
    }
    modal.classList.remove('hidden');
  }
  handleQuickAction(action) {
    switch (action) {
      case 'new-content':
        this.navigateToSection('content');
        this.switchContentTab('create');
        break;
      case 'new-project':
        this.navigateToSection('projects');
        this.createNewProject();
        break;
      case 'new-note':
        this.navigateToSection('research');
        this.showNoteEditor();
        break;
      case 'new-task':
        this.navigateToSection('development');
        this.showDevTaskForm();
        break;
    }
  }

  // Content Management
  switchContentTab(tab) {
    document.querySelectorAll('.content-tabs .tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tab}-tab`).classList.add('active');
    if (tab === 'calendar') {
      this.renderContentCalendar();
    }
  }
  renderContent() {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = this.data.content.map(item => `
            <div class="content-item">
                <div class="content-item__header">
                    <h3 class="content-item__title">${item.title}</h3>
                    <span class="status status--${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>
                </div>
                <div class="content-item__meta">
                    <span class="content-item__type">${item.type}</span>
                    <small>${item.createdDate}</small>
                </div>
                <p class="content-item__excerpt">${item.content.substring(0, 100)}...</p>
                <div class="content-item__tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="content-item__actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editContent(${item.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteContent(${item.id})">Delete</button>
                </div>
            </div>
        `).join('');
  }
  renderPages() {
    this.filterPages();
  }
  filterPages() {
    const search = document.getElementById('pageSearch').value.toLowerCase();
    const statusFilter = document.getElementById('pageStatusFilter').value;
    let filtered = this.data.pages;
    if (search) {
      filtered = filtered.filter(page => page.title.toLowerCase().includes(search) || page.slug.toLowerCase().includes(search) || page.content.toLowerCase().includes(search));
    }
    if (statusFilter) {
      filtered = filtered.filter(page => page.status === statusFilter);
    }
    const grid = document.getElementById('pagesGrid');
    grid.innerHTML = filtered.map(page => `
            <div class="content-item">
                <div class="content-item__header">
                    <h3 class="content-item__title">${page.title}</h3>
                    <span class="status status--${page.status.toLowerCase().replace(' ', '-')}">${page.status}</span>
                </div>
                <div class="content-item__meta">
                    <small>/${page.slug}</small>
                    <small>${page.createdDate}</small>
                </div>
                <p class="content-item__excerpt">${page.metaDesc}</p>
                <div class="content-item__actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editPage(${page.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deletePage(${page.id})">Delete</button>
                </div>
            </div>
        `).join('');
  }
  showPageForm() {
    document.getElementById('pageForm').classList.remove('hidden');
    document.getElementById('newPageForm').reset();
  }
  hidePageForm() {
    document.getElementById('pageForm').classList.add('hidden');
  }
  savePage() {
    const title = document.getElementById('pageTitle').value;
    const slug = document.getElementById('pageSlug').value;
    const metaDesc = document.getElementById('pageMetaDesc').value;
    const content = document.getElementById('pageContent').value;
    const status = document.getElementById('pageStatus').value;
    const newPage = {
      id: Date.now(),
      title,
      slug,
      metaDesc,
      content,
      status,
      createdDate: new Date().toISOString().split('T')[0]
    };
    this.data.pages.push(newPage);
    this.renderPages();
    this.hidePageForm();
    this.updateDashboardStats();
  }
  editPage(id) {
    const page = this.data.pages.find(p => p.id === id);
    if (!page) return;
    document.getElementById('pageTitle').value = page.title;
    document.getElementById('pageSlug').value = page.slug;
    document.getElementById('pageMetaDesc').value = page.metaDesc;
    document.getElementById('pageContent').value = page.content;
    document.getElementById('pageStatus').value = page.status;
    this.showPageForm();
  }
  deletePage(id) {
    if (confirm('Are you sure you want to delete this page?')) {
      this.data.pages = this.data.pages.filter(p => p.id !== id);
      this.renderPages();
      this.updateDashboardStats();
    }
  }
  filterContent() {
    const search = document.getElementById('contentSearch').value.toLowerCase();
    const typeFilter = document.getElementById('contentTypeFilter').value;
    const statusFilter = document.getElementById('contentStatusFilter').value;
    let filtered = this.data.content;
    if (search) {
      filtered = filtered.filter(item => item.title.toLowerCase().includes(search) || item.content.toLowerCase().includes(search) || item.tags.some(tag => tag.toLowerCase().includes(search)));
    }
    if (typeFilter) {
      filtered = filtered.filter(item => item.type === typeFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = filtered.map(item => `
            <div class="content-item">
                <div class="content-item__header">
                    <h3 class="content-item__title">${item.title}</h3>
                    <span class="status status--${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>
                </div>
                <div class="content-item__meta">
                    <span class="content-item__type">${item.type}</span>
                    <small>${item.createdDate}</small>
                </div>
                <p class="content-item__excerpt">${item.content.substring(0, 100)}...</p>
                <div class="content-item__tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="content-item__actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editContent(${item.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteContent(${item.id})">Delete</button>
                </div>
            </div>
        `).join('');
  }
  saveContent() {
    const title = document.getElementById('contentTitle').value;
    const type = document.getElementById('contentType').value;
    const status = document.getElementById('contentStatus').value;
    const tags = document.getElementById('contentTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const content = document.getElementById('contentBody').value;
    const newContent = {
      id: Date.now(),
      title,
      type,
      status,
      tags,
      content,
      createdDate: new Date().toISOString().split('T')[0]
    };
    this.data.content.push(newContent);
    this.renderContent();
    this.updateDashboardStats();
    document.getElementById('contentForm').reset();
    this.switchContentTab('library');
  }
  editContent(id) {
    const content = this.data.content.find(c => c.id === id);
    if (!content) return;
    document.getElementById('contentTitle').value = content.title;
    document.getElementById('contentType').value = content.type;
    document.getElementById('contentStatus').value = content.status;
    document.getElementById('contentTags').value = content.tags.join(', ');
    document.getElementById('contentBody').value = content.content;
    this.switchContentTab('create');
  }
  deleteContent(id) {
    if (confirm('Are you sure you want to delete this content?')) {
      this.data.content = this.data.content.filter(c => c.id !== id);
      this.renderContent();
      this.updateDashboardStats();
    }
  }

  // Content Calendar
  renderContentCalendar() {
    this.filterCalendar();
  }
  filterCalendar() {
    const weekFilter = document.getElementById('weekFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    let filtered = this.data.contentCalendar;
    if (weekFilter) {
      filtered = filtered.filter(item => item.week === parseInt(weekFilter));
    }
    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = filtered.map((item, index) => `
            <div class="calendar-item">
                <div class="calendar-item__day">Day ${item.day} · Week ${item.week}</div>
                <div class="calendar-item__header">
                    <h3 class="calendar-item__topic">${item.topic}</h3>
                    <span class="calendar-item__category">${item.category}</span>
                </div>
                <div class="calendar-item__hook">"${item.hook}"</div>
                <p class="calendar-item__caption">${item.caption}</p>
                <div class="calendar-item__cta">CTA: ${item.cta}</div>
                <div class="calendar-item__prompt">📸 ${item.promptRef}</div>
                <span class="calendar-item__status">${item.status}</span>
                <div style="margin-top: 12px; font-size: 11px; color: var(--fg-soft);">Scheduled: ${item.scheduledDate}</div>
                <div style="margin-top: 16px; display: flex; gap: 8px;">
                    <button class="btn btn--sm btn--secondary" onclick="app.editCalendarItem(${item.day})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteCalendarItem(${item.day})">Delete</button>
                </div>
            </div>
        `).join('');
  }
  editCalendarItem(day) {
    const item = this.data.contentCalendar.find(c => c.day === day);
    if (!item) return;
    const newTopic = prompt('Topic:', item.topic);
    if (newTopic === null) return;
    const newHook = prompt('Hook (the eye-catching quote):', item.hook);
    if (newHook === null) return;
    const newCaption = prompt('Caption (explanation):', item.caption);
    if (newCaption === null) return;
    const newCta = prompt('CTA (call-to-action):', item.cta);
    if (newCta === null) return;
    const newPrompt = prompt('Asset prompt reference:', item.promptRef);
    if (newPrompt === null) return;
    const newStatus = prompt('Status (draft/approved/scheduled/posted):', item.status);
    if (newStatus === null) return;
    const newDate = prompt('Scheduled date (YYYY-MM-DD):', item.scheduledDate);
    if (newDate === null) return;
    item.topic = newTopic;
    item.hook = newHook;
    item.caption = newCaption;
    item.cta = newCta;
    item.promptRef = newPrompt;
    item.status = newStatus;
    item.scheduledDate = newDate;
    this.filterCalendar();
  }
  deleteCalendarItem(day) {
    if (confirm(`Delete Day ${day}?`)) {
      this.data.contentCalendar = this.data.contentCalendar.filter(c => c.day !== day);
      this.filterCalendar();
    }
  }
  applyTemplate(type) {
    this.switchContentTab('create');
    const templates = {
      blog: {
        title: '[Your Blog Post Title Here]',
        content: `Hook: Start with a compelling question or statement that makes readers want to continue.

Main Point 1
Explain the first key idea with examples and context.

Main Point 2
Develop the second important concept with supporting details.

Main Point 3
Present the third key takeaway with practical application.

Conclusion
Summarize the main points and include a clear call-to-action (CTA).`
      },
      press: {
        title: '[Company Announces Important News]',
        content: `[CITY, DATE] — Digital Allies today announced [what happened]. [One sentence explaining why this matters].

[2-3 sentences with the most important details. Answer: who, what, when, where, why.]

"[Add a relevant quote here]" — [Name, Title]

[Additional supporting details, facts, or context]

About Digital Allies
Digital Allies exists to close the technology gap for small businesses, nonprofits, and everyday people who deserve professional-grade tools without the professional-grade confusion.`
      },
      case: {
        title: '[Client Name] Increases [Metric] by X%',
        content: `The Challenge
[Describe the client's problem or goal in detail.]

The Solution
[Explain what Digital Allies did to address the challenge.]

The Results
[Share specific metrics, outcomes, and impact. Use numbers when possible.]

Client Testimonial
"[Add a direct quote from the client about their experience and results]" — [Client Name, Title]

What This Means
[Explain how this case study applies to similar businesses and next steps.]`
      }
    };
    const template = templates[type];
    if (template) {
      document.getElementById('contentTitle').value = template.title;
      document.getElementById('contentBody').value = template.content;

      // Set type based on template
      const typeMap = {
        blog: 'Blog Post',
        press: 'Press Release',
        case: 'Case Study'
      };
      document.getElementById('contentType').value = typeMap[type];
    }
  }

  // Project Management
  renderProjects() {
    const select = document.getElementById('projectSelect');
    select.innerHTML = this.data.projects.map(project => `<option value="${project.id}" ${this.currentProject?.id === project.id ? 'selected' : ''}>${project.name}</option>`).join('');
    this.renderKanbanBoard();
  }
  renderKanbanBoard() {
    if (!this.currentProject) return;
    const board = document.getElementById('kanbanBoard');
    board.innerHTML = this.currentProject.columns.map(column => {
      const tasks = this.currentProject.tasks.filter(task => task.column === column);
      return `
                <div class="kanban-column" data-column="${column}">
                    <div class="kanban-column__header">
                        <h3 class="kanban-column__title">${column}</h3>
                        <span class="kanban-column__count">${tasks.length}</span>
                    </div>
                    <div class="kanban-column__tasks" ondrop="app.handleDrop(event)" ondragover="app.handleDragOver(event)">
                        ${tasks.map(task => `
                            <div class="task-card" draggable="true" ondragstart="app.handleDragStart(event)" data-task-id="${task.id}">
                                <h4 class="task-card__title">${task.title}</h4>
                                <div class="task-card__meta">
                                    <span class="task-card__due">${task.dueDate}</span>
                                    <span class="task-card__priority task-card__priority--${task.priority.toLowerCase()}">${task.priority}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
    }).join('');
  }
  createNewProject() {
    const name = prompt('Enter project name:');
    if (!name) return;
    const description = prompt('Enter project description:');
    const newProject = {
      id: Date.now(),
      name,
      description: description || '',
      columns: ['To Do', 'In Progress', 'Review', 'Done'],
      tasks: []
    };
    this.data.projects.push(newProject);
    this.currentProject = newProject;
    this.renderProjects();
    this.updateDashboardStats();
  }
  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
  }
  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
  handleDrop(event) {
    event.preventDefault();
    const taskId = parseInt(event.dataTransfer.getData('text/plain'));
    const targetColumn = event.currentTarget.closest('.kanban-column');
    if (!targetColumn) return;
    const newColumn = targetColumn.dataset.column;
    const task = this.currentProject.tasks.find(t => t.id === taskId);
    if (task && task.column !== newColumn) {
      task.column = newColumn;
      this.renderKanbanBoard();
    }
    document.querySelectorAll('.task-card.dragging').forEach(card => {
      card.classList.remove('dragging');
    });
  }

  // Research & Notes
  renderNotes() {
    this.renderNotebooks();
    this.renderNotesGrid();
  }
  renderNotebooks() {
    const notebooks = [...new Set(this.data.notes.map(note => note.notebook))];
    const list = document.getElementById('notebookList');
    list.innerHTML = notebooks.map(notebook => `<div class="notebook-item" onclick="app.filterByNotebook('${notebook}')">${notebook}</div>`).join('');
  }
  renderNotesGrid() {
    const grid = document.getElementById('notesGrid');
    grid.innerHTML = this.data.notes.map(note => `
            <div class="note-item" onclick="app.editNote(${note.id})">
                <h3 class="note-item__title">${note.title}</h3>
                <div class="note-item__meta">
                    <span class="note-item__notebook">${note.notebook}</span>
                    <span class="note-item__date">${note.createdDate}</span>
                </div>
                <p class="note-item__preview">${note.content.substring(0, 150)}...</p>
                <div class="note-item__tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
  }
  filterByNotebook(notebook) {
    const filtered = this.data.notes.filter(note => note.notebook === notebook);
    const grid = document.getElementById('notesGrid');
    grid.innerHTML = filtered.map(note => `
            <div class="note-item" onclick="app.editNote(${note.id})">
                <h3 class="note-item__title">${note.title}</h3>
                <div class="note-item__meta">
                    <span class="note-item__notebook">${note.notebook}</span>
                    <span class="note-item__date">${note.createdDate}</span>
                </div>
                <p class="note-item__preview">${note.content.substring(0, 150)}...</p>
                <div class="note-item__tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
  }
  filterNotes() {
    const search = document.getElementById('notesSearch').value.toLowerCase();
    let filtered = this.data.notes;
    if (search) {
      filtered = filtered.filter(note => note.title.toLowerCase().includes(search) || note.content.toLowerCase().includes(search) || note.tags.some(tag => tag.toLowerCase().includes(search)));
    }
    const grid = document.getElementById('notesGrid');
    grid.innerHTML = filtered.map(note => `
            <div class="note-item" onclick="app.editNote(${note.id})">
                <h3 class="note-item__title">${note.title}</h3>
                <div class="note-item__meta">
                    <span class="note-item__notebook">${note.notebook}</span>
                    <span class="note-item__date">${note.createdDate}</span>
                </div>
                <p class="note-item__preview">${note.content.substring(0, 150)}...</p>
                <div class="note-item__tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
  }
  showNoteEditor() {
    document.getElementById('noteEditor').classList.remove('hidden');
    document.getElementById('noteForm').reset();
    this.editingNote = null;
  }
  hideNoteEditor() {
    document.getElementById('noteEditor').classList.add('hidden');
    this.editingNote = null;
  }
  editNote(id) {
    const note = this.data.notes.find(n => n.id === id);
    if (!note) return;
    this.editingNote = note;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteNotebook').value = note.notebook;
    document.getElementById('noteTags').value = note.tags.join(', ');
    document.getElementById('noteContent').value = note.content;
    this.showNoteEditor();
  }
  saveNote() {
    const title = document.getElementById('noteTitle').value;
    const notebook = document.getElementById('noteNotebook').value;
    const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const content = document.getElementById('noteContent').value;
    if (this.editingNote) {
      this.editingNote.title = title;
      this.editingNote.notebook = notebook;
      this.editingNote.tags = tags;
      this.editingNote.content = content;
    } else {
      const newNote = {
        id: Date.now(),
        title,
        notebook,
        tags,
        content,
        createdDate: new Date().toISOString().split('T')[0]
      };
      this.data.notes.push(newNote);
    }
    this.renderNotes();
    this.hideNoteEditor();
    this.updateDashboardStats();
  }
  exportNotes() {
    const data = JSON.stringify(this.data.notes, null, 2);
    const blob = new Blob([data], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Development Tracking
  switchDevTab(tab) {
    document.querySelectorAll('.dev-tabs .tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  }
  renderDevelopment() {
    this.renderDevTasks();
  }
  renderDevTasks() {
    const grid = document.getElementById('devTasksGrid');
    grid.innerHTML = this.data.development.map(task => `
            <div class="dev-task-item">
                <div class="dev-task-item__header">
                    <h3 class="dev-task-item__title">${task.title}</h3>
                    <span class="status status--${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
                </div>
                <div class="dev-task-item__meta">
                    <span class="dev-task-item__type dev-task-item__type--${task.type.toLowerCase()}">${task.type}</span>
                    <span class="task-card__priority task-card__priority--${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <p class="dev-task-item__description">${task.description}</p>
                <div class="dev-task-item__footer">
                    <span class="dev-task-item__due">Due: ${task.dueDate}</span>
                    <div>
                        <button class="btn btn--sm btn--secondary" onclick="app.editDevTask(${task.id})">Edit</button>
                        <button class="btn btn--sm btn--outline" onclick="app.deleteDevTask(${task.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
  }
  filterDevTasks() {
    const statusFilter = document.getElementById('devStatusFilter').value;
    const priorityFilter = document.getElementById('devPriorityFilter').value;
    let filtered = this.data.development;
    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    const grid = document.getElementById('devTasksGrid');
    grid.innerHTML = filtered.map(task => `
            <div class="dev-task-item">
                <div class="dev-task-item__header">
                    <h3 class="dev-task-item__title">${task.title}</h3>
                    <span class="status status--${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
                </div>
                <div class="dev-task-item__meta">
                    <span class="dev-task-item__type dev-task-item__type--${task.type.toLowerCase()}">${task.type}</span>
                    <span class="task-card__priority task-card__priority--${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <p class="dev-task-item__description">${task.description}</p>
                <div class="dev-task-item__footer">
                    <span class="dev-task-item__due">Due: ${task.dueDate}</span>
                    <div>
                        <button class="btn btn--sm btn--secondary" onclick="app.editDevTask(${task.id})">Edit</button>
                        <button class="btn btn--sm btn--outline" onclick="app.deleteDevTask(${task.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
  }
  showDevTaskForm() {
    document.getElementById('devTaskForm').classList.remove('hidden');
    document.getElementById('devForm').reset();
    this.editingDevTask = null;
  }
  hideDevTaskForm() {
    document.getElementById('devTaskForm').classList.add('hidden');
    this.editingDevTask = null;
  }
  editDevTask(id) {
    const task = this.data.development.find(t => t.id === id);
    if (!task) return;
    this.editingDevTask = task;
    document.getElementById('devTaskTitle').value = task.title;
    document.getElementById('devTaskType').value = task.type;
    document.getElementById('devTaskStatus').value = task.status;
    document.getElementById('devTaskPriority').value = task.priority;
    document.getElementById('devTaskDueDate').value = task.dueDate;
    document.getElementById('devTaskDescription').value = task.description;
    this.showDevTaskForm();
  }
  saveDevTask() {
    const title = document.getElementById('devTaskTitle').value;
    const type = document.getElementById('devTaskType').value;
    const status = document.getElementById('devTaskStatus').value;
    const priority = document.getElementById('devTaskPriority').value;
    const dueDate = document.getElementById('devTaskDueDate').value;
    const description = document.getElementById('devTaskDescription').value;
    if (this.editingDevTask) {
      this.editingDevTask.title = title;
      this.editingDevTask.type = type;
      this.editingDevTask.status = status;
      this.editingDevTask.priority = priority;
      this.editingDevTask.dueDate = dueDate;
      this.editingDevTask.description = description;
    } else {
      const newTask = {
        id: Date.now(),
        title,
        type,
        status,
        priority,
        dueDate,
        description
      };
      this.data.development.push(newTask);
    }
    this.renderDevTasks();
    this.hideDevTaskForm();
    this.updateDashboardStats();
  }
  deleteDevTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.data.development = this.data.development.filter(t => t.id !== id);
      this.renderDevTasks();
      this.updateDashboardStats();
    }
  }

  // Settings Management
  loadDefaultSettings() {
    this.data.settings = {
      siteName: 'Digital Allies',
      siteTagline: 'Close the technology gap',
      contactEmail: 'contact@digitalallies.net',
      primaryColor: '#3A7BD5',
      signalColor: '#C5301A',
      accentColor: '#FADEEB',
      twitterUrl: 'https://twitter.com/DigitalAlliesAZ',
      linkedinUrl: 'https://linkedin.com/company/digital-allies',
      instagramUrl: 'https://instagram.com/digitalalliesaz',
      githubUrl: 'https://github.com/Digital-Allies'
    };
    this.displaySettings();
  }
  displaySettings() {
    document.getElementById('siteName').value = this.data.settings.siteName;
    document.getElementById('siteTagline').value = this.data.settings.siteTagline;
    document.getElementById('contactEmail').value = this.data.settings.contactEmail;
    document.getElementById('primaryColor').value = this.data.settings.primaryColor;
    document.getElementById('signalColor').value = this.data.settings.signalColor;
    document.getElementById('accentColor').value = this.data.settings.accentColor;
    document.getElementById('twitterUrl').value = this.data.settings.twitterUrl;
    document.getElementById('linkedinUrl').value = this.data.settings.linkedinUrl;
    document.getElementById('instagramUrl').value = this.data.settings.instagramUrl;
    document.getElementById('githubUrl').value = this.data.settings.githubUrl;
  }
  saveSettings() {
    this.data.settings = {
      siteName: document.getElementById('siteName').value,
      siteTagline: document.getElementById('siteTagline').value,
      contactEmail: document.getElementById('contactEmail').value,
      primaryColor: document.getElementById('primaryColor').value,
      signalColor: document.getElementById('signalColor').value,
      accentColor: document.getElementById('accentColor').value,
      twitterUrl: document.getElementById('twitterUrl').value,
      linkedinUrl: document.getElementById('linkedinUrl').value,
      instagramUrl: document.getElementById('instagramUrl').value,
      githubUrl: document.getElementById('githubUrl').value
    };
    alert('Settings saved successfully!');
  }
}

// Initialize the application
const app = new BusinessDashboard();
})(); } catch (e) { __ds_ns.__errors.push({ path: "cms/app.js", error: String((e && e.message) || e) }); }

// social/AEO.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 2 — AEO vs SEO
// ============================================================

const AEO_TAG = "AEO vs SEO";
const AEO_TOTAL = 9;
function A1() {
  // Title slide — big VS
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 24
    }
  }, "For Kingman businesses \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 170,
    style: {
      lineHeight: 0.95
    }
  }, "SEO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: "0.2em",
      color: VARS.red,
      textTransform: "uppercase"
    }
  }, "vs")), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 170,
    style: {
      lineHeight: 0.95,
      color: VARS.blue
    }
  }, "AEO")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 48,
      maxWidth: 880,
      opacity: 0.78
    }
  }, "The difference matters for your business. Here's what changes when AI answers the question instead of a search bar.")));
}
function A2() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 150,
    style: {
      color: VARS.char
    }
  }, "SEO"), /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginTop: 24
    }
  }, "Search Engine Optimization"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      padding: "40px 48px",
      background: VARS.bone,
      border: `1px solid ${VARS.char}`,
      borderLeft: `6px solid ${VARS.char}`,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 52,
    style: {
      color: VARS.char,
      lineHeight: 1.15
    }
  }, "Gets you ranked in Google search results.")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 50,
      color: "rgba(45,45,45,0.65)",
      maxWidth: 800
    }
  }, "The job is the same as it's been for 20 years: be the link someone clicks first.")));
}
function A3() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 150,
    style: {
      color: VARS.blue
    }
  }, "AEO"), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginTop: 24
    }
  }, "Answer Engine Optimization"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      padding: "40px 48px",
      background: "rgba(58,123,213,0.08)",
      border: `1.5px solid ${VARS.blue}`,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 52,
    style: {
      color: VARS.bone,
      lineHeight: 1.15
    }
  }, "Gets you featured when AI assistants answer questions.")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 50,
      opacity: 0.7,
      maxWidth: 800
    }
  }, "The new job: be the answer ChatGPT, Siri, or Gemini gives \u2014 before anyone clicks a link at all.")));
}
function A4() {
  // The Siri/AI answer example — search-result-styled card, branded
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The new search"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 60,
    style: {
      marginTop: 18,
      color: VARS.char,
      maxWidth: 940
    }
  }, "When someone asks the question, your business should be the answer."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      alignItems: "center",
      gap: 16,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: VARS.red,
      border: `1px solid ${VARS.red}`,
      padding: "4px 10px"
    }
  }, "Asked"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontStyle: "italic",
      fontSize: 30,
      color: VARS.char,
      fontWeight: 500
    }
  }, "\"Best Mexican restaurant near me?\"")), /*#__PURE__*/React.createElement(SerpCard, null)));
}
function SerpCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      background: VARS.bone,
      border: `1.5px solid ${VARS.char}`,
      maxWidth: 880,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 22px",
      borderBottom: `1px solid ${VARS.char}`,
      background: VARS.pinned
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: VARS.blue,
      border: `1.5px solid ${VARS.char}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: VARS.blue
    }
  }, "AI Overview \xB7 Top Answer"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 13,
      opacity: 0.55,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "via AEO")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 28px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      color: "rgba(45,45,45,0.65)",
      letterSpacing: "0.02em",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1px solid ${VARS.char}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: VARS.red
    }
  }, "EP"), /*#__PURE__*/React.createElement("span", null, "elpalaciokingman.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", null, "menu")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 52,
      lineHeight: 1.05,
      color: VARS.blue,
      marginTop: 10,
      letterSpacing: "-0.015em"
    }
  }, "El Palacio \u2014 Authentic Mexican in Kingman"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 22,
      lineHeight: 1.45,
      color: VARS.char,
      marginTop: 14,
      maxWidth: 760
    }
  }, "Family-owned restaurant serving Sonoran-style Mexican on Stockton Hill Rd. Highly rated for street tacos, carne asada, and Saturday-night live music. Open until 9 PM tonight."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      marginTop: 20,
      paddingTop: 16,
      borderTop: `1px dashed ${VARS.char}`,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      color: VARS.char
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red,
      fontSize: 18
    }
  }, "\u2605"), /*#__PURE__*/React.createElement("b", null, "4.8"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.55
    }
  }, "(312 reviews)")), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: VARS.red
    }
  }, "Open"), " until 9 PM"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Mexican \xB7 $$"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Stockton Hill Rd"))));
}
function TipSlide({
  idx,
  no,
  label,
  title,
  body,
  theme = "dark"
}) {
  const isDark = theme === "dark";
  return /*#__PURE__*/React.createElement(Slide, {
    theme: theme,
    idx: idx,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: isDark ? "blue" : "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 200,
      lineHeight: 0.85,
      color: isDark ? VARS.blue : VARS.red,
      letterSpacing: "-0.025em",
      flexShrink: 0
    }
  }, no), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 30
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: isDark ? VARS.bone : VARS.char,
    style: {
      opacity: 0.7
    }
  }, "Tip ", no, " of 04"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: isDark ? VARS.blue : VARS.red,
      marginTop: 20
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 66,
    style: {
      lineHeight: 1.05
    }
  }, title)), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 36,
      maxWidth: 880,
      opacity: isDark ? 0.85 : 1,
      color: isDark ? "rgba(249,246,240,0.85)" : "rgba(45,45,45,0.75)"
    }
  }, body)));
}
function A5() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 5,
    no: "01",
    theme: "dark",
    label: "Structured Data",
    title: "Add schema markup to your site.",
    body: "Schema tells search engines and AI exactly what your business offers \u2014 your hours, your location, your menu, your prices. It's the difference between being read and being understood."
  });
}
function A6() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 6,
    no: "02",
    theme: "light",
    label: "Clear Answer Formatting",
    title: "Structure your content to answer questions directly.",
    body: "Not buried in paragraphs. Not vague. Direct answers an AI can parse and serve. If a sentence doesn't answer something a customer would ask, it doesn't belong on the page."
  });
}
function A7() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 7,
    no: "03",
    theme: "dark",
    label: "Local Business Verification",
    title: "Make your name, address, and hours match everywhere.",
    body: "Google Business Profile. Apple Maps. Yelp. The local directories you signed up for in 2019 and forgot about. Consistent info across platforms is what builds AI confidence in your data."
  });
}
function A8() {
  return /*#__PURE__*/React.createElement(TipSlide, {
    idx: 8,
    no: "04",
    theme: "light",
    label: "Real Case Studies",
    title: "Post the real results you've delivered.",
    body: "Sharing real outcomes from real clients is the strongest signal you can send \u2014 to customers, search engines, and AI. Vague testimonials don't cut it anymore. Specifics do."
  });
}
function A9() {
  // CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: AEO_TOTAL,
    total: AEO_TOTAL,
    hashtag: AEO_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 32
    }
  }, "The Reciprocity Loop"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 94
  }, "Want to know if your site is ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "AEO-ready?")), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 36,
      opacity: 0.85,
      maxWidth: 840
    }
  }, "Find out where you stand with a free discovery meeting. Strategy is free. Execution is paid. Always quoted before any work starts."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 70,
      padding: "32px 40px",
      border: `1.5px solid ${VARS.red}`,
      background: "rgba(197,48,26,0.08)",
      display: "inline-flex",
      alignItems: "center",
      gap: 30,
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      background: VARS.red,
      borderRadius: "50%",
      border: `1px solid ${VARS.bone}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 36
    }
  }, "[ Book a Free Discovery \u2192 ]")), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 40,
      opacity: 0.6,
      fontFamily: "var(--font-details)"
    }
  }, "digitalallies.net \xB7 (928) 228-5769 \xB7 contact@digitalallies.net")));
}
const AEO_SLIDES = [A1, A2, A3, A4, A5, A6, A7, A8, A9];
Object.assign(window, {
  AEO_SLIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/AEO.jsx", error: String((e && e.message) || e) }); }

// social/Atoms.jsx
try { (() => {
/* global React */

// ============================================================
// Shared atoms for social slides
// ============================================================

const VARS = {
  bone: "#F9F6F0",
  char: "#2D2D2D",
  blue: "#3A7BD5",
  pink: "#FADEEB",
  red: "#C5301A",
  pinned: "#FCFAED"
};
function PulseDot({
  size = 28,
  color = VARS.blue,
  borderColor
}) {
  const bc = borderColor || (color === VARS.blue ? "currentColor" : VARS.bone);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: size * 0.85,
      height: size * 0.85,
      background: color,
      borderRadius: "50%",
      opacity: 0.22,
      animation: "da-fab-ring 2.2s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size * 0.55,
      height: size * 0.55,
      background: color,
      borderRadius: "50%",
      border: `1.5px solid ${bc}`,
      animation: "da-brand-pulse 3s ease-in-out infinite"
    }
  }));
}

// Slide chrome — top brand lockup + bottom counter + outer 1080x1080 frame.
// Theme: "dark" (charcoal) or "light" (bone). Pass `noChrome` to suppress.
function Slide({
  theme = "dark",
  children,
  idx,
  total,
  hashtag,
  noChrome = false,
  padding = 56,
  accent = "blue"
}) {
  const isDark = theme === "dark";
  const fg = isDark ? VARS.bone : VARS.char;
  const bg = isDark ? VARS.char : VARS.bone;
  const subtle = isDark ? "rgba(249,246,240,0.10)" : "rgba(45,45,45,0.10)";
  const grid = isDark ? "rgba(249,246,240,0.05)" : "rgba(45,45,45,0.06)";
  const accentColor = accent === "red" ? VARS.red : VARS.blue;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1080,
      background: bg,
      color: fg,
      position: "relative",
      overflow: "hidden",
      backgroundImage: `
        linear-gradient(${grid} 0.5px, transparent 0.5px),
        linear-gradient(90deg, ${grid} 0.5px, transparent 0.5px)
      `,
      backgroundSize: "30px 30px",
      fontFamily: "var(--font-body)"
    }
  }, !noChrome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: padding,
      left: padding,
      right: padding,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(PulseDot, {
    size: 28,
    color: accentColor,
    borderColor: fg
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "0.01em"
    }
  }, "Digital Allies")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: fg,
      opacity: 0.7
    }
  }, hashtag)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: noChrome ? 0 : padding + 52,
      left: noChrome ? 0 : padding,
      right: noChrome ? 0 : padding,
      bottom: noChrome ? 0 : padding + 44
    }
  }, children), !noChrome && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: padding,
      left: padding,
      right: padding,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.05em",
      color: fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      border: `1.5px solid ${accentColor}`,
      color: accentColor,
      padding: "4px 14px",
      letterSpacing: "0.15em",
      fontSize: 15
    }
  }, String(idx).padStart(2, "0"), " / ", String(total).padStart(2, "0"))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 24,
      border: `1px solid ${subtle}`,
      pointerEvents: "none"
    }
  }));
}
function Eyebrow({
  children,
  color,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: color || VARS.red,
      ...style
    }
  }, children);
}
function BigDisplay({
  children,
  size = 110,
  color = "inherit",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: "-0.018em",
      margin: 0,
      textWrap: "balance",
      color,
      ...style
    }
  }, children);
}
function Body({
  children,
  size = 30,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: size,
      lineHeight: 1.45,
      margin: 0,
      textWrap: "pretty",
      ...style
    }
  }, children);
}
Object.assign(window, {
  Slide,
  PulseDot,
  Eyebrow,
  BigDisplay,
  Body,
  VARS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/Atoms.jsx", error: String((e && e.message) || e) }); }

// social/Kingman.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 1 — One Year Of Real Kingman Web Traffic
// Source: GA4, May 22 2025 – May 21 2026 · single local client (anonymized)
// 17K active users · 12 months
// ============================================================

const KINGMAN_HASHTAG = "Real Kingman Data";
const SOURCE_LINE = "GA4 · 17K users · May ’25 → May ’26 · local Kingman client";
function K1() {
  // Hook
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "One Year Of Real Data \xB7 01"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 102
  }, "I just spent 12 months watching"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 102,
    style: {
      color: VARS.blue,
      marginTop: 6
    }
  }, "one Kingman website."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 44,
      maxWidth: 820,
      opacity: 0.82
    }
  }, "One local client. Twelve months of Google Analytics. No guesses, no industry averages \u2014 just what actually happened on the screens of real Kingman visitors. Here's what surprised me."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.55
    }
  }, "Source \xB7 GA4 \xB7 17,000 active users \xB7 12 months")));
}
function K2() {
  // The big number — 87.4% mobile
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The Headline"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(BigDisplay, {
    size: 64,
    style: {
      opacity: 0.85
    }
  }, "Visits that happened on a phone:")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: "var(--font-headers)",
      fontSize: 360,
      lineHeight: 0.92,
      fontWeight: 700,
      letterSpacing: "-0.04em",
      color: VARS.red
    }
  }, "87.4", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 180,
      verticalAlign: "top"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      gap: 0,
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned
    }
  }, /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Mobile",
    pct: 87.4,
    accent: VARS.red
  }), /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Desktop",
    pct: 9.0,
    accent: VARS.char
  }), /*#__PURE__*/React.createElement(DeviceRow, {
    label: "Tablet",
    pct: 3.6,
    accent: VARS.char
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 26,
      color: "rgba(45,45,45,0.75)",
      maxWidth: 880
    }
  }, "Not 60/40. Not 70/30. ", /*#__PURE__*/React.createElement("b", null, "Nine out of ten visits."), " This is what \"mobile-first\" actually looks like in our market \u2014 and it's not an opinion, it's a measurement."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE)));
}
function DeviceRow({
  label,
  pct,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: pct,
      padding: "18px 22px",
      borderRight: `1px solid ${VARS.char}`,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      background: accent === VARS.red ? "rgba(197,48,26,0.06)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: accent,
      opacity: 0.85
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 38,
      fontWeight: 700,
      color: VARS.char
    }
  }, pct, "%"));
}
function K3() {
  // iOS vs Android
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "Of Those Phones"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 78
  }, "iPhone outweighed Android ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "nearly 3 to 1.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(OSCard, {
    label: "iOS",
    count: "11,000",
    share: "71%",
    color: VARS.blue,
    dark: true
  }), /*#__PURE__*/React.createElement(OSCard, {
    label: "Android",
    count: "4,400",
    share: "29%",
    color: VARS.bone,
    dark: true,
    muted: true
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 30,
      maxWidth: 880,
      opacity: 0.82
    }
  }, "Design for Safari first. If your site breaks on a 6.1-inch iPhone, you've lost the majority of your audience before they read a single sentence."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      padding: "14px 22px",
      border: `1px solid rgba(249,246,240,0.25)`,
      maxWidth: 760,
      display: "flex",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.blue
    }
  }, "The phone they're holding"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 18,
      opacity: 0.9
    }
  }, "390 \xD7 844 px \u2014 standard iPhone 13/14/15 screen"))));
}
function OSCard({
  label,
  count,
  share,
  color,
  dark = false,
  muted = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "22px 26px 20px",
      border: `1px solid ${dark ? "rgba(249,246,240,0.25)" : VARS.char}`,
      background: muted ? "transparent" : dark ? "rgba(58,123,213,0.10)" : VARS.pinned,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 78,
      fontWeight: 700,
      lineHeight: 1,
      color: dark ? VARS.bone : VARS.char
    }
  }, share), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      opacity: 0.7,
      color: dark ? VARS.bone : VARS.char
    }
  }, count, " active users"));
}
function K4() {
  // Channel mix — where they came from
  const channels = [{
    label: "Paid Social",
    pct: 39.4,
    count: "9.1K",
    color: VARS.red
  }, {
    label: "Organic Social",
    pct: 22.1,
    count: "5.1K",
    color: VARS.red
  }, {
    label: "Direct",
    pct: 19.0,
    count: "4.4K",
    color: VARS.char
  }, {
    label: "Organic Search",
    pct: 13.0,
    count: "3.0K",
    color: VARS.blue
  }, {
    label: "Referral",
    pct: 5.6,
    count: "1.3K",
    color: VARS.char
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "Where They Came From"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      marginTop: 18
    }
  }, "Social moved more traffic than Google. By a lot."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, channels.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 240,
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: VARS.char
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 36,
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${c.pct / 40 * 100}%`,
      height: "100%",
      background: c.color,
      opacity: c.color === VARS.char ? 0.85 : 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      color: VARS.char,
      textAlign: "right"
    }
  }, c.pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 70,
      fontFamily: "var(--font-details)",
      fontSize: 16,
      color: "rgba(45,45,45,0.6)",
      textAlign: "right"
    }
  }, c.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      padding: "20px 26px",
      background: VARS.char,
      color: VARS.bone,
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.red
    }
  }, "The combined truth"), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("b", null, "61% of all visits came from social."), " Organic search drove just 13%. The story we tell about \"SEO first\" might be a smaller piece of the picture than we think.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE)));
}
function K5() {
  // City split — Local vs Visitor (split-screen card)
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 5,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "Same Website \xB7 Two Audiences"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 62,
    style: {
      marginTop: 18,
      lineHeight: 1.04
    }
  }, "Split the traffic by city, and the visitors split ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "into two jobs.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      flex: 1,
      border: `1.5px solid ${VARS.char}`
    }
  }, /*#__PURE__*/React.createElement(CityPanel, {
    light: true,
    num: "01",
    label: "The Local Planner",
    heading: "Kingman",
    tag: "Studies before they decide.",
    stats: [["24%", "return rate — the highest of any city"], ["Desktop", "the only city with serious desktop use (~741 sessions)"], ["Wed–Thu", "active mostly during business hours"], ["Homepage", "lands on the home + 'what's on' page to browse"]]
  }), /*#__PURE__*/React.createElement(CityPanel, {
    num: "02",
    label: "The Visitor",
    heading: "Phoenix \xB7 Vegas \xB7 LA",
    tag: "Decides in one scroll.",
    stats: [["~100%", "mobile — basically no desktop visits at all"], ["New users", "finding the business for the first time"], ["Thu–Fri 6–10 PM", "peak hour Fri 6 PM = 320 mobile sessions"], ["Event page", "lands straight on a specific show or product page"]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      color: VARS.char
    }
  }, "Same site. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "Two jobs.")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(45,45,45,0.5)"
    }
  }, SOURCE_LINE))));
}
function CityPanel({
  light = false,
  num,
  label,
  heading,
  tag,
  stats
}) {
  const bg = light ? VARS.pinned : VARS.char;
  const fg = light ? VARS.char : VARS.bone;
  const accentColor = light ? VARS.blue : VARS.red;
  const subtle = light ? "rgba(45,45,45,0.65)" : "rgba(249,246,240,0.65)";
  const lineColor = light ? "rgba(45,45,45,0.2)" : "rgba(249,246,240,0.18)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: bg,
      color: fg,
      padding: "24px 28px 22px",
      display: "flex",
      flexDirection: "column",
      borderRight: light ? `1.5px solid ${VARS.char}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.22em",
      color: accentColor
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: accentColor
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: fg,
      opacity: 0.85
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1.02,
      color: fg,
      marginTop: 12,
      letterSpacing: "-0.015em"
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontStyle: "italic",
      fontWeight: 500,
      fontSize: 20,
      color: accentColor,
      marginTop: 4
    }
  }, tag), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: "flex",
      flexDirection: "column"
    }
  }, stats.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      paddingTop: 10,
      paddingBottom: 10,
      borderTop: `1px solid ${lineColor}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 22,
      color: fg,
      letterSpacing: "-0.01em",
      lineHeight: 1.1
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: subtle,
      lineHeight: 1.35
    }
  }, v)))));
}
function K6() {
  // FB vs IG in Kingman
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 6,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 20
    }
  }, "And On Social\u2026"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72
  }, "Facebook still outweighed Instagram. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "About 3 to 1.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginTop: 36,
      border: `1px solid rgba(249,246,240,0.25)`
    }
  }, /*#__PURE__*/React.createElement(PlatformPanel, {
    label: "Facebook",
    sub: "(fb + facebook.com + m.facebook.com + l.facebook.com)",
    value: "~10,000",
    unit: "sessions",
    color: VARS.red,
    fill: "rgba(197,48,26,0.18)",
    flex: 10
  }), /*#__PURE__*/React.createElement(PlatformPanel, {
    label: "Instagram",
    sub: "(ig)",
    value: "3,100",
    unit: "sessions",
    color: VARS.bone,
    fill: "transparent",
    flex: 3.1
  })), /*#__PURE__*/React.createElement(Body, {
    size: 24,
    style: {
      marginTop: 32,
      maxWidth: 880,
      opacity: 0.85
    }
  }, "In Kingman, Facebook is still the front door. Instagram is the window. Both matter \u2014 but where you spend your time should match where your audience actually is."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: "var(--font-details)",
      fontSize: 14,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.5
    }
  }, SOURCE_LINE)));
}
function PlatformPanel({
  label,
  sub,
  value,
  unit,
  color,
  fill,
  flex
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex,
      padding: "22px 24px 20px",
      borderRight: `1px solid rgba(249,246,240,0.25)`,
      background: fill,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1,
      color: VARS.bone
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 14,
      opacity: 0.65,
      color: VARS.bone
    }
  }, unit), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      fontFamily: "var(--font-details)",
      fontSize: 12,
      opacity: 0.5,
      color: VARS.bone,
      fontStyle: "italic"
    }
  }, sub));
}
function K7() {
  // Takeaway + CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 7,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red
  }, "The Takeaway"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      marginTop: 20,
      maxWidth: 920
    }
  }, "Build for the phone in their hand. The one that's ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "open right now.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-headers)",
      fontSize: 30,
      fontWeight: 600,
      color: VARS.char
    }
  }, /*#__PURE__*/React.createElement(Pillar, {
    n: "01",
    text: "Mobile-first."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "02",
    text: "Safari-first."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "03",
    text: "Social-driven."
  }), /*#__PURE__*/React.createElement(Pillar, {
    n: "04",
    text: "Local-fluent."
  })), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 28,
      color: "rgba(45,45,45,0.75)",
      maxWidth: 820
    }
  }, "That's where Kingman actually lives in 2026 \u2014 not in best-practice articles, but in a real local GA dashboard."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Body, {
    size: 20,
    style: {
      color: VARS.char,
      fontWeight: 700
    }
  }, "What surprised you most? Tell me in the comments. \u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "#KingmanBusiness"), /*#__PURE__*/React.createElement(Tag, null, "#MobileWeb"), /*#__PURE__*/React.createElement(Tag, null, "#DigitalAllies")))));
}
function Pillar({
  n,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: "0.2em",
      color: VARS.red
    }
  }, n), /*#__PURE__*/React.createElement("span", null, text));
}
function K8() {
  // Final CTA — the question card
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 8,
    total: 8,
    hashtag: KINGMAN_HASHTAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 28
    }
  }, "Your Turn"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 96,
    style: {
      maxWidth: 920
    }
  }, "What device are you ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "using right now?")), /*#__PURE__*/React.createElement(Body, {
    size: 26,
    style: {
      marginTop: 36,
      opacity: 0.82,
      maxWidth: 760
    }
  }, "Tell me in the comments. I'm building for both \u2014 and the more I hear from real Kingman businesses, the sharper the next site gets."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "#KingmanBusiness"), /*#__PURE__*/React.createElement(Tag, null, "#MobileWeb"), /*#__PURE__*/React.createElement(Tag, null, "#DigitalAllies"))));
}
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      border: `1px solid ${VARS.char}`,
      background: VARS.pinned,
      padding: "8px 18px",
      fontSize: 22,
      letterSpacing: "0.02em",
      fontFamily: "var(--font-details)",
      fontWeight: 700
    }
  }, children);
}
const KINGMAN_SLIDES = [K1, K2, K3, K4, K5, K6, K7, K8];
Object.assign(window, {
  KINGMAN_SLIDES,
  Tag
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/Kingman.jsx", error: String((e && e.message) || e) }); }

// social/Strategy.jsx
try { (() => {
/* global React, Slide, Eyebrow, BigDisplay, Body, VARS, Tag */
// ============================================================
// Carousel 3 — Digital Strategy Without Jargon
// ============================================================

const STRAT_TAG = "Plain Talk";
const STRAT_TOTAL = 6;
function S1() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 1,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "Digital strategy \xB7 no jargon"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 140
  }, "Stop guessing."), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 140,
    style: {
      color: VARS.red,
      marginTop: 8
    }
  }, "Clarity is a choice."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 48,
      maxWidth: 800,
      opacity: 0.78
    }
  }, "Most businesses struggle online and honestly don't know why. Spoiler: it's almost always simpler than they think.")));
}
function S2() {
  // Pull quote — the anxiety of jargon proposals
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 2,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 30
    }
  }, "The feeling"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 64,
    style: {
      color: VARS.char,
      lineHeight: 1.15
    }
  }, "You know that feeling when you look at a proposal full of words you don't actually use?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      borderLeft: `6px solid ${VARS.red}`,
      padding: "44px 48px",
      position: "relative",
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -10,
      left: "50%",
      transform: "translateX(-50%)",
      width: 20,
      height: 20,
      background: VARS.red,
      border: `1.5px solid ${VARS.char}`,
      borderRadius: "50%",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
    }
  }), /*#__PURE__*/React.createElement(Body, {
    size: 30,
    style: {
      color: VARS.char,
      fontStyle: "italic",
      lineHeight: 1.5
    }
  }, "That small knot of anxiety in your stomach. The one that says ", /*#__PURE__*/React.createElement("b", null, "\"I hope this works\""), " instead of ", /*#__PURE__*/React.createElement("b", null, "\"I know this will work.\"")))));
}
function S3() {
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 3,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "blue"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 40
    }
  }, "Why I built this"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 108
  }, "I built ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "Digital Allies"), " to fix exactly that."), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 50,
      maxWidth: 820,
      opacity: 0.82
    }
  }, "I translate what matters in your world into digital tools that actually serve it. No jargon. No fluff. Just the stuff that moves the needle for mission-driven folks.")));
}
function S4() {
  // What you'll find here — 3 bullets
  const items = [{
    eb: "01",
    title: "Clear breakdowns of online strategy",
    body: "How websites, search, and AI actually fit together — explained without the buzzwords."
  }, {
    eb: "02",
    title: "Swipeable tips you can use instantly",
    body: "Real, applicable changes you can make this week. No theory, no fluff."
  }, {
    eb: "03",
    title: "Real examples from the trenches",
    body: "What worked for actual Kingman businesses. What didn't. Why."
  }];
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 4,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 24
    }
  }, "On this account"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 72,
    style: {
      color: VARS.char,
      marginBottom: 48
    }
  }, "What you'll find here."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 28,
      alignItems: "flex-start",
      padding: "22px 28px",
      border: `1px solid ${VARS.char}`,
      background: VARS.bone
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 54,
      lineHeight: 1,
      color: VARS.red,
      flexShrink: 0,
      minWidth: 80
    }
  }, it.eb), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 30,
      color: VARS.char,
      lineHeight: 1.2
    }
  }, it.title), /*#__PURE__*/React.createElement(Body, {
    size: 22,
    style: {
      marginTop: 8,
      color: "rgba(45,45,45,0.65)"
    }
  }, it.body)))))));
}
function S5() {
  // Follow CTA
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "dark",
    idx: 5,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 36
    }
  }, "If this sounds like you"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 86
  }, "Hit follow if you're ready to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.blue
    }
  }, "stop stressing"), " about your website"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 86,
    style: {
      marginTop: 12
    }
  }, "and start ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.red
    }
  }, "using it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      display: "flex",
      gap: 24,
      alignItems: "center",
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 36px",
      background: VARS.red,
      color: VARS.bone,
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      border: `1.5px solid ${VARS.bone}`
    }
  }, "+ Follow @digitalallies"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 22,
      opacity: 0.6
    }
  }, "One ally. Real answers."))));
}
function S6() {
  // Engagement prompt — pinned-note style
  return /*#__PURE__*/React.createElement(Slide, {
    theme: "light",
    idx: 6,
    total: STRAT_TOTAL,
    hashtag: STRAT_TAG,
    accent: "red"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: VARS.red,
    style: {
      marginBottom: 24
    }
  }, "Your turn"), /*#__PURE__*/React.createElement(BigDisplay, {
    size: 88,
    style: {
      color: VARS.char
    }
  }, "What tech word always confuses you?"), /*#__PURE__*/React.createElement(Body, {
    size: 28,
    style: {
      marginTop: 32,
      color: "rgba(45,45,45,0.7)",
      maxWidth: 820
    }
  }, "Drop it in the comments. We'll add it to The Jargon Jar and translate it into plain English."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 70,
      padding: "28px 32px",
      background: VARS.pinned,
      border: `1px solid ${VARS.char}`,
      maxWidth: 720,
      fontFamily: "var(--font-details)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: VARS.red,
      marginBottom: 14
    }
  }, "The Jargon Jar \u2014 Now Open \u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Synergy\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 Working together."), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Bandwidth\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 Time. Just time."), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "line-through",
      opacity: 0.5
    }
  }, "\"Leverage\""), /*#__PURE__*/React.createElement("span", {
    style: {
      color: VARS.char,
      fontWeight: 600
    }
  }, "\u2192 To use.")))));
}
const STRAT_SLIDES = [S1, S2, S3, S4, S5, S6];
Object.assign(window, {
  STRAT_SLIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/Strategy.jsx", error: String((e && e.message) || e) }); }

// social/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContentCalendar.jsx
try { (() => {
/**
 * ContentCalendar.jsx
 * 
 * Reusable 30-day content calendar component for Digital Allies marketing.
 * Displays schedule, topics, copy, and asset prompts.
 * CMS-driven: pass data via props, component re-renders on update.
 * 
 * Usage:
 *   <x-import component="ContentCalendar" from="./ContentCalendar.jsx" data="{{ cms.calendar }}" />
 */

const ContentCalendar = ({
  data = [],
  sortBy = 'day',
  showStatus = true,
  showPromptRef = true,
  onEntryClick = null
}) => {
  const [sortMode, setSortMode] = React.useState(sortBy);
  const [filterCategory, setFilterCategory] = React.useState('all');

  // Sort entries
  const sorted = React.useMemo(() => {
    let arr = [...(Array.isArray(data) ? data : [])];
    if (filterCategory !== 'all') {
      arr = arr.filter(e => e.category === filterCategory);
    }
    arr.sort((a, b) => {
      if (sortMode === 'day') return a.day - b.day;
      if (sortMode === 'category') return (a.category || '').localeCompare(b.category || '');
      if (sortMode === 'status') return (a.status || '').localeCompare(b.status || '');
      return 0;
    });
    return arr;
  }, [data, sortMode, filterCategory]);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const set = new Set(data.map(e => e.category).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [data]);

  // Status badge color
  const statusColor = status => {
    const colors = {
      draft: '#999',
      approved: '#2A6FDB',
      scheduled: '#3A7BD5',
      posted: '#1F8A5B',
      archived: '#666'
    };
    return colors[status] || '#999';
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      color: 'var(--fg)',
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '20px',
      marginBottom: '24px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '12px',
      fontWeight: '600',
      color: 'var(--signal)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginRight: '8px'
    }
  }, "Sort by:"), /*#__PURE__*/React.createElement("select", {
    value: sortMode,
    onChange: e => setSortMode(e.target.value),
    style: {
      fontFamily: 'var(--font-body)',
      padding: '6px 12px',
      border: '1px solid var(--charcoal)',
      background: 'var(--bg)',
      color: 'var(--fg)',
      cursor: 'pointer',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "day"
  }, "Day"), /*#__PURE__*/React.createElement("option", {
    value: "category"
  }, "Category"), /*#__PURE__*/React.createElement("option", {
    value: "status"
  }, "Status"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '12px',
      fontWeight: '600',
      color: 'var(--signal)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginRight: '8px'
    }
  }, "Filter:"), /*#__PURE__*/React.createElement("select", {
    value: filterCategory,
    onChange: e => setFilterCategory(e.target.value),
    style: {
      fontFamily: 'var(--font-body)',
      padding: '6px 12px',
      border: '1px solid var(--charcoal)',
      background: 'var(--bg)',
      color: 'var(--fg)',
      cursor: 'pointer',
      fontSize: '12px'
    }
  }, categories.map(cat => /*#__PURE__*/React.createElement("option", {
    key: cat,
    value: cat
  }, cat === 'all' ? 'All categories' : cat)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--fg-muted)'
    }
  }, "Showing ", sorted.length, " of ", data.length, " entries")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '12px',
      lineHeight: '1.6'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--bg-alt)',
      borderBottom: '2px solid var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Day"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Week"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Topic"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Copy (Hook)"), showPromptRef && /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Asset Prompt"), showStatus && /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--signal)'
    }
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, sorted.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: showStatus && showPromptRef ? 8 : 6,
    style: {
      padding: '24px 8px',
      textAlign: 'center',
      color: 'var(--fg-muted)',
      fontStyle: 'italic'
    }
  }, "No entries to display")) : sorted.map((entry, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onClick: () => onEntryClick && onEntryClick(entry),
    style: {
      borderBottom: '1px dashed var(--hairline)',
      background: i % 2 === 0 ? 'transparent' : 'var(--bg-alt)',
      cursor: onEntryClick ? 'pointer' : 'default',
      transition: 'background 200ms ease'
    },
    onMouseEnter: e => onEntryClick && (e.currentTarget.style.background = 'var(--bg-alt)'),
    onMouseLeave: e => onEntryClick && (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'var(--bg-alt)')
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px',
      fontWeight: '600',
      color: 'var(--signal)'
    }
  }, entry.day), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px'
    }
  }, entry.week), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '2px 6px',
      background: 'var(--charcoal)',
      color: 'var(--fg-on-dark)',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      borderRadius: '2px'
    }
  }, entry.category)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px',
      fontWeight: '600'
    }
  }, entry.topic), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px',
      maxWidth: '300px',
      color: 'var(--fg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--fg-muted)'
    }
  }, "\"", entry.hook || entry.caption || '—', "\"")), showPromptRef && /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px',
      fontSize: '11px',
      color: 'var(--fg-muted)'
    }
  }, entry.promptRef || entry.prompt || '—'), showStatus && /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '3px 8px',
      background: statusColor(entry.status),
      color: 'white',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      borderRadius: '2px'
    }
  }, entry.status || 'draft'))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px',
      padding: '16px',
      background: 'var(--bg-alt)',
      border: '1px dashed var(--hairline)',
      fontSize: '11px',
      color: 'var(--fg-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Tips:"), " Click any row to open the editor (if onEntryClick is wired). Use filters to focus on specific weeks or categories. Export this table to CSV anytime to share with designers or social schedulers."));
};

// Also expose on window so older <x-import>/script consumers keep working
if (typeof window !== 'undefined') {
  window.ContentCalendar = ContentCalendar;
}
Object.assign(__ds_scope, { ContentCalendar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContentCalendar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Departments.jsx
try { (() => {
/* global React, Container, SectionHeading */
const {
  useState: useDeptState
} = React;
const DEPTS = [{
  icon: "../../assets/design-icon.png",
  name: "The Design Bureau",
  nameEs: "El Buró de Diseño",
  cat: "Design & Brand",
  catEs: "Diseño y Marca",
  body: "I design before I develop. Websites, graphic design, menus, signage, pitch decks — polished visuals that look like you meant it. Brand discovery included.",
  bodyEs: "Diseño antes de desarrollar. Sitios web, diseño gráfico, menús, señalización, presentaciones — visuales pulidos que parecen intencionales.",
  hover: "signal"
}, {
  icon: "../../assets/integrations-icon.png",
  name: "Dept. of Cooperation",
  nameEs: "Depto. de Cooperación",
  cat: "Integrations",
  catEs: "Integraciones",
  body: "Your apps talk to each other without arguing. Clean handoffs so you stop copying and pasting between platforms.",
  bodyEs: "Tus aplicaciones se comunican sin discutir. Entregas limpias para que dejes de copiar y pegar.",
  hover: "blue"
}, {
  icon: "../../assets/automation-icon.png",
  name: "The Self-Governing Bureau",
  nameEs: "El Buró de Autogobierno",
  cat: "Automation",
  catEs: "Automatización",
  body: "The boring, repetitive stuff runs automatically. You've got better things to do.",
  bodyEs: "Las cosas aburridas y repetitivas se ejecutan automáticamente. Tienes cosas mejores que hacer.",
  hover: "signal"
}, {
  icon: "../../assets/support-icon.png",
  name: "The Permanent Observation Post",
  nameEs: "El Puesto de Observación Permanente",
  cat: "Support",
  catEs: "Soporte",
  body: "Monitoring runs 24/7. If something breaks at 2am, that's my problem — not yours.",
  bodyEs: "El monitoreo funciona 24/7. Si algo se rompe a las 2 a.m., ese es mi problema, no el tuyo.",
  hover: "blue"
}];
function DeptCard({
  dept,
  lang,
  isLast
}) {
  const [hover, setHover] = useDeptState(false);
  const accent = dept.hover === "signal" ? "var(--signal)" : "var(--accent)";
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? "rgba(250,222,235,0.2)" : "var(--bg)",
      padding: "40px 22px",
      textAlign: "center",
      borderTop: `4px solid ${hover ? accent : "transparent"}`,
      borderRight: isLast ? "none" : "1px solid var(--charcoal)",
      transition: "all 0.4s var(--ease-out)",
      transform: hover ? "translateY(-4px)" : "none",
      boxShadow: hover ? "var(--shadow-lg)" : "none",
      position: "relative",
      zIndex: hover ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: dept.icon,
    alt: "",
    style: {
      width: 92,
      height: 92,
      objectFit: "contain",
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 17,
      margin: "0 0 4px",
      letterSpacing: "-0.005em"
    }
  }, lang === "es" ? dept.nameEs : dept.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-details)",
      fontSize: 10,
      color: "var(--signal)",
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, lang === "es" ? dept.catEs : dept.cat), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--fg)"
    }
  }, lang === "es" ? dept.bodyEs : dept.body));
}
function Departments({
  lang
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "departments",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: lang === "es" ? "Los Departamentos" : "The Departments",
    caption: lang === "es" ? "Cuatro operaciones distintas. Un punto de contacto." : "Four distinct operations. One point of contact."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      border: "1px solid var(--charcoal)",
      background: "var(--bg)"
    }
  }, DEPTS.map((d, i) => /*#__PURE__*/React.createElement(DeptCard, {
    key: i,
    dept: d,
    lang: lang,
    isLast: i === DEPTS.length - 1
  })))));
}
Object.assign(window, {
  Departments
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Departments.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Diagrams.jsx
try { (() => {
/* global React, Container, SectionHeading */
const {
  useState: useDiagState
} = React;
const DIAGRAMS = [{
  title: "AEO & SEO Architecture",
  body: "Getting found by search engines is a structural problem. I review your site's foundation and fix the parts that keep you invisible.",
  img: "../../assets/aeo-seo-overview.png"
}, {
  title: "The Four-Step Process",
  body: "Discover → Design → Build → Maintain. Each step has a clear entry point and a clear exit. No ambiguity. No surprise invoices.",
  img: "../../assets/process.png"
}, {
  title: "Language & Accessibility Architecture",
  body: "Bilingual and accessible by design, not as an afterthought. Every element keyboard-navigable. Every toggle screen-reader friendly.",
  img: "../../assets/language-overview.png"
}];
function Diagram({
  d,
  open,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--charcoal)",
      background: "var(--bg)",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    style: {
      width: "100%",
      padding: "20px 28px",
      background: open ? "var(--accent-soft)" : "var(--bg)",
      border: "none",
      borderBottom: open ? "1px solid var(--hairline)" : "none",
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 18,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "left",
      color: "var(--fg)",
      transition: "background 0.2s"
    }
  }, /*#__PURE__*/React.createElement("span", null, d.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontSize: 22,
      fontFamily: "var(--font-details)",
      transform: open ? "rotate(45deg)" : "none",
      transition: "transform 0.3s var(--ease-out)",
      display: "inline-block"
    }
  }, "+")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 32px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.7,
      color: "var(--fg-muted)",
      maxWidth: 640
    }
  }, d.body), d.img && /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--hairline)",
      background: "var(--bg-alt)",
      padding: 12,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: d.img,
    alt: "",
    style: {
      width: "100%",
      display: "block"
    }
  }))));
}
function Diagrams() {
  const [open, setOpen] = useDiagState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "diagrams",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "The Diagrams",
    caption: "Architecture explained without the alphabet soup."
  }), DIAGRAMS.map((d, i) => /*#__PURE__*/React.createElement(Diagram, {
    key: i,
    d: d,
    open: open === i,
    onToggle: () => setOpen(open === i ? -1 : i)
  }))));
}
Object.assign(window, {
  Diagrams
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Diagrams.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FieldNotes.jsx
try { (() => {
/* global React, Container, SectionHeading, PinnedNote */

const NOTES = [{
  quote: "Anthony has a rare natural ability to step into the world of his client and tune into what is important to them. His guidance is a safe pathway through.",
  who: "Sasha Esposito",
  where: "Marriage and Family Therapy, Inc."
}, {
  quote: "Digital Allies has truly been a beacon of expertise and reliability. I wholeheartedly recommend them to any organization seeking a dependable tech partner.",
  who: "Victoria Buckholz",
  where: "Journey to the Center of Hope"
}, {
  quote: "Working with Digital Allies is not just about achieving results. It is about experiencing the clarity of real collaboration — where questions get answered and decisions get made.",
  who: "Tao Wei",
  where: "Tao Wei Designs"
}];
function FieldNotes() {
  return /*#__PURE__*/React.createElement("section", {
    id: "field-notes",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Archive \xB7 Field Notes",
    title: "Notes from real people.",
    caption: "I keep them pinned."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 18
    }
  }, NOTES.map((n, i) => /*#__PURE__*/React.createElement(PinnedNote, {
    key: i,
    leftBorder: false
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontSize: 13,
      lineHeight: 1.65,
      color: "var(--fg)"
    }
  }, "\"", n.quote, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--hairline)",
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 13
    }
  }, n.who), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      color: "var(--fg-muted)"
    }
  }, n.where)))))));
}
Object.assign(window, {
  FieldNotes
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FieldNotes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React, Container, Button */
const {
  useState: useFooterState
} = React;
function Field({
  label,
  type = "text",
  placeholder,
  multiline,
  value,
  onChange
}) {
  const [focus, setFocus] = useFooterState(false);
  const common = {
    fontFamily: "var(--font-details)",
    fontSize: 13,
    padding: "12px 14px",
    border: focus ? "1px solid var(--accent)" : "1px solid var(--charcoal)",
    boxShadow: focus ? "0 0 0 2px rgba(58,123,213,0.15)" : "none",
    background: "var(--bg)",
    color: "var(--fg)",
    borderRadius: 2,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: multiline ? "vertical" : "none",
    minHeight: multiline ? 100 : "auto",
    transition: "border 0.15s, box-shadow 0.15s"
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontWeight: 700,
      color: "var(--fg)",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      marginBottom: 8
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", {
    placeholder: placeholder,
    value: value,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: common
  }) : /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: common
  }));
}
function Footer({
  onSubmit
}) {
  const [name, setName] = useFooterState("");
  const [email, setEmail] = useFooterState("");
  const [msg, setMsg] = useFooterState("");
  const [sent, setSent] = useFooterState(false);
  const submit = () => {
    setSent(true);
    if (onSubmit) onSubmit({
      name,
      email,
      msg
    });
  };
  return /*#__PURE__*/React.createElement("footer", {
    id: "contact",
    style: {
      background: "var(--charcoal)",
      color: "var(--bone-white)",
      padding: "80px 0 40px"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid rgba(249,246,240,0.18)",
      paddingBottom: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--accent-soft)"
    }
  }, "The Command Center"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.15,
      margin: "12px 0 18px"
    }
  }, "Tell me what you are trying to do."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 26px",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.7,
      color: "rgba(249,246,240,0.7)",
      maxWidth: 360
    }
  }, "I will reply with next steps, a cost range, or a quick question. Usually all three."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 12,
      lineHeight: 2.2
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-soft)"
    }
  }, "LOCATION \xB7"), " Kingman, Arizona"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-soft)"
    }
  }, "DIRECT LINE \xB7"), " (928) 228-5769"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-soft)"
    }
  }, "EMAIL \xB7"), " contact@digitalallies.net"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      color: "var(--fg)",
      border: "1px solid var(--bone-white)",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 16,
      margin: "0 0 22px"
    }
  }, "Send a Transmission"), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      fontWeight: 700,
      color: "var(--signal)",
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, "Transmission received"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.7,
      margin: "12px 0 0"
    }
  }, "Thanks, ", name || "friend", ". I'll get back to you with next steps \u2014 usually within a working day.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    value: name,
    onChange: setName,
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    value: email,
    onChange: setEmail,
    placeholder: "your@email.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "What are you trying to do?",
    multiline: true,
    value: msg,
    onChange: setMsg,
    placeholder: "Give me the short version. We can fill in details later."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: submit,
    style: {
      width: "100%",
      marginTop: 4
    }
  }, "[ Submit Transmission ]"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontFamily: "var(--font-details)",
      fontSize: 10,
      color: "var(--fg-soft)",
      lineHeight: 1.5
    }
  }, "I do not share your details. I use your message to reply. That is it."))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 28,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "var(--font-details)",
      fontSize: 11,
      color: "rgba(249,246,240,0.6)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Digital Allies. Based in Kingman, AZ."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Cookies"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Sitemap")))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React, Container, Eyebrow, Button, PinnedNote */

function Hero({
  lang
}) {
  const t = lang === "es" ? {
    eyebrow: "Con base en Kingman, AZ · Al servicio de todo lo demás",
    title: "Soluciones Tecnológicas para Personas con Cosas Mejores que Hacer.",
    sub: "Yo construyo sistemas que no requieren una maestría para usarlos.",
    quote: "\"Ingeniería limpia, comunicación clara y un seguimiento que no requerirá seguimiento.\"",
    cta1: "[ Consultar Aquí ]",
    cta2: "[ Ver los Diagramas ]"
  } : {
    eyebrow: "Based in Kingman, AZ · Serving Everywhere Else",
    title: "Technological Solutions for People with Better Things to Do.",
    sub: "I build systems that don\u2019t require a master\u2019s degree to operate.",
    quote: "\u201CClean engineering, clear communication, and follow-through that won't require follow up.\u201D",
    cta1: "[ Inquire Within ]",
    cta2: "[ View the Diagrams ]"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0 112px"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 920
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 24
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: "clamp(40px, 5.5vw, 60px)",
      lineHeight: 1.08,
      letterSpacing: "-0.012em",
      margin: "0 0 32px",
      color: "var(--fg)",
      textWrap: "balance"
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 540,
      margin: "0 auto 28px",
      color: "var(--fg)"
    }
  }, t.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto 48px"
    }
  }, /*#__PURE__*/React.createElement(PinnedNote, {
    align: "center"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--fg)"
    }
  }, t.quote))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#contact"
  }, t.cta1), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    href: "#diagrams"
  }, t.cta2)))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/JargonJar.jsx
try { (() => {
/* global React, Container */
const {
  useState: useJarState
} = React;
const JARGON = [{
  from: "\"Leverage synergies across touchpoints\"",
  to: "\"Make the parts work together.\""
}, {
  from: "\"End-to-end digital transformation\"",
  to: "\"We fix what's broken and build what's missing.\""
}, {
  from: "\"Scalable solutions for your growth journey\"",
  to: "\"It works now and won't fall apart later.\""
}, {
  from: "\"SEO-optimized content ecosystems\"",
  to: "\"Your site shows up when people search. That's the goal.\""
}, {
  from: "\"Robust backend infrastructure\"",
  to: "\"Quiet stuff running so nothing crashes.\""
}, {
  from: "\"Holistic brand alignment\"",
  to: "\"Your logo, site, and words look like they know each other.\""
}, {
  from: "\"Onboarding workflow optimization\"",
  to: "\"Getting started without the runaround.\""
}];
function FlipCard({
  front,
  back
}) {
  const [flipped, setFlipped] = useJarState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => setFlipped(!flipped),
    style: {
      perspective: 1000,
      cursor: "pointer",
      height: 168
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      textAlign: "center",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      transformStyle: "preserve-3d",
      transform: flipped ? "rotateY(180deg)" : "none",
      border: "1px solid var(--charcoal)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(CardFace, {
    side: "front"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 11,
      color: "var(--signal)",
      margin: "0 0 8px",
      letterSpacing: "0.05em"
    }
  }, "Corporate Speak"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      lineHeight: 1.5,
      margin: 0,
      fontWeight: 700
    }
  }, front)), /*#__PURE__*/React.createElement(CardFace, {
    side: "back"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 11,
      color: "var(--accent)",
      margin: "0 0 8px",
      letterSpacing: "0.05em"
    }
  }, "DA Translation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      lineHeight: 1.5,
      margin: 0,
      fontWeight: 700
    }
  }, back))));
}
function CardFace({
  side,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 22,
      background: side === "back" ? "var(--bg-alt)" : "var(--bg)",
      transform: side === "back" ? "rotateY(180deg)" : "none"
    }
  }, children);
}
function JargonJar() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1024
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--charcoal)",
      background: "var(--bg)",
      padding: "40px 44px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 32,
      margin: "0 0 12px",
      borderBottom: "1px solid var(--hairline)",
      paddingBottom: 18
    }
  }, "The Jargon Jar 2.0"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 11,
      fontWeight: 700,
      color: "var(--signal)",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      margin: "0 0 24px"
    }
  }, "Click any card to translate corporate posture into straight talk."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, JARGON.map((j, i) => /*#__PURE__*/React.createElement(FlipCard, {
    key: i,
    front: j.from,
    back: j.to
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--bg-alt)",
      border: "1px solid var(--charcoal)",
      padding: "32px 16px 14px",
      textAlign: "center",
      boxShadow: "var(--shadow-sm)",
      height: 168,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      width: 14,
      height: 14,
      background: "var(--signal)",
      border: "1px solid var(--charcoal)",
      borderRadius: "50%",
      boxShadow: "var(--shadow-pin)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 9,
      fontWeight: 700,
      color: "var(--fg-soft)",
      textTransform: "uppercase",
      letterSpacing: "0.18em"
    }
  }, "Manual Registry"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontStyle: "italic",
      color: "var(--fg-muted)",
      lineHeight: 1.5
    }
  }, "\"If you need a glossary to read your website, you've already lost them.\""), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 9,
      fontWeight: 700,
      textAlign: "right"
    }
  }, "\u2014 Jargon Protocol"))))));
}
Object.assign(window, {
  JargonJar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/JargonJar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
/* global React, PulseDot */
const {
  useState: useNavState
} = React;
function Nav({
  activeSection,
  lang,
  onLangChange,
  onNavClick
}) {
  const links = [{
    id: "departments",
    en: "Services",
    es: "Servicios"
  }, {
    id: "diagrams",
    en: "Diagrams",
    es: "Diagramas"
  }, {
    id: "pricing",
    en: "Pricing",
    es: "Precios"
  }, {
    id: "field-notes",
    en: "Reviews",
    es: "Reseñas"
  }, {
    id: "faq",
    en: "FAQ",
    es: "FAQ"
  }, {
    id: "contact",
    en: "Contact",
    es: "Contacto"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      borderBottom: "1px solid var(--charcoal)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      color: "var(--fg)"
    }
  }, /*#__PURE__*/React.createElement(PulseDot, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: "0.01em"
    }
  }, "Digital Allies")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: `#${l.id}`,
    onClick: e => {
      e.preventDefault();
      onNavClick && onNavClick(l.id);
    },
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 11,
      color: activeSection === l.id ? "var(--accent)" : "var(--fg)",
      textDecoration: "none",
      letterSpacing: "0.04em",
      whiteSpace: "nowrap"
    }
  }, lang === "es" ? l.es : l.en))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      border: "1px solid var(--charcoal)"
    }
  }, ["en", "es"].map((code, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: code
  }, i === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: "var(--charcoal)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onLangChange(code),
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 11,
      padding: "6px 11px",
      border: "none",
      background: lang === code ? "var(--charcoal)" : "var(--bg)",
      color: lang === code ? "var(--bone-white)" : "var(--fg)",
      cursor: "pointer",
      letterSpacing: "0.05em"
    }
  }, code.toUpperCase())))))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
/* global React, Container, SectionHeading */

const FREE = [["Tech Consulting", "Free"], ["AI Consulting", "Free"], ["Brand Discovery", "Free"], ["AEO & SEO Review", "Free"]];
const PAID = [["Website Design", "From $100"], ["Graphic Design", "From $75"], ["Building (Full Project)", "From $100"], ["Monthly Maintenance", "From $50"], ["Automation Setup", "Quoted"]];
function PriceCol({
  title,
  rows,
  foot,
  isFree
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "40px 36px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 19,
      margin: "0 0 22px",
      textAlign: "center"
    }
  }, title), rows.map(([label, price], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "12px 0",
      borderBottom: i === rows.length - 1 ? "none" : "1px dashed var(--grid-line-strong)",
      fontFamily: "var(--font-details)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      color: isFree ? "var(--accent)" : "var(--fg)"
    }
  }, price))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      fontFamily: "var(--font-details)",
      fontStyle: "italic",
      fontSize: 11,
      color: "var(--fg-muted)",
      lineHeight: 1.6,
      paddingTop: 16,
      borderTop: "1px solid var(--hairline)"
    }
  }, foot));
}
function Pricing() {
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1024
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "The Transparency Table",
    caption: "Strategy is Free. Execution is Paid."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--charcoal)",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--charcoal)"
    }
  }, /*#__PURE__*/React.createElement(PriceCol, {
    title: "The Reciprocity Loop",
    rows: FREE,
    foot: "I do not charge for conversations or clarity. Call it a professional courtesy.",
    isFree: true
  })), /*#__PURE__*/React.createElement(PriceCol, {
    title: "Tactical Deployments",
    rows: PAID,
    foot: "All quotes are given before work begins. No surprises. No silent scope creep."
  })))));
}
Object.assign(window, {
  Pricing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Primitives.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ============================================================
// Eyebrow — tracked uppercase label, signal-red by default
// ============================================================
function Eyebrow({
  children,
  color = "signal",
  className = "",
  style = {}
}) {
  const palette = {
    signal: "var(--signal)",
    blue: "var(--accent)",
    muted: "var(--fg-soft)"
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      fontFamily: "var(--font-details)",
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: palette[color] || color,
      display: "inline-block",
      ...style
    }
  }, children);
}

// ============================================================
// PulseDot — the blue dot + ring lockup
// ============================================================
function PulseDot({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "da-pulse-ring",
    style: {
      position: "absolute",
      width: size * 0.8,
      height: size * 0.8,
      background: "var(--accent)",
      borderRadius: "50%",
      opacity: 0.25,
      animation: "da-fab-ring 2.2s ease-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size * 0.6,
      height: size * 0.6,
      background: "var(--accent)",
      border: "1px solid var(--charcoal)",
      borderRadius: "50%",
      animation: "da-brand-pulse 3s ease-in-out infinite"
    }
  }));
}

// ============================================================
// Button — bracketed CTA. Variants: primary (red), secondary (bone), dark.
// ============================================================
function Button({
  children,
  variant = "primary",
  onClick,
  href,
  small = false,
  style = {}
}) {
  const base = {
    fontFamily: "var(--font-headers)",
    fontWeight: 700,
    fontSize: small ? 12 : 14,
    padding: small ? "8px 18px" : "12px 28px",
    border: "1px solid var(--charcoal)",
    cursor: "pointer",
    display: "inline-block",
    textAlign: "center",
    textDecoration: "none",
    transition: "all 0.2s var(--ease-snap)",
    letterSpacing: "0.01em",
    ...style
  };
  const variants = {
    primary: {
      background: "var(--signal)",
      color: "#fff"
    },
    secondary: {
      background: "var(--bone-white)",
      color: "var(--fg)"
    },
    dark: {
      background: "var(--charcoal)",
      color: "var(--bone-white)"
    }
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = hover ? variant === "primary" ? {
    background: "var(--charcoal)"
  } : variant === "secondary" ? {
    background: "var(--accent-soft)"
  } : {
    background: "var(--signal)"
  } : {};
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle
    }
  }, children);
}

// ============================================================
// PinnedNote — yellow card + red pin at top center. Pull quotes.
// ============================================================
function PinnedNote({
  children,
  leftBorder = true,
  align = "left",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--bg-alt)",
      border: "1px solid var(--charcoal)",
      borderLeft: leftBorder ? "4px solid var(--signal)" : "1px solid var(--charcoal)",
      padding: "40px 24px 20px",
      textAlign: align,
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: "50%",
      transform: "translateX(-50%)",
      width: 14,
      height: 14,
      background: "var(--signal)",
      border: "1px solid var(--charcoal)",
      borderRadius: "50%",
      boxShadow: "var(--shadow-pin)"
    }
  }), children);
}

// ============================================================
// Container — repeating max-w wrapper
// ============================================================
function Container({
  children,
  max = 1024,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: max,
      margin: "0 auto",
      padding: "0 24px",
      ...style
    }
  }, children);
}

// ============================================================
// SectionHeading — centered eyebrow + h2 + caption
// ============================================================
function SectionHeading({
  eyebrow,
  title,
  caption,
  align = "center"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      marginBottom: 48
    }
  }, eyebrow && /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1.1
    }
  }, title), caption && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-details)",
      fontSize: 13,
      color: "var(--fg-muted)"
    }
  }, caption));
}
Object.assign(window, {
  Eyebrow,
  PulseDot,
  Button,
  PinnedNote,
  Container,
  SectionHeading
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Reliability.jsx
try { (() => {
/* global React, Container, SectionHeading */

const MOATS = [{
  eyebrow: "Local Roots",
  title: "I Am Local",
  body: "Based in Kingman, Arizona. Not offshore. Not a chatbot. A real person with a local area code who picks up the phone.",
  icon: "../../assets/icon-route66.png"
}, {
  eyebrow: "Written Commitment",
  title: "No-Ghosting Guarantee",
  body: "If I take your project, I finish it. If something changes, I tell you. Going quiet is not part of my service model.",
  icon: "../../assets/icon-topo.png"
}, {
  eyebrow: "Direct Contact",
  title: "Direct Line",
  body: "(928) 228-5769. Call or text. No call center. No ticket queue. Just a real number that goes to one real person.",
  icon: "../../assets/icon-phone.png"
}];
function MoatCard({
  m
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      border: "1px solid var(--charcoal)",
      padding: "32px 28px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m.icon,
    alt: "",
    style: {
      width: 68,
      height: 68,
      objectFit: "contain",
      marginBottom: 6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-details)",
      fontSize: 10,
      fontWeight: 700,
      color: "var(--signal)",
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, m.eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headers)",
      fontWeight: 700,
      fontSize: 18,
      margin: 0
    }
  }, m.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.65,
      color: "var(--fg)"
    }
  }, m.body));
}
function Reliability() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 0",
      background: "var(--bg-alt)",
      borderTop: "1px solid var(--charcoal)",
      borderBottom: "1px solid var(--charcoal)"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    max: 1280
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Reliability Moat",
    title: "The No-Ghosting Guarantee. In Writing.",
    caption: "Three commitments. Stamped before you sign."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, MOATS.map((m, i) => /*#__PURE__*/React.createElement(MoatCard, {
    key: i,
    m: m
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "40px auto 0",
      textAlign: "center",
      fontFamily: "var(--font-details)",
      fontStyle: "italic",
      fontSize: 12,
      color: "var(--fg-muted)",
      maxWidth: 640,
      lineHeight: 1.6
    }
  }, "\"I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called 'Doing My Job.'\"")));
}
Object.assign(window, {
  Reliability
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Reliability.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ContentCalendar = __ds_scope.ContentCalendar;

})();
