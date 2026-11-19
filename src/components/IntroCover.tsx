import React from 'react';
import { InvitationCard } from './InvitationCard';
import { OrnamentalDivider } from './GoldOrnament';

interface IntroCoverProps {
  onOpen: () => void;
}

export function IntroCover({ onOpen }: IntroCoverProps) {
  return (
    <main className="ivory-paper-canvas flex min-h-[100svh] items-center justify-center px-4 py-6 sm:px-8 sm:py-10">
      <div className="w-full max-w-2xl">
        <InvitationCard floralVariant="main" className="min-h-[84svh] flex flex-col justify-center">
          <div className="flex w-full flex-col items-center justify-between py-2 text-center">
            {/* Couple S & M Monogram Logo */}
            <div className="mb-4 flex items-center justify-center">
              <img
                src="/assets/logo-sm-transparent.png"
                alt="Samira and Mujammil floral monogram logo"
                referrerPolicy="no-referrer"
                className="h-28 w-auto select-none object-contain drop-shadow-[0_1px_1px_rgba(74,46,27,0.18)] sm:h-36"
              />
            </div>

            <p className="font-serif-editorial text-sm sm:text-base tracking-[0.26em] uppercase text-[#6E482E]">
              With the blessings of Allah
            </p>

            <h1 className="mt-3 font-serif-editorial text-3xl sm:text-5xl font-semibold leading-[1.12] tracking-[0.12em] uppercase text-[#563826]">
              Nikah Ceremony
              <br />
              Invitation
            </h1>

            <OrnamentalDivider className="my-5 w-full max-w-xs" />

            <p className="font-calligraphy gold-calligraphy text-5xl sm:text-6xl">
              Samira &amp; Mujammil
            </p>

            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={onOpen}
                className="cursor-pointer border border-[#785214] bg-[#845C17] px-10 py-3.5 font-serif-editorial text-sm sm:text-base font-semibold tracking-[0.26em] uppercase text-[#FFFDF6] shadow-[0_10px_26px_rgba(120,82,20,0.32)] transition-transform duration-200 hover:scale-[1.03] hover:bg-[#6E4B11] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#845C17]"
              >
                Tap to Open
              </button>

              <p className="mt-3 font-serif-editorial text-sm italic tracking-wide text-[#6E482E]">
                A celebration in white &amp; cream
              </p>
            </div>
          </div>
        </InvitationCard>
      </div>
    </main>
  );
}
