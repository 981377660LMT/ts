// ts是惰性求值的 所以必须要extends any 再展开所有键
type Key<T extends object, K = keyof T> = K extends any ? K : never

type NumberKey = Key<Number>

console.log((1000000).toLocaleString('en'))
console.log((1.1212).toPrecision(3))

export {}
