'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://localhost:12345/"',
  API_ROOT_IMAGE:"'http://localhost:12345/'",
  TIME_OUT:'60000'
});
