import { Icon } from "@/components/shared/Icon";

export function ComingSoon() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-card">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold">
          <Icon name="rocket" size={22} />
        </span>
        <h1 className="font-display text-3xl font-semibold mt-4">We&apos;re almost live</h1>
        <p className="mt-2 text-sm text-off-black/60">
          GLOW is finishing its final launch checks. The storefront will be open very soon — please check back shortly.
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gold-dark">GLOW · Premium Beauty BD</p>
      </div>
    </div>
  );
}
