const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let entry = ['./src/index.js'];
if (process.env.NODE_ENV !== 'production') {
  entry = ['webpack-hot-middleware/client', ...entry];
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../build/client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
