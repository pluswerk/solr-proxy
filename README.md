# pluswerk/solr-proxy

Reverse proxy to make a Solr instance read-only, rejecting requests that have the potential to modify the Solr index.

Uses the npm package [solr-proxy](https://github.com/Trott/solr-proxy) with some bug fixes and additional features.

| ENV                | DESCRIPTION                                                                       | Default        |
|--------------------|-----------------------------------------------------------------------------------|----------------|
| PORT               | port of the proxy                                                                 | `8008`         |
| VALID_HTTP_METHODS | allow list of valid HTTP Methods                                                  | `GET`          |
| VALID_PATHS        | comma separated list of valid paths eg`/solr/core_en/select,/solr/core_de/select` | `/solr/select` |
| INVALID_PARAMS     | comma separated list of valid parameters                                          | `qt,stream`    |
| SOLR_HOST          | host of solr, accessible from the solr-proxy container                            | `solr`         |
| SOLR_PORT          | port of solr, accessible from the solr-proxy container                            | `8983`         |
| MAX_ROWS           | maximum items in all lists                                                        | `200`          |
| MAX_START          | maximum offset in all lists                                                       | `1000`         |


## Example docker-compose.yml



```yml
version: '3.6'

services:
  solr-proxy:
    image: pluswerk/solr-proxy
    ports:
      - "0.0.0.0:8983:8008"
    environment:
      VIRTUAL_HOST: solr-proxy.domain
      VIRTUAL_PORT: 8008
      VALID_PATHS: /solr/core_en/select,/solr/core_de/select,/solr/core_fr/select,/solr/core_nl/select,/solr/core_zh/select
      SOLR_HOST: solr
      SOLR_PORT: 8983
    #...
      
  solr:
    image: solr
    ports:
      - "127.0.0.1:8984:8983"
    volumes:
      - ./solrData:/opt/solr/server/solr/data/
    #...

# only useful in conjunction with https://github.com/pluswerk/docker-global
# remove if not needed
networks:
  default:
    external:
      name: global
```
