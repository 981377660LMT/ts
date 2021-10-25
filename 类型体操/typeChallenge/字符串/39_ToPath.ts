/**
 * @description 用于把属性访问（. 或 []）路径转换为元组的形式
 * 先去除点 再去除括号
 */
type ToPath<S extends string> = S extends `${infer A}.${infer B}`
  ? [...ToPath<A>, ...ToPath<B>]
  : S extends `${infer A}[${infer B}]`
  ? [A, B]
  : [S] // 你的实现代码

type Test1 = ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
type Test2 = ToPath<'foo[0].bar.baz'> //=> ['foo', '0', 'bar', 'baz']
export {}
