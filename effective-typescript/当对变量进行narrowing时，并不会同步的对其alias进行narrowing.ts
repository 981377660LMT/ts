// 使用alias时保持一致
interface Test {
  name?: string
}
const obj: Test = {}
const name = obj.name
if (obj.name) {
  obj.name.toLowerCase() // ok
  name.toLowerCase() // check error
}

export {}
