import React, { useState } from 'react';

interface DividerProps {
  variant?: 'lotus' | 'diamond' | 'arabesque';
  className?: string;
}

export function OrnamentalDivider({ className = '' }: DividerProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className={`my-5 flex w-full items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {!imgFailed ? (
        <img
          src="/assets/floral-divider-transparent.png"
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="h-auto w-full max-w-[300px] sm:max-w-[350px] select-none object-contain brightness-[0.88] contrast-[1.04] drop-shadow-[0_2px_4px_rgba(74,46,27,0.14)]"
        />
      ) : (
        <svg
          width="320"
          height="36"
          viewBox="0 0 320 36"
          fill="none"
          className="w-full max-w-[320px]"
        >
          <path
            d="M16 18 Q85 10 160 18 Q235 10 304 18"
            stroke="#8C641D"
            strokeWidth="1"
          />
          <circle cx="160" cy="18" r="8" fill="#FAF4E8" stroke="#A87B22" strokeWidth="1" />
          <circle cx="144" cy="18" r="5" fill="#DFC073" stroke="#8C641D" strokeWidth="0.9" />
          <circle cx="176" cy="18" r="5" fill="#DFC073" stroke="#8C641D" strokeWidth="0.9" />
          <circle cx="128" cy="18" r="4" fill="#9A6B42" />
          <circle cx="192" cy="18" r="4" fill="#9A6B42" />
        </svg>
      )}
    </div>
  );
}

export function OrnamentalBorderOverlay({ compact = false }: { compact?: boolean }) {
  const insetOuter = compact ? 'inset-3 sm:inset-4' : 'inset-4 sm:inset-6';
  const insetInner = compact ? 'inset-[17px] sm:inset-[21px]' : 'inset-[22px] sm:inset-[30px]';

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      {/* Outer champagne-gold hairline frame */}
      <div
        className={`absolute ${insetOuter} border border-[#9E7322]/75`}
      />
      {/* Inner delicate gold frame */}
      <div
        className={`absolute ${insetInner} border border-[#B88D36]/60`}
      />

      {/* Four golden pearl corner studs on the inner frame */}
      <span
        className={`golden-pearl absolute ${compact ? 'top-[14px] left-[14px] sm:top-[18px] sm:left-[18px]' : 'top-[19px] left-[19px] sm:top-[27px] sm:left-[27px]'} w-2.5 h-2.5 rounded-full`}
      />
      <span
        className={`golden-pearl absolute ${compact ? 'top-[14px] right-[14px] sm:top-[18px] sm:right-[18px]' : 'top-[19px] right-[19px] sm:top-[27px] sm:right-[27px]'} w-2.5 h-2.5 rounded-full`}
      />
      <span
        className={`golden-pearl absolute ${compact ? 'bottom-[14px] left-[14px] sm:bottom-[18px] sm:left-[18px]' : 'bottom-[19px] left-[19px] sm:bottom-[27px] sm:left-[27px]'} w-2.5 h-2.5 rounded-full`}
      />
      <span
        className={`golden-pearl absolute ${compact ? 'bottom-[14px] right-[14px] sm:bottom-[18px] sm:right-[18px]' : 'bottom-[19px] right-[19px] sm:bottom-[27px] sm:right-[27px]'} w-2.5 h-2.5 rounded-full`}
      />

      {/* Mid-edge subtle pearl clusters */}
      {!compact && (
        <>
          <div className="absolute top-[18px] sm:top-[26px] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <span className="golden-pearl w-1 h-1 rounded-full" />
            <span className="golden-pearl w-1.5 h-1.5 rounded-full" />
            <span className="golden-pearl w-1 h-1 rounded-full" />
          </div>
          <div className="absolute bottom-[18px] sm:bottom-[26px] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <span className="golden-pearl w-1 h-1 rounded-full" />
            <span className="golden-pearl w-1.5 h-1.5 rounded-full" />
            <span className="golden-pearl w-1 h-1 rounded-full" />
          </div>
        </>
      )}
    </div>
  );
}

export function SacredArchCrest() {
  return (
    <div className="flex flex-col items-center justify-center mb-3" aria-hidden="true">
      <svg
        width="96"
        height="42"
        viewBox="0 0 88 40"
        fill="none"
        className="text-[#9E7322]"
      >
        <path
          d="M10 34C22 34 30 22 44 10C58 22 66 34 78 34"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.85"
        />
        <path
          d="M18 34C27 34 34 25 44 16C54 25 61 34 70 34"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.65"
        />
        <path
          d="M44 4L47 8.5L44 13L41 8.5L44 4Z"
          fill="#D8B86A"
          stroke="currentColor"
          strokeWidth="0.85"
        />
        <circle cx="44" cy="24" r="2" fill="#9E7322" />
        <circle cx="37" cy="27" r="1.2" fill="#CFA956" />
        <circle cx="51" cy="27" r="1.2" fill="#CFA956" />
      </svg>
    </div>
  );
}

export function FloralFallbackIllustration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-[#F2E5CB] via-[#EADAB8] to-[#E1CCA4]"
      aria-hidden="true"
    >
      <svg
        className="absolute top-0 left-0 w-44 h-44 text-[#D8C19A] opacity-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="44" cy="44" r="28" fill="#F6EEDD" stroke="#B88D36" strokeWidth="1" />
        <circle cx="44" cy="44" r="16" stroke="#9E7322" strokeWidth="0.8" />
        <circle cx="78" cy="30" r="14" fill="#EFE2C8" stroke="#B88D36" strokeWidth="0.8" />
        <circle cx="30" cy="80" r="15" fill="#EFE2C8" stroke="#B88D36" strokeWidth="0.8" />
        <path d="M55 60 Q95 75 130 40" stroke="#9E7322" strokeWidth="0.8" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-44 h-44 rotate-180 text-[#D8C19A] opacity-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="44" cy="44" r="28" fill="#F6EEDD" stroke="#B88D36" strokeWidth="1" />
        <circle cx="44" cy="44" r="16" stroke="#9E7322" strokeWidth="0.8" />
        <circle cx="78" cy="30" r="14" fill="#EFE2C8" stroke="#B88D36" strokeWidth="0.8" />
        <circle cx="30" cy="80" r="15" fill="#EFE2C8" stroke="#B88D36" strokeWidth="0.8" />
        <path d="M55 60 Q95 75 130 40" stroke="#9E7322" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
