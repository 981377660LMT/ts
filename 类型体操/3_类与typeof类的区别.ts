class People {
  name: number
  age: number
  constructor() {}
}

// 正常赋值
const p1: People = new People()
// typeof People”缺少类型“People”中的以下属性: name, age
const p2: People = People
// 类型 "People" 中缺少属性 "prototype"，但类型 "typeof People" 中需要该属性
const p3: typeof People = new People()
// 正常赋值
const p4: typeof People = People

// 当把类直接作为类型时，该类型约束的是该类型必须是类的实例 该类型获取的是该类上的实例属性和实例方法（也叫原型方法）；
// 当把typeof 类作为类型时，约束的满足该类的类型；即该类型获取的是该类上的静态属性和方法。
