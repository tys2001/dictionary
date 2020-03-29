const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    config.plugins.push(
      new GenerateSW({
        cacheId: 'dictionary',
        skipWaiting: true,
        clientsClaim: false
      })
    )
  }
}