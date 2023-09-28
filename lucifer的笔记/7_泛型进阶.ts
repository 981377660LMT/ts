type Unshift<Tuple extends any[], Added> = [Added, ...Tuple]
type Push<Tuple extends any[], Added> = [...Tuple, Added]
type Shift<Tuple extends any[]> = Tuple extends [first: any, ...args: infer R] ? R : never
type Pop<Tuple extends any[]> = Tuple extends [...args: infer R, last: any] ? R : never

// 将Fn的参数表最后一个参数切掉，并返回切掉参数之后的函数类型
type cutTail<F extends (...args: any) => any> = F extends (...args: infer R) => any ? Pop<R> : never

function kkk(a: string, b: number) {}

type foo = cutTail<typeof kkk>

// 泛型支持递归调用和声明
// 递归地将类型中所有的属性都变成可选(dfs)
type DeepPartial<T> = T extends Function ? T : T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

interface DeepPartialDemo {
  a: { b: { c: { d: string } } }
}

type D = DeepPartial<DeepPartialDemo>

// 将类型的属性变成可修改，这里的 -指的是去除。 -readonly 意思就是去除只读，也就是可修改
type Mutable<V> = {
  -readonly [K in keyof V]: V[K]
}

export {}
