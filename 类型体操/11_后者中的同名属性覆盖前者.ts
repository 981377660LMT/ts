import { Intersection } from './10_从T中提取存在于U中的key和对应的类型'
import { Diff } from './9_从T中排除存在于U中的key和类型'

// 先用diff从T中删除与U同名的属性，再用Intersection添加U中的与T同名的属性
type Overwrite<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T>> = Pick<
  I,
  keyof I
>

/**
 * @example
 * type Eg1 = { key1: number; }
 */
type Eg1 = Overwrite<{ key1: string }, { key1: number; other: boolean }>
