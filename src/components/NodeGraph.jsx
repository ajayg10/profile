import { useEffect, useRef, useCallback } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Enhanced Neural Constellation Net representing VEDA's cognitive network.
 * Features 65+ active drifting nodes that connect dynamically when close,
 * forming a living network web.
 * - Interactive: Mouse cursor acts as a gravity well, pulling/pushing particles
 *   and drawing interactive web lines to nearby nodes.
 * - Core Nodes: VEDA's architecture hubs (Orchestrator, Planner, Memory, Executor, Gateway)
 *   are embedded as larger, glowing hub nodes that return to their anchors via spring physics.
 */

const HUB_NODES = [
  { id: 'orchestrator', label: 'Orchestrator', relX: 0.5, relY: 0.45, radius: 28, color: '#00D9FF', glow: true },
  { id: 'planner', label: 'Planner', relX: 0.28, relY: 0.28, radius: 20, color: '#8B5CF6', glow: false },
  { id: 'memory', label: 'Memory', relX: 0.72, relY: 0.28, radius: 20, color: '#8B5CF6', glow: false },
  { id: 'executor', label: 'Executor', relX: 0.28, relY: 0.65, radius: 20, color: '#8B5CF6', glow: false },
  { id: 'gateway', label: 'Gateway', relX: 0.72, relY: 0.65, radius: 20, color: '#00D9FF', glow: false },
];

const HUB_CONNECTIONS = [
  { from: 'orchestrator', to: 'planner' },
  { from: 'orchestrator', to: 'memory' },
  { from: 'orchestrator', to: 'executor' },
  { from: 'orchestrator', to: 'gateway' },
];

