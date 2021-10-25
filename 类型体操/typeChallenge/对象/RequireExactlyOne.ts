// 只能包含 age 或 gender 属性，不能同时包含这两个属性。
interface Person {
  name: string
  age?: number
  gender?: number
}

// 只能包含Keys中唯一的一个Key
// 你的实现代码
type RequireExactlyOne<T, Keys extends keyof T, K extends Keys = Keys> = Keys extends any
  ? // 不能选择的键Record<Exclude<K, Keys>, never>
    Omit<T, K> & Required<Pick<T, Keys>> & Partial<Record<Exclude<K, Keys>, never>>
  : never

type T1 = RequireExactlyOne<Person, 'age' | 'gender'>

const p1: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: 'lolo',
  age: 7,
}

const p2: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: 'lolo',
  gender: 1,
}

// Error
const p3: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: 'lolo',
  age: 7,
  gender: 1,
}

export {}
