import { Observable } from './foo'

Observable.prototype.bar = () => {}

// 但编译器对 Observable.prototype.map 一无所知。
// 可以使用扩展模块来将它告诉编译器

// 声明合并:第三方模块
declare module './foo' {
  interface Observable<T> {
    bar<U>(func: (x: T) => U): void
  }
}

// 当这些声明在扩展中合并时，就如同在原始位置被声明一样。 但是，有两点限制需要注意：

// 你不能在扩展中声明新的顶级声明－仅可以扩展模块中已经存在的声明。
// 默认导出也不能扩展，只有命名的导出才可以（因为你需要使用导出的名字来进行扩展，并且 default 是保留关键字 - 详情查看 #14080 (opens new window)）