export default function NodeGraph() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]); // Drifting constellation particles (60 items)
  const hubsRef = useRef([]);      // Interactive VEDA hub nodes (5 items)
  const pulsesRef = useRef([]);    // Data pulses along VEDA connections
  const mouseRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const timeRef = useRef(0);

  const initNetwork = useCallback((width, height) => {
    // 1. Initialize VEDA Hubs with positions
    hubsRef.current = HUB_NODES.map((hub) => ({
      ...hub,
      x: hub.relX * width,
      y: hub.relY * height,
      vx: 0,
      vy: 0,
    }));

    // 2. Initialize Drifting Constellation Particles
    const particles = [];
    const colors = ['#00D9FF', '#8B5CF6', '#94A3B8'];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.15 + Math.random() * 0.35,
      });
    }
    particlesRef.current = particles;

    // 3. Initialize Hub-to-Hub Data Pulses
    const pulses = [];
    HUB_CONNECTIONS.forEach((conn) => {
      for (let i = 0; i < 2; i++) {
        pulses.push({
          fromId: conn.from,
          toId: conn.to,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          size: 2 + Math.random() * 2,
        });
      }
    });
    pulsesRef.current = pulses;
  }, []);

  const draw = useCallback((ctx, width, height, dpr) => {
    ctx.clearRect(0, 0, width * dpr, height * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    const time = timeRef.current;
    const hubs = hubsRef.current;
    const particles = particlesRef.current;
    const pulses = pulsesRef.current;

    if (hubs.length === 0) return;

    // 1. Update Hub Positions (Apply Spring Physics towards default Anchors + Mouse Push)
    hubs.forEach((hub) => {
      const anchorX = hub.relX * width;
      const anchorY = hub.relY * height;

      // Spring force returning to anchor
      const k = 0.05; // Spring constant
      const ax = (anchorX - hub.x) * k;
      const ay = (anchorY - hub.y) * k;

      hub.vx += ax;
      hub.vy += ay;

      // Mouse push force
      if (!reducedMotion && mouseRef.current) {
        const dx = mouseRef.current.x - hub.x;
        const dy = mouseRef.current.y - hub.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          // Push away
          hub.vx -= Math.cos(angle) * force * 1.5;
          hub.vy -= Math.sin(angle) * force * 1.5;
        }
      }

      // Apply friction and update position
      hub.vx *= 0.85;
      hub.vy *= 0.85;
      hub.x += hub.vx;
      hub.y += hub.vy;
    });

    const hubMap = {};
    hubs.forEach((h) => { hubMap[h.id] = h; });

    // 2. Update and Draw Drifting Constellation Particles
    particles.forEach((p) => {
      // Basic drift
      p.x += p.vx;
      p.y += p.vy;

      // Screen boundary wrapping
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse orbital gravity well
      if (!reducedMotion && mouseRef.current) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          if (dist < 40) {
            // Push away if too close
            const force = (40 - dist) / 40;
            p.x -= Math.cos(angle) * force * 1.8;
            p.y -= Math.sin(angle) * force * 1.8;
          } else {
            // Pull in towards orbit ring
            const force = (150 - dist) / 110;
            p.x += Math.cos(angle) * force * 0.45;
            p.y += Math.sin(angle) * force * 0.45;
          }
        }
      }
    });

    // 3. Draw Web Lines (Constellation Mesh) between nearby particles
    if (!reducedMotion) {
      const maxDistance = 90;
      ctx.lineWidth = 0.7;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = ((maxDistance - dist) / maxDistance) * 0.08;
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Faint connections between drifting particles and main VEDA hubs
        hubs.forEach((hub) => {
          const dx = p1.x - hub.x;
          const dy = p1.y - hub.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.07;
            ctx.strokeStyle = hub.color === '#00D9FF' ? `rgba(0, 217, 255, ${alpha})` : `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(hub.x, hub.y);
            ctx.stroke();
          }
        });
      }

      // Draw web lines connecting mouse to nearby particles (Spiderweb overlay)
      if (mouseRef.current) {
        const mouseRadius = 140;
        particles.forEach((p) => {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = ((mouseRadius - dist) / mouseRadius) * 0.15;
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }
    }

    // 4. Draw Core Hub-to-Hub Connections
    HUB_CONNECTIONS.forEach((conn) => {
      const from = hubMap[conn.from];
      const to = hubMap[conn.to];
      if (!from || !to) return;

      const pulse = 0.12 + 0.06 * Math.sin(time * 0.002 + from.x * 0.01);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = `rgba(0, 217, 255, ${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 5. Draw Hub Data Pulses
    if (!reducedMotion) {
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const from = hubMap[p.fromId];
        const to = hubMap[p.toId];
        if (!from || !to) return;

        const x = from.x + (to.x - from.x) * p.progress;
        const y = from.y + (to.y - from.y) * p.progress;

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        gradient.addColorStop(0, `rgba(0, 217, 255, 0.35)`);
        gradient.addColorStop(1, `rgba(0, 217, 255, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00D9FF';
        ctx.fill();
      });
    }

    // 6. Draw Particle Nodes
    particles.forEach((p) => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // 7. Draw VEDA Hub Nodes
    hubs.forEach((node) => {
      const pulse = reducedMotion ? 1 : 0.85 + 0.15 * Math.sin(time * 0.003 + node.x * 0.02);

      // Outer glow
      if (node.glow) {
        const glowGrad = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, node.radius * 3.5);
        glowGrad.addColorStop(0, `rgba(0, 217, 255, ${0.16 * pulse})`);
        glowGrad.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      // Hub Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0A0E14';
      ctx.fill();

      // Border glow ring
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = pulse;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Hub Label text
      ctx.font = `600 ${node.radius > 24 ? 10 : 8}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * pulse})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });

    ctx.restore();
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initNetwork(rect.width, rect.height);
    };

    resize();

    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    window.addEventListener('resize', throttledResize);

    // Track mouse position on the canvas coordinate space
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    if (!reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    if (reducedMotion) {
      const rect = canvas.parentElement.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, dpr);
    } else {
      const animate = () => {
        timeRef.current += 16;
        const rect = canvas.parentElement.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, dpr);
        animFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      window.removeEventListener('resize', throttledResize);
      if (!reducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(resizeTimeout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw, initNetwork, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    />
  );
}
