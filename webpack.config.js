const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    '@babel/polyfill',
    './src/Contact.js'
  ],
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'Contact.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          sourceMaps: true
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  }
}
