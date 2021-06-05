const a_ = 1 as {}
/////////////////////////////////////////
interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
}

interface ClockConstructor<T> {
  new (hour: number, minute: number): T
}

class Clock implements ClockInterface {
  currentTime: Date = new Date()
  // 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
  // 并且只对其实例部分进行类型检查。
  // constructor 存在于类的静态部分，所以不在检查的范围内。
  private setTime(d: Date) {
    this.currentTime = d
  }

  constructor(h: number, m: number) {}
}

export { Clock }
////////////////////////////////////////////
function create<T>(c: { new (): T }): T {
  return new c()
}
//////////////////////////////////////
let pythonic: [boolean, ...string[], number]
pythonic = [true, 'a', 'b', 1]

///////////////////////////////////
declare function doSomething(...args: [...string[], boolean]): void {}

doSomething(false)
doSomething('a', 'b', true)
///////////////////////////////////////
// 解构出来的变量可以被明确地标记为未使用的
// TypeScript 会识别出使用了下划线的 _first 变量是有意的未使用的变量。
let [_first, second] = [1, 2]
///////////////////////////////////////
type Partial<T> = {
  [P in keyof T]?: T[P]
}
// 添加成员，则可以使用交叉类型：
type PartialWithNewMember<T> = {
  [P in keyof T]?: T[P]
} & { newMember: boolean }

interface IFoo {
  length: number
}

const a: PartialWithNewMember<IFoo> = {
  newMember: true,
}
///////////////////////////////////////
// Readonly ， Partial 和 Pick 是同态的，但 Record 不是。 因为 Record 并不需要输入类型来拷贝属性，所以它不属于同态：
// Record记录属性
// 非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
////////////////////////////////////
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object'

type T0 = TypeName<string> // "string"
type T1 = TypeName<'a'> // "string"
type T1_ = TypeName<1> // "number"
type T2 = TypeName<true> // "boolean"
type T3 = TypeName<() => void> // "function"
type T4 = TypeName<string[]> // "object"
///////////////////////////////////////////////
// 分布式有条件类型
// 实例化 T extends U ? X : Y ， T 的类型为 A | B | C ，会被解析为 (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y) 。
// 额外的约束 any[]
type BoxedValue<T> = { value: T }
type BoxedArray<T> = { array: T[] }
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>

type T20 = Boxed<string> // BoxedValue<string>;
type T21 = Boxed<number[]> // BoxedArray<number>;
type T22 = Boxed<string | number[]> // BoxedValue<string> | BoxedArray<number>;
////////////////////////////////////////////////
type Diff<T, U> = T extends U ? never : T
type Filter<T, U> = T extends U ? T : never
type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // "b" | "d"
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // "a" | "c"
type T32 = Diff<string | number | (() => void), Function> // string | number
type T33 = Filter<string | number | (() => void), Function> // () => void
type NonNullable<T> = Diff<T, null | undefined> // Remove null and undefined from T
///////////////////////////////////////////////
switch (Math.random()) {
  case 0: // 错误: switch 中出现了贯穿的 case.
    console.log('even')

  case 1:
    console.log('odd')
    break
}
