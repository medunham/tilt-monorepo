# Overview

The [original nodejs tilt example](https://docs.tilt.dev/example_nodejs.html) misses an obvious point when it assumes that a service will consist of just one service.

Many node projects use a repository with multiple internal libraries and services and use some kind of mono-repo tool like [yarn workspaces](https://yarnpkg.com/features/workspaces) or [lerna](https://lerna.js.org/) to help manage dependencies between the services / libraries and optimization (hoisting) of dependent packages.

This project provides an example of how you might use tilt with a mono-repo

# Quick start

Assuming all pre-requisites are installed, just run `tilt up -f tilt.py` to build a container, deploy it, and start a control loop with the code.

# Pre-Requisites

This repository uses:

- kind cluster with 1.25 support
- Node 18.x
- Yarn 3.x
- Tilt

See the following sections for more information on how to set each of those up

## K8s cluster

This example uses [kind](https://kind.sigs.k8s.io/) to setup a local development cluster, but any K8S development cluster should work (i.e. [docker for mac](https://docs.docker.com/desktop/kubernetes/), [minikube](https://minikube.sigs.k8s.io/docs/start/))

See the [kind installation page]() for instructions for all platforms, but for Macs, the TLDR is to use [brew](https://brew.sh/)

```sh
brew install kind
```

## Node

To get node up and running quickly, you can use [NVM (node version manager)](https://github.com/nvm-sh/nvm) to install the needed version of node used by this example you can install NVM with:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Restart your shell, navigate to the root of this project and run:

```sh
nvm install
nvm use
```

## Yarn

To install `yarn`, run `npm install -g yarn`

## Tilt

[tilt](https://tilt.dev/) provides local development integration with a K8S deployed application to give an improved developer experience ([devex](https://en.wikipedia.org/wiki/User_experience#Developer_experience))

Refer to the [tilt installation page](https://docs.tilt.dev/install.html) to get it running, but for Mac's, the TLDR is:

```sh
curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash
```

# Discussion

## Project Structure

To simulate a complicated nodejs monorepo, the following package structure has been setup:

- libs
  - core
  - helper
- services
  - example

The dependency tree for the packages are - `services/example` dependsw on `libs/helper` depends on `libs/core`

## Dockerfile

The `docker build` command will cache layers during subsequent re-builds of the same Dockerfile. To take advantage of docker layer caching, this project attempst to copy / add files to the docker image from least likely to change to most likely to change.

```Dockerfile
# Setup the container for yarn / liniting
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY .eslintrc.js .prettierrc ./

# Grab the root package json and yarn lock files
COPY package.json .
COPY yarn.lock .
```

The Dockerfile then adds all the `package.json` files from workspaces without code and performs a yarn install. This ensures that dependencies are added to `node_modules` in one command (i.e. `yarn`). We also clean the yarn cache to reduce the image size

```Dockerfile
# Add package dependencies and clean cache (for smaller image size when done)
COPY libs/core/package.json ./libs/core/
COPY libs/helper/package.json ./libs/helper/
COPY services/example/package.json ./services/example/
RUN yarn && yarn cache clean
```

Next we copy the code for the project

```Dockerfile
COPY libs libs
COPY services services
```

The running service depends on two libraries, so we build those next

```Dockefile
# Build libraries but let tilt or dependent image define entry point or prune dependencies
RUN yarn build:libs
```

Finally, we copy the `start-time.txt` file used in the original tilt example so we can validate build times.
