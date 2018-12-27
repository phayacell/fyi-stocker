FROM node:8-alpine

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install

ENV HOST 0.0.0.0
