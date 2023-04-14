const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    background: './Shared (Extension)/Resources/Background/background.js',
    content: './Shared (Extension)/Resources/Content/content.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './Shared (Extension)/Resources/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
};
