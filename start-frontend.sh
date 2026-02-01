#\!/bin/bash

SCRIPT_DIR="$(dirname "$0")"
export $(xargs < "$SCRIPT_DIR/.env")

cd "$SCRIPT_DIR/frontend/password-manager-frontend"

echo "Starting Vite dev server..."
echo "Frontend will run at http://localhost:$VITE_DEV_PORT"
echo "Press Ctrl+C to stop"
echo ""

npm run dev
