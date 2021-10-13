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

3. 键重新映射
**对键作出限制**的模板
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
元组常用方法:
1.  T extends [infer L, ...infer R]  达到遍历元组的效果


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
// 仅允许对数组和元组文本类型使用 "readonly" 类型修饰符。
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

15. 字符串的 infer 两个在一起时 前面只匹配一个 最后一个匹配剩下的

```TS
type T = 'affs' extends `${infer T}${D}${infer U}` ? U : false // true  T:'a', D:any, U:'fs'
type TTTT = 'a' extends `${infer L}${infer R}` ? true : false  // true  L:'a' R:''
// false
type FF1 = '' extends `${infer F}${infer R}` ? true : false
// true 注意这里 单个infer 可为空
type FF11 = '' extends `${infer F}` ? true : false
// true
type FF2 = 'k' extends `${infer F}${infer R}` ? true : false
```

16. 元组的解构[...infer L,infer R] 非解构优先于解构的 infer
    元组的 infer

```TS
// [1,1]
type BBB = [1, 1, 1] extends [infer L, ...infer R] ? R : false
// [1]
type BBB = [1, 1] extends [infer L, ...infer R] ? R : false
// []
type BBB = [1] extends [infer L, ...infer R] ? R : false
// false  注意这里 单个infer不可为空
type BBB = [] extends [infer L, ...infer R] ? R : false

对比字符串的infer
// false
type Test = [] extends [infer L] ? L : false
// ''
type OO = '' extends `${infer L}` ? L : false
```

17. 思路：所有类型优先转元组 因为元组性质最多 最好递归

18. 如果你需要 可以在泛型里对所有参数进行限制 这样会让你思路更清晰

```JS
type Foo<Target extends any, Res extends any[]=[]> = ...
```

19. any 是最大的联合类型 never 是最小的联合类型
    类型约束时需要 [any] extends [A]

20. 仅允许对数组和元组文本类型使用 "readonly" 类型修饰符。

```JS
// 错误
type Test2<T extends any[]> = readonly T
// 正确
type Test3<T extends any[]> = readonly [...T]
```

21. 联系 dfs 递归 技巧是携带更多参数 一般用的是 dfs 前序遍历

22. 完全相等

```JS
注意这两种写法
type Tpp1<A> = (<S>() => S) extends A ? 1 : 0
type Tpp2<A> = <S>() => S extends A ? 1 : 0
// 0 错误的写法
type Test = Tpp1<1>
// 推导泛型参数 正确的写法
type Test = Tpp2<1>
```
