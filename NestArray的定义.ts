// 这两种写法一样 但是接口写法更优雅
// 因为数组可以看成索引为number的对象
// 数组也可以有string 属性 只是看起来很怪
interface INestedArray<T> extends Array<T | INestedArray<T>> {}
type NestedArray<T> = Array<T | NestedArray<T>>
// 同理
interface INestDict extends Record<string, INestDict | string> {}

const flatten = (nums: NestedArray<number>): number[] => {
  const res: number[] = []
  for (const num of nums) {
    if (typeof num === 'number') res.push(num)
    // dfs  也可bfs 存深度即可
    else res.push(...flatten(num))
  }
  return res
}

console.log(flatten([1, 2, [3, 4, [5]], 5]))
export {}
