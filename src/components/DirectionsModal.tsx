import React from 'react';
import { X, MapPin } from 'lucide-react';
import { OrnamentalDivider } from './GoldOrnament';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NIKAH_MAP_URL =
  'https://maps.app.goo.gl/RHBVBe4mky7cJqX58?g_st=ac';
export const PRE_WEDDING_MAP_URL =
  'https://maps.app.goo.gl/eAcVa2rR7vu4FN1w5';

export function DirectionsModal({ isOpen, onClose }: DirectionsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3E2414]/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="directions-modal-title"
      onClick={onClose}
    >
      <div
        className="stationery-card relative w-full max-w-lg border border-[#8E651B]/80 px-7 py-9 sm:px-10 sm:py-11 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-3 border border-[#9E7322]/55"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close directions"
          className="absolute top-5 right-5 z-10 cursor-pointer p-1.5 text-[#6B4731] transition-colors hover:text-[#563826]"
        >
          <X className="h-5 w-5" />
        </button>

        <MapPin className="mx-auto h-6 w-6 text-[#9E7322]" aria-hidden="true" />

        <h3
          id="directions-modal-title"
          className="mt-2 font-calligraphy gold-calligraphy text-5xl sm:text-6xl"
        >
          Venue &amp; Locations
        </h3>

        <p className="mt-1 font-serif-editorial text-sm sm:text-base tracking-[0.2em] uppercase text-[#7A5338]">
          Jumla Party Hall, Sansroad
        </p>

        <OrnamentalDivider className="my-4" />

        <div className="space-y-4 text-left font-serif-editorial text-lg text-[#5E3C26]">
          <div className="border-b border-[#B88D36]/35 pb-3">
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-[#7A5338]">
              Nikah Ceremony (23 December 2026 · After Namaz-e-Zohar)
            </p>
            <p className="mt-0.5 font-semibold text-[#563826]">
              Jumla Party Hall, Sansroad
            </p>
            <a
              href={NIKAH_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-base font-medium text-[#845C17] underline underline-offset-4 hover:text-[#563826]"
            >
              View Nikah Venue on Google Maps
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-[#7A5338]">
              Jashn-e-Heena (21 Dec) &amp; Rasm-e-Haldi (22 Dec)
            </p>
            <p className="mt-0.5 text-[#563826]">
              Hosted at the Ranguni family celebration venue
            </p>
            <a
              href={PRE_WEDDING_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-base font-medium text-[#845C17] underline underline-offset-4 hover:text-[#563826]"
            >
              View Pre-Wedding Venue on Google Maps
            </a>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <a
            href={NIKAH_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#845C17] bg-[#E8D5AF] px-6 py-2.5 font-serif-editorial text-sm sm:text-base font-semibold tracking-[0.14em] uppercase text-[#563826] transition-colors hover:bg-[#DEC595]"
          >
            Open Nikah Map
          </a>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border border-[#9E7322]/65 bg-[#F4E9D2] px-5 py-2.5 font-serif-editorial text-sm sm:text-base font-semibold tracking-[0.14em] uppercase text-[#6B4731] transition-colors hover:bg-[#E8D5AF]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
