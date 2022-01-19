import { IsAny } from './IsAny'
import { IsNever } from './IsNever'

type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false

export { IsUnknown }
