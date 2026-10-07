export function Footer() {
  return (
    <footer className="bg-ink-900 text-sand-200">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-none text-sand-50">
              Selamat jalan<span className="text-clay-500">.</span>
            </p>
            <p className="mt-3 text-sand-300">Safe travels, wherever you wander.</p>
          </div>
          <a href="#passport" className="btn bg-sand-50 text-ink-900 hover:bg-sand-200">
            Open your passport
          </a>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-sand-50/15 pt-6 text-sm text-sand-400">
          <p>
            A concept project by{" "}
            <a href="https://github.com/hhhelpstudio" className="text-sand-200 underline underline-offset-4 hover:text-sand-50">
              Iman Rafief
            </a>
            . Not a real protocol. No tokens, no financial advice.
          </p>
          <a href="https://hhhelpstudio.com" className="hover:text-sand-50">
            hhhelpstudio.com
          </a>
        </div>
      </div>
    </footer>
  );
}
