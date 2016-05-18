/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 21:50:09
 * @title       title
 * @description description
 */
'use strict';
const
  debug = require('debug')('F:mock/index'),
  Router = require('koa-router'),
  proxy = require('koa-proxy'),

  router = new Router();

debug('in mock data');
module.exports = router;


router.post('/api/login', function* () {
  this.body = {
    responseCode: 'success'
  };
});