const ENTRY_POINT = "entry";

exports.rules = function (type, data = null) {

    /**
     * JavaScript. 
     */
    function js() {
        return {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }
    }

    /**
     * SCSS.
     */
    function scss(data) {
        return {
            test: /\.(sa|sc|c)ss$/i,
            use: [
                {
                    loader: data.MiniCssExtract.loader,
                    options: {
                        publicPath: "./",
                    },
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'sass-loader',
                },
                {
                    loader: "@epegzz/sass-vars-loader",
                    options: {
                        syntax: 'scss',
                        files: [
                            data.PATH.resolve(__dirname, `${data._DIR_}/color.json`),
                            data.PATH.resolve(__dirname, `${data._DIR_}/${ENTRY_POINT}/layout.json`),
                        ]
                    }
                }
            ],
        }
    }
    /**
     * Importer.
     */
    if (type === 'js') {
        return js();
    } else if (type === 'scss') {
        return scss(data);
    }
};