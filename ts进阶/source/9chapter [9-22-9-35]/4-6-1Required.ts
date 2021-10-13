type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface Todo {
  title: string
  completed: boolean
  description: string
  other?: string//其他信息
  date?: Date// 日期
}
type RTodo = Required<Todo>
// Required 和Partial相反 一次性全部变成必选选项的type高级类型
let todoItem: Required<Todo> = {
  title: "df",
  completed: true,
  description: "Df",
  other: "all",
  date: new Date()
}


export { }