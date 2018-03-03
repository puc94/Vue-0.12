var vue = require('vue-loader')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: './dist',
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
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: 'assets',
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: 'index.html',
        ignore: ['.*']
      }
    ])
  ]
}
