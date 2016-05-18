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

  name: 'about',
  el: {},

  template: require('./index.jade'),

  init: function (type) {
    var
      me = this;

    me.render(type);
  },
  render: function (type) {
    var
      me = this;

    me.views.insertAdjacentHTML('beforeend', me.template({
      viewName: me.name,
      viewTitle: '关于页面'
    }));
    me.el.view = me.dom.$('.view.'+ me.name, me.views);

    // me.initList(type);
    // me.bindEvent();
  },

  // bindEvent: function () {
  //   var
  //     me = this;

  //   me.el.view.addEventListener('click', function ( e ) {

  //   });
  // },

  // updateStatus: function () {},
  destroy: function () {
    var
      me = this;

    me.el = {};
  }
});
