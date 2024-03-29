FROM node:19.8.1-alpine

WORKDIR /app

COPY . /app

RUN npm i -g npm && npm i

ENV DEBUG="solr-proxy,http-proxy" \
    NODE_DEBUG="solr-proxy,http-proxy"

CMD node index.js
