const steps = [
  {
    title: "Book a partner stay",
    body: "Pick from homestays, villas and guesthouses that care about slow travel. Book the way you always do.",
  },
  {
    title: "Check in with your wallet",
    body: "At the door, sign one message. It costs nothing, takes two seconds, and proves you were really there.",
  },
  {
    title: "Collect stamps, unlock nights",
    body: "Every check-in adds a stamp. Fill your passport and the perks find you: late checkouts, guides, free nights.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-sand-200 bg-sand-100/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
            Three steps, and the island does the rest.
          </h2>
        </div>

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 md:block">
              {/* The route: one dashed segment per gap, measured from circle edge to circle edge
                  (circle 3.5rem, 0.75rem breathing room), so it always meets the next step exactly.
                  Vertical when stacked, horizontal once the steps sit in a row. */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[4.25rem] -bottom-9 left-[calc(1.75rem-1px)] border-l-2 border-dashed border-sand-300 md:top-[calc(1.75rem-1px)] md:-right-7 md:bottom-auto md:left-[4.25rem] md:border-t-2 md:border-l-0"
                />
              )}
              <span className="relative row-span-2 grid size-14 place-items-center rounded-full bg-sand-50 font-display text-2xl text-clay-600 ring-1 ring-sand-300">
                {i + 1}
              </span>
              <h3 className="mt-3.5 text-xl md:mt-6 font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 max-w-[22rem] leading-relaxed text-ink-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
