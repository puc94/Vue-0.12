var vue = require('vue-loader')

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/index.js']
  },
  output: {
    path: './src',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: vue.withLoaders({
          js: 'babel?optional[]=runtime'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src/,
        loader: 'babel?optional[]=runtime'
      }
    ]
  },
  devtool: 'source-map'
}
