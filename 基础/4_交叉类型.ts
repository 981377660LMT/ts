// 注意<T>{}相当于{} as T

const extend = <T extends object, U extends object>(fisrt: T, second: U) => {
  const result = <T & U>{}
  for (const key in fisrt) {
    ;(<T>result)[key] = fisrt[key]
  }
  for (const key in second) {
    if (!result.hasOwnProperty(key)) {
      ;(<U>result)[key] = second[key]
    }
  }

  return result
}

const x = extend({ a: 'hello' }, { b: 42 })

// 现在 x 拥有了 a 属性与 b 属性
const asa = x.a

interface A {
  name: string
  age: number
}

interface B {
  name: number
  birth: string
}

type C = A & B

export {}

interface Student {
  name: string
  school: string
}
interface People {
  name: string
  age: number
}
// 作为交叉类型，两个接口的定义必须都符合
const a: Student & People = {
  name: '',
  school: '',
  age: 1,
}
// 作为联合类型，只能访问接口公有定义
let b: Student | People = a
console.log(b.name)
