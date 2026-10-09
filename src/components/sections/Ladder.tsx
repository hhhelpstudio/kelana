import { PASSPORT_SLOTS, tiers } from "@/lib/stays";

export function Ladder() {
  return (
    <section id="ladder" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="max-w-md">
          <p className="eyebrow">Rewards</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
            The longer you wander, the more Bali gives back.
          </h2>
          <p className="mt-5 leading-relaxed text-ink-700">
            Three ranks, named in Bahasa Indonesia. No expiring points, no blackout dates. Your stamps are yours, signed
            by your own wallet.
          </p>
        </div>

        <ol className="space-y-10 pl-10">
          {tiers.map((tier, i) => (
            <li key={tier.name} className="relative">
              {/* Dot centred on the 2.25rem title line; the dashed segment runs from just under this
                  dot to just above the next one (0.375rem gap each side), and the last tier has none. */}
              <span aria-hidden className="absolute top-2 -left-10 grid size-5 place-items-center rounded-full bg-sand-50 ring-2 ring-clay-500">
                <span className="size-1.5 rounded-full bg-clay-600" />
              </span>
              {i < tiers.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[2.125rem] -bottom-[2.625rem] left-[calc(-1.875rem-1px)] border-l-2 border-dashed border-sand-300"
                />
              )}
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-3xl leading-9 text-ink-900">{tier.name}</h3>
                <span className="text-sm text-ink-500 italic">“{tier.meaning}”</span>
                <span className="basis-full font-mono text-xs text-ink-500 tabular-nums sm:ml-auto sm:basis-auto">
                  {String(tier.stamps).padStart(2, "0")} / {PASSPORT_SLOTS} STAMPS
                </span>
              </div>
              <p className="mt-2 max-w-lg text-lg text-ink-700">{tier.perk}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
