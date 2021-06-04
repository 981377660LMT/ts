// 元组是确定了成员类型和长度的数组
let x: [string, number]
x = ['h', 1]

declare function testZ(...args: [number, string, boolean]): void

// 剩余运算符的好处
let list_1: [number, ...string[]] = [1, '2', '3']
