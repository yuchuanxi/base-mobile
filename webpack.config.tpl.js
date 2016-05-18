/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 16:46:56
 * @title       title
 * @description description
 */
'use strict';
const
  path = require('path'),
  fs = require('fs'),

  debug = require('debug')('F:webpack.config'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  DedupePlugin = webpack.optimize.DedupePlugin,
  UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
  OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin,
  // [Easy dependency injection for node.js unit testing](https://github.com/jhnns/rewire-webpack)
  // RewirePlugin = require("rewire-webpack"),

  srcDir = path.resolve(process.cwd(), 'client'); // 前端源代码


module.exports = function makeWebpackConfig ( options ) {
  options || (options = {});
  var
    isDev = options.debug !== undefined ? options.debug : true,
    config = require('./config.js')(__dirname, isDev),
    entries = getEntries(),
    webpackConfig = {};

  entries._vendors = config.vendors.slice(0);
  entries.index = config.index.concat(entries.index);

  if ( isDev ) {
    // TODO: 根据配置来决定是否分拆为vendors和index
    // entries.index.unshift('webpack-hot-middleware/client?reload=true');
    entries._vendors.unshift('webpack-hot-middleware/client?reload=true');
  }

  webpackConfig = {
    entry: entries,
    // 定义了输出文件的位置及名字
    output: {
      // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存中
      path: path.resolve(config.dir),
      publicPath: config.publicPath,
      filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
      // filename: '[name].js',
      chunkFilename: isDev ? '[id].js' : 'chunks/[id].[chunkhash:8].js',
      // chunkFilename: 'chunks/[id].js',
      hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
      jsonpFunction: 'TD'
    },

    resolve: {
      root: path.resolve(__dirname, srcDir),
      modulesDirectories: ['node_modules'],
      alias: config.aliasSourceMap,
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json']
    },
    // resolveLoader: {
    //   root: path.join(__dirname, 'node_modules')
    // },

    module: {
      // noParse: ['jquery', 'backbone', 'underscore'],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, srcDir),
          query: {
            presets: ['react', 'es2015']
          }
        },
        { test: /\.jade$/, loader: 'jade' },
        { test: /\.css$/, loader: 'style!css' },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!less')
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'image-webpack?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
            // url-loader更好用，小于10KB的图片会自动转成dataUrl，
            // 否则则调用file-loader，参数直接传入
            'url?limit=10000&name=img/[name].[hash:8].[ext]'
          ]
        },
        {
          test: /\.(woff|eot|ttf)$/i,
          loader: 'url?limit=10000&name=fonts/[name].[hash:8].[ext]'
        }
      ],
      preLoaders: [
        // {test: /\.js$/, loader: 'eslint', exclude: /node_modules/}
      ]
    },

    plugins: [
      new CommonsChunkPlugin({
        name: '_vendors',
        filename: isDev ? 'common/g.js' : 'common/g.[hash:8].js',
        // create an async commons chunk
        // 异步共用块 http://webpack.github.io/docs/list-of-plugins.html
        // async: true,
        // minChunks: 1

        // with more entries,
        // this ensures that no other module goes into the vendor chunk.
        minChunks: Infinity
      }),
      // new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin( isDev ? '[name].css' : '[name].[hash:8].css', {
      // new ExtractTextPlugin( isDev ? 'common/g.css' : 'common/g.[hash:8].css', {
        // 当allChunks指定为false时，css loader必须指定怎么处理
        // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
        // 第一个参数`notExtractLoader`，一般是使用style-loader
        // @see https://github.com/webpack/extract-text-webpack-plugin
        allChunks: false
      }),
      // Automatically loaded modules.
      // new webpack.ProvidePlugin({
      //   d3: 'd3',
      //   jquery: 'jquery'
      // }),
      // 它会按引用频度来排序 ID，以便达到减少文件大小的效果。
      // Assign the module and chunk ids by occurrence count
      new OccurenceOrderPlugin()
    ],
    recordsPath: path.join(process.cwd(), 'cache', 'webpack.json'),

    devServer: {
      publicPath: config.publicPath,
      hot: true,
      noInfo: false,
      inline: true,
      stats: {
        cached: false,
        colors: true
      }
    }
  }

  // Use this, if you are writing a library and want to publish it as single file
  if ( options.library ) {
    webpackConfig.output.library = options.library;
    webpackConfig.output.libraryTarget = 'commonjs2';
  }

  // 自动生成入口文件，html和对应的js名字需要保持一致
  // 例如，a.html的入口js是a.js
  Object.keys(entries).filter(function (key) {
    return key !== '_vendors';
  }).forEach(function (entry) {
    var
      setting = {
        template: path.resolve(config.viewDir, entry +'.jade'),
        inject: 'body',
        chunks: ['_vendors', entry],
        filename: entry +'.html'
      }

    if (!isDev) {
      // @see https://github.com/kangax/html-minifier
      setting.minify = {
        collapseWhitespace: true,
        removeComments: true
      }
    }

    webpackConfig.plugins.push(new HtmlWebpackPlugin(setting));
  });

  if ( isDev ) {
    webpackConfig.output.pathinfo = true;
    // webpackConfig.debug = true;
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
  }
  else {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));
    webpackConfig.plugins.push(new DedupePlugin());
    webpackConfig.plugins.push(new UglifyJsPlugin({
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true,
        warnings: true,
        global_defs: {
          BASEURL: options.baseUrl
        }
      },
      output: {
        comments: false
      }
    }));
  }

  return webpackConfig;
};

/**
 * 获取entry文件列表
 * @return {[type]} [description]
 */
function getEntries () {
  const
    jsDir = srcDir,
    names = fs.readdirSync(jsDir);

  let
    map = {};

  names.forEach(function ( name ) {
    const
      m = name.match(/(.+)\.js$/),
      entry = m ? m[1] : '',
      entryPath = entry ? path.resolve(jsDir, name) : '';

    if ( entry ) {
      debug('entry list: '+ entry);
      map[entry] = entryPath;
    }
  });

  return map;
}
