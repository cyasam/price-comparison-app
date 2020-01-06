const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
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
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'server/crawler/crawler.json', to: 'crawler.json' }
    ])
  ]
};
