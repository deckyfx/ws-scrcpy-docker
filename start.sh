#!/bin/bash

# Start the first server
node ./dist/index.js &

# Start the second server
node ./dist/ws-scrcpy/index.js &

# Wait for both servers to finish
wait