// 键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<
  {
    [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
  }
>

const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)

// 注意 T为数组时,{
//   [P in keyof T]: ...
// }表示的是数组

export {}
