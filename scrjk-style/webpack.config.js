const MiniCssExtract = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PATH = require('path');
const UtilWebPack = require('./util-webpack');

/*------------------------------------*\
    VARIABLE
\*------------------------------------*/
const _NAME_ = "scrjk";

const _MINI_JS_ = false;

const _DIR_SRC_ = "src";
const _DIR_SRC_JS_ = `${_DIR_SRC_}/js`;
const _DIR_SRC_JSON_ = `${_DIR_SRC_}/json`;

const _DIR_DIST_JS_ = "js";
const _DIR_DIST_CSS_ = "css";

/*------------------------------------*\
    WEBPACK
\*------------------------------------*/
module.exports = {
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: {
        //"scrjk-init": `./${_DIR_SRC_JS_}/entry/${_NAME_}-init.js`,
        "scrjk-layout": `./${_DIR_SRC_JS_}/entry/${_NAME_}-layout.js`,
        //"scrjk-color": `./${_DIR_SRC_JS_}/entry/${_NAME_}-color.js`,
    },
    output: {
        filename: `${_DIR_DIST_JS_}/[name].js`,
        libraryTarget: 'var',
        library: _NAME_.toUpperCase()
    },
    module: {
        rules: [
            UtilWebPack.rules('js'),
            UtilWebPack.rules('scss', {
                'MiniCssExtract': MiniCssExtract,
                'PATH': PATH,
                '_DIR_': _DIR_SRC_JSON_
            })
        ],
    },
    optimization: {
        minimize: _MINI_JS_,
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.cssoMinify,
            }),
        ],
    },
    plugins: [
        new MiniCssExtract({
            filename: `${_DIR_DIST_CSS_}/[name].css`,
        })
    ]
}