const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function ({ mode, env }) {
  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        // 'thread-loader',
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // 开启babel缓存
            // 第二次构建时，会读取之前的缓存
            cacheDirectory: true,
          },
        },
      ],
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        // {
        //   loader: 'thread-loader',
        //   options: {
        //     poolTimeout: Infinity,
        //   },
        // },
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            cacheDirectory: true,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            // happyPackMode: true,
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.(c|le)ss$/,
      // exclude: /node_modules/,
      use: [
        mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              // 模式根据文件后缀名模式不同
              mode: (resourcePath) => {
                if (/pure.css$/i.test(resourcePath)) {
                  // 纯css文件
                  return 'pure';
                }
                // 开放的模式，正常引入样式 import '*.less'即可，定义的样式暴露在全局；内部可以:local(定义模块化类)，针对这部分的使用跟mode:local时一样；
                if (/global.css$/i.test(resourcePath)) {
                  return 'global';
                }
                // 引入样式需模块 import..from... 才有效；内部可以:global(定义全局类)，这部分通过import '*.less'的方式可以暴露给全局；
                if (/module.css$/i.test(resourcePath)) {
                  return 'local';
                }
                return 'global'; // 默认global
                // return "icss"; // 用于声明 CSS 和其他语言之间的 :import 和 :export 依赖关系
              },
              // 以下配置与mode:local以及mode:global时:local有关
              localIdentName:
                mode === 'development'
                  ? '[path][name]__[local]'
                  : '[hash:base64:5]',
              exportLocalsConvention: 'camelCaseOnly', // 大驼峰展示
            },
          },
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    {
      test: /\.(png|jpg|svg|gif)$/,
      type: 'asset',
      generator: {
        // [ext]前面自带"."
        filename: 'static/[name].[hash:8][ext]',
        publicPath: env.APP_ENV === 'prod' ? '/qyyt/' : '/',
      },
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024, // 500kb
        },
      },
    },
  ];
};
