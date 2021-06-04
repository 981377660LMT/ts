// React 不但能渲染 HTML 标签（strings）也能渲染 React 组件（classes）。
// JavaScript 触发这些的原理是不同的（React.createElement('div') vs React.createElement(MyComponent)），
// 确定使用哪一种方式取决于首字母的大小写，foo 被认为是 HTML 标签，Foo 被认为是一个组件。
// /[A-Z]/.test("A") // true
// /[A-Z]/.test("b") // false
