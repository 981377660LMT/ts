// lower priority inference
// 推理优先级
// Using Value & - means "lower priority inference".

type NoInfer<T> = T & {}

let a: Lowercase<string> = 'hello'

export interface SelectProps<Value extends string> {
  value: Value & {}
  options: Value[]
}

const as: SelectProps<'a' | 'b'> = {
  value: 'a',
  options: ['a', 'b']
}

// https://stackoverflow.com/questions/75233854/typescript-ensure-all-properties-use-the-same-tuple-type#answer-75233976
type TypeA = [string] // Tuple of 1 element
type TypeB = [string, string] // Tuple of 2 elements
type Header = TypeA | TypeB

interface SomeObject<H extends Header> {
  prop1: H
  prop2: H & {} // 让props2的H不自动推断
}

function useHeader<H extends Header>(someObject: SomeObject<H>) {
  // do something
}

useHeader({
  prop1: ['tuple of 1 element'],
  prop2: ['tuple of', '2 elements'] // <-- I want an error here, because prop1 and prop2 use diffrent tuples
})

// https://stackoverflow.com/questions/73732549/narrow-number-argument-of-function-to-be-literal-type/73733110#73733110
type MyData = { id: number }

// 为了让ts不推断某个类型(从而导致类型变宽)，可以使用 & - 来降低推断优先级
// function update<K extends MyData['id']>(id: K, newValues: Partial<MyData> & { id: K }): MyData {
function update<K extends MyData['id']>(id: K, newValues: Partial<MyData> & { id: NoInfer<K> }): MyData {
  throw 'not implemented'
}

// expected failure?
update(3, { id: 4 })

type SSS = 'sss' | 'sssa' | (string & {})
const sss: SSS = 'sssa' // 降低了string的优先级，使得string不会被加入到联合类型中
