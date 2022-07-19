set -e

echo "Stopping database container..."
docker-compose down

echo "Deleting data folder..."
rm -rf data/

echo "Creating database container..."
docker-compose up -d

echo "loading container..."
sleep 5

echo "Applying migrations..."
npm run migration

