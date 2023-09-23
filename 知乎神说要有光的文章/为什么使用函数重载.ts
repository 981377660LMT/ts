type Callback = (results: Result[]) => void

function search<T extends Callback | undefined = undefined>(query: string, cb?: T): T extends Callback ? void : Promise<Result[]> {
  const res = api(query)

  if (cb) {
    res.then(data => cb(data))
    return undefined as void & Promise<Result[]> // assertion needed for the same reason as `getRandom` above
  }

  return res as void & Promise<Result[]>
}

const p = search('key') // ✅ Promise<Result[]>
const v = search('key', data => {}) // ✅ void

// 您可能已经注意到，有一些共同的主题：

// We use extends with conditional expressions quite a lot to determine the right return’s type. And the syntax can get complicated pretty quickly.
// 我们经常使用 extends 条件表达式来确定正确的返回类型。而且语法很快就会变得复杂。
// There are a lot of type assertions needed.
// 需要很多类型断言。
// All of these added a lot of noise to our types. So, there might be a better alternative when it comes to type complex polymorphic functions...
// 所有这些都给我们的类型增加了很多噪音。因此，当涉及到类型复杂的多态函数时，可能有更好的选择......
//
// !Function overload 函数重载
// search 函数在传入回调时返回 void，否则返回 Promise<Result[]>。我们可以使用函数重载来实现这一点：
//
// !Function overload 函数重载
//
// type Callback = (results: Result[]) => void
//
// function search(query: string, cb: Callback): void
// function search(query: string): Promise<Result[]>
// function search(arg1: string, arg2?: Callback) : void | Promise<Result[]> {
//   const res = api(query)
//
//   if (cb) {
//     res.then(data => cb(data))
//     return
//   }
//
//   return res
// }
//
//
//
// !使用函数重载，您可以删除：
// Generics and the conditional types.
// 泛型和条件类型。
// Type assertions. 类型断言。
// And you gain benefits like:
// 您还可以获得以下好处：
// Readability, since you can clearly distinguish the possible variant of the overloaded function. The types of arguments and return values are separately and explicitly written out.
// 可读性，因为您可以清楚地区分重载函数的可能变体。参数和返回值的类型是单独显式写出的。
// IDE support for overloaded functions is better.
// IDE 对重载函数的支持更好。

// !函数重载可以被认为是交叉函数类型的语法糖
// Function overload is just an intersection of function types
// type F = ((input: string) => string) & ((input: number) => number)

// const switchIt_intersection: F = (input) => {
//     if (typeof input === 'string') {
//         return Number(input)
//     } else {
//         return String(input)
//     }
// }

// const num = switchIt_intersection(1) // ✅ has the string type
// const str = switchIt_intersection('1') // ✅ has the number type
