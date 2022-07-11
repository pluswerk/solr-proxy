FROM node:18.5.0-alpine

WORKDIR /app

COPY . /app

RUN npm i -g npm && npm i

ENV DEBUG="solr-proxy,http-proxy"

CMD node index.js
