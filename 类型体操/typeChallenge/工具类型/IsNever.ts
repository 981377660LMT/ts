type IsNever<T> = [T] extends [never] ? true : false
type I0 = IsNever<never> // true
type I1 = IsNever<never | string> // false
type I2 = IsNever<null> // false
// never 是一个联合类型，因此要通过 [T] 将其变成普通类型，再去 extends
