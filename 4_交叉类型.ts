// 注意<T>{}相当于{} as T

const extend = <T extends object, U extends object>(fisrt: T, second: U) => {
  const result = <T & U>{}
  for (const key in fisrt) {
    ;(<T>result)[key] = fisrt[key]
  }
  for (const key in second) {
    if (!result.hasOwnProperty(key)) {
      ;(<U>result)[key] = second[key]
    }
  }

  return result
}

const x = extend({ a: 'hello' }, { b: 42 })

// 现在 x 拥有了 a 属性与 b 属性
const asa = x.a
