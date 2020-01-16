const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    server: './server/index.js',
    crawler: './server/crawler/index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()]
};
