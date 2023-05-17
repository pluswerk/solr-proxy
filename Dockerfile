FROM node:20.2.0-alpine

WORKDIR /app

COPY . /app

RUN npm i -g npm && npm i

ENV DEBUG="solr-proxy,http-proxy" \
    NODE_DEBUG="solr-proxy,http-proxy"

CMD node index.js
