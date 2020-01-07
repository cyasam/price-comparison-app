const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common');

const env = process.env.NODE_ENV;
const otherConfig = require(`./webpack/webpack.${env}`);

module.exports = webpackMerge(commonConfig, otherConfig);
