FROM node:18-alpine3.16

WORKDIR /project

# Setup the container for yarn / liniting
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY .eslintrc.js .prettierrc ./ 

# Grab the root package json and yarn lock files
COPY package.json .
COPY yarn.lock .

# Add package dependencies and clean cache (for smaller image size when done)
COPY libs/core/package.json ./libs/core/
COPY libs/helper/package.json ./libs/helper/
COPY services/example/package.json ./services/example/
RUN yarn && yarn cache clean

COPY libs libs
COPY services services

# Build libraries but let tilt or dependent image define entry point or prune dependencies
RUN yarn build:libs

# For tracing tilt start times
COPY start-time.txt .