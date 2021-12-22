type Key<T extends object, K = keyof T> = K extends any ? K : never

type NumberKey = Key<Number>

export {}
console.log((1000000).toLocaleString('en'))
console.log((1.1212).toPrecision(3))
