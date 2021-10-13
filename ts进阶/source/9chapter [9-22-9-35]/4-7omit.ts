type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>




interface Todo {
  title: string
  completed: boolean
  description: string
  // phone: number
}

interface AA {
  [props: string]: any
}

let aa: AA = { name: "wangwu" }
type TodoPreview = Omit<Todo, "description">//type TodoPreview={}

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}

export { }