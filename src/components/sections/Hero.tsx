import { Stamp } from "@/components/Stamp";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28">
        <div className="max-w-2xl">
          <p className="eyebrow animate-rise">A travel passport that lives in your wallet</p>
          <h1
            className="animate-rise mt-5 font-display text-[clamp(2.9rem,7vw,5.75rem)] leading-[0.98] tracking-[-0.02em] text-ink-900"
            style={{ animationDelay: "80ms" }}
          >
            Stay longer.
            <br />
            Earn the <span className="text-clay-600">island.</span>
          </h1>
          <p
            className="animate-rise mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-700 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Check in at partner stays across Bali, collect a stamp each time, and turn slow travel into free nights. No
            app to download, no points card to lose.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
            <a href="#passport" className="btn btn-primary">
              Open your passport
            </a>
            <a href="#how" className="btn btn-ghost">
              How it works
            </a>
          </div>
          <p className="animate-rise mt-8 font-mono text-[0.7rem] tracking-wide text-ink-500" style={{ animationDelay: "320ms" }}>
            CONCEPT PROJECT · RUNS ON TESTNET · NO TOKENS FOR SALE
          </p>
        </div>

        {/* Passport page with scattered stamps */}
        <div aria-hidden className="relative mx-auto w-full max-w-[26rem]">
          <div className="paper aspect-[4/5] rotate-[3deg] rounded-[2rem] shadow-[0_40px_70px_-35px_oklch(30%_0.05_50/0.5)] ring-1 ring-sand-300">
            <div className="flex h-full flex-col p-7">
              <div className="flex items-baseline justify-between border-b border-dashed border-sand-400/70 pb-3">
                <span className="eyebrow">Passport · Bali</span>
                <span className="font-mono text-[0.68rem] text-ink-500">No. 0408</span>
              </div>
              <div className="relative flex-1">
                <Stamp label="UBUD" sub="08 · 26" tone="clay" rotate={-9} size={150} pressDelay={500} className="absolute top-[6%] left-[2%]" />
                <Stamp label="AMED" sub="09 · 26" tone="sea" rotate={12} size={128} pressDelay={760} className="absolute top-[30%] right-[0%]" />
                <Stamp label="SIDEMEN" sub="10 · 26" tone="leaf" rotate={-4} size={140} pressDelay={1020} className="absolute bottom-[4%] left-[18%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
