const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build/client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [new CleanWebpackPlugin()]
};
