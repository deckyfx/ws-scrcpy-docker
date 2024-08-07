# Use an official Node.js runtime as a parent image

# Stage 1: build
FROM node:20.16.0-alpine3.20 as development

WORKDIR /usr/src/app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Get result from stage 1 and run
FROM node:20.16.0-alpine3.20 as production

ARG NODE_ENV=production
ENV NODE_ENV={$NODE_ENV}

WORKDIR /usr/src/app

COPY yarn.lock package.json ./

# Only install actual dependecies, skipping devDependencies 
RUN yarn install --only=production

# Copy dist files from stage 1
COPY --from=development /usr/src/app/dist ./dist

# Run the program
CMD ["node", "dist/index.js"]