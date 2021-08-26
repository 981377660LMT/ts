interface Animal {
  name: string
}

interface Dog extends Animal {
  break(): void
}

let Eg1: Animal
let Eg2: Dog
// 兼容，可以赋值 可以多属性但不能少
Eg1 = Eg2

// 协变:
let Eg3: Array<Animal>
let Eg4: Array<Dog>
// 兼容，可以赋值
Eg3 = Eg4

// 逆变(函数不能多属性)
// Animal和Dog在进行type Fn<T> = (arg: T) => void构造器构造后，父子关系逆转了，此时成为“逆变”。
type AnimalFn = (arg: Animal) => void
type DogFn = (arg: Dog) => void
let Eg5: AnimalFn
let Eg6: DogFn
// 不再可以赋值了，
// AnimalFn = DogFn不可以赋值了, Animal = Dog是可以的
Eg5 = Eg6
// 反过来可以
Eg6 = Eg5
export {}
