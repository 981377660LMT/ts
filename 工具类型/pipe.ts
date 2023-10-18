// 管道函数
// https://www.zhihu.com/question/317663964/answer/2482929401
//
// 不用临时变量展开的写法，能自动推导每个步骤的value、to的类型。

interface IPipe<T> {
  value: T
  to: <R>(func: (value: T) => R) => IPipe<R>
}

function pipe<T>(value: T): IPipe<T> {
  return {
    value,
    to: func => pipe(func(value))
  }
}

export { pipe }

if (require.main === module) {
  const res = pipe(1).to(JSON.stringify).value
}
