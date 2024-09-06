# Requirement
- nvm
- nodejs v20.16.0
- yarn
- docker

# Cloning
```git clone https://github.com/deckyfx/learn-docker.git```

or

```git clone git@github.com:deckyfx/learn-docker.git```

# Run development docker
```docker compose -f docker-compose.dev.yml up```

# watch changes
```docker compose -f docker-compose.dev.yml --build```

# Detach mode don't watch changes
```docker compose -f docker-compose.dev.yml --build -d```

# Get all docker running
```docker ps```

# Enter docker shell
```docker exec -it <name> sh```

# Run docker
```docker compose up```

