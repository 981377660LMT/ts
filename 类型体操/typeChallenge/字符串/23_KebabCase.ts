type Test = KebabCase<'FooBarBaz'> // 'foo-bar-baz'

export {}

// 思路：从头一个一个变小写，遇到大写就加- 递归终点为空字符串
type KebabCase<S extends string> = S extends `${infer L}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Uncapitalize<L>}${KebabCase<R>}`
    : `${Uncapitalize<L>}-${KebabCase<R>}`
  : S

export {}
