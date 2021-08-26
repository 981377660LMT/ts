type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }

// type AppendToObject<T, U extends PropertyKey, V> = T & { [K in U]: V }
type Merge<T> = { [K in keyof T]: T[K] }
type AppendToObject<T, U extends PropertyKey, V> = Merge<{ [K in keyof T]: T[K] } & { [K in U]: V }>

export {}
