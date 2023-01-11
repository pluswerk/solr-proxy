import SolrProxy from 'solr-proxy';

const optionsEnv = {
  listenPort: 'PORT',
  validHttpMethods: 'VALID_HTTP_METHODS',
  validPaths: 'VALID_PATHS',
  invalidParams: 'INVALID_PARAMS',
  backend: {
    host: 'SOLR_HOST',
    port: 'SOLR_PORT',
  },
  maxRows: 'MAX_ROWS',
  maxStart: 'MAX_START',
}

const options = {
  listenPort: parseInt(process.env[optionsEnv.listenPort], 10) || 8008,
  validHttpMethods: process.env[optionsEnv.validHttpMethods] ? process.env[optionsEnv.validHttpMethods].split(',') : ['GET'],
  validPaths: process.env[optionsEnv.validPaths] ? process.env[optionsEnv.validPaths].split(',') : ['/solr/select'],
  invalidParams: process.env[optionsEnv.invalidParams] ? process.env[optionsEnv.invalidParams].split(',') : ['qt', 'stream'],
  upstream: 'http://' + (process.env[optionsEnv.backend.host] || 'solr') + ':' + (parseInt(process.env[optionsEnv.backend.port], 10) || 8983),
  maxRows: parseInt(process.env[optionsEnv.maxRows], 10) || 200,
  maxStart: parseInt(process.env[optionsEnv.maxStart], 10) || 1000
}

console.log(`Starting Server on Port ${options.listenPort}`);
console.log(`Connection setup to ${options.upstream}`);
console.log(`Options can be set via Following ENV variables:`);
console.log(optionsEnv);
console.log(`Options used for solr-proxy:`);
console.log(options);

SolrProxy.start(options.listenPort, options);
