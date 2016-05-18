/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 15:37:30
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');
var swipe = require('swipe');

module.exports = require('views')({
  name: 'guidance',
  el: {},
  template: require('./index.jade'),

  init: function () {
    var
      me = this;

    me.render();
  },
  render: function () {
    var
      me = this,
      $ = me.dom.$,
      el = me.el;

    me.views.insertAdjacentHTML('beforeend', me.template({
      viewName: me.name,
      viewTitle: '引导页'
    }));
    el.view = $('.view.'+ me.name, me.views);
  },

  // bindEvent: function () {
  //   var
  //     me = this;

  //   me.el.view.addEventListener('click', function ( e ) {
  //     var
  //       tag = e.target;

  //     if (tag.matches('.jsGo')) {
  //       me.bridge.call('immediateExperience');
  //     }
  //   });
  // },

  // updateStatus: function () {},
  destroy: function () {
    var
      me = this;

    me.el = {};
  }
});
