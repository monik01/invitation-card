import React, { useState } from 'react';
import { FloralFallbackIllustration, OrnamentalBorderOverlay } from './GoldOrnament';

export type FloralVariant =
  | 'main'
  | 'hina'
  | 'utsav'
  | 'ceremony'
  | 'info-left'
  | 'info-right'
  | 'info-center'
  | 'final';

interface InvitationCardProps {
  id?: string;
  floralVariant: FloralVariant;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FLORAL_ASSETS: Record<
  FloralVariant,
  { src: string; imgClass: string; alt: string }
> = {
  main: {
    src: '/src/assets/images/nikah_main_floral_card_1795016994193.jpg',
    imgClass: 'object-cover object-center scale-[1.03]',
    alt: 'Warm cream stationery framed with white and champagne roses, pampas grass, and golden pearls',
  },
  hina: {
    src: '/src/assets/images/jashn_hina_floral_card_1795016988860.jpg',
    imgClass: 'object-cover object-center scale-[1.03]',
    alt: 'Cream stationery with asymmetrical top-left and bottom-right champagne roses, pampas grass, and pearls',
  },
  utsav: {
    src: '/src/assets/images/jashn_hina_floral_card_1795016988860.jpg',
    imgClass: 'object-cover object-center scale-[1.03] -scale-x-100',
    alt: 'Cream stationery with diagonal top-right and bottom-left white roses, pampas plumes, and golden pearls',
  },
  ceremony: {
    src: '/src/assets/images/nikah_main_floral_card_1795016994193.jpg',
    imgClass: 'object-cover object-center scale-[1.04] rotate-180',
    alt: 'Cream stationery framed with white garden roses, cream pampas grass, and golden pearl strands',
  },
  'info-left': {
    src: '/src/assets/images/event_info_floral_card_1795016991166.jpg',
    imgClass: 'object-cover object-center scale-[1.38]',
    alt: 'Warm cream detail card accented with white roses, pampas sprigs, and golden pearls',
  },
  'info-center': {
    src: '/src/assets/images/event_info_floral_card_1795016991166.jpg',
    imgClass: 'object-cover object-center scale-[1.38] -scale-x-100',
    alt: 'Warm cream detail card accented with champagne roses, pampas sprigs, and golden pearls',
  },
  'info-right': {
    src: '/src/assets/images/event_info_floral_card_1795016991166.jpg',
    imgClass: 'object-cover object-center scale-[1.38] rotate-180',
    alt: 'Warm cream detail card accented with white and cream roses, pampas grass, and golden pearls',
  },
  final: {
    src: '/src/assets/images/nikah_main_floral_card_1795016994193.jpg',
    imgClass: 'object-cover object-center scale-[1.03] -scale-x-100',
    alt: 'Warm cream wedding closing card with white roses, pampas grass, and golden pearl borders',
  },
};

export function InvitationCard({
  id,
  floralVariant,
  compact = false,
  className = '',
  children,
}: InvitationCardProps) {
  const [imgError, setImgError] = useState(false);
  const asset = FLORAL_ASSETS[floralVariant];

  return (
    <article
      id={id}
      className={`stationery-card relative overflow-hidden border border-[#B09260] ${
        compact
          ? 'px-8 py-12 sm:px-10 sm:py-14'
          : 'px-8 py-16 sm:px-16 sm:py-24 md:px-20 md:py-24'
      } ${className}`}
    >
      {/* Richly darkened floral & pampas stationery background artwork */}
      {!imgError ? (
        <img
          src={asset.src}
          alt={asset.alt}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full select-none brightness-[0.74] contrast-[1.12] saturate-[1.10] sepia-[0.22] ${asset.imgClass}`}
        />
      ) : (
        <FloralFallbackIllustration />
      )}

      {/* Deep warm antique parchment reading veil — darkened background across all cards */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background: compact
            ? 'radial-gradient(ellipse 74% 72% at 50% 50%, rgba(223, 201, 163, 0.84) 38%, rgba(214, 189, 146, 0.56) 72%, rgba(190, 160, 114, 0.18) 100%)'
            : 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(223, 201, 163, 0.84) 40%, rgba(214, 189, 146, 0.58) 72%, rgba(190, 160, 114, 0.16) 100%)',
        }}
      />

      {/* Champagne-gold double ornamental frame & golden pearls */}
      <OrnamentalBorderOverlay compact={compact} />

      {/* Content layer */}
      <div className="relative z-30 mx-auto flex h-full flex-col items-center justify-center text-center">
        {children}
      </div>
    </article>
  );
}
