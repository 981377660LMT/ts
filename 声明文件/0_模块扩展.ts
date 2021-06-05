import { Observable } from './foo'

Observable.prototype.bar = () => {}

// 但编译器对 Observable.prototype.map 一无所知。
// 可以使用扩展模块来将它告诉编译器

// 声明第三方模块
declare module './foo' {
  interface Observable<T> {
    bar<U>(func: (x: T) => U): void
  }
}
