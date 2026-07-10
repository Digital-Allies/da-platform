/**
 * Atomic Finds — Jenny Celestial Scroll Hero
 * High-performance scroll scrubbing & Breedlove-inspired interactive layout
 */

(function () {
  // --- Easing and Interpolation Helpers ---
  function smoothStep(t) {
    t = Math.min(Math.max(t, 0), 1);
    return t * t * (3 - 2 * t);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  // --- Core Hero Component ---
  function JennyScrollHero(root) {
    this.root = root;
    this.stage = root.querySelector('.jh-stage');
    this.framesContainer = root.querySelector('#jhFrames');
    this.wispsContainer = root.querySelector('#jhWisps');
    this.themeToggle = root.querySelector('#jhThemeToggle');
    
    // Copy beats
    this.beats = {
      1: root.querySelector('[data-beat="1"]'),
      2: root.querySelector('[data-beat="2"]'),
      3: root.querySelector('[data-beat="3"]')
    };

    // Metadata lines & texts
    this.metadataEls = Array.prototype.slice.call(root.querySelectorAll('.jh-metadata'));
    this.cueEl = root.querySelector('#jhCue');

    // Configuration from data attributes
    var d = root.dataset;
    this.screens = Math.max(3, parseFloat(d.screens) || 7);
    this.pushIntensity = Math.min(0.5, Math.max(0.05, parseFloat(d.push) || 0.22));

    // Reduced motion fallback
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Animation state
    this.targetP = 0;
    this.smoothP = 0;
    this.running = false;
    this.inView = true;

    this.init();
  }

  JennyScrollHero.prototype.init = function () {
    // 1. Determine which ending frame to use (Duda-configurable or randomized)
    // We check root data attribute: data-ending = 'smile' | 'playful' | 'auto'
    var endingConfig = this.root.dataset.ending || 'auto';
    if (endingConfig === 'auto') {
      // Randomize or time-of-day (even hour = playful, odd hour = smile)
      var hour = new Date().getHours();
      this.endingType = hour % 2 === 0 ? 'playful' : 'smile';
    } else {
      this.endingType = endingConfig;
    }

    // 2. Select sequence frames
    var allFrames = Array.prototype.slice.call(this.framesContainer.querySelectorAll('.jh-frame'));
    this.frames = [];
    
    for (var i = 0; i < allFrames.length; i++) {
      var f = allFrames[i];
      var endingAttr = f.getAttribute('data-ending');
      if (endingAttr) {
        if (endingAttr === this.endingType) {
          this.frames.push(f);
        } else {
          f.style.display = 'none'; // Hide the unused ending frame
        }
      } else {
        this.frames.push(f);
      }
    }

    this.totalFrames = this.frames.length;
    this.totalSegments = this.totalFrames - 1;

    // 3. Extract cloud wisps
    this.wisps = Array.prototype.slice.call(this.wispsContainer.querySelectorAll('.jh-wisp'));

    // 4. Bind Theme Toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }

    // 5. Layout and Event Binding
    this.layout();
    
    if (this.reduced) {
      this.renderStatic();
      return;
    }

    // Intersection Observer to run loop only when visible
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        this.inView = entries[0].isIntersecting;
        if (this.inView) this.startLoop();
      }.bind(this), { threshold: 0 });
      observer.observe(this.root);
    }

    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

    // Initial render
    this.targetP = this.calculateScrollProgress();
    this.smoothP = this.targetP;
    this.render(this.smoothP);
    this.startLoop();
  };

  JennyScrollHero.prototype.toggleTheme = function () {
    if (this.root.classList.contains('theme-night')) {
      this.root.classList.remove('theme-night');
      this.root.classList.add('theme-gold');
    } else {
      this.root.classList.remove('theme-gold');
      this.root.classList.add('theme-night');
    }
  };

  JennyScrollHero.prototype.layout = function () {
    if (!this.reduced) {
      this.root.style.height = (this.screens * 100) + 'vh';
    }
  };

  JennyScrollHero.prototype.onResize = function () {
    this.layout();
    this.startLoop();
  };

  JennyScrollHero.prototype.onScroll = function () {
    this.targetP = this.calculateScrollProgress();
    // Render immediately on scroll to prevent frame lag, then let the loop smooth it out
    this.render(this.targetP);
    this.startLoop();
  };

  JennyScrollHero.prototype.calculateScrollProgress = function () {
    var rect = this.root.getBoundingClientRect();
    var totalHeight = this.root.offsetHeight - window.innerHeight;
    if (totalHeight <= 0) return 0;
    var progress = -rect.top / totalHeight;
    return clamp(progress, 0, 1);
  };

  JennyScrollHero.prototype.startLoop = function () {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame(this.tick.bind(this));
  };

  JennyScrollHero.prototype.tick = function () {
    // Smoothen the scroll progress (LERP)
    var diff = this.targetP - this.smoothP;
    
    if (Math.abs(diff) > 0.0001) {
      this.smoothP += diff * 0.12; // Easing coefficient
      this.render(this.smoothP);
      if (this.inView) {
        requestAnimationFrame(this.tick.bind(this));
      } else {
        this.running = false;
      }
    } else {
      this.smoothP = this.targetP;
      this.render(this.smoothP);
      this.running = false;
    }
  };

  JennyScrollHero.prototype.render = function (p) {
    var N = this.totalFrames;
    var S = this.totalSegments;

    // 1. Zoom/Push transform on Right Column image container
    var pushScale = 1 + smoothStep(p) * this.pushIntensity;
    this.framesContainer.style.transform = 'scale(' + pushScale.toFixed(4) + ')';

    // 2. Snappy frame dissolve calculation
    // We map 0..1 progress to which segment we are currently in
    var rawProgress = p * S;
    var segmentIdx = Math.floor(rawProgress);
    segmentIdx = clamp(segmentIdx, 0, S - 1);
    
    var segmentFraction = rawProgress - segmentIdx; // 0..1 within current segment

    // Snappy transition window (active transition occurs between 35% and 65% of the segment)
    var dissolveProgress = clamp((segmentFraction - 0.35) / 0.30, 0, 1);
    var smoothDissolve = smoothStep(dissolveProgress);

    for (var k = 0; k < N; k++) {
      var opacity = 0;
      if (k === segmentIdx) {
        opacity = 1 - smoothDissolve;
      } else if (k === segmentIdx + 1) {
        opacity = smoothDissolve;
      }
      
      // Lock last frame at the absolute end
      if (p >= 0.99 && k === N - 1) {
        opacity = 1;
      }
      this.frames[k].style.opacity = opacity.toFixed(3);
    }

    // 3. Parallax Foreground Cloud Wisps
    for (var w = 0; w < this.wisps.length; w++) {
      var el = this.wisps[w];
      var driftY = parseFloat(el.getAttribute('data-drift-y')) || 20;
      var driftX = parseFloat(el.getAttribute('data-drift-x')) || 0;
      
      var transY = p * driftY;
      var transX = p * driftX;
      
      // Wisps fade in/out at the boundaries (bell-curve style opacity)
      var wispOpacity = Math.sin(p * Math.PI) * 0.8;
      
      var scaleFlip = el.classList.contains('jh-wisp--2') ? 'scaleX(-1) ' : '';
      el.style.transform = scaleFlip + 'translate(' + transX.toFixed(1) + '%, ' + transY.toFixed(1) + '%)';
      el.style.opacity = clamp(wispOpacity, 0, 0.85).toFixed(3);
    }

    // 4. Text Beat Transitions & Transforms
    var b1 = this.beats[1];
    var b2 = this.beats[2];
    var b3 = this.beats[3];

    // Beat 1: Zoomed out, gazing away (fades out 0.15 -> 0.28)
    if (b1) {
      var out1 = clamp((p - 0.15) / 0.13, 0, 1);
      b1.style.opacity = (1 - out1).toFixed(3);
      b1.style.transform = 'translateY(' + (-p * 40).toFixed(1) + 'px)';
      b1.style.pointerEvents = out1 > 0.9 ? 'none' : 'auto';
    }

    // Beat 2: Zoom push-in (fades in 0.32 -> 0.45, fades out 0.65 -> 0.75)
    if (b2) {
      var in2 = clamp((p - 0.32) / 0.13, 0, 1);
      var out2 = clamp((p - 0.65) / 0.10, 0, 1);
      var opacity2 = in2 * (1 - out2);
      b2.style.opacity = opacity2.toFixed(3);
      b2.style.transform = 'translateY(' + ((1 - in2) * 20 - out2 * 20).toFixed(1) + 'px)';
      b2.style.pointerEvents = opacity2 > 0.1 ? 'auto' : 'none';
    }

    // Beat 3: Close up / final invite (fades in 0.78 -> 0.88)
    if (b3) {
      var in3 = clamp((p - 0.78) / 0.10, 0, 1);
      b3.style.opacity = in3.toFixed(3);
      b3.style.transform = 'translateY(' + ((1 - in3) * 20).toFixed(1) + 'px)';
      b3.style.pointerEvents = in3 > 0.1 ? 'auto' : 'none';
    }

    // 5. Corner Metadata & Scroll Cue
    var metaOpacity = clamp((p - 0.15) / 0.12, 0, 1);
    for (var m = 0; m < this.metadataEls.length; m++) {
      this.metadataEls[m].style.opacity = metaOpacity.toFixed(3);
    }

    if (this.cueEl) {
      var cueOpacity = clamp(1 - p * 5, 0, 1);
      this.cueEl.style.opacity = cueOpacity.toFixed(3);
    }
  };

  JennyScrollHero.prototype.renderStatic = function () {
    this.stage.style.position = 'relative';
    this.stage.style.height = '100vh';
    this.framesContainer.style.transform = 'scale(' + (1 + this.pushIntensity) + ')';
    
    for (var k = 0; k < this.totalFrames; k++) {
      this.frames[k].style.opacity = k === this.totalFrames - 1 ? '1' : '0';
    }
    
    if (this.wispsContainer) this.wispsContainer.style.display = 'none';
    if (this.cueEl) this.cueEl.style.display = 'none';
    
    if (this.beats[1]) this.beats[1].style.opacity = 0;
    if (this.beats[2]) this.beats[2].style.opacity = 0;
    if (this.beats[3]) {
      this.beats[3].style.opacity = 1;
      this.beats[3].style.pointerEvents = 'auto';
      this.beats[3].style.transform = 'none';
    }

    for (var m = 0; m < this.metadataEls.length; m++) {
      this.metadataEls[m].style.opacity = '1';
    }
  };

  // --- Auto Initialization ---
  function init() {
    var els = document.querySelectorAll('.jenny-hero-widget');
    els.forEach(function (el) {
      if (!el.__heroInstance) {
        el.__heroInstance = new JennyScrollHero(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
