FROM node:18-alpine3.16

WORKDIR /project

ADD . .

RUN yarn install

ENTRYPOINT [ "yarn", "start:dev", "/project/services/example" ]