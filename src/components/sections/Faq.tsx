const faqs = [
  {
    q: "Is Kelana real?",
    a: "Not yet. Kelana is a concept project exploring how a loyalty program could live in a wallet instead of an app. The stays are fictional and nothing here costs money.",
  },
  {
    q: "Do I need crypto to try it?",
    a: "No. A check-in is a signature, not a transaction, so it costs zero gas. You only need a browser wallet like Rabby or MetaMask.",
  },
  {
    q: "What exactly am I signing?",
    a: "A structured EIP-712 message with your address, the stay, a timestamp and a random nonce. Your wallet shows every field before you approve, and it can't move funds.",
  },
  {
    q: "Where are my stamps stored?",
    a: "In your browser, keyed to your wallet address. Each stamp keeps its signature, so anyone can verify it was really you. A production version would anchor them onchain.",
  },
  {
    q: "Which networks work?",
    a: "Base Sepolia and Sepolia testnets. If your wallet is on mainnet, the passport will offer to switch for you.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-sand-200">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">Fair questions.</h2>
        </div>
        <div className="divide-y divide-sand-200 border-y border-sand-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full ring-1 ring-sand-300 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[60ch] pb-5 leading-relaxed text-ink-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
