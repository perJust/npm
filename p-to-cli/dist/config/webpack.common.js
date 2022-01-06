const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');
const rulesSetting = require('./rules_setting');
const devServerConfig = require('./devServer.config');
module.exports = function (options) {
  return {
    mode: options.mode,
    entry: paths.appSrc,
    output: {
      path: paths.appBuild,
      publicPath: options.outputPublicPath || '/',
      filename: 'js/[name].[chunkhash:6].js',
      // chunkFilename: 'js/[name].[chunkhash:6].js'
    },
    // cache: {
    //   // 使用持久化缓存
    //   type: 'filesystem', // memory:使用内容缓存  filesystem:使用文件缓存
    //   buildDependencies: {
    //     // 更改配置文件时，重新缓存
    //     config: [__filename],
    //   },
    // },
    cache: true,
    devtool: options.devtool,
    resolve: {
      extensions: paths.resolveExtensions,
      alias: {
        '@': paths.appSrc,
      },
    },
    module: {
      rules: rulesSetting({ mode: options.mode, env: options.env }),
    },
    devServer: devServerConfig,
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new Webpack.ProvidePlugin({
        React: 'react', // 在每个模块都注入React
        process: 'process/browser', // 注入process
      }),
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        title: '工业互联网',
        minify: 'auto',
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
      new Webpack.DefinePlugin({
        // 注册全局环境变量
        'process.env.APP_ENV': JSON.stringify(options.env.APP_ENV),
      }),
      ...(options.plugins || []),
    ],
    stats: options.stats, // 打包错误或新编译时输出
  };
};
