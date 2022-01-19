// TypeScript union of string and string literals
// LiteralUnion
type 无IDE提示 = 'Alice' | 'Bob' | string
type 有IDE提示1 = 'Alice' | 'Bob' | (string & {})
type 有IDE提示2 = 'Alice' | 'Bob' | (string & Record<never, never>)

const string1: 无IDE提示 = 'A'
const string2: 有IDE提示1 = 'Alice'
const string3: 有IDE提示2 = 'Bob'
