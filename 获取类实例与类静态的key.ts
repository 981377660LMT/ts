// 获取Order类上所有属性+所有的public方法名组成的联合类型
type StaticPropKeys<Contructor extends abstract new (...args: any[]) => any> = Exclude<
  keyof Contructor,
  'prototype'
>

// type Foo = StaticPropKeys<Order> //  类型“Order”提供的内容与签名“new (...args: any[]): any”不匹配。ts(2344
type Foo = StaticPropKeys<typeof Order>

type InstancePropKeys<T extends object, K = keyof T> = K extends any ? K : never
type Bar = InstancePropKeys<Order>

export {}
