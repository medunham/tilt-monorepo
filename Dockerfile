FROM node:18-alpine3.16

WORKDIR /example

ADD . .

RUN yarn install