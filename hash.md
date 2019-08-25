# 文件指纹
打包后输出的文件名后缀

# Hash
整个项目的构建有关
# Chunkhash
和webpack打包的chunk有关
# Contenthash
根据文件内容来定义hash

js => [name][chunkhash:8].js
css => [name][contenthash:8].css
file => [name][hash:8].[ext] //这里的hash指文件内容的hash