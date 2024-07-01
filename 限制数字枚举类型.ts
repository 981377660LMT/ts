// 限制数字枚举类型
// 使用命名空间创建新的类型

// use namespace as enum
export namespace ColorEnum {
  export const Red = 1
  export const Green = 2
  export const Blue = 3
}
export type ColorEnumType = (typeof ColorEnum)[keyof typeof ColorEnum]

interface Obj {
  color: ColorEnumType
}

let obj: Obj = { color: 0 }
