# 1.解析 ES6
使用babel-loader 解析 ES6
babel 的配置文件为: .babelrc
``` javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
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

# 2.解析React JSX
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

# 4.解析Less

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

# 5.解析图片
file-loader用于处理文件
``` javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}
```
# 6.解析字体
