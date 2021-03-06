// 写在namespace外层，会作为全局类型被引入，从而可能污染全局类型空间。
// 写在namespace里层，在想使用该类型的时候，可以通过namespace.interface进行使用。（推荐）
// ./types/test.d.ts
declare namespace Webview {
  export interface Info {
    name: string
    age: number
  }

  export function getAge(): number
}

declare function Webview(foo: string): string

declare interface Webview {
  getWeight(): number
}

const mmm: Webview.Info = {
  name: '',
  age: 1,
}

const aaaaa: Webview = {
  getWeight() {
    return 1
  },
}

Webview('foo')

// 同时命名空间也支持声明合并,可以合并函数、命名空间、类和接口
// 命名空间可以嵌套
