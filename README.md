# Web Service SCRCPY Dockerized

## ws-scrcpy-docker

## Requirement

- nvm
- nodejs v20.16.0
- yarn
- docker

## Cloning

`git clone https://github.com/deckyfx/ws-scrcpy-docker.git`
or `git clone git@github.com:deckyfx/ws-scrcpy-docker.git`

then enter it's directory

`cd ws-scrcpy-docker`

Make sure nvm is installed, and install node version `20.16.0`, visit [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) for more detail

Set node version

`nvm use`

Check node version

`node --version`

it should return

`v20.16.0`

Make sure yarn is installed, if not use

`npm install --global yarn`

Run Setup

`./setup.sh`

Run it with

`WS_SCRCPY_CONFIG=./configs/config.yaml node dist/index.js && node ./dist/ws-scrcpy/index.js`

## Start Container

`WS_SCRCPY_PORT=3000 docker-compose up`

## Connect
For now connecting is manual proccess
1. enter container shell `docker exec -it ws-scrcpy-docker-service-1 sh`
2. pair the device `adb pair <ip>:<port>`
3. connect the device `adb connect <ip>:<port>`

later i will make the UI interface to do this via the web