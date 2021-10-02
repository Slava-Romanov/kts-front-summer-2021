const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
    const styles = [
        MiniCssExtractPlugin.loader,
        !withModules
            ? 'css-loader'
            : {
                  loader: 'css-loader',
                  options: {
                      modules: {
                          localIdentName: !isProd
                              ? '[path][name]__[local]'
                              : '[hash:base64]'
                      }
                  }
              },
        'sass-loader'
    ];

    if (isProd) {
        styles.push({
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer']
                }
            }
        });
    }

    return styles;
};

module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[fullhash].css'
        }),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?.css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.([tj])sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|ico)$/,
                type: 'assets',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
        alias: {
            '@components': path.resolve(srcPath, 'components'),
            '@config': path.resolve(srcPath, 'config'),
            '@store': path.resolve(srcPath, 'store'),
            '@shared': path.resolve(srcPath, 'shared'),
            '@styles': path.resolve(srcPath, 'styles'),
            '@utils': path.resolve(srcPath, 'utils')
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 3008,
        hot: true
    }
};
