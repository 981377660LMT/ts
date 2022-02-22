// react.d.ts 中使用bivarianceHack 的两处地方

// bivariance 本意就是 （双向）协变的意思
// ts默许的开启双向协变的hack写法:ts中所有方法都被视为双变
// type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];
// type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];

// 为什么不直接使用(event: E) => void呢
class Animal {
  private A: undefined
}
class Dog extends Animal {
  private D: undefined
}

type EventHandler<E extends Animal> = (event: Animal) => void
// type EventHandler<E extends Animal> = { bivarianceHack(event: E): void }['bivarianceHack']

// ts编译器要求你解决问题，EventHandler只能保证参数event一定是Animal的子类，但是不能保证event一定有属性D
// 而代码 " (event: Dog) => { }"，存在使用属性D的可能，那ts编译器认为在非常严格的类型约束要求下，不能协变
// 总结：解决函数参数位置逆变(子类不可赋值给父类)的问题 例如1不能赋值给number的问题
// 这时候就用类中的method来表示函数类型跳过strictCheck
const animalHandler: EventHandler<Animal> = (event: Dog) => {}

export {}

// The stricter checking applies to all function types,
// `except those originating in method or constructor declarations.`
// Methods are excluded specifically to ensure generic classes and interfaces (such as Array<T>)
// continue to mostly relate covariantly.
// The impact of strictly checking methods would be a much bigger breaking change
// as a large number of generic types would become invariant (even so, we may continue to explore this stricter mode).
