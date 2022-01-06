const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const chalk = require('chalk');
const Webpack = require('webpack');

module.exports = (env) => {
  return require('./webpack.common')({
    mode: 'production',
    // devtool: 'source-map',
    outputPublicPath: './',
    output: {
      clean: true,
    },
    env,
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:6].css',
        chunkFilename: 'css/chunkcss_[name].[hash:6].css',
        ignoreOrder: true,
      }),
      new CssMinimizerPlugin(),
      new CleanWebpackPlugin(),
      new ProgressBarPlugin({
        format:
          `${chalk.green.bold('build[:bar]')}` +
          chalk.green.bold(':precent') +
          '(:elapsed seconds)',
        clear: false,
      }),
    ],
    optimization: {
      usedExports: true, // 只打包用到的
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true, // boolean | number  开启多线程
          extractComments: false, // 不生成注释文件
          terserOptions: {
            toplevel: true, // 最高级别，删除无用代码
          },
        }),
      ],
      splitChunks: {
        minSize: 1024 * 5, //提取出的chunk的最小大小
        maxSize: 1024 * 1024,
        chunks: 'all',
        // minChunks: 1, //模块被引用2次以上的才抽离
        maxAsyncRequests: 10,
        maxInitialRequests: 5,
        // name: true,
        cacheGroups: {
          default: {
            name: 'common',
            // chunks: 'initial', // all，async 和 initial   or  function (chunk)
            /**
             * all 代表所有模块，async代表只管异步加载的, initial代表初始化时就能获取的模块。如果是函数，则可以根据chunk参数的name等属性进行更细致的筛选。
             */
            minChunks: 2, //模块被引用2次以上的才抽离
            priority: -20,
            reuseExistingChunk: true,
          },
          defaultVendors: {
            //拆分第三方库（通过npm|yarn安装的库）
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            // chunks: 'all',
            priority: -10,
          },
        },
      },
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 1024 * 1024 * 2, // 单文件不超过2M，超过即warning
      maxEntrypointSize: 1024 * 1024 * 2, // 在加载时引入的文件不超过2M
    },
    stats: 'normal',
  });
};
