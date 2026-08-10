import { redirect } from "next/navigation";
import { LIVE_TRADE_SLUGS } from "@/lib/trades";

// Server-side, zero-JS redirect — no WizardState seeding happens here (that
// requires client Context, see /build/start). This just decides where to
// send someone: straight into lead capture if the homepage already told us
// their trade, or the trade picker if not.
export default async function BuildIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ trade?: string }>;
}) {
  const { trade } = await searchParams;
  if (trade && LIVE_TRADE_SLUGS.has(trade)) {
    redirect(`/build/start?trade=${trade}`);
  }
  redirect("/build/trade");
}
