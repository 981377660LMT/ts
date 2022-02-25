// export：导出变量
// export default： 默认导出
// export namespace：导出对象
// export =：commonJS导出

export = React
export as namespace React

declare namespace React {}

// 对于一个`npm包的声明文件`，只有通过export导出的类型，才能被使用。
