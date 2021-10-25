type Head<T extends Array<any>> = T extends [infer H, ...infer R] ? H : never // 你的实现代码

// 测试用例
type H0 = Head<[]> // never
type H1 = Head<[1]> // 1
type H2 = Head<[3, 2]> // 3

export {}
