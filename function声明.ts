// 任意完全不会调用的函数 Function
// 没有参数&返回值的函数  onClick: () => void

// 不要在 type 或 interface 中使用函数声明;保持一致性，类型/接口的所有成员都通过相同的语法定义。

// ✅
interface ICounter {
  start: (value: number) => string
}

// ❌
interface ICounter1 {
  start(value: number): string
}
