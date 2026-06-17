#!/bin/bash
# Digital Allies — Daily Post Runner
# Reads today's scheduled post from posting-schedule.json
# Run by Cowork scheduled task Mon/Wed/Fri at 10am
#
# Usage: ./get-todays-post.sh
# Output: Prints today's post details for Claude to act on via Chrome automation

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCHEDULE="$SCRIPT_DIR/posting-schedule.json"
TODAY=$(date +%Y-%m-%d)

if [ ! -f "$SCHEDULE" ]; then
  echo "ERROR: posting-schedule.json not found at $SCRIPT_DIR"
  exit 1
fi

# Find today's post
POST=$(python3 -c "
import json, sys
with open('$SCHEDULE') as f:
    data = json.load(f)
posts = [p for p in data['posts'] if p['date'] == '$TODAY' and p['status'] == 'pending']
if posts:
    p = posts[0]
    print('ID:', p['id'])
    print('DATE:', p['date'])
    print('CAMPAIGN:', p['campaign'])
    print('IMAGE:', data['config']['base_path'] + p['image'])
    print('---META CAPTION---')
    print(p['caption_meta'])
    print('---GBP CAPTION---')
    print(p['caption_gbp'])
else:
    print('NO_POST_TODAY')
" 2>/dev/null)

if [ "$POST" = "NO_POST_TODAY" ]; then
  echo "No post scheduled for $TODAY"
  exit 0
fi

echo "$POST"
echo ""
echo "---INSTRUCTIONS FOR CLAUDE---"
echo "1. Open https://business.facebook.com in Chrome"
echo "2. Create a new post with the image above"
echo "3. Use the META CAPTION for Facebook + Instagram"
echo "4. Schedule for today at 10:00 AM or post immediately if past 10am"
echo "5. Then open https://business.google.com"
echo "6. Create a new update with the same image"
echo "7. Use the GBP CAPTION"
echo "8. Run mark-posted.sh <post-id> when done"
