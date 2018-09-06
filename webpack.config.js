const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'ContactForm.js',
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
