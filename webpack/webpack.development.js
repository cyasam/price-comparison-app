const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 1903
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
