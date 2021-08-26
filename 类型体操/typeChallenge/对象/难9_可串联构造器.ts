declare const config: Chainable

const result: Result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}

interface Chainable<Options = {}> {
  option: <K extends string, V>(key: K, val: V) => Chainable<Options & { [S in K]: V }>
  get: () => Options
}

export {}
