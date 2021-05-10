const strEnum = <T extends string>(o: Array<T>): { [K in T]: K } =>
  o.reduce((pre, cur) => {
    pre[cur] = cur
    return pre
  }, Object.create(null))

// 创建 K: V
const Direction = strEnum(['North', 'South', 'East', 'West'])

// 创建一个类型
type Direction = keyof typeof Direction

let sample: Direction
