// Pick<Type, Keys>
// 从类型 Type 中挑选部分属性 Keys 来构造类型。
// Omit<Type, Keys>
// 从类型 Type 中获取所有属性，然后从中剔除 Keys 属性后构造一个类型。
// Exclude<Type, ExcludedUnion>
// 从类型 Type 中剔除所有可以赋值给 ExcludedUnion 的属性，然后构造一个类型。
// Extract<Type, Union>
// 从类型 Type 中提取所有可以赋值给 Union 的类型，然后构造一个类型。

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>
type ICanNotCompleteToday = Omit<Todo, 'completed'>
type ICanNotCompleteTodayKey = Exclude<keyof Todo, 'completed'>
type ICanNotCompleteTodayCompletedKey = Extract<keyof Todo, 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
