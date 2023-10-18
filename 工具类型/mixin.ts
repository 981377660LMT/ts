// 类继承的mixin，支持多继承
// https://www.zhihu.com/question/317663964/answer/636679515
// 联合类型转交叉类型的应用: mixin class

// type Weird = UnionToIntersection<string | number | boolean>
// equivalent to
// type Weird = string & number & true & false

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type Constructor<T = {}> = abstract new (...args: any[]) => T

declare function mixin<T extends Constructor[]>(...traits: T): Constructor<UnionToIntersection<InstanceType<T[number]>>>

class Flyable {
  fly() {
    console.log('I can fly')
  }
}

class Walkable {
  walk() {
    console.log('I can walk')
  }
}

class MixedClass extends mixin(Flyable, Walkable) {
  test() {
    this.fly()
    this.walk()
  }
}

export {}
