```tsx
固有元素使用特殊的接口 JSX.IntrinsicElements 来查找
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
const a = <foo /> // 正确
基于值的元素会简单的在它所在的作用域里按标识符查找
import MyComponent from './myComponent'

const a = <MyComponent /> // 正确
const b = <SomeOtherComponent /> // 错误

有两种方式可以定义基于值的元素：
1. 函数组件 (FC)
2. 类组件
由于这两种基于值的元素在 JSX 表达式里无法区分，因此 TypeScript 首先会尝试将表达式做为函数组件进行解析。
如果解析成功，那么 TypeScript 就完成了表达式到其声明的解析操作。如果按照函数组件解析失败，那么 TypeScript 会继续尝试以类组件的形式进行解析。如果依旧失败，那么将输出一个错误。
```
