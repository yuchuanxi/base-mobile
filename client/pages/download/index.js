/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-05-04 13:39:59
 * @title       app内侧包下载页面
 * @description TODO: 模仿 http://chiefplayer.com/download
 */
'use strict';
require('./index.less');

module.exports = require('views')({

  name: 'download',
  el: {},
  template: require('./index.jade'),

  init: function () {
    var
      me = this;

    me.render();
  },
  render: function () {
    var
      me = this;

    me.views.insertAdjacentHTML('beforeend', me.template({
      viewName: me.name,
      viewTitle: '下载页面'
    }));
    me.el.view = me.dom.$('.view.'+ me.name, me.views);

    // me.bindEvent();
  },

  destroy: function () {
    var
      me = this;

    me.el = {};
  }
});
