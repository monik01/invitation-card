import React from 'react';

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#9E7322]/45 bg-[#D8C19B]/95 backdrop-blur-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#bismillah"
          className="font-calligraphy gold-calligraphy text-3xl sm:text-4xl whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#845C17]"
        >
          Samira &amp; Mujammil
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Invitation sections"
          className="hidden md:flex items-center gap-7 font-serif-editorial text-lg font-medium text-[#5E3C26]"
        >
          <a
            href="#bismillah"
            className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors hover:border-[#845C17] hover:text-[#845C17]"
          >
            Invitation
          </a>
          <a
            href="#countdown"
            className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors hover:border-[#845C17] hover:text-[#845C17]"
          >
            Countdown
          </a>
          <a
            href="#timeline"
            className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors hover:border-[#845C17] hover:text-[#845C17]"
          >
            Timeline
          </a>
          <a
            href="#festivities"
            className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors hover:border-[#845C17] hover:text-[#845C17]"
          >
            Festivities
          </a>
          <a
            href="#our-story"
            className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors hover:border-[#845C17] hover:text-[#845C17]"
          >
            Our Story
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <a
            href="#blessings"
            className="whitespace-nowrap shrink-0 border border-[#9E7322]/75 bg-[#F4E9D2] px-5 py-2 font-serif-editorial text-sm sm:text-base font-semibold tracking-wider uppercase text-[#5E3C26] shadow-xs transition-colors hover:bg-[#E7D4AE] hover:text-[#4D301D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#845C17]"
          >
            Share Blessing
          </a>
        </div>
      </div>
    </header>
  );
}
