// bivarianceHack是TypeScript中的一个技巧，
// !用于解决函数参数位置逆变的问题，即子类不可赋值给父类的问题。

// 在TypeScript中，函数参数的类型是逆变的，
// 也就是说，如果你有一个类型为(event: Animal) => void的函数，
// 你不能将一个类型为(event: Dog) => void的函数赋值给它，即使Dog是Animal的子类。
// 这是因为(event: Dog) => void的函数可能会使用Dog特有的属性或方法，而这些在Animal中并不存在。
// bivarianceHack的作用就是通过使用类中的方法来表示函数类型，
// 从而跳过这种严格的类型检查。例如，你可以将(event: E) => void类型的函数表示为{ bivarianceHack(event: E): void }["bivarianceHack"]，这样就可以将(event: Dog) => void类型的函数赋值给(event: Animal) => void类型的变量了。
// 这种技巧主要用于在保持类型安全的同时，提高代码的灵活性。

///////////////////////////////////////////

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
