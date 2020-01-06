module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 1903,
    proxy: {
      '/api': 'http://localhost:4400'
    }
  }
};
