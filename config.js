/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 13:57:40
 * @title       title
 * @description description
 */
'use strict';
const path = require('path');


module.exports = function (root, isDev) {
  return {
    // mongodb: 'mongodb://localhost:27017/test',
    // model: path.join(root, 'model'),
    // view: path.join(root, 'view'),
    // controller: path.join(root, 'controller'),
    // mainpath: path.join(root, 'server'),
    // secret: '1234!@#$',
    root: root,
    // disqus_shortname: 'disqus',
    port: 2012,

    dir: isDev ? 'dev' : 'dist', // 文件访问路径/编译后文件存放路径
    publicPath: isDev ? '/dev/' : '', // 静态资源访问路径（开发环境/线上cdn地址，用于发布）
    viewDir: path.resolve(process.cwd(), 'views'), // jade 模版文件
    // 模块别名，便于引用
    aliasSourceMap: {
      'Router': 'assets/lib/director.js',
      // 'slimscroll': 'assets/lib/fullPage.js/vendors/jquery.slimscroll.js',
      // 'fullPage': 'assets/lib/fullPage.js/jquery.fullPage.js',
      // 'fullPageCss': 'assets/lib/fullPage.js/jquery.fullPage.css',

      // 'rangeSlider': 'assets/lib/ion.rangeSlider-2.1.4/js/ion-rangeSlider/ion.rangeSlider.js',
      // 'rangeSliderCss': 'assets/lib/ion.rangeSlider-2.1.4/css/ion.rangeSlider.css',
      // 'rangeSliderSkinCss': 'assets/lib/ion.rangeSlider-2.1.4/css/ion.rangeSlider.skinHTML5.css',

      'dom': 'assets/kit/domHelper/index.js',
      'store': 'assets/kit/store/index.js',
      'spinner': 'assets/kit/spinner/index.js',
      'toast': 'assets/kit/toast/index.js',
      'popup': 'assets/kit/popup/index.js',
      'ajax': 'assets/kit/ajax/index.js',


      'swipe': 'assets/kit/swipe/index.js',
      'views': 'assets/js/views.js',

      'route': 'assets/js/route.js',
      'routesConfig': 'assets/js/routes-config.js', // 前端路由配置
      // 'routesMap': 'assets/js/routes-map.js',
      'routes': 'assets/js/routes.js',
      'validate': 'assets/js/validate.js',
      'sendAuthCode': 'assets/js/sendAuthCode.js',
      'bridge': 'assets/js/bridge.js',

      'ua': 'assets/js/ua.js', // userAgent嗅探

      'apis': isDev ? 'assets/js/api-config-dev.js' : 'assets/js/api-config.js', // 接口配置
      'apisMsg': 'assets/js/api-fail-msg.js',
    },
    // 变更不频繁的模块，放到vendors模块引用(比如第三方模块)
    vendors: [
      // 'jquery',
      // 'slimscroll',
      // 'fullPage',
      // 'fullPageCss',
      // 'rangeSlider',
      // 'rangeSliderCss',
      // 'rangeSliderSkinCss',
      // 
      // 'react',
      // 'react-dom',
      'fastclick',

      'ajax',
      'spinner',
      'toast',
      'popup',
      // 'raphael',
      'Router',

      'dom',
      'store'
    ],
    // 变更比较频繁的模块，放到index模块去引用（针对SPA Project）
    index: [
      'route',
      'views'
    ]
  }
};
