// TS 在遇到以下这些条件语句时，会在语句的块级作用域内「收紧」变量的类型，
// 这种类型推断的行为称作类型守卫 (Type Guard)。
// 类型判断：typeof
// 实例判断：instanceof
// 属性判断：in
// 字面量相等判断：==, ===, !=, !==
// 自定义类型守卫

function test(input: string | number) {
  if (typeof input == 'string') {
    // 这里 input 的类型「收紧」为 string
  } else {
    // 这里 input 的类型「收紧」为 number
    input
  }
}
///////////////////////////////////////////
class Foo {}
class Bar {}

function test2(input: Foo | Bar) {
  if (input instanceof Foo) {
    // 这里 input 的类型「收紧」为 Foo
  } else {
    // 这里 input 的类型「收紧」为 Bar
    input
  }
}
///////////////////////////////////////////
interface Foo {
  foo: string
}

interface Bar {
  bar: string
}

function test3(input: Foo | Bar) {
  if ('foo' in input) {
    // 这里 input 的类型「收紧」为 Foo
  } else {
    // 这里 input 的类型「收紧」为 Bar
    input.bar
  }
}
///////////////////////////////////////////
type Foo2 = 'foo' | 'bar' | 'unknown'

function test4(input: Foo2) {
  if (input != 'unknown') {
    // 这里 input 的类型「收紧」为 'foo' | 'bar'
  } else {
    // 这里 input 的类型「收紧」为 'unknown'
    input
  }
}
///////////////////////////////////////////
class SuperHero {
  // 超级英雄
  readonly name: string
}
class Batman extends SuperHero {
  // 蝙蝠侠继承自超级英雄
  private muchMoney: true // 私有很多钱
  helmet: string
  underwear: string
  belt: string
  cloak: string
}

// 判断任意对象是不是蝙蝠侠的函数
function isBatman(man: any): man is Batman {
  return man && man.helmet && man.underwear && man.belt && man.cloak
}

function foo(hero: SuperHero) {
  if (isBatman(hero)) {
    // hero 是蝙蝠侠
    hero
  } else {
    // hero 是别的超级英雄
    hero
  }
}
export {}
