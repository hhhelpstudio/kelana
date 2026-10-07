/** Fictional partner stays. Kelana is a concept project; none of these are real listings. */
export type Stay = {
  id: number;
  name: string;
  area: string;
  kind: string;
  stamp: string;
  tone: "clay" | "leaf" | "sea";
};

export const stays: readonly Stay[] = [
  { id: 1, name: "Rumah Sawah", area: "Sidemen", kind: "Rice-field homestay", stamp: "SIDEMEN", tone: "leaf" },
  { id: 2, name: "Atap Jerami", area: "Ubud", kind: "Bamboo villa", stamp: "UBUD", tone: "clay" },
  { id: 3, name: "Pondok Karang", area: "Amed", kind: "Dive lodge", stamp: "AMED", tone: "sea" },
  { id: 4, name: "Teras Ombak", area: "Uluwatu", kind: "Surf house", stamp: "ULUWATU", tone: "sea" },
  { id: 5, name: "Kebun Kopi", area: "Munduk", kind: "Coffee farm stay", stamp: "MUNDUK", tone: "leaf" },
  { id: 6, name: "Lumbung Sari", area: "Canggu", kind: "Rice-barn guesthouse", stamp: "CANGGU", tone: "clay" },
];

export const stayById = (id: number) => stays.find((s) => s.id === id);

export type Tier = { stamps: number; name: string; meaning: string; perk: string };

export const tiers: readonly Tier[] = [
  { stamps: 1, name: "Pejalan", meaning: "walker", perk: "Late checkout at every partner stay" },
  { stamps: 5, name: "Pengembara", meaning: "wanderer", perk: "One free night for every ten you stay" },
  { stamps: 12, name: "Kelana", meaning: "one who roams", perk: "Free night, a local guide, and first pick of new stays" },
];

export const PASSPORT_SLOTS = 12;

export function tierFor(count: number): Tier | undefined {
  return [...tiers].reverse().find((t) => count >= t.stamps);
}

export function nextTier(count: number): Tier | undefined {
  return tiers.find((t) => count < t.stamps);
}
