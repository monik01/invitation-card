import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, Heart, MapPin, Music, VolumeX } from 'lucide-react';
import { IntroCover } from './components/IntroCover';
import { TopNav } from './components/TopNav';
import { InvitationCard } from './components/InvitationCard';
import { OrnamentalDivider } from './components/GoldOrnament';
import { ScratchCard } from './components/ScratchCard';
import { StoryCarousel } from './components/StoryCarousel';
import { BlessingsCard } from './components/BlessingsCard';
import {
  DirectionsModal,
  NIKAH_MAP_URL,
  PRE_WEDDING_MAP_URL,
} from './components/DirectionsModal';

const NIKAH_DATE_TARGET = new Date('2026-12-23T13:00:00');

const NIKAH_TIMELINE = [
  {
    time: '10:00 AM',
    title: 'Guest Arriving',
    note: 'Warm welcome of family and elders at Jumla Party Hall',
  },
  {
    time: '11:00 AM',
    title: 'Lunch',
    note: 'Traditional celebratory wedding dastarkhwan',
  },
  {
    time: 'After Namaz-e-Zohar',
    title: 'Nikah Ceremony',
    note: 'Sacred Khutbah and solemnization of Qubool Hai',
  },
  {
    time: '3:00 PM',
    title: 'Blessing',
    note: 'Dua-e-Khair, heartfelt prayers, and family congratulations',
  },
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Subtle cream rose petals floating across the viewport
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, idx) => ({
        left: (idx * 61) % 100,
        delay: (idx % 7) * 1.7,
        duration: 10 + (idx % 5) * 2.2,
        size: 10 + (idx % 4) * 4,
      })),
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      if (el) {
        el.pause();
      }
    };
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.75;
      void audioRef.current.play().catch(() => {
        setMusicOn(false);
      });
    }
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 30);
  }, []);

  const toggleMusic = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        el.volume = 0.75;
        await el.play();
      } catch {
        setMusicOn(false);
      }
    } else {
      el.pause();
    }
  };

  const diffMs = Math.max(0, NIKAH_DATE_TARGET.getTime() - now.getTime());
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);

  const countdownUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="ivory-paper-canvas min-h-screen text-[#563826]">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setMusicOn(true)}
        onPause={() => setMusicOn(false)}
      >
        <source src="/assets/audio/background-music.mp3" type="audio/mpeg" />
        <source src="/assets/audio/background-music.m4a" type="audio/mp4" />
      </audio>

      {/* Gentle falling cream rose petals */}
      <div
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
        aria-hidden="true"
      >
        {petals.map((petal, idx) => (
          <span
            key={idx}
            className="cream-petal"
            style={{
              left: `${petal.left}%`,
              width: petal.size,
              height: petal.size * 0.72,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            }}
          />
        ))}
      </div>

      {!opened ? (
        <IntroCover onOpen={handleOpenInvitation} />
      ) : (
        <>
          <TopNav />

          {/* Floating Ambient Music Toggle (compact, unobtrusive) */}
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={musicOn ? 'Pause ambient music' : 'Play ambient music'}
            className="fixed right-4 bottom-4 z-40 inline-flex cursor-pointer items-center gap-2 border border-[#8E651B]/80 bg-[#DFC9A3]/95 px-4 py-2.5 font-serif-editorial text-sm font-semibold tracking-wider uppercase text-[#4A2E1B] shadow-md transition-colors hover:bg-[#D4BA8E]"
          >
            {musicOn ? (
              <Music className="h-4 w-4 text-[#845C17]" />
            ) : (
              <VolumeX className="h-4 w-4 text-[#7A5338]" />
            )}
            <span>Music: {musicOn ? 'ON' : 'OFF'}</span>
          </button>

          <main className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:space-y-20 sm:px-8 sm:py-14">
            {/* 1. MAIN NIKAH INVITATION */}
            <section id="bismillah" className="mx-auto max-w-3xl scroll-mt-24">
              <InvitationCard floralVariant="main">
                {/* Couple S & M Monogram Logo */}
                <img
                  src="/assets/logo-sm-transparent.png"
                  alt="Samira and Mujammil monogram logo"
                  referrerPolicy="no-referrer"
                  className="mb-3 h-20 w-auto select-none object-contain drop-shadow-[0_1px_1px_rgba(74,46,27,0.18)] sm:h-24"
                />

                <p
                  className="font-arabic text-3xl sm:text-4xl leading-[1.8] text-[#845C17]"
                  dir="rtl"
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>

                <p className="mt-2 font-serif-editorial text-lg sm:text-xl italic text-[#6B4731]">
                  &ldquo;In the name of Allah, the Most Gracious,
                  <br />
                  the Most Merciful&rdquo;
                </p>

                <p className="mt-7 font-serif-editorial text-sm sm:text-base tracking-[0.22em] uppercase text-[#7A5338]">
                  We request the honour of your presence at the Nikah of
                </p>

                <h1 className="mt-4 font-calligraphy gold-calligraphy text-7xl sm:text-8xl">
                  Samira
                </h1>
                <p className="mt-1 font-serif-editorial text-lg sm:text-xl text-[#5E3C26]">
                  Daughter of{' '}
                  <span className="font-semibold text-[#563826]">
                    Mr &amp; Mrs Altafhusain Ranguni
                  </span>
                </p>

                <span className="my-2 font-calligraphy gold-calligraphy text-4xl sm:text-5xl">
                  &amp;
                </span>

                <p className="font-calligraphy gold-calligraphy text-7xl sm:text-8xl">
                  Mujammil
                </p>
                <p className="mt-1 font-serif-editorial text-lg sm:text-xl text-[#5E3C26]">
                  Son of{' '}
                  <span className="font-semibold text-[#563826]">
                    Mr &amp; Mrs Mustak Mala
                  </span>
                </p>

                <OrnamentalDivider className="w-full max-w-sm my-6" />

                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.2em] uppercase leading-relaxed text-[#7A5338]">
                  As they begin their forever
                  <br />
                  in faith and love
                </p>

                <p className="mt-4 font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#563826] tabular-nums">
                  23 December 2026 <span aria-hidden="true">·</span> After
                  Namaz-e-Zohar
                </p>
                <p className="mt-1.5 font-serif-editorial text-lg sm:text-xl text-[#5C3A23]">
                  Jumla Party Hall, Sansroad
                </p>
              </InvitationCard>
            </section>

            {/* 2. A BLESSED BEGINNING */}
            <section className="mx-auto max-w-3xl">
              <InvitationCard floralVariant="info-left" compact>
                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                  A Blessed Beginning
                </p>
                <h2 className="mt-2 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                  A Blessed Beginning
                </h2>
                <p className="mt-4 max-w-lg font-serif-editorial text-xl sm:text-2xl leading-relaxed text-[#5E3C26]">
                  With hearts full of gratitude, we invite you to share in a day
                  written with love, faith and family. Your presence will make our
                  beginning truly blessed.
                </p>
                <OrnamentalDivider className="w-full max-w-sm my-5" />
                <p className="font-calligraphy gold-calligraphy text-5xl">
                  Samira &amp; Mujammil
                </p>
              </InvitationCard>
            </section>

            {/* 3. SCRATCH TO REVEAL & COUNTDOWN */}
            <section id="countdown" className="mx-auto max-w-3xl scroll-mt-24 space-y-14">
              <InvitationCard floralVariant="info-center" compact>
                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                  A Date With Destiny
                </p>
                <h2 className="mt-2 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                  Scratch to Reveal
                </h2>
                <ScratchCard />
              </InvitationCard>

              <InvitationCard floralVariant="info-right" compact>
                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                  Until We Say
                </p>
                <h2 className="mt-2 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                  Qubool Hai
                </h2>

                <div className="mt-6 grid w-full max-w-md grid-cols-4 gap-3">
                  {countdownUnits.map((unit) => (
                    <div
                      key={unit.label}
                      className="border border-[#8E651B]/70 bg-[#D7BE92] px-2 py-4 text-center"
                    >
                      <p className="font-serif-editorial text-4xl sm:text-5xl font-semibold leading-none text-[#4A2E1B] tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </p>
                      <p className="mt-2 font-serif-editorial text-xs sm:text-sm tracking-[0.18em] uppercase text-[#6E482E]">
                        {unit.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 font-serif-editorial text-lg sm:text-xl italic text-[#6B4731] tabular-nums">
                  23 December 2026 <span aria-hidden="true">·</span> 1:00 PM
                </p>
              </InvitationCard>
            </section>

            {/* 4. NIKAH CEREMONY DETAILS & TIMELINE */}
            <section id="timeline" className="mx-auto max-w-3xl scroll-mt-24">
              <InvitationCard floralVariant="ceremony">
                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                  Nikah Day Timeline
                </p>

                <h2 className="mt-3 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                  Nikah Ceremony
                </h2>

                <p className="mt-2 font-serif-editorial text-xl sm:text-2xl italic text-[#6B4731] tabular-nums">
                  23 December 2026 <span aria-hidden="true">·</span> Jumla Party Hall,
                  Sansroad
                </p>

                <OrnamentalDivider className="w-full max-w-sm my-6" />

                <div className="w-full max-w-md space-y-0">
                  {NIKAH_TIMELINE.map((item, idx) => (
                    <div
                      key={item.title}
                      className="relative flex flex-col items-center pb-7 last:pb-0"
                    >
                      {idx < NIKAH_TIMELINE.length - 1 && (
                        <span
                          className="absolute top-6 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#9E7322]/65"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="golden-pearl relative z-10 h-3.5 w-3.5 rounded-full"
                        aria-hidden="true"
                      />
                      <h3 className="mt-2.5 font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#563826]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 font-serif-editorial text-lg font-medium tracking-wide text-[#845C17] tabular-nums">
                        {item.time}
                      </p>
                      <p className="mt-1 max-w-sm font-serif-editorial text-lg italic text-[#6B4731]">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </InvitationCard>
            </section>

            {/* 5. CELEBRATING TOGETHER — INDIVIDUAL EVENT INVITATION CARDS */}
            <section id="festivities" className="scroll-mt-24 space-y-14">
              <div className="text-center">
                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                  Festivities
                </p>
                <h2 className="mt-2 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                  Celebrating Together
                </h2>
                <OrnamentalDivider className="mx-auto max-w-sm my-3" />
              </div>

              {/* JASHN-E-HEENA INVITATION CARD */}
              <div className="mx-auto max-w-3xl">
                <InvitationCard floralVariant="hina">
                  <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                    Festivity One
                  </p>

                  <h3 className="mt-3 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                    Jashn-e-Heena
                  </h3>

                  <p className="mt-2 font-serif-editorial text-xl sm:text-2xl italic text-[#6B4731]">
                    An Evening of Henna, Family Warmth &amp; Joy
                  </p>

                  <OrnamentalDivider className="w-full max-w-sm my-6" />

                  <div className="space-y-1.5 font-serif-editorial text-[#563826]">
                    <p className="text-2xl sm:text-3xl font-semibold tabular-nums">
                      21 December 2026
                    </p>
                    <p className="text-lg sm:text-xl font-medium text-[#845C17] tabular-nums">
                      3:00 PM
                    </p>
                  </div>

                  <a
                    href={PRE_WEDDING_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 border border-[#9E7322]/75 bg-[#E8D5AF] px-7 py-3 font-serif-editorial text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-[#563826] transition-colors hover:bg-[#DEC595]"
                  >
                    <MapPin className="h-4 w-4 text-[#845C17]" />
                    View on Google Maps
                  </a>
                </InvitationCard>
              </div>

              {/* RASM-E-HALDI INVITATION CARD */}
              <div className="mx-auto max-w-3xl">
                <InvitationCard floralVariant="utsav">
                  <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                    Festivity Two
                  </p>

                  <h3 className="mt-3 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                    Rasm-e-Haldi
                  </h3>

                  <p className="mt-2 font-serif-editorial text-xl sm:text-2xl italic text-[#6B4731]">
                    Blessings, Traditional Rituals &amp; Afternoon Cheer
                  </p>

                  <OrnamentalDivider className="w-full max-w-sm my-6" />

                  <div className="space-y-1.5 font-serif-editorial text-[#563826]">
                    <p className="text-2xl sm:text-3xl font-semibold tabular-nums">
                      22 December 2026
                    </p>
                    <p className="text-lg sm:text-xl font-medium text-[#845C17]">
                      After Namaz-e-Asr
                    </p>
                  </div>

                  <a
                    href={PRE_WEDDING_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 border border-[#9E7322]/75 bg-[#E8D5AF] px-7 py-3 font-serif-editorial text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-[#563826] transition-colors hover:bg-[#DEC595]"
                  >
                    <MapPin className="h-4 w-4 text-[#845C17]" />
                    View on Google Maps
                  </a>
                </InvitationCard>
              </div>

              {/* EVENT INFORMATION CARDS (3-COLUMN SUMMARY GRID) */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
                <InvitationCard floralVariant="info-left" compact>
                  <MapPin className="h-5 w-5 text-[#9E7322]" aria-hidden="true" />
                  <p className="mt-2 font-serif-editorial text-sm tracking-[0.2em] uppercase text-[#7A5338]">
                    The Venue
                  </p>
                  <h3 className="mt-1 font-calligraphy gold-calligraphy text-5xl">
                    Jumla Party Hall
                  </h3>
                  <p className="mt-1 font-serif-editorial text-xl font-medium text-[#563826]">
                    Sansroad
                  </p>
                  <OrnamentalDivider className="w-full max-w-[200px] my-3" />
                  <button
                    type="button"
                    onClick={() => setDirectionsOpen(true)}
                    className="cursor-pointer border border-[#9E7322]/75 bg-[#E8D5AF] px-6 py-2.5 font-serif-editorial text-sm font-semibold tracking-[0.14em] uppercase text-[#563826] transition-colors hover:bg-[#DEC595]"
                  >
                    Venue &amp; Maps
                  </button>
                </InvitationCard>

                <InvitationCard floralVariant="info-center" compact>
                  <Heart className="h-5 w-5 text-[#9E7322]" aria-hidden="true" />
                  <p className="mt-2 font-serif-editorial text-sm tracking-[0.2em] uppercase text-[#7A5338]">
                    Your Presence Is Our Present
                  </p>
                  <h3 className="mt-1 font-calligraphy gold-calligraphy text-5xl">
                    Gift of Prayers
                  </h3>
                  <OrnamentalDivider className="w-full max-w-[200px] my-3" />
                  <p className="font-serif-editorial text-lg sm:text-xl italic leading-relaxed text-[#5E3C26]">
                    Your love, blessings, and prayers are the greatest gift.
                  </p>
                  <p className="mt-3 font-serif-editorial text-sm tracking-[0.2em] uppercase text-[#7A5338] tabular-nums">
                    23 December 2026
                  </p>
                </InvitationCard>

                <InvitationCard floralVariant="info-right" compact>
                  <Calendar className="h-5 w-5 text-[#9E7322]" aria-hidden="true" />
                  <p className="mt-2 font-serif-editorial text-sm tracking-[0.2em] uppercase text-[#7A5338]">
                    Nikah Ceremony
                  </p>
                  <h3 className="mt-1 font-calligraphy gold-calligraphy text-5xl">
                    23 December
                  </h3>
                  <OrnamentalDivider className="w-full max-w-[200px] my-3" />
                  <p className="font-serif-editorial text-lg sm:text-xl text-[#5E3C26]">
                    After Namaz-e-Zohar at Jumla Party Hall, Sansroad.
                  </p>
                  <a
                    href={NIKAH_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block border-b border-[#845C17]/75 pb-0.5 font-serif-editorial text-sm font-semibold tracking-[0.16em] uppercase text-[#6B4731] transition-colors hover:text-[#563826]"
                  >
                    View Nikah Map
                  </a>
                </InvitationCard>
              </div>
            </section>

            {/* 6. OUR STORY CAROUSEL */}
            <section id="our-story" className="mx-auto max-w-3xl scroll-mt-24">
              <InvitationCard floralVariant="main">
                <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
                  Our Story
                </p>
                <h2 className="mt-2 font-calligraphy gold-calligraphy text-6xl sm:text-7xl">
                  Our Story
                </h2>
                <p className="mt-1 font-serif-editorial text-lg italic text-[#6B4731]">
                  Swipe or use arrows to browse moments
                </p>

                <StoryCarousel />
              </InvitationCard>
            </section>

            {/* 7. FINAL INVITATION SECTION & BLESSINGS */}
            <BlessingsCard />
          </main>

          <footer className="border-t border-[#9E7322]/45 bg-[#D8C19B] py-10 text-center">
            <img
              src="/assets/logo-sm-transparent.png"
              alt="Samira and Mujammil floral monogram logo"
              referrerPolicy="no-referrer"
              className="mx-auto mb-3 h-16 w-auto select-none object-contain drop-shadow-[0_1px_1px_rgba(74,46,27,0.18)]"
            />
            <p className="font-calligraphy gold-calligraphy text-5xl">
              Samira &amp; Mujammil
            </p>
            <p className="mt-2 font-serif-editorial text-base tracking-[0.22em] uppercase text-[#5C3A23] tabular-nums">
              23 December 2026
            </p>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setOpened(false);
              }}
              className="mt-4 cursor-pointer border-b border-[#8E651B]/75 pb-0.5 font-serif-editorial text-base italic text-[#5C3A23] transition-colors hover:text-[#4A2E1B]"
            >
              Back to Intro Cover
            </button>
          </footer>
        </>
      )}

      <DirectionsModal
        isOpen={directionsOpen}
        onClose={() => setDirectionsOpen(false)}
      />
    </div>
  );
}
