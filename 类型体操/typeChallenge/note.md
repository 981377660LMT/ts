<!-- https://juejin.cn/post/6999280101556748295#heading-32 -->

技巧总结

```TS
1.
将联合类型合并成一个对象
type Merge<T> = { [K in keyof T]: T[K] }

2.
K in U 指的是遍历可能的key
K in keyof T 指的是提取对象的key
例子：
[K in Exclude<keyof O1, keyof O2>]
[K in keyof { a: 666 }]

3.
对键作出限制的模板
使用 as 承接后面的逻辑
type DoSomethingWithKeys<T extends object,U>={
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

4.
几种Equal
type EqualType<T, R> = [T] extends [R] ? ([R] extends [T] ? true : false) : false
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B

5.
利用函数泛型的推断
函数参数作为泛型来约束函数参数/提取函数参数的键的类型/约束函数的This
interface Chainable<Options = {}> {
  option: <K extends string, V>(key: K, val: V) => Chainable<Options & { [S in K]: V }>
  get: () => Options
}


6.
空对象的表示
Record<PropertyKey, never>

7.
使用一个数组泛型辅助，使用数组长度计数
type MakeArray<
  Length extends string,
  Result extends any[] = []
> = `${Result['length']}` extends Length ? Result : MakeArray<Length, [...Result, 1]>

8.
回溯思想的运用:全排列
type Perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

// 1.[Remain] extends [never]表示回溯终点
// 2.Remain extends Remain 表示遍历联合类型
type Permutation<T, Remain = T> = [Remain] extends [never]
  ? []
  : Remain extends Remain
  ? [Remain, ...Permutation<Exclude<T, Remain>>]
  : never

9.
字符串常用方法:
1.  S extends `${infer L}${infer R}` 每次infer先只取第一个 达到遍历字符串的效果
2.  S extends `${infer L}${From}${infer R}` 匹配泛型递归

10.
使用ThisType约束函数中的this指向
declare function SimpleVue<D, C, M>(
  // ThisType 是为了保证 options 里的函数的 this 的类型
  options: Options<D, C, M> & ThisType<D & M & ComputedReturnType<C>>
): unknown

11.
判断一个值上存不存在key(是不是plain object或者数组)
// keyof T[K] extends never 表示不存在key
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
}

12.
部分属性...的模板
// K的默认参数:不传则表示所有属性
type MyReadonly<T, K = keyof T> = {
  // as P 解除循环约束
  [P in keyof T as P extends K ? never : P]: T[P]
} &
  {
    readonly [P in keyof T as P extends K ? P : never]: T[P]
  }

13.
收集函数参数到只读元组(
  values: readonly [...T]
)
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<
  {
    [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
  }
>
// 注意 T为数组时,{
//   [P in keyof T]: ...
// }表示的是数组

14.
deep递归:递归时讨论数组/plain object 对每一项递归
数组是T[number]遍历孩子
对象是[K in keyof O]:Cur<O[K]>遍历孩子
type DeepReadonly<T> = T extends Array<any>
  ? DeepReadonlyArray<T[number]>
  : T extends Record<PropertyKey, any>
  ? DeepReadonlyObject<T>
  : T

type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>
type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
```
