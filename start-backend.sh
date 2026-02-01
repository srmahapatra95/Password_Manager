#\!/bin/bash

# Load environment variables
SCRIPT_DIR="$(dirname "$0")"
export $(xargs < "$SCRIPT_DIR/.env")

cd "$SCRIPT_DIR/backend"

echo "Starting Django backend server..."
echo "Server will run at $HOST:$PORT"
echo "Press Ctrl+C to stop"
echo ""

source ../venv/bin/activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver $PORT
