import { PassportApp } from "@/components/passport/PassportApp";

export function PassportSection() {
  return (
    <section id="passport" className="scroll-mt-20 border-t border-sand-200 bg-sand-100/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow">Your passport</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
            Try a check-in. It&apos;s free.
          </h2>
        </div>
        <PassportApp />
      </div>
    </section>
  );
}
