const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.scss'),
        path.join(__dirname, './src/assets/styles/mixins.scss')
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
    config.devServer.disableHostCheck(true)
  },
  // 这个是设置外部扩展，模块为qc,变量名为QC，导入qc将不做打包。

  // 冒号左边的是我们引入资源时对应的名字，冒号右面的是由库的主人暴露出来的全局方法名
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
