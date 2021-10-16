class OrderBase {
  static $: number
  $$() {}
}

class Order extends OrderBase {
  private static count: number
  static call: number

  constructor(
    private orderId: number,
    protected date: Date,
    public custname: string,
    public phone: string
  ) {
    super()
  }

  doEat() {}
}

type GetType<T> = T extends any ? T : never

// 获取Order类上所有属性+所有的public方法名组成的联合类型
type StaticPropKeys<Constructor extends abstract new (...args: any[]) => any> = Exclude<
  keyof Constructor,
  'prototype'
>
type Foo = StaticPropKeys<typeof Order>

type InstancePropKeys<T extends object, K = keyof T> = K extends any ? K : never
type Bar = InstancePropKeys<Order>
