/**
 * Digital Allies — Universal Language Controller
 * ------------------------------------------------
 * Baseline: the LanguageController pattern built for digitalallies.net
 * (data-en/data-es attributes + localStorage), hardened for use as a
 * baked-in CMS platform feature across every new client site.
 *
 * Zero dependencies. Zero build step. Drop this file in, add data-{lang}
 * attributes to your markup, done.
 *
 * Hardening added on top of the original single-site version:
 *   1. Idempotent / double-include safe. The exact production bug found
 *      on digitalallies.net (duplicated <html> on a merge produced two
 *      `class LanguageController {}` declarations -> SyntaxError ->
 *      the whole script silently died and EN/ES stopped working
 *      site-wide) can no longer happen: this file is a no-op the second
 *      time it executes.
 *   2. MutationObserver support. CMS-driven sections (cards rendered
 *      from Supabase/CMS content via innerHTML, e.g. cms-loader.js)
 *      are translated automatically the moment they're inserted, with
 *      no need for every content-loading script to remember to call
 *      updateContent() again.
 *   3. N-language, not just EN/ES. Config-driven language list so a
 *      client site can ship with 2 languages today and add a 3rd later
 *      with zero code changes.
 *   4. DOM caching for performance on large pages, invalidated
 *      automatically by the MutationObserver.
 *   5. ARIA live-region announcements + lang attribute updates for
 *      accessibility.
 *   6. Pluggable onChange hooks so other scripts (analytics, legal link
 *      swapping, hreflang updates) can react to a language change
 *      without editing this file.
 */
(function (global) {
  'use strict';

  // --- Guard: safe against accidental double-inclusion -------------------
  if (global.LanguageController && global.__langControllerLoaded) {
    return;
  }

  var DEFAULTS = {
    languages: ['en', 'es'],      // ISO codes; order = fallback order
    defaultLanguage: 'en',
    storageKey: 'language',
    attrPrefix: 'data-',          // data-en, data-es, ...
    buttonIdPrefix: 'lang-',      // #lang-en, #lang-es, ...
    activeClass: 'active',
    announce: true,
    root: document
  };

  function LanguageController(userConfig) {
    this.config = Object.assign({}, DEFAULTS, userConfig || {});
    this.currentLang = this._resolveInitialLanguage();
    this.translatableElements = null;
    this.languageButtons = null;
    this._changeListeners = [];
    this._observer = null;
    this.init();
  }

  LanguageController.prototype._resolveInitialLanguage = function () {
    var saved = null;
    try {
      saved = localStorage.getItem(this.config.storageKey);
    } catch (e) {
      // localStorage can throw in private-browsing / sandboxed contexts.
    }
    if (saved && this.config.languages.indexOf(saved) !== -1) return saved;
    return this.config.languages.indexOf(this.config.defaultLanguage) !== -1
      ? this.config.defaultLanguage
      : this.config.languages[0];
  };

  LanguageController.prototype._selector = function () {
    // e.g. '[data-en][data-es]' for a two-language site, generalized to N.
    return this.config.languages
      .map(function (lang) { return '[data-' + lang + ']'; })
      .join('');
  };

  LanguageController.prototype.cacheElements = function () {
    var root = this.config.root;
    this.translatableElements = root.querySelectorAll(this._selector());
    this.languageButtons = root.querySelectorAll('[id^="' + this.config.buttonIdPrefix + '"]');
  };

  LanguageController.prototype.init = function () {
    this.cacheElements();
    this.updateContent(this.currentLang);
    this.updateUI(this.currentLang);
    this.updatePageLang(this.currentLang);
    this._observeDom();
  };

  // --- Core: switching language -------------------------------------------
  LanguageController.prototype.toggleLanguage = function (lang) {
    if (this.config.languages.indexOf(lang) === -1) {
      console.warn('[LanguageController] Unknown language code:', lang);
      return;
    }
    var previous = this.currentLang;
    this.currentLang = lang;
    try {
      localStorage.setItem(this.config.storageKey, lang);
    } catch (e) {
      /* ignore storage failures */
    }
    this.updateContent(lang);
    this.updateUI(lang);
    this.updatePageLang(lang);
    if (this.config.announce) this.announceChange(lang);
    this._changeListeners.forEach(function (fn) {
      try { fn(lang, previous); } catch (e) { console.error(e); }
    });
  };

  LanguageController.prototype.updateContent = function (lang) {
    if (!this.translatableElements) this.cacheElements();
    this.translatableElements.forEach(function (el) {
      var content = el.getAttribute('data-' + lang);
      if (content == null) return;
      // IMPORTANT: only write when the value actually changes. The
      // MutationObserver below watches childList/subtree so it can catch
      // CMS-injected content, and el.textContent = x always creates a new
      // text node (even when x is unchanged) which fires a new mutation.
      // Writing unconditionally would make every translate pass generate
      // a fresh mutation that re-triggers a rescan forever. Guarding on
      // "did the value change" makes the pass idempotent: the second
      // rescan sees nothing left to change, produces no mutations, and
      // the loop terminates naturally.
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.placeholder !== content) el.placeholder = content;
      } else if (el.textContent !== content) {
        el.textContent = content;
      }
    });
  };

  LanguageController.prototype.updateUI = function (lang) {
    if (!this.languageButtons) this.cacheElements();
    var activeClass = this.config.activeClass;
    var idPrefix = this.config.buttonIdPrefix;
    this.languageButtons.forEach(function (btn) {
      btn.classList.remove(activeClass);
      btn.setAttribute('aria-pressed', 'false');
    });
    var activeBtn = this.config.root.getElementById
      ? this.config.root.getElementById(idPrefix + lang)
      : document.getElementById(idPrefix + lang);
    if (activeBtn) {
      activeBtn.classList.add(activeClass);
      activeBtn.setAttribute('aria-pressed', 'true');
    }
  };

  LanguageController.prototype.updatePageLang = function (lang) {
    document.documentElement.lang = lang;
  };

  LanguageController.prototype.announceChange = function (lang) {
    var label = this.config.languageNames && this.config.languageNames[lang]
      ? this.config.languageNames[lang]
      : lang.toUpperCase();
    var announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = 'Language changed to ' + label;
    document.body.appendChild(announcer);
    setTimeout(function () { document.body.removeChild(announcer); }, 1000);
  };

  // --- Extensibility -------------------------------------------------------
  LanguageController.prototype.onChange = function (fn) {
    if (typeof fn === 'function') this._changeListeners.push(fn);
  };

  LanguageController.prototype.getLanguage = function () {
    return this.currentLang;
  };

  // --- CMS integration: auto-translate dynamically injected content --------
  LanguageController.prototype._observeDom = function () {
    if (typeof MutationObserver === 'undefined') return; // very old browsers
    var self = this;
    this._observer = new MutationObserver(function (mutations) {
      var shouldRescan = false;
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
          shouldRescan = true;
          break;
        }
      }
      if (shouldRescan) {
        // New DOM (e.g. CMS-loaded cards, testimonials, blog cards) may
        // include untranslated data-en/data-es content. Re-cache + re-apply.
        self.cacheElements();
        self.updateContent(self.currentLang);
        self.updateUI(self.currentLang);
      }
    });
    this._observer.observe(document.body, { childList: true, subtree: true });
  };

  LanguageController.prototype.destroy = function () {
    if (this._observer) this._observer.disconnect();
  };

  // --- Global wiring ---------------------------------------------------------
  global.LanguageController = LanguageController;
  global.__langControllerLoaded = true;

  var languageController = null;

  function boot() {
    if (languageController) return; // idempotent even if boot() runs twice
    languageController = new LanguageController(global.LANGUAGE_CONTROLLER_CONFIG);
    global.languageController = languageController; // for console/debug access
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Global function used by onclick="toggleLanguage('es')" in markup.
  global.toggleLanguage = function (lang) {
    if (languageController) languageController.toggleLanguage(lang);
  };
})(window);
