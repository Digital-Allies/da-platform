#!/bin/bash
# Digital Allies — Mark Post as Done
# Usage: ./mark-posted.sh <post-id>
# Example: ./mark-posted.sh 1

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCHEDULE="$SCRIPT_DIR/posting-schedule.json"
POST_ID=$1

if [ -z "$POST_ID" ]; then
  echo "Usage: ./mark-posted.sh <post-id>"
  exit 1
fi

python3 -c "
import json
with open('$SCHEDULE', 'r') as f:
    data = json.load(f)
for p in data['posts']:
    if str(p['id']) == '$POST_ID':
        p['status'] = 'posted'
        p['posted_at'] = '$(date -u +%Y-%m-%dT%H:%M:%SZ)'
        print(f'Marked post {p[\"id\"]} ({p[\"date\"]}) as posted.')
        break
else:
    print(f'Post ID $POST_ID not found.')
    exit(1)
with open('$SCHEDULE', 'w') as f:
    json.dump(data, f, indent=2)
"
