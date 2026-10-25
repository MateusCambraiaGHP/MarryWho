import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type Particle = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  decay: number;
  color: string;
  radius: number;
};

let hasPlayedInMemory = false;

function fireworksAlreadyPlayed(): boolean {
  return hasPlayedInMemory;
}

function rememberFireworks(): void {
  hasPlayedInMemory = true;
}

export function Fireworks() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || fireworksAlreadyPlayed()) {
      return;
    }

    rememberFireworks();
    setIsActive(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const particles: Particle[] = [];
    const burstTimes = [0, 550, 1250, 2050];
    const colors = ['#D9BC8C', '#F5EFE6', '#9DB3A4', '#E0A9A0'];
    const startedAt = performance.now();
    let nextBurst = 0;
    let viewportWidth = 0;
    let viewportHeight = 0;
    let animationFrame = 0;
    let isStopped = false;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = Math.round(viewportWidth * pixelRatio);
      canvas.height = Math.round(viewportHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const spawnBurst = () => {
      const originX = viewportWidth * (0.2 + Math.random() * 0.6);
      const originY = viewportHeight * (0.16 + Math.random() * 0.28);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particleCount = viewportWidth < 600 ? 46 : 72;

      for (let index = 0; index < particleCount; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 3.4;
        particles.push({
          x: originX,
          y: originY,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          color,
          radius: 1 + Math.random() * 1.8,
        });
      }
    };

    const render = (timestamp: number) => {
      if (isStopped) {
        return;
      }

      const elapsed = timestamp - startedAt;
      while (nextBurst < burstTimes.length && elapsed >= burstTimes[nextBurst]) {
        spawnBurst();
        nextBurst += 1;
      }

      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = 'rgba(0, 0, 0, 0.22)';
      context.fillRect(0, 0, viewportWidth, viewportHeight);
      context.globalCompositeOperation = 'lighter';

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.045;
        particle.velocityX *= 0.985;
        particle.velocityY *= 0.985;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        context.globalAlpha = Math.max(0, particle.life);
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      if (isStopped) {
        return;
      }
      isStopped = true;
      window.cancelAnimationFrame(animationFrame);
      setIsActive(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stop();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', stop, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    const stopTimer = window.setTimeout(stop, 4200);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      isStopped = true;
      window.clearTimeout(stopTimer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return <canvas ref={canvasRef} className="fireworks" aria-hidden="true" />;
}
