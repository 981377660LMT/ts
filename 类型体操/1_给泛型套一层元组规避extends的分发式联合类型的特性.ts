// keyof T的结果为该类型上所有public属性key的联合：
class Eg2 {
  private name: string
  public readonly age: number
  protected home: string
}
// T2实则被约束为 age
// 而name和home不是公有属性，所以不能被keyof获取到
type T2 = keyof Eg2

///////////////////////////////////////////////////////
type Query<T> = T extends 'x' ? 1 : 2
// 简单的条件判断 直接判断
type A2 = 'x' | 'y' extends 'x' ? 1 : 2
// 若extends前面的类型是泛型 则会分解
type A3 = Query<'x' | 'y'>

// 给泛型套一层元组规避extends的分发式联合类型的特性
type Prevent<T> = [T] extends ['x'] ? 1 : 2
/**
 * type A4 = 2;
 */
type A4 = Prevent<'x' | 'y'>
/////////////////////////////////////////////////////
// 协变与逆变
// 具有父子关系的多个类型，在通过某种构造关系构造成的新的类型，
// 如果还具有父子关系则是协变的，而关系逆转了（子变父，父变子）就是逆变的。
////////////////////////////////////////
// infer推导的名称相同并且都处于逆变的位置(比如说函数参数)，则推导的结果将会是交叉类型。
type Bar<T> = T extends {
  a: (x: infer U) => void
  b: (x: infer U) => void
}
  ? U
  : never

// type T1 = string
type B1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>

// type T2 = never
type B2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>

// infer推导的名称相同并且都处于协变的位置(一般的值)，则推导的结果将会是联合类型
type Foo<T> = T extends {
  a: infer U
  b: infer U
}
  ? U
  : never

// type T1 = string
type B3 = Foo<{ a: string; b: string }>

// type T2 = string | number
type B4 = Foo<{ a: string; b: number }>
/////////////////////////////////////////////////////////////////
