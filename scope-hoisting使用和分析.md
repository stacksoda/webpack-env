# 导致问题
大量函数闭包包裹代码，导致体积增大
运行代码时创建的函数作用于变多，内存开销变大

在webpack3中 需要手动引入 ModuleConcatenationPlugin
在webpack4中 mode production模式下自动开启