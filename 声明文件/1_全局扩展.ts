// observable.ts
// 全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中。
// 确保当前文件被当做一个模块.
export class Observable<T> {
  // ... still no implementation ...
}

declare global {
  interface Array<T> {
    toObservable(): void
  }
}

Array.prototype.toObservable = function () {}
// 你也以在模块内部添加声明到全局作用域中。
// 这样在所有位置就都可以拿到 Array.prototype上的自定义属性了

// 如果不加export {}，会报「全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中」错误。
// 增加export{}其实也就是为了让这个声明文件变成模块声明文件，而不是一个全局声明文件。

// 如果要定义.svg .css 这类模块 不要编程模块声明文件 直接用 gloabl.d.ts 不导出
