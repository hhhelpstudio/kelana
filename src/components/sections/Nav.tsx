import { WalletButton } from "@/components/wallet/WalletButton";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#ladder", label: "Rewards" },
  { href: "#stays", label: "Stays" },
  { href: "#passport", label: "Passport" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/90 backdrop-blur-sm">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="font-display text-[1.45rem] leading-none tracking-tight text-ink-900">
          Kelana<span className="text-clay-600">.</span>
        </a>
        <ul className="hidden items-center gap-7 text-sm font-medium text-ink-700 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-clay-600">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <WalletButton className="!min-h-10 !px-4 text-sm" />
      </nav>
    </header>
  );
}
