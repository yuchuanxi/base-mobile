/**
 *
 * @authors     yuChuanXi (http://yuchuanxi.com, wangfei.f2e@gmail.com)
 * @date        2016-05-11 16:23:38
 * @title       title
 * @description description
 */
'use strict';

var
  ua = require('ua'),
  noop = function () {
    console.log('bridge: ', arguments)
  },
  bridge = {
    call: noop,
    register: noop
  };

/**
 * 获取ios 的bridge object
 * https://github.com/marcuswestin/WebViewJavascriptBridge
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function setupIphoneWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
/**
 * 获取android 的bridge object
 * https://github.com/lzyzsd/JsBridge
 * http://mp.weixin.qq.com/s?__biz=MzI1NjEwMTM4OA==&mid=2651231789&idx=1&sn=f11650ad0e18ddc12ece6e7559d5084c&scene=1&srcid=0513BWa7HuHjzPAeManB3w6C#rd
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function connectAndroidWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function() {
       callback(WebViewJavascriptBridge)
    }, false);
  }
}
/**
 * 根据环境暴露bridge object
 * @param  {[type]} bridgeObj [description]
 * @return {[type]}           [description]
 */
function exportBridge (bridgeObj) {
  if (bridgeObj) {  
    bridge.call = bridgeObj.callHandler;
    bridge.register = bridgeObj.registerHandler;
  }
}

if (ua.ios) {
  setupIphoneWebViewJavascriptBridge(exportBridge);
}
else if (ua.android) {
  connectAndroidWebViewJavascriptBridge(exportBridge);
}

module.exports = bridge;

// bridge.call  调用native提供的方法
// - bridge.call('immediateExperience') 引导页，立即体验按钮
// - bridge.call('setTitle', title) header 设置title
