type Comparable<T> = (a: T, b: T) => number

interface IPerson {
  name: string
  age: number
}

const key: Comparable<IPerson> = (a, b) => a.age - b.age

export {}
const createNamedTuple = require('named-tuple')
