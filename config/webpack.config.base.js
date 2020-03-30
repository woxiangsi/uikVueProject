const path=require('path')
const webpack = require('webpack')
const  {VueLoaderPlugin} =require('vue-loader')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const pxtorem = require('postcss-pxtorem'); //rem转化
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        // autoprefixer({
        //     overrideBrowserslist: [
        //         "Android 4.1",
        //         "iOS 7.1",
        //         "Chrome > 31",
        //         "ff > 31",
        //         "ie >= 8"
        //     ],
        //     grid: true   
        // }),
        pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
};
module.exports={
    //输入:
    // import 'babel-polyfill'
    entry:{
        // path:path.join(__dirname,'index.js'),
        path:path.resolve(__dirname, '../main.js'),
    },
    //输出
    output:{
        path:path.join(__dirname,'../dist'),
        filename:'bundle.js'
    },
    resolve: {
        alias:{
            'vue$':'vue/dist/vue.esm.js'//配置别名 确保webpack可以找到.vue文件
        },
        extensions: ['.vue','.js','.css','.scss','.less','.json']
    },
    mode:process.env.NODE_ENV,
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
            //     loader: 'file-loader',
            //     options: {
            //       name: '[name].[ext]?[hash]'
            //     }
            // },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts },
                    'sass-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts },
                    'less-loader'
                ]
            },
            // {
            //     test: /\.less$/,
            //     loader: "style-loader!css-loader!less-loader",
            // },
            {

                test:/\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,  //这里的单位是b
                            name:'images/[name][hash].[ext]' //打包后输出路径
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        // new webpack.DefinePlugin({
        //     'process.env': process.env
        // }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        })
    ]
}
