# 1. 解析 ES6

使用babel-loader 解析 ES6
babel 的配置文件为: .babelrc

``` javascript
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    };
}
```

在 .babelrc 文件中增加 ES6的配置 preset

``` json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```

一个presets相当于一组plugins
`npm i @babel/core @babel/preset-env babel-loader -D` 

# 2. 解析React JSX
增加React的babel preset配置
``` json 
{

    "presets": [
        "@babel/preset-react"
    ]

}

``` 

# 3.解析CSS
css-loader 用于加载 .css文件，并且转换成commonjs对象

style-loader 将样式通过 <style> 标签插入到 head 中
``` javascript
module.exports = {
    module: {
        rules: [
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        ]
    }
}
```

# 4. 解析Less

``` javascript
module.exports = {
    module: {
        rules: [
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        ]
    }
}
```

安装 less和less-loader
`npm i -D less less-loader` 

# 5. 解析图片
file-loader用于处理文件

``` javascript
module.exports = {
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }]
    }
}
```

# 6. 解析字体

``` javascript
module.exports = {
    module: {
        rules: [{
            test: /\.(woff|woff2|eof|ttf|otf)$/
            use: [
                'file-loader'
            ]
        }]
    }
}
```

# 7. 小资源转base64
使用url-loader可以处理图片和字体，可以设置小资源自动转 base64

``` javascript
module.eports = {
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10240
                }
            }
        }]
    }
}
```

# 8. CSS3属性前缀
PostCSS插件 autoprefixer 自动补齐 CSS3 前缀 (根据can i use)
`npm i postcss-loader autoprefixer -D` 

# 9. CSS px自动转换成rem
使用 px2rem-loader 
页面渲染时计算根元素的font-size值

npm i px2rem-loader -D
npm i -s lib-flexible

``` javascript
module.exports = {

    module: {
        rules: [
            {
                test:/\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,// 与 style-loader互斥
                    {loader: 'css-loader', options: { importLoaders: 1 }},
                    'less-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
        ]
    }

}
```
# 10.资源内联
## 代码层面
页面框架的初始化脚本
上报相关打点
css内联避免页面闪动
## 请求层面
减少 HTTP 网络请求数
小图片或者文字内联 (url-loader)
npm i -D raw-loader@0.5.1

# 11.多页面打包通用方案
`npm i -D glob`

``` javascript
const glob = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    Object.keys(entryFiles)
        .map(index => {
            const entryFile = entryFiles[index];

            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                    }
                })
            )
        })

    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins} = setMPA();
```

