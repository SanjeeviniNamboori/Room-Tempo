var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map', //eval-source-map //cheap-module-eval-source-map
    entry: {
        vendor: ["jquery", 'underscore', 'popper.js', 'bootstrap', 'knockout', 'crossroads', 'hasher', 'signals', 'pubsub-js', "moment", "moment-timezone", "eonasdan-bootstrap-datetimepicker", "socket.io-client", 'vue', 'vuex'],
        app: './code/main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",

            filename: "vendor.js",
            // (Give the chunk a different name)

            minChunks: Infinity,
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        }),
        new ExtractTextPlugin('style.css')
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ],
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.html$/, exclude: /node_modules/, loader: "html-loader" },
            { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    loader: [
                        {
                            loader: "css-loader",
                            options: { sourceMap: true }
                        },
                        {
                            loader: "sass-loader",
                            options: { sourceMap: true }
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=icons/[name].[ext]" },
            { test: /\.(eot|ttf|woff|woff2)$/, loader: 'file-loader?name=fonts/[name].[ext]' }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            // Force all modules to use the same jquery version
            // See https://github.com/Eonasdan/bootstrap-datetimepicker/issues/1319#issuecomment-208339466
            vue: 'vue/dist/vue.js',
            'jquery': path.resolve(process.cwd(), 'node_modules/jquery/src/jquery')
        }
    }
};