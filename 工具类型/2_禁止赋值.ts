interface Todo {
  title: string
}
const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
}

todo.title = 'Hello' // Error: cannot reassign a readonly property

// 这个工具可用来表示在运行时会失败的赋值表达式（比如，当尝试给冻结对象 (opens new window)的属性再次赋值时）。
declare function freeze<T>(obj: T): Readonly<T>

export default 1
