// T extends any ? (arg: T) => void : never该表达式一定走true分支，用此方式将参数T放到逆变位置上 然后infer
type UnionToIntersection<T> = (T extends any ? (arg: T) => void : never) extends (
  // infer推导的名称相同并且都处于逆变的位置(比如说函数参数)，则推导的结果将会是交叉类型。
  arg: infer U
) => void
  ? U // U 必须都要有T的属性，所以交叉 ：(函数少的参数可以赋给多的 而多的不能付给少的)
  : never

type Eg1 = UnionToIntersection<{ key1: string } | { key2: number }>

export {}

// infer推导的名称相同并且都处于协变的位置(一般的值)，则推导的结果将会是联合类型
// type IntersectionToUnion<T> = (T extends any ? { [S in keyof T]: T } : never) extends Record<
//   string,
//   infer U
// >
//   ? U
//   : never
// type Eg2 = IntersectionToUnion<{ key1: string } & { key2: number }>
