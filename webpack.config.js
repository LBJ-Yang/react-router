const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'eval-source-map',

    entry: path.join(__dirname, '/app/main.js'),
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public',
        inline: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015', 'react'
                        ]
                    }
                },
                exclude: /node_modules/
            },
            /*{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },{
                        loader: "postcss-loader"        //自动补全前缀
                    }]
                })
            },*/
            {
                test: /\.less$/,
                use:  ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:["css-loader","less-loader","postcss-loader"
                        /*{
                            loader: "css-loader" 
                        },
                        {
                            loader: "less-loader"
                        },
                        {
                        loader: "postcss-loader"
                        }*/]
                })
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: '3000'
                        }
                    }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:__dirname + '/entries/tel.index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("style.css"),

        //提取第三方库，如果依赖的库有添加或更新，先执行一遍webpack --config webpack.dll.config.js,再进行打包
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/lib/bundle-mainfest.json')
        })
    ]
};
