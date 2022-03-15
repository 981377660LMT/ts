// export：导出变量
// export default： 默认导出
// export namespace：导出对象
// export =：commonJS导出

export = React
export as namespace React

declare namespace React {}

// 对于一个`npm包的声明文件`，只有通过export导出的类型，才能被使用。

// 第一种形式用于 CommonJS 和 AMD 模块系统。
// export = React & import React = require('./React')

// 第二种形式创建了一个全局变量
// Export as namespace 表示创建了一个全局变量

// https://stackoverflow.com/questions/44847749/explain-export-and-export-as-namespace-syntax-in-typescript
