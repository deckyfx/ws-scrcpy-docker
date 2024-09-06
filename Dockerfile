# Use an official Node.js runtime as a parent image

FROM node:20.16.0-alpine3.20 as production

# Set Working Directory
WORKDIR /usr/src/app

# Copy main project to container
COPY yarn.lock package.json ./

# Install yarn
RUN apk add --no-cache yarn

# Install Git
RUN apk add git

# Install ws-scrcpy make dependencies
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3

# Install adb
RUN apk --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add android-tools

# Clone ws-scrcpy
RUN git clone https://github.com/NetrisTV/ws-scrcpy.git ws-scrcpy

# Enter ws-scrcpy
WORKDIR /usr/src/app/ws-scrcpy

# Remove the annoying warning
RUN rm ./package-lock.json

# Install ws-scrcpy dependencies
RUN yarn install --silent 2>&1

# Build ws-scrcpy
RUN yarn dist

# Return back to main directory
WORKDIR /usr/src/app

# Create Dist directory
RUN mkdir -p ./dist/ws-scrcpy

# Move dist to parent dist
RUN mv ./ws-scrcpy/dist/* ./dist/ws-scrcpy/

# Install main dependencies
RUN yarn install --silent 2>&1

# Copy all files to container
COPY tsconfig.json .
COPY src ./src/
COPY configs ./configs
COPY views ./views
COPY ./start.sh .

# Build main project
RUN yarn build

# Add the path to the binary to the PATH environment variable
ENV PATH=/usr/local/bin/platform-tools:$PATH

RUN which adb

# Run the program
CMD ["sh", "start.sh"]