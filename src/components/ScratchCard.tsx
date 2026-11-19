import React, { useCallback, useEffect, useRef, useState } from 'react';

export function ScratchCard() {
  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);

  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || revealed) return;

    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#DEC58E');
    grad.addColorStop(0.5, '#BC9649');
    grad.addColorStop(1, '#D6BA7B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = 0; i < 24; i++) {
      ctx.fillRect((i * 37) % width, (i * 53) % height, 2, 2);
    }

    ctx.fillStyle = '#563826';
    ctx.textAlign = 'center';
    ctx.font = '600 15px "Playfair Display", Georgia, serif';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 - 5);
    ctx.font = 'italic 15px "Playfair Display", Georgia, serif';
    ctx.fillStyle = 'rgba(86, 56, 38, 0.9)';
    ctx.fillText('Gently rub to uncover the day', width / 2, height / 2 + 18);
  }, [revealed]);

  useEffect(() => {
    const t = window.setTimeout(drawFoil, 100);
    window.addEventListener('resize', drawFoil);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', drawFoil);
    };
  }, [drawFoil]);

  const scratchAt = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24 * dpr, 0, Math.PI * 2);
    ctx.fill();

    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      const step = 16;
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] === 0) cleared++;
      }
      const pct = Math.round((cleared / (data.length / 4 / step)) * 100);
      setPercent(pct);
      if (pct > 42) {
        setRevealed(true);
      }
    } catch {
      // Ignore readback restriction
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative mx-auto mt-6 h-[180px] w-full max-w-[320px] overflow-hidden border border-[#8E651B]/80 bg-[#DFC9A3] shadow-md"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="font-calligraphy gold-calligraphy text-4xl sm:text-5xl">
            A date with destiny
          </p>
          <p className="mt-2 font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#563826] tabular-nums">
            23 December 2026
          </p>
          <p className="mt-1 font-serif-editorial text-sm tracking-[0.22em] uppercase text-[#7A5338]">
            Nikah Ceremony
          </p>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none cursor-pointer"
            aria-label="Scratch card. Rub to reveal the wedding date."
            onPointerDown={(e) => {
              isDrawingRef.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratchAt(e);
            }}
            onPointerMove={(e) => {
              if (isDrawingRef.current) scratchAt(e);
            }}
            onPointerUp={() => {
              isDrawingRef.current = false;
            }}
            onPointerCancel={() => {
              isDrawingRef.current = false;
            }}
          />
        )}
      </div>

      <p className="mt-4 font-serif-editorial text-base text-[#6B4731] tabular-nums">
        {revealed
          ? 'The day is revealed — 23 December 2026.'
          : `Keep scratching — ${Math.max(0, 42 - percent)}% more to reveal`}
      </p>

      {!revealed && (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-2 cursor-pointer border-b border-[#845C17]/70 pb-0.5 font-serif-editorial text-base italic text-[#845C17] transition-colors hover:text-[#563826]"
        >
          Reveal without scratching
        </button>
      )}
    </div>
  );
}
