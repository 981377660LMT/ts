// 使用interface而不是type
// interface 支持嵌套 (例如二叉树/链表等)
// type 不支持循环嵌套
const entry: NestDict = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

interface NestDict {
  [key: string]: NestDict | string
}

// 类型别名“NestDict1”循环引用自身。ts(2456)
// type NestDict1 = Record<string, NestDict1>

export {}
