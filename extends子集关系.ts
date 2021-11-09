export {}
type Test = string | number extends string ? 1 : 2 // 2 不满足子集关系
