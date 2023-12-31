// 函数参数泛型限定
// https://stackoverflow.com/questions/71300504/why-typescript-cannot-infer-callback-argument-type-based-on-generics

type EventWatch = {
  <K extends keyof User>(eventName: `${string & K}Changed`, callback: (e: User[K]) => void): void
}

type User = {
  firstname: string
  lastname: string
  age: number
  on: EventWatch
}

let john: User = {
  firstname: 'John',
  lastname: 'Doe',
  age: 33,
  on(eventName, callback) {
    if (eventName == 'ageChanged') {
      callback(133) //ERROR:
      /*
    TS2345: Argument of type 'number' is not assignable to parameter of type 'User[K]'.
    Type 'number' is not assignable to type 'never'.
       */
      // !TypeScript 无法根据控制流缩小或重新约束泛型类型参数;因此，再多的 eventName 检查也不会缩小类型参数 K 本身的范围
      // !TypeScript `does not use control flow analysis to narrow or constrain generic type parameters`.
    }
  }
}

// 重构：
// 与其在这里使用泛型，不如考虑提供 on() 元组联合的 rest 参数，因为只有有限的可能允许 eventName / callback 对类型的列表。
// 由于该 eventName 参数是字符串文本类型，这意味着您的联合将是一个可区分的联合，其中检查 eventName 也会自动缩小 callback 范围。
type EventWatchParams = {
  [K in keyof User]: [eventName: `${K}Changed`, callback: (e: User[K]) => void]
}[keyof User]
const john2 = {
  firstname: 'John',
  lastname: 'Doe',
  age: 33,
  on(...args: EventWatchParams) {
    const [eventName, callback] = args
    if (eventName == 'ageChanged') {
      callback(133) // okay
    }
  }
}
