FROM node:10.15.3-alpine

RUN mkdir /app

COPY ./ /app

WORKDIR /app

RUN npm install
