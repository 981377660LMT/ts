function fn(input: never) {}

// 它只能传 `never`
declare let myNever: never
fn(myNever) // 新技能 ✅
// 传任何其他的东西 (甚至不传) 都会导致一个类型错误
fn() // ❌  An argument for 'input' was not provided.
fn(1) // ❌ Argument of type 'number' is not assignable to parameter of type 'never'.
fn('foo') // ❌ Argument of type 'string' is not assignable to parameter of type 'never'.

// 甚至 `any` 也不行
declare let myAny: any
fn(myAny) // ❌ Argument of type 'any' is not assignable to parameter of type 'never'.

// 我们可以通过在默认情况中调用这种函数来确保函数里的 switch 和 if-else 被完整匹配。由于余下的分支要匹配  never 类型，如果我们不小心遗传错了，TypeScript 就会报出类型错误。例如：

function unknownColor(x: never): never {
  throw new Error('unknown color')
}

type Color = 'red' | 'green' | 'blue'

function getColorName(c: Color): string {
  switch (c) {
    case 'red':
      return 'is red'
    case 'green':
      return 'is green'
    default:
      return unknownColor(c) // Argument of type 'string' is not assignable to parameter of type 'never'
  }
}
