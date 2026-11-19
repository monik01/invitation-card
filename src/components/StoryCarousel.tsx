import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const STORY_PHOTOS = [
  {
    src: '/src/assets/images/story_moment_walk_hijab_1795103245238.jpg',
    alt: 'Our story moment 1, bride in a modest ivory and gold hijab and groom walking hand in hand down a sunlit palace corridor, faces out of frame',
    caption: 'Walking together in faith and serenity',
  },
  {
    src: '/src/assets/images/story_moment_hands_1795017440693.jpg',
    alt: 'Our story moment 2, clasped hands with henna and gold bangles framed by white roses, faces out of frame',
    caption: 'Two hands, one promise written in grace',
  },
  {
    src: '/src/assets/images/story_moment_courtyard_1795017442218.jpg',
    alt: 'Our story moment 3, shown from behind beneath an ivory floral arch overlooking a quiet courtyard, faces out of frame',
    caption: 'Beneath a canopy of white roses and duas',
  },
];

export function StoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(STORY_PHOTOS.length - 1, index));
    setActiveIndex(next);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: next * scrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(
      scrollRef.current.scrollLeft / Math.max(1, scrollRef.current.clientWidth)
    );
    setActiveIndex(idx);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative mt-5">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto border border-[#9E7322]/65 bg-[#E7D6B6]"
        >
          {STORY_PHOTOS.map((photo, idx) => (
            <div key={photo.src} className="w-full shrink-0 snap-center">
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#E7D6B6]">
                {!failedImages[idx] ? (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [idx]: true }))
                    }
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F2E5CB] to-[#E2CEAA] px-6 text-center">
                    <span className="font-calligraphy gold-calligraphy text-5xl">
                      Samira &amp; Mujammil
                    </span>
                    <p className="mt-2 font-serif-editorial text-lg italic text-[#5E3C26]">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous photo"
          className="absolute top-1/2 left-2.5 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#9E7322]/75 bg-[#F4E9D2]/95 text-[#563826] shadow transition-colors hover:bg-[#E7D4AE] disabled:cursor-default disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === STORY_PHOTOS.length - 1}
          aria-label="Next photo"
          className="absolute top-1/2 right-2.5 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#9E7322]/75 bg-[#F4E9D2]/95 text-[#563826] shadow transition-colors hover:bg-[#E7D4AE] disabled:cursor-default disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 font-serif-editorial text-lg sm:text-xl italic text-[#5E3C26]">
        {STORY_PHOTOS[activeIndex].caption}
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        {STORY_PHOTOS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Go to photo ${idx + 1}`}
            className={`h-2 cursor-pointer transition-all ${
              idx === activeIndex
                ? 'w-7 bg-[#845C17]'
                : 'w-2 bg-[#B88D36]/60 hover:bg-[#845C17]'
            }`}
          />
        ))}
      </div>

      <p className="mt-2 font-serif-editorial text-sm tracking-[0.2em] uppercase text-[#7A5338] tabular-nums">
        Photo {activeIndex + 1} of {STORY_PHOTOS.length}
      </p>
    </div>
  );
}
