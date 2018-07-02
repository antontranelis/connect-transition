'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TEST: '"Test"',
  API_URL: '"http://localhost:8081"'
})
