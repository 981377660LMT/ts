enum Sex {
  Man,
  Woman,
  UnKnow,
}
interface Person {
  name: string
  sex: Sex
  age: number
}
// 要求用户必须填写手机号以便标记用户和接受短信
// 一个很笨的方法是重新写一个新的类：
interface BadMarketPerson {
  name?: string
  sex?: Sex
  age?: number
  phone: string
}

// 好的方法:一种是集合操作，一种是继承接口
type NormalMarketPerson = Person & { phone: string }
interface PersonWithPhone extends Partial<Person> {
  phone: string
}

// const demo: NormalMarketPerson = { phone: '' }
// const demo2: PersonWithPhone = { phone: '' }

export {}
