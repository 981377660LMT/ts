// 两种情况

// is A 继承的关系
interface Animal {
  name: string
}

interface Dog extends Animal {
  break(): void
}

let a: Animal
let b: Dog

// Dog is Animal
a = b
// 反过来不行
b = a

//////////////////////////
// has A 组合的关系
type A = 1 | 2 | 3
type B = 2 | 3
let c: A
let d: B

// A has B
c = d
// 不可赋值
d = c
export {}
