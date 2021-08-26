type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>

type Eg = Intersection<{ key1: string }, { key1: string; key2: number }>

// 为什么要做2次Extract然后再交叉类型呢？
// 原因还是在于处理类型的兼容推导问题，还记得string可分配给string | number的兼容吧。
export { Intersection }
