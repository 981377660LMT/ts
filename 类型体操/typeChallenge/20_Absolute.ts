type Test = -100
type Result = Absolute<Test> // expected to be "100"

type Sign = '+' | '-'
type Absolute<T extends number | string | bigint> = `${T}` extends `${Sign}${infer R}` ? R : `${T}`
export {}
