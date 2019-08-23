const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      css: {
        // 全局scss变量
        data: ""
      }
    }
  },
  configureWebpack:{
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,//console
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      ]
    }
  },
  //publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // 基本路径
  publicPath: './',
  //输出文件目录
  outputDir: 'wechart',
  //eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  //生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  devServer: {
    // 设置主机地址
    host: '',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://wechart-beta.ewrwefg.com/api/',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/qsapi': {
        // 目标 API 地址
        target: 'http://172.16.252.215:8080/',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/qsapi': ''
        }
      }
    }
  }
}
