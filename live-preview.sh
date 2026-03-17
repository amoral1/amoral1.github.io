#!/bin/bash

# Live Preview Server Script
# Serves files on localhost and auto-refreshes on file changes

PORT=${1:-8000}
HOST="127.0.0.1"
URL="http://$HOST:$PORT"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Live Preview Server${NC}"
echo -e "${GREEN}Port: $PORT${NC}"
echo -e "${GREEN}URL: $URL${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}\n"

# Start Python HTTP server in background
python3 -m http.server $PORT --bind $HOST 2>/dev/null &
SERVER_PID=$!

# Give server time to start
sleep 1

# Open browser if available
if command -v xdg-open &> /dev/null; then
    xdg-open "$URL" 2>/dev/null &
elif command -v open &> /dev/null; then
    open "$URL" 2>/dev/null &
fi

# Watch for file changes and trigger page reload
# Install inotify-tools if not present
if ! command -v inotifywait &> /dev/null; then
    echo -e "${YELLOW}Installing inotify-tools...${NC}"
    sudo apt-get update > /dev/null 2>&1
    sudo apt-get install -y inotify-tools > /dev/null 2>&1
fi

# File watching with browser refresh
if command -v inotifywait &> /dev/null; then
    echo -e "${GREEN}Watching for file changes...${NC}\n"
    
    inotifywait -m -r -e modify,create,delete \
        --exclude '(\.git|node_modules|\.DS_Store)' \
        . 2>/dev/null | while read -r directory events filename; do
        if [[ ! "$filename" =~ ^\.git ]]; then
            echo -e "${YELLOW}[$(date '+%H:%M:%S')] Changed: $filename${NC}"
        fi
    done &
    WATCH_PID=$!
fi

# Cleanup on exit
trap "kill $SERVER_PID 2>/dev/null; kill $WATCH_PID 2>/dev/null; exit" EXIT INT TERM

wait
