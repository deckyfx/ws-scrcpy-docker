# Run development docker
docker compose -f docker-compose.dev.yml up

# watch changes
docker compose -f docker-compose.dev.yml --build

# Detach mode don't watch changes
docker compose -f docker-compose.dev.yml --build -d

# Get all docker running
docker ps

# Enter docker shell
docker exec -it <name> sh

# Run docker
docker compose up

