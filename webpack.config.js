const path = require('path');

module.exports = {
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
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
};
