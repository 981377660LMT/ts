/**
 * 至少传入一个T的属性.
 */
type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T]

/**
 * 至少传入T的部分属性.
 */
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>

/**
 * 传入的T类型的属性要么全部存在, 要么全部不存在.
 */
type AllOrNothing<T> =
  | T
  | {
      [k in keyof Required<T>]?: never
    }
