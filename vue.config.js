const path = require('path')
const config = require('./src/config')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require("copy-webpack-plugin")
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/'
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {

  publicPath: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        // 'transform-runtime' 插件告诉 Babel
        // 要引用 runtime 来代替注入。
        {
          test: /\.m?js$/,
          // exclude用上面配置的话，默认是过滤不编译node_modules 路径下的文件
          // exclude: /(node_modules|bower_components)/,
          // include 指定需要编译的文件路径
          include: [
            resolve('src'),
            resolve('node_modules/tree-table-vue/lib'),
            resolve('node_modules/v-org-tree/dist'),
            resolve('node_modules/view-design/src/locale'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    client: {
      overlay: false
    },
    port: 8085,
    proxy: {
      [process.env.VUE_APP_REQ_PROXY]: {
        target: process.env.VUE_APP_SERVER_URL,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_REQ_PROXY}`]: '/'
        }
      },
      // 上传接口
      // 'uploaddown/upload': {
      //   target: config.baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/uploaddown/upload': '/uploaddown/upload', // 重写接口
      //   },
      // },
    },
  },
  
}
