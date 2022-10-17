# Overview

This repository is an example of how to create a typescript based mono-repo for microservices with tilt based HMR (hot-module-reloading) support

# Pre-Requisites

This repository uses:

- kind cluster with 1.25 support
- Node 18.x
- Yarn 3.x
- Tilt

See the following sections for more information on how to set each of those up

# K8s cluster

This example uses [kind](https://kind.sigs.k8s.io/) to setup a local development cluster, but any K8S development cluster should work (i.e. [docker for mac](https://docs.docker.com/desktop/kubernetes/), [minikube](https://minikube.sigs.k8s.io/docs/start/))

See the [kind installation page]() for instructions for all platforms, but for Macs, the TLDR is to use [brew](https://brew.sh/)

```sh
brew install kind
```

# Node

To get node up and running quickly, you can use [NVM (node version manager)](https://github.com/nvm-sh/nvm) to install the needed version of node used by this example you can install NVM with:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Restart your shell, navigate to the root of this project and run:

```sh
nvm install
nvm use
```

# Yarn

To install `yarn`, run `npm install -g yarn`

# Tilt

[tilt](https://tilt.dev/) provides local development integration with a K8S deployed application to give an improved developer experience ([devex](https://en.wikipedia.org/wiki/User_experience#Developer_experience))

Refer to the [tilt installation page](https://docs.tilt.dev/install.html) to get it running, but for Mac's, the TLDR is:

```sh
curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash
```
