# 1.webpack安装
前期准备 npm初始化 
```
npm init -y
```
安装webpack和webpack-cli
```
npm install webpack webpack-cli --save-dev
```
其中--save-dev是将webpack保存在 webpack-devServer中
与`npm i -D`相同
### 查看webpack版本
`/node_modules/.bin/webpack -v`

# 2.entry
单入口
```
module.exports = {
    entry: './path/to/my/entry/file.js'
}
```
多入口
```
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
}
```
# 3.output
output需要引用绝对路径
``` javascript  
module.exports = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```
# 4.Loaders
将webpack原生不支持的类型通过loaders执行，
本身是一个函数，接受源文件作为参数，返回转换的结果。
``` javascript
module.exports = {
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
}
```
`test` 指匹配规则

`use` 指定使用的`loader`名称
# 5.Plugins
用于bundle文件的优化，资源管理和环境变量注入
作用于整个构建过程
``` javascript
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
```
# 6.Mode
Mode用来指定当前构建环境是: production、 development还是none

设置mode可以使用webpack内置的函数，默认值为production

设置mode会开启相关的优化plugin
