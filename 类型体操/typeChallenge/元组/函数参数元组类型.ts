// 函数参数元组类型 -> Promise.all是如何识别元组的每个参数的类型的？
// 1. 数组统一类型为T
// 2. T extends readonly unknown[] | []
// 3. T[P] -> 元组的每个参数
// 4. Awaited<T[P]> -> 元组的每个参数的类型
// 5. { -readonly [P in keyof T]: Awaited<T[P]> } -> 元组的每个参数的类型的集合

// !all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

Promise.all([Promise.resolve(1), Promise.resolve('1')]).then(res => res)

interface Wrapper<T = unknown> {
  value: T
}

// !返回每个参数的类型(元组)
function fooArgs<T extends readonly Wrapper[]>(
  ...args: T
): Wrapper<{ [K in keyof T]: T[K] extends Wrapper<infer U> ? U : never }> {
  // @ts-ignore
  return { value: args.map(item => item.value) }
}

const fooArgsRes = fooArgs({ value: 1 }, { value: '1' }, { value: true })

console.log(fooArgsRes)

// 如果要取元组任意一个参数的类型，可以使用索引 [number]

// !数组/元组是特殊的Record
