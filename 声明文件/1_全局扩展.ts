// observable.ts
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
