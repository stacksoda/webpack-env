/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const smp = new SpeedMeasurePlugin();


const glob = require('glob');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          // chunks: ['vendors', pageName],
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        }),
      );
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = smp.wrap({
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[hash:8].js',
  },
  mode: 'none', // devserver一般在development环境下使用

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 与 style-loader互斥
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      // {
      //     test: /\.(png|jpg|gif|jpeg)$/,
      //     use: 'file-loader'
      // },
      {
        test: /\.(woff|woff2|eof|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jp?eg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    // new HtmlWebpackPlugin({
    //     template: path.join(__dirname, 'src/search.html'),
    //     filename: 'search.html',
    //     chunks: ['search'],
    //     inject: true,
    //     minify: {
    //         html5: true,
    //         collapseWhitespace: true,
    //         preserveLineBreaks: false,
    //         minifyCSS: true,
    //         minifyJS: true,
    //         removeComments: false,
    //     }
    // }),
    // new HtmlWebpackPlugin({
    //     template: path.join(__dirname, 'src/index.html'),
    //     filename: 'index.html',
    //     chunks: ['index'],
    //     inject: true,
    //     minify: {
    //         html5: true,
    //         collapseWhitespace: true,
    //         preserveLineBreaks: false,
    //         minifyCSS: true,
    //         minifyJS: true,
    //         removeComments: false,
    //     }
    // }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //     externals: [
    //         {
    //             module: 'react',
    //             entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
    //             global: 'React',
    //         },
    //     ],
    // }),
    // new HtmlWebpackExternalsPlugin({
    //     externals: [
    //       {
    //         module: 'react-dom',
    //         entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
    //         global: 'ReactDOM',
    //       },
    //     ],
    //   })
    new webpack.optimize.ModuleConcatenationPlugin(),
  ].concat(htmlWebpackPlugins),
  devtool: 'inline-source-map',
  // optimization: {
  //     splitChunks: {
  //         minSize: 1000,
  //         cacheGroups: {
  //             commons: {
  //                 name: 'commons',
  //                 chunks: 'all',
  //                 minChunks: 2
  //             }
  //         }
  //     }
  // }
});
