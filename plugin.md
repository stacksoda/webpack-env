

## 文件监听

> 1. 开启webpack时带上--watch参数<br>
> 2.webpack.config.js中设置 watch: true

文件监听配置

``` javascript
module.export = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300, // 延迟时间
        poll: 1000 //每秒轮询次数
    }
}
```

# 热更新 webpack-dev-server
WDS不刷新浏览器
WDS不输出文件，而是放在内存中
使用 HotModuleReplacementPlugin 插件完成热更新
package.json
`    "dev": "webpack-dev-server --open"` 

# webpack-dev-middleware
WDM将webpack输出的文件传输给服务器
适用于灵活的定制场景

# 热更新原理
webpack compile 将js编译成bundle
HMR Server 将热更新的文件输出给 HMR Runtime
Bundle server 提供文件在浏览器的访问
HMR Runtime 呗注入到浏览器，更新文件的变化
bundle.js 构建输出的文件

# css提取
npm i mini-css-extract-plugin -D

``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader, // 与 style-loader互斥
                'css-loader',
                'less-loader'
            ]
        }, ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        })
    ]
}
```

# 代码压缩

## HTML

html-webpack-plugin
`npm i -D html-webpack-plugin` 

## CSS

使用 optimize-css-assets-webpack-plugin 同时使用cssnano

`npm i -D optimize-css-assets-webpack-plugin cssnano` 

``` javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }), // 要把css单独提取出来才能看到效果 所以和↑ css提取要搭配使用
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
    ]
}
```

## JS

内置了 uglifyjs-webpack-plugin

# 清理构建目录

## 通过npm scripts 清理构建目录

``` bash
rm -rf ./dist && webpack
rimraf ./dist && webpack
```

不优雅

## 使用 clean-webpack-plugin

默认会删除 output 制定的输出目录

`npm i clean-webpack-plugin -D` 
``` javascript 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {

    plugins: [
        new CleanWebpackPlugin()
    ]
    
    

}

``` 
# 抽取公共资源(打包时间优化*)
将react、react-dom基础包通过cdn引入，不打入bundle中

## SplitChunksPlugin 

Webpack4内置的，替代CommonsChunkPluin插件
chunks参数说明
 >   async异步引入的库进行分离(默认) <br>
    initial 同步引入的库进行分离<br>
    all 所有引入的库进行分离(推荐)
``` JavaScript
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,// 抽离公共包的最小大小
            maxSize: 0,// 最大的大小
            minChunks: 1,// 引入的最小次数
            maxAxyncRequests: 5,// 同时请求的数量
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    optimization2: { //处理单独资源
        splitChunks: {
            minSize: 1000,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
}
```

## html-webpack-externals-plugin

`npm i -D html-webpack-externals-plugin` 

``` javascript
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {

    plugins: [
        new HtmlWebpackExternalsPlugin({
            externals: [{
                module: 'react',
                entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
                global: 'React',
            }, ],
        }),
    ]

}
```

还需要在模板中引入 cdn

# tree shaking (摇树优化)
一个模块可能有多个方法，只要其中某个方法使用到了，则整个文件都会被打到bundle里面去，
tree shaking 只是把用到的方法打入 bundle 没用到的方法会在 uglify阶段被擦除掉

webpack默认支持 在.babelrc里设置 modules:false即可

必须是ES6语法，CJS的方式不支持
## DCE(Elimination)
代码不会被执行，不可到达
代码执行的结果不会被用到
代码只会影响死变量(只写不读)

## tree-shaking原理
利用ES6模块的特点
> 只能作为模块顶层的语句出现 <br>
> inport 的模块名只能是字符串常量 <br>
> import binding 是 immutable的

代码擦除： uglify阶段删除无用代码