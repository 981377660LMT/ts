interface Todo {
  title: string
  description: string
  completed: boolean
}
// K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
}

// K的默认参数:不传则表示所有属性
type MyReadonly2<T, K = keyof T> = {
  // as P 解除循环约束
  [P in keyof T as P extends K ? never : P]: T[P]
} &
  {
    readonly [P in keyof T as P extends K ? P : never]: T[P]
  }

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK

export {}
