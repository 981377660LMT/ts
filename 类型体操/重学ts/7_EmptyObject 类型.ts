// 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值
type EmptyObject = Record<any, never>

// 测试用例
const shouldPass: EmptyObject = {} // 可以正常赋值
const shouldFail: EmptyObject = {
  // 将出现编译错误
  prop: 'TS',
}
