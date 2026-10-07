import { Stamp } from "@/components/Stamp";
import type { Stamp as StampRecord } from "@/lib/passport-store";
import { PASSPORT_SLOTS, stayById } from "@/lib/stays";

/** Deterministic tilt per stamp, derived from its nonce, so it never jumps on re-render. */
const tiltFor = (nonce: string) => (parseInt(nonce.slice(2, 4), 16) % 17) - 8;

const stampDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }).replaceAll("/", ".");

type Props = {
  stamps: readonly StampRecord[];
  /** Index of a stamp that was just added, so only it plays the press animation. */
  freshIndex?: number;
  owner?: string;
};

export function PassportBook({ stamps, freshIndex, owner }: Props) {
  const shown = stamps.slice(-PASSPORT_SLOTS);
  const offset = stamps.length - shown.length;

  return (
    <div className="paper relative rounded-[1.75rem] p-5 shadow-[0_30px_60px_-30px_oklch(30%_0.05_50/0.45)] ring-1 ring-sand-300 sm:p-7">
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-dashed border-sand-400/70 pb-4">
        <div>
          <p className="eyebrow">Kelana Passport</p>
          <p className="mt-1 font-display text-2xl text-ink-900">Visas & stamps</p>
        </div>
        <p className="font-mono text-xs text-ink-500 tabular-nums">
          {String(stamps.length).padStart(2, "0")} / {PASSPORT_SLOTS}
        </p>
      </div>

      <ol className="grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Passport stamps">
        {Array.from({ length: PASSPORT_SLOTS }, (_, i) => {
          const record = shown[i];
          const stay = record ? stayById(record.stayId) : undefined;
          const absoluteIndex = i + offset;
          return (
            <li key={i} className="grid aspect-square place-items-center">
              {record && stay ? (
                <Stamp
                  label={stay.stamp}
                  sub={stampDate(record.issuedAt)}
                  tone={stay.tone}
                  rotate={tiltFor(record.nonce)}
                  size={112}
                  className="h-auto w-full max-w-28"
                  pressDelay={absoluteIndex === freshIndex ? 0 : undefined}
                />
              ) : (
                <span
                  aria-hidden
                  className="grid aspect-square w-[78%] place-items-center rounded-full border-[1.5px] border-dashed border-sand-400/80 font-mono text-[0.7rem] text-sand-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {owner && (
        <p className="mt-5 truncate border-t border-dashed border-sand-400/70 pt-4 font-mono text-[0.7rem] text-ink-500">
          HOLDER · {owner}
        </p>
      )}
    </div>
  );
}
