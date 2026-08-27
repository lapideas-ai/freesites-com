#!/usr/bin/env bash
# Regenerates the desktop + mobile screenshots shown on the
# Friendship Foundation client presentation page
# (/friendshipfoundation) whenever the approved website changes.
#
# Only the approved design (Hopeful Journey / Serenity) is captured.
# Human Connection and Modern Impact were retired and archived to
# FriendshipFoundation/archive/ — not part of the client presentation.
#
# Usage:
#   npm run capture:designs
#
# Requires a dev server. If one isn't already running on :3000,
# this script starts one temporarily and stops it when done.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT/public/design-review"
PORT=3000
PLAYWRIGHT_VERSION="1.62.1"
STARTED_SERVER=0

mkdir -p "$OUT_DIR"

if ! curl -sf "http://localhost:$PORT" >/dev/null 2>&1; then
  echo "No dev server detected on :$PORT — starting one..."
  (cd "$ROOT" && nohup npm run dev >/tmp/design-review-dev-server.log 2>&1 &)
  STARTED_SERVER=1
  for i in $(seq 1 40); do
    curl -sf "http://localhost:$PORT" >/dev/null 2>&1 && break
    sleep 1
  done
fi

capture() {
  local route="$1"
  local out_name="$2"
  echo "Capturing $route ..."
  npx --yes "playwright@$PLAYWRIGHT_VERSION" screenshot \
    --viewport-size "1440,900" --full-page --wait-for-timeout 1200 \
    "http://localhost:$PORT/friendshipfoundation/$route" \
    "$OUT_DIR/${out_name}-desktop.png"
  npx --yes "playwright@$PLAYWRIGHT_VERSION" screenshot \
    --viewport-size "390,844" --full-page --wait-for-timeout 1200 \
    "http://localhost:$PORT/friendshipfoundation/$route" \
    "$OUT_DIR/${out_name}-mobile.png"
}

capture "serenity" "hopeful-journey"

if [ "$STARTED_SERVER" = "1" ]; then
  echo "Stopping the dev server this script started..."
  lsof -ti:$PORT -sTCP:LISTEN | xargs -r kill 2>/dev/null || true
fi

echo "Done. Screenshots saved to $OUT_DIR"
