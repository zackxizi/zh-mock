'use strict';

var path = require('path');
var fs = require('fs');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var ESLintPlugin = require('eslint-webpack-plugin');
var ReactRefreshTypeScript = require('react-refresh-typescript');
var ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var child_process = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var ForkTsCheckerWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ForkTsCheckerWebpackPlugin);
var ESLintPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ESLintPlugin);
var ReactRefreshTypeScript__default = /*#__PURE__*/_interopDefaultLegacy(ReactRefreshTypeScript);
var ReactRefreshWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ReactRefreshWebpackPlugin);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);

const appDirectory = fs__default["default"].realpathSync(process.cwd());
const resolveApp = (relativePath) => path__default["default"].resolve(appDirectory, relativePath);

var paths = {
  // 文件
  panelTsx: resolveApp('src/panel/index.tsx'),
  backgroundTSX: resolveApp('src/background/index.tsx'),
  popupTSX: resolveApp('src/popup/index.tsx'),
  devtoolsTS: resolveApp('src/devtools/index.ts'),
  backgroundTS: resolveApp('src/background/index.ts'),
  content_scriptTS: resolveApp('src/content_script/index.ts'),

  // 文件夹
  src: resolveApp('src'),
  panel: resolveApp('src/panel'),
  background: resolveApp('src/background'),
  content_script: resolveApp('src/content_script'),
  devtools: resolveApp('src/devtools'),
  popup: resolveApp('src/popup'),
  output: resolveApp('chromeExtension'),
  chromeImg: resolveApp('src/img'),

  // html temp
  panelHtml: resolveApp('src/panel/index.html'),
  popupHtml: resolveApp('src/popup/index.html'),
  backgroundHtml: resolveApp('src/background/index.html'),
};

const pluginName = 'CopyManifestWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    const copy = () => {
      child_process__default["default"].exec('cp src/manifest.json chromeExtension;cp src/icon.png chromeExtension;');
    };
    if (compiler.hooks) {
      compiler.hooks.done.tap(pluginName, copy);
    } else {
      compiler.plugin('done', copy);
    }
  }
}

const config = {
  entry: {
    panel: paths.panelTsx,
  },
  output: {
    filename: (chunkData) => {
      const name = chunkData.chunk.name;
      return name !== 'panel' ? `js/${name}.js` : `js/${name}.[contenthash:8].js`;
    },
    path: paths.output,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      panel: paths.panel,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
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
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        include: paths.src,
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript__default["default"]()], // only dev
          }),
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-private-methods', { loose: true }],
              ['@babel/plugin-transform-regenerator'],
              require.resolve('react-refresh/babel'),
            ],
          },
        },
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(ico|png|jpg|jpeg|svg|gif)$/,
        include: paths.src,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10240,
          name: 'images/[name]-[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    // new webpack.NormalModuleReplacementPlugin(/\._locale_/, function (resource) {
    //   resource.request = resource.request.replace(/\._locale_/, `.${process.env.LANG_ENV}`);
    // }),
    // new webpack.HotModuleReplacementPlugin(), // with hot is true, we donot need this plugin.
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     ...RUNTIME_CONFIG,
    //   },
    // }),
    new ReactRefreshWebpackPlugin__default["default"](), // HMR in dev
    new ESLintPlugin__default["default"]({
      extensions: ['tsx', 'ts', 'jsx', 'js'],
      exclude: ['node_modules', 'chromeExtension'],
      fix: true, // can fix pretties error HMR
    }),
    new ForkTsCheckerWebpackPlugin__default["default"]({
      async: false,
    }),
    new cleanWebpackPlugin.CleanWebpackPlugin(),
    new ConsoleLogOnBuildWebpackPlugin(),
  ],
};

module.exports = config;
