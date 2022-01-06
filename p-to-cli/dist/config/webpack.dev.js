const Webpack = require('webpack');

module.exports = (env) => {
  return require('./webpack.common')({
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    env,
    stats: 'errors-only',
  });
};
