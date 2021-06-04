// keyof 拿到了属性名
// T[K]索引访问操作符 拿到属性值
class Token {
  public secret: string = 'ixeFoe3x.2doa'
  public accessExp: number = 60 * 60
  public refreshExp: undefined
}

type token = keyof Token
type valueType = Token[token] // type valueType = string | number
type secret = Token['secret'] // type secret = string

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name] // o[name] is of type T[K]
}

// pluck采摘
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

interface Person {
  name: string
  position: string
  age: number
}

let person: Person = {
  name: 'Evan',
  position: 'Software Engineer',
  age: 27,
}

let values = pluck(person, ['name', 'age'])
console.log(values)

export default 1
