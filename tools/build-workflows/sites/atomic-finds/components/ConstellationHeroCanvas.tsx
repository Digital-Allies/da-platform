'use client';

// TODO: revisit once the new Atomic Finds design system is attached — bespoke galaxy animation may not survive the rebrand.

import React, { useEffect, useRef } from 'react';

const SHAPES = [
  { name: 'Peacock Chair', img: '/atomic-finds/products/product-peacock-chair-02.png' },
  { name: 'Rattan Armchair', img: '/atomic-finds/products/product-rattan-armchair-08.png' },
  { name: 'Bamboo Armchair', img: '/atomic-finds/products/product-bamboo-armchair-09.png' },
  { name: 'Arched Étagère', img: '/atomic-finds/products/product-arched-etagere-07.png' },
  { name: 'Floor Lamp', img: '/atomic-finds/products/product-floor-lamp-06.png' },
];

interface ConstellationHeroCanvasProps {
  children?: React.ReactNode;
}

export default function ConstellationHeroCanvas({ children }: ConstellationHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let lastTime = 0;
    let phase = 'drift';
    let phaseStart = performance.now();
    let currentShapeIdx = 0;

    const loadedImages: HTMLImageElement[] = SHAPES.map((s) => {
      const img = new Image();
      img.src = s.img;
      return img;
    });

    let dims = { w: 0, h: 0 };
    const mouse = { x: -9999, y: -9999, active: false };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dims = { w: rect.width, h: rect.height };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const count = 280;
    const formableCount = 150;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * (dims.w || 1000),
      y: Math.random() * (dims.h || 600),
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.4 + 1,
      isFormable: i < formableCount,
      tx: null as number | null,
      ty: null as number | null,
      formX: null as number | null,
      formY: null as number | null,
      dissolveVX: null as number | null,
      dissolveVY: null as number | null,
      breakBefore: false,
      phaseOffset: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.4 + Math.random() * 0.8,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const getStageCircle = () => {
      const w = dims.w, h = dims.h;
      const r = Math.min(w, h) * 0.22;
      return { cx: w / 2, cy: h / 2, r };
    };

    const assignShapeTargets = () => {
      const { cx, cy, r } = getStageCircle();
      const ringR = r * 1.15;
      for (let i = 0; i < formableCount; i++) {
        const p = particles[i];
        const ang = (i / formableCount) * Math.PI * 2 - Math.PI / 2;
        p.formX = p.x;
        p.formY = p.y;
        p.tx = cx + Math.cos(ang) * ringR;
        p.ty = cy + Math.sin(ang) * ringR;
        p.breakBefore = i === 0;
      }
    };

    const startForming = (idx: number) => {
      currentShapeIdx = idx;
      assignShapeTargets();
      phase = 'forming';
      phaseStart = performance.now();
    };

    const startDissolving = () => {
      phase = 'dissolving';
      phaseStart = performance.now();
      particles.forEach((p) => {
        p.dissolveVX = null;
        p.dissolveVY = null;
      });
    };

    const clearTargets = () => {
      particles.forEach((p) => {
        if (p.isFormable) {
          p.tx = null;
          p.ty = null;
          p.vx = (Math.random() - 0.5) * 0.6;
          p.vy = (Math.random() - 0.5) * 0.6;
        }
      });
    };

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const update = (now: number, dt: number) => {
      const durations = { drift: 1400, forming: 2500, formed: 3000, dissolving: 1400 };
      const elapsed = now - phaseStart;
      const w = dims.w, h = dims.h;

      if (phase === 'drift') {
        if (elapsed >= durations.drift) {
          startForming((currentShapeIdx + 1) % SHAPES.length);
        }
      } else if (phase === 'forming') {
        if (elapsed >= durations.forming) {
          phase = 'formed';
          phaseStart = now;
        }
      } else if (phase === 'formed') {
        if (elapsed >= durations.formed) {
          startDissolving();
        }
      } else if (phase === 'dissolving') {
        if (elapsed >= durations.dissolving) {
          phase = 'drift';
          phaseStart = now;
          clearTargets();
        }
      }

      particles.forEach((p) => {
        if (p.isFormable && p.tx != null && phase !== 'drift') {
          if (phase === 'forming') {
            const t = ease(Math.min(1, elapsed / durations.forming));
            p.x = (p.formX ?? p.x) + ((p.tx ?? p.x) - (p.formX ?? p.x)) * t;
            p.y = (p.formY ?? p.y) + ((p.ty ?? p.y) - (p.formY ?? p.y)) * t;
          } else if (phase === 'formed') {
            p.x = (p.tx ?? p.x) + Math.sin(now / 600 + p.phaseOffset) * 1.2;
            p.y = (p.ty ?? p.y) + Math.cos(now / 700 + p.phaseOffset) * 1.2;
          } else if (phase === 'dissolving') {
            if (p.dissolveVX == null) {
              const ang = Math.random() * Math.PI * 2;
              const spd = 0.6 + Math.random() * 0.8;
              p.dissolveVX = Math.cos(ang) * spd;
              p.dissolveVY = Math.sin(ang) * spd;
            }
            p.x += (p.dissolveVX ?? 0) * dt * 0.06;
            p.y += (p.dissolveVY ?? 0) * dt * 0.06;
            p.vx = (p.dissolveVX ?? 0) * 0.3;
            p.vy = (p.dissolveVY ?? 0) * 0.3;
          }
        } else {
          p.x += p.vx * dt * 0.05;
          p.y += p.vy * dt * 0.05;
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
          p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
          p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        if (mouse.active && (phase === 'drift' || !p.isFormable)) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          const R = 150;
          if (dist < R && dist > 0.01) {
            const pull = (1 - dist / R) * (1 - dist / R) * 0.04;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
            p.vx *= 0.985;
            p.vy *= 0.985;
          }
        }
      });
    };

    const draw = (now: number) => {
      const w = dims.w, h = dims.h;
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w / 2, h * 0.45, 10, w / 2, h * 0.5, Math.max(w, h) * 0.75);
      grad.addColorStop(0, '#2a2017');
      grad.addColorStop(1, '#141119');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      if (phase !== 'drift' && loadedImages[currentShapeIdx]) {
        const img = loadedImages[currentShapeIdx];
        if (img.complete && img.naturalWidth) {
          const { cx, cy, r } = getStageCircle();
          const elapsed = now - phaseStart;
          let alpha = 1;
          const durations = { forming: 2500, dissolving: 1400 };
          if (phase === 'forming') alpha = ease(Math.min(1, elapsed / durations.forming));
          else if (phase === 'dissolving') alpha = 1 - ease(Math.min(1, elapsed / durations.dissolving));

          ctx.save();
          ctx.globalAlpha = alpha * 0.85;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
          ctx.restore();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (a.isFormable && a.tx != null && phase !== 'drift') continue;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (b.isFormable && b.tx != null && phase !== 'drift') continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 70) {
            const op = (1 - d / 70) * 0.28;
            ctx.strokeStyle = `rgba(240,232,216,${op})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (phase !== 'drift') {
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = 'rgba(245,200,66,0.6)';
        ctx.shadowColor = 'rgba(245,200,66,0.8)';
        ctx.shadowBlur = phase === 'formed' ? 8 + 2 * Math.sin(now / 400) : 4;
        ctx.beginPath();
        for (let i = 0; i < formableCount; i++) {
          const p = particles[i];
          if (p.breakBefore || i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      particles.forEach((p) => {
        const active = p.isFormable && p.tx != null && phase !== 'drift';
        ctx.beginPath();
        if (active) {
          ctx.fillStyle = phase === 'formed' ? '#F5C842' : '#F0E8D8';
          ctx.shadowColor = 'rgba(245,200,66,0.9)';
          ctx.shadowBlur = phase === 'formed' ? 10 : 5;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        } else {
          const tw = 0.55 + 0.45 * Math.sin((now / 1000) * p.twinkleSpeed + p.twinklePhase);
          ctx.fillStyle = `rgba(240,232,216,${(0.5 + tw * 0.4).toFixed(2)})`;
          ctx.shadowColor = 'rgba(240,232,216,0.4)';
          ctx.shadowBlur = 1.5 + tw * 1.5;
          ctx.arc(p.x, p.y, p.r * (0.85 + tw * 0.3), 0, Math.PI * 2);
        }
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    };

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (!lastTime) lastTime = now;
      const dt = Math.min(50, now - lastTime);
      lastTime = now;
      update(now, dt);
      draw(now);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '520px', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'auto',
        }}
      />
      {children && (
        <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          {children}
        </div>
      )}
    </div>
  );
}
