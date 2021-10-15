// Tuple members must all have names or all not have names.
// 不能写 [infer F,...args:any[]]
type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never
type Last<T extends any[]> = T extends [...infer R, infer F] ? F : never
type Pop<T extends any[]> = T extends [...infer R, infer F] ? R : never
export {}
