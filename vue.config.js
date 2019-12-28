module.exports = {
  chainWebpack: config => {
    config.module
      .rule('xml')
      .test(/\.x(sd|ml)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
