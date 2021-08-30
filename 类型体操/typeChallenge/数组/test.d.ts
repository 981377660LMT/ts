/**
 * @description 移除X前Y.length个元素
 */
type RemoveHead<X extends any[], Y extends any[]> = Y extends [infer _, ...infer Yr]
  ? X extends [infer _, ...infer Xr]
    ? RemoveHead<Xr, Yr>
    : never
  : X

/**
 * @description 分隔参数
 * @example
 * ```ts
 * type Test1 = PartialParameters<[1, 2]>
 * // [] | [1, 2] | [1]
 * ```
 */
type PartialParameters<P extends any[]> = P extends [infer P1, ...infer Pr]
  ? [P1, ...PartialParameters<Pr>] | []
  : []

// 原函数参数，原函数返回值
// 思路：当传的参数等于原来函数参数的长度时 返回 R
// K的长度取决于柯里化传入参数的个数 如果全传了 那么K与Pr长度相等 返回R 否则返回移除K.length个长度后的函数 默认每次移除一个
type Curried<P extends any[], R extends any> = P extends [infer P1, ...infer Pr]
  ? <K extends PartialParameters<Pr>>(arg: P1, ...args: K) => Curried<RemoveHead<Pr, K>, R>
  : R

declare function DynamicParamsCurrying<P extends any[], R extends any>(
  fn: (...args: P) => R
): Curried<P, R>

type Test1 = PartialParameters<[1, 2]>
type R = RemoveHead<[1, 2, 3, 4, 5], [2, 2]>
