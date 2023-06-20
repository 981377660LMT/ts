// 继承接口或者交叉类型

interface Api<T, Q> {
  add(value: T, index: number): void
  remove(value: T, index: number): void
  query(): Q
  [key: string]: unknown
}

const api: Api<number, number> & {
  foo: Map<number, number>
} = {
  foo: new Map<number, number>([[1, 1]]),
  add(value: number, index: number) {
    console.log(value, index)
  },
  remove(value: number, index: number) {
    console.log(value, index)
  },
  query() {
    return this.foo.get(1)!
  }
}

export {}
