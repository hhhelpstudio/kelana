import { stays } from "@/lib/stays";

const dot = { clay: "bg-clay-500", leaf: "bg-leaf-600", sea: "bg-sea-600" } as const;

export function Stays() {
  return (
    <section id="stays" className="scroll-mt-20 border-t border-sand-200">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">Partner stays</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
              From rice terraces to reef breaks.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-500">Six founding stays, each with its own stamp. All fictional, for now.</p>
        </div>

        <ul className="mt-12 divide-y divide-sand-200 border-y border-sand-200">
          {stays.map((s, i) => (
            <li
              key={s.id}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 py-5 sm:grid-cols-[3rem_1.3fr_1fr_1fr] sm:gap-x-6"
            >
              <span className="font-mono text-xs text-ink-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl text-ink-900">{s.name}</span>
              <span className="col-start-2 text-ink-700 sm:col-start-auto">{s.kind}</span>
              <span className="col-start-2 inline-flex items-center gap-2 text-sm text-ink-500 sm:col-start-auto sm:justify-self-end">
                <span aria-hidden className={`size-2 rounded-full ${dot[s.tone]}`} />
                {s.area}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
