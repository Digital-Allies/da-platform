#!/usr/bin/env bash
# Double-click this file in Finder to sync da-webwssite-build-workflows to GitHub
cd "$(dirname "$0")"

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")

echo ""
echo "  Syncing da-webwssite-build-workflows → GitHub ($BRANCH)"
echo "  ─────────────────────────────────────────────────────────"
echo ""

echo "↓  Pulling from origin/$BRANCH..."
git pull --rebase --autostash origin "$BRANCH"
echo ""

DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
if [[ "$DIRTY" -gt 0 ]]; then
  echo "↑  Committing $DIRTY changed file(s)..."
  git add -A
  git commit -m "chore: sync $(date '+%Y-%m-%d %H:%M')"
  echo ""
fi

AHEAD=$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo "0")
if [[ "$AHEAD" -gt 0 ]]; then
  echo "↑  Pushing $AHEAD commit(s) to GitHub..."
  git push origin "$BRANCH"
  echo ""
fi

echo "  ✓ All done."
echo ""
echo "──────────────────────────────────────"
echo "Press any key to close..."
read -rn 1
