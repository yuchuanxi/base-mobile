/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 15:40:45
 * @title       title
 * @description 所有view的原型
 */
'use strict';

var
  dom = require('dom'),

  empty = function () {},
  parent = {
    dom         : dom,
    apis       : require('apis'),
    apisMsg       : require('apisMsg'),
    routes       : require('routes'),
    ua       : require('ua'),
    store       : require('store'),
    route       : require('route'),

    toast       : require('toast'),
    spinner     : require('spinner'),
    popup       : require('popup'),
    ajax        : require('ajax'),
    bridge  : require('bridge'),


    views  : dom.$('body > .views'),
    // loading: false,

    init     : empty,
    format   : empty,
    render   : empty,
    bindEvent: empty,
    handler  : empty,

    // header: require('../../components/header/index.js'),
    // footer: require('../../components/footer/index.js'),
    backHome: function ( res ) {
      var
        me = this;

      // me.toast.show('error', res.message || '请求异常');
      // location.hash = config.url.home;
    },
    isObject: isObject,
    getUrlQuerys: getUrlQuerys,
    /**
   * 更新，删除，添加query中的参数
   * @param  { String }          query [ location.search 字符串]
   * @param  { String | Object } key   [ 需要更改的参数key,或者键值对 ]
   * @param  { type }            value [description]
   * @return {[type]}                  [description]
   */
    updateQuery: function(query, key, value) {
      var
        querys = getUrlQuerys(query.substr(0, 1) === '?' ? query.slice(1): query),
        j = null,
        res = [];

      // 更新打散后的query
      if ( isObject(key) ) {
        for ( j in key ) {
          if ( key.hasOwnProperty( j ) ) {

            querys[ j ] = key[ j ];
          }
        }
      }
      else {
        if ( value !== null && value !== undefined && value !== '' ) {
          querys[ key ] = value;
        }
      }
      // 重组query
      for ( j in querys ) {
        if ( querys.hasOwnProperty( j ) ) {
          value = querys[ j ];
          if ( value !== null && value !== undefined && value !== '' ) {

            res.push( [ j, value ].join('=') );
          }
        }
      }

      return '?' + res.join('&');
    },

    updateStatus: empty, // 更新view状态
    /**
     * 网络请求出现异常的时候允许重新加载
     * @param  {[type]} message    [加载失败后显示的提示消息]
     * @param  {[type]} wrapper    [放置提示消息的容器]
     * @param  {[type]} reloadFunc [重加载执行的函数]
     * @param  {[type]} args       [回传给重加载执行函数的参数]
     * @return {[type]}            [description]
     */
    loadErr: function ( wrapper, reloadFunc, message, args ) {
      var
        me = this;

      if ( typeof message === 'object' ) {
        message = message.message;
      }

      wrapper.innerHTML = '<div class="load-error"><h2>'+
          (message || '加载失败') +'，请重试</h2>'+
          '<button class="reload-btn">重新加载</button></div>';

      dom.$('.reload-btn', wrapper).addEventListener('touchstart', function () {
        wrapper.innerHTML = '<div class="reloading">加载中...</div>';
        reloadFunc.apply(me, args);
        // setTimeout(function () {

        //   reloadFunc.apply(me, args);
        // }, 3000);
      });
    },

    destory: empty // 销毁view
  };
function getUrlQuerys (query) {
  var
    querys = (query || location.search.slice(1)).split('&'),
    query = null,
    i = 0,
    results = {};

  while ( (query = querys[i++]) ) {
    query = query.split('=')
    results[query[0]] = query[1];
  }

  return results;
}
function isObject( obj ) {
  return toString.call(obj).slice(8,-1) === 'Object';
};


function View ( config )  {

  var
    son = Object.create(parent),
    key = null;

  // son = Object.create(parent);
  // son.constructor = son;
  son.super = parent; // 用于访问父对象的属性和方法

  for ( key in config ) {
    if ( config.hasOwnProperty( key) ) {
      son[key] = config[key];
    }
  }

  return son;
}

module.exports = View;

