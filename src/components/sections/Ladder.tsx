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

        <ol className="relative space-y-10 pl-10">
          <span aria-hidden className="absolute top-2 bottom-2 left-[0.6rem] border-l-2 border-dashed border-sand-300" />
          {tiers.map((tier) => (
            <li key={tier.name} className="relative">
              <span aria-hidden className="absolute top-1.5 -left-10 grid size-5 place-items-center rounded-full bg-sand-50 ring-2 ring-clay-500">
                <span className="size-1.5 rounded-full bg-clay-600" />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-3xl text-ink-900">{tier.name}</h3>
                <span className="text-sm text-ink-500 italic">“{tier.meaning}”</span>
                <span className="ml-auto font-mono text-xs text-ink-500 tabular-nums">
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
