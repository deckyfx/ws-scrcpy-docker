# Install this dependencies
yarn install

# Clean dist folder
yarn clean

# Clone ws-scrcpy
git clone https://github.com/NetrisTV/ws-scrcpy.git ws-scrcpy

# Enter ws-scrcpy
cd ws-scrcpy

# Clean ws-scrcpy dist folder
yarn clean

# Install ws-scrcpy dependencies
yarn install

# Build ws-scrcpy
yarn dist

# Move dist to parent dist
mv ./dist/* ../dist/ws-scrcpy/

# Return back to main directory
cd ..

# Build main project
yarn build

# Create config file
node dist/index.js

# Run the ws-scrcpy
# WS_SCRCPY_CONFIG=./configs/config.yaml && node ./dist/ws-scrcpy/index.js

# WS_SCRCPY_PORT=6000 WS_SCRCPY_CONFIG=./configs/config.yaml node dist/index.js && node ./dist/ws-scrcpy/index.js