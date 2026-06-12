/**
 * lucide v1.17.0 — Digital Allies custom build (4 icons: archive, ghost, mic, video)
 * @license ISC
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lucide = {}));
})(this, function (exports) {
  'use strict';

  var defaultAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24, height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  var icons = {
    archive: [
      ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
      ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }],
      ["path", { d: "M10 12h4" }]
    ],
    ghost: [
      ["path", { d: "M9 10h.01" }],
      ["path", { d: "M15 10h.01" }],
      ["path", { d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" }]
    ],
    mic: [
      ["path", { d: "M12 19v3" }],
      ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }],
      ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3" }]
    ],
    video: [
      ["path", { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }],
      ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" }]
    ]
  };

  function createSVG(iconData, extraAttrs) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var attrs = Object.assign({}, defaultAttrs, extraAttrs || {});
    Object.keys(attrs).forEach(function(k) { svg.setAttribute(k, String(attrs[k])); });
    iconData.forEach(function(child) {
      var el = document.createElementNS("http://www.w3.org/2000/svg", child[0]);
      Object.keys(child[1]).forEach(function(k) { el.setAttribute(k, String(child[1][k])); });
      svg.appendChild(el);
    });
    return svg;
  }

  function createIcons(opts) {
    var nameAttr = (opts && opts.nameAttr) || 'data-lucide';
    var nodes = document.querySelectorAll('[' + nameAttr + ']');
    nodes.forEach(function(el) {
      if (el.querySelector('svg')) return; // already processed
      var name = el.getAttribute(nameAttr);
      var iconData = icons[name];
      if (!iconData) return;
      var extraAttrs = {};
      ['class', 'stroke-width', 'width', 'height'].forEach(function(a) {
        if (el.hasAttribute(a)) extraAttrs[a] = el.getAttribute(a);
      });
      if (el.hasAttribute('aria-hidden')) extraAttrs['aria-hidden'] = 'true';
      var svg = createSVG(iconData, extraAttrs);
      // Copy classes from host element's class attr to svg
      if (el.className) svg.setAttribute('class', el.className);
      el.replaceWith(svg);
    });
  }

  exports.createIcons = createIcons;
  exports.icons = icons;
  Object.defineProperty(exports, '__esModule', { value: true });
});
