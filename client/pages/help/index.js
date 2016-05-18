/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 15:37:30
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');
module.exports = require('views')({
  name: 'help',
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
      viewTitle: '帮助页面'
    }));
    el.view = $('.view.'+ me.name, me.views);

    // me.bindEvent();
  },

  // bindEvent: function () {
  //   var
  //     me = this;

  //   me.el.view.addEventListener('click', function ( e ) {
  //     var
  //       tag = e.target;

  //     if (tag.matches('.jsGo')) {
  //       // TODO
  //     }
  //   });
  // },

  // updateStatus: function () {},
  destroy: function () {
    var
      me = this;

    me.el = {};
    delete me.types;
  }
});
