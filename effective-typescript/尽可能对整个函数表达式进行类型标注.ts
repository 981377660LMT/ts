type Binary = (a: number, b: number) => number
const evaluate: Record<string, Binary> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => ~~(a / b),
}
// 提取出公共的函数类型
