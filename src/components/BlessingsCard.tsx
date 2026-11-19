import React, { useEffect, useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { InvitationCard } from './InvitationCard';
import { OrnamentalDivider } from './GoldOrnament';

const BLESSING_OPTIONS = [
  'Happiness',
  'Blessing',
  'Dua / Prayers',
  'Love & Togetherness',
  'Prosperity',
  'Good Health',
  'Long Happy Life',
];

interface SavedBlessing {
  id: string;
  sender: string;
  blessings: string[];
  createdAt: string;
}

const INITIAL_BLESSINGS: SavedBlessing[] = [
  {
    id: 'b-1',
    sender: 'Ranguni Family (UK)',
    blessings: ['Dua / Prayers', 'Love & Togetherness', 'Long Happy Life'],
    createdAt: '15 December 2026',
  },
  {
    id: 'b-2',
    sender: 'Mala Family',
    blessings: ['Happiness', 'Blessing', 'Prosperity'],
    createdAt: '16 December 2026',
  },
];

export function downloadWeddingCalendar() {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Samira and Mujammil//Nikah Invitation//EN',
    'BEGIN:VEVENT',
    'UID:samira-mujammil-heena@nikah2026',
    'DTSTAMP:20261118T120000Z',
    'DTSTART:20261221T093000Z',
    'DTEND:20261221T133000Z',
    'SUMMARY:Jashn-e-Heena — Samira & Mujammil',
    'LOCATION:Sansroad',
    'DESCRIPTION:21 December 2026 at 3:00 PM — Jashn-e-Heena.',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:samira-mujammil-haldi@nikah2026',
    'DTSTAMP:20261118T120000Z',
    'DTSTART:20261222T110000Z',
    'DTEND:20261222T140000Z',
    'SUMMARY:Rasm-e-Haldi — Samira & Mujammil',
    'LOCATION:Sansroad',
    'DESCRIPTION:22 December 2026 After Namaz-e-Asr — Rasm-e-Haldi.',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:samira-mujammil-nikah@nikah2026',
    'DTSTAMP:20261118T120000Z',
    'DTSTART:20261223T073000Z',
    'DTEND:20261223T113000Z',
    'SUMMARY:Nikah Ceremony — Samira & Mujammil',
    'LOCATION:Jumla Party Hall, Sansroad',
    'DESCRIPTION:23 December 2026 — Guest Arriving 10:00 AM, Lunch 11:00 AM, Nikah Ceremony After Namaz-e-Zohar, Blessing 3:00 PM.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Samira-Mujammil-Nikah-2026.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function BlessingsCard() {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [senderName, setSenderName] = useState('');
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [history, setHistory] = useState<SavedBlessing[]>(INITIAL_BLESSINGS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('samira_mujammil_blessings_v1');
      if (raw) {
        const parsed = JSON.parse(raw) as SavedBlessing[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleBlessing = (label: string) => {
    setSent(false);
    setErrorMsg('');
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleSend = () => {
    if (selected.length === 0) {
      setErrorMsg('Please choose at least one blessing above.');
      return;
    }

    setErrorMsg('');
    const nextEntry: SavedBlessing = {
      id: `b-${Date.now()}`,
      sender: senderName.trim() || 'Well-Wisher & Family',
      blessings: selected,
      createdAt: 'Shared with love',
    };

    const nextHistory = [nextEntry, ...history];
    setHistory(nextHistory);
    setSent(true);
    setSenderName('');

    try {
      window.localStorage.setItem(
        'samira_mujammil_blessings_v1',
        JSON.stringify(nextHistory)
      );
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <section id="blessings" className="mx-auto max-w-3xl scroll-mt-24">
      <InvitationCard floralVariant="final">
        <p className="font-serif-editorial text-sm sm:text-base tracking-[0.24em] uppercase text-[#7A5338]">
          Final Invitation &amp; Duas
        </p>

        <h2 className="mt-3 font-calligraphy gold-calligraphy text-5xl sm:text-6xl md:text-7xl">
          We can&apos;t wait to celebrate with you
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="font-calligraphy gold-calligraphy text-5xl sm:text-6xl">
            Samira
          </span>
          <span className="font-calligraphy gold-calligraphy text-4xl sm:text-5xl">
            &amp;
          </span>
          <span className="font-calligraphy gold-calligraphy text-5xl sm:text-6xl">
            Mujammil
          </span>
        </div>

        <p className="mt-4 font-serif-editorial text-base sm:text-lg tracking-[0.18em] uppercase leading-relaxed text-[#6B4731]">
          With best compliments from
          <br />
          <span className="font-semibold text-[#563826]">
            All Ranguni Family in India &amp; UK
          </span>
        </p>

        <OrnamentalDivider className="w-full max-w-sm my-6" />

        {/* Interactive Share a Blessing Stationery Panel */}
        <div className="w-full max-w-lg border border-[#8E651B]/70 bg-[#D6BE93]/90 text-left">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left"
          >
            <div>
              <span className="block font-serif-editorial text-sm tracking-[0.22em] uppercase text-[#6E482E]">
                Join Full Blessing
              </span>
              <span className="mt-0.5 block font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#4A2E1B]">
                Share a blessing
              </span>
            </div>
            <span className="text-[#785214]" aria-hidden="true">
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </span>
          </button>

          {expanded && (
            <div className="border-t border-[#8E651B]/45 px-6 pt-5 pb-6 text-center">
              <p className="font-serif-editorial text-lg text-[#5C3A23]">
                Choose one or more blessings for Samira &amp; Mujammil.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {BLESSING_OPTIONS.map((option) => {
                  const isActive = selected.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleBlessing(option)}
                      aria-pressed={isActive}
                      className={`cursor-pointer border px-4 py-2 font-serif-editorial text-base transition-colors ${
                        isActive
                          ? 'border-[#785214] bg-[#785214] font-semibold text-[#FFFDF6]'
                          : 'border-[#8E651B]/65 bg-[#E7D4AF] text-[#4A2E1B] hover:border-[#785214]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <label htmlFor="blessing-sender" className="sr-only">
                  Your Name (optional)
                </label>
                <input
                  id="blessing-sender"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name or Family Name (optional)"
                  className="w-full border border-[#8E651B]/60 bg-[#E7D4AF] px-4 py-2.5 text-center font-serif-editorial text-lg text-[#4A2E1B] placeholder:text-[#7A563C] focus:border-[#785214] focus:outline-none"
                />
              </div>

              <div className="mt-4 border border-[#8E651B]/55 bg-[#E7D4AF] px-4 py-3 text-center">
                <p className="font-serif-editorial text-sm tracking-[0.18em] uppercase text-[#6E482E]">
                  Your Blessing
                </p>
                <p className="mt-1 font-serif-editorial text-xl text-[#4A2E1B]">
                  {selected.length
                    ? selected.join(' · ')
                    : 'Choose a blessing above'}
                </p>
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="mt-3 font-serif-editorial text-base italic text-[#8A2C2C]"
                >
                  {errorMsg}
                </p>
              )}

              {sent ? (
                <p className="mt-4 font-serif-editorial text-2xl font-semibold text-[#785214]">
                  JazakAllah — Your blessing is received.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!selected.length}
                  className="mt-5 w-full cursor-pointer border border-[#785214] bg-[#785214] py-3.5 font-serif-editorial text-base font-semibold tracking-[0.2em] uppercase text-[#FFFDF6] transition-colors hover:bg-[#5E3E0B] disabled:cursor-default disabled:opacity-45"
                >
                  Send Blessing
                </button>
              )}

              <p className="mt-3 font-serif-editorial text-sm tracking-wide text-[#6E482E] tabular-nums">
                {history.length} blessing{history.length === 1 ? '' : 's'} shared
                with love
              </p>

              <div className="mt-5 border-t border-[#8E651B]/40 pt-4">
                <button
                  type="button"
                  onClick={downloadWeddingCalendar}
                  className="inline-flex cursor-pointer items-center gap-2 border border-[#8E651B]/80 bg-[#E7D4AF] px-5 py-2.5 font-serif-editorial text-sm font-semibold tracking-[0.16em] uppercase text-[#4A2E1B] transition-colors hover:bg-[#DBC293]"
                >
                  <Calendar className="h-4 w-4 text-[#785214]" />
                  Save Wedding Dates (.ics)
                </button>
              </div>
            </div>
          )}
        </div>
      </InvitationCard>
    </section>
  );
}
