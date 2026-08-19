import type { Trade } from "./trades";

// Derives per-trade SEO metadata from the canonical trade registry
// (trades.ts) instead of hand-writing title/description per trade — so
// adding a trade there is the only change needed for it to get a correct,
// unique title and description automatically. Copy follows the
// no-ranking-guarantee rule ("compete for local search", not "rank #1").
export function getTradeMetadata(trade: Trade) {
  const title = `${trade.name} SmartSite + SmartReply`;
  const description = `A FREE ${trade.name} SmartSite built to compete for local search, plus SmartReply Voice + SMS so you never miss a customer call — ${trade.description.toLowerCase()}.`;
  return { title, description };
}
