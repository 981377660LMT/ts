// 如果接口中的函数类型带有函数名，下面两种书写方式是等价的：
// 函数：名称<类型>(变量):返回值
// 函数：名称:<类型>(变量):返回值

interface Collections {
  M<T, U>(m: any): never
  hi: <T>(name: string) => T
}

// 接口也可以描述函数类型。
// 函数类型 (变量):返回值
interface SearchFunc {
  (source: string, subString: string): boolean
}

class B implements Collections {
  constructor() {}

  M(m: any): never {
    throw Error()
  }

  hi() {}
}

// 相同类型元素组成成为数组，不同类型元素组成了元组（Tuple）。

export default B
