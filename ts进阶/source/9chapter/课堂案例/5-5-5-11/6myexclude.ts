interface Worker {
  name: string
  age: number
  email: string
  salary: number
}

interface Student {
  name: string
  age: number
  email: string
  grade: number
}

// 用Extract来完成的获取Worker接口类型中的"age" | "email" | "salary"三个属性组成的联合类型
type Extract<T, U> = T extends U ? T : never
//type isResultType = Extract<"age" | "email" | "salary" | "xx",
//"name" | "age" | "email" | "salary">
//keyof Worker="name" |"age" | "email" |"salary"
type isResultType = Extract<"age" | "email" | "salary" | "xx", keyof Worker>

//排除条件成立的类型，保留不符合泛型约束条件的类型
type Exclude<T, U> = T extends U ? never : T
// 用Exclude来完成的获取Worker接口类型中的"age" | "email" | "salary"三个属性组成的联合类型
type isResultType2 = Exclude<"age" | "email" | "salary" | "xx", keyof Worker>//xx
type isResultType22 = Exclude<"name" | "xx", keyof Worker>//xx
type isResultType23 = Exclude<"name", keyof Worker>//never
type isResultType24 = Exclude<"name" | "age" | "email" | "salary", "name">// "age" | "email" | "salary"

// 获取Woker接口类型中存在的属性，但是在学生接口类型中不存在的属性
// type isResultType25 = Exclude<"name" | "age" | "email" | "salary",
//   "name" | "age" | "email" | "grade">//salary
type isResultType25 = Exclude<keyof Worker, keyof Student>//salary

export { }

