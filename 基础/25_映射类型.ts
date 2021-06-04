// 映射类型可以将已知类型的每个属性都变为可选的或者只读的。
// 映射类型的语法 [K in Keys]
// keyof T，即为字符串字面量构成的联合类型（"name" | "age"）。
interface Person {
  name: string
  age: number
}

type PersonOptional = Partial<Person>
type PersonReadonly = Readonly<Person>
