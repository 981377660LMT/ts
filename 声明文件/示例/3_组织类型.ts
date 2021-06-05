// 使用命名空间组织类型。
declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean
  }
  interface AlertOptions {
    modal: boolean
    title?: string
    color?: string
  }
}

declare class Greeter {
  constructor(greeting: string)

  log: (option: GreetingLib.LogOptions) => void

  alert: (option: GreetingLib.AlertOptions) => void
}

const g = new Greeter('Hello')
g.log({ verbose: true })
g.alert({ modal: false, title: 'Current Greeting' })

export {}
