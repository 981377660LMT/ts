// satisfies 装饰符
//
// 既要确保表达式匹配某些类型，又要保留该表达式的具体类型
//
//
// !TS 4.9 以后，想写 as 的时候多想想，是不是应该用 satisfies
// 想写 as 的时候多想想，是不是应该用 satisfies
//
// 用声明的方式少了具体赋值的变量类型的信息，用自动推导的方式又不能保证类型是对的。
// 有没有两全其美的办法呢？
//
// !使用自动推导的类型，同时检查是否满足类型.
// 缺点是自动推导的类型不能再添加其他索引签名属性了.

// 现在已经有一个这样的接口
interface Person {
  name: string
  age: number
  [key: string]: unknown
}

// !这样只会提示 name 和 age
const p1: Person = {
  name: 'toam',
  age: 18,
  height: 180,
  weight: 70
}

p1.height // unknown

// !这样只会提示 name 和 age
const p2 = {
  name: 'toam',
  age: 18,
  height: 180,
  weight: 70
} as Person

p2.height // unknown

// !都能提示了
const p3 = {
  name: 'toam',
  age: 18,
  height: 180,
  weight: 70
} satisfies Person

p3.height // number

//
// 没有 satisfies 时一般会定义一个辅助的函数id.
// function id<T extends Obj>(obj: T): T

function id<const T extends Person>(obj: T): T {
  return obj
}

const p4 = id({
  name: 'toam',
  age: 18,
  height: 180,
  weight: 70
})

p4.height // number

export {}
