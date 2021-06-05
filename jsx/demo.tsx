import * as React from 'react'

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
// 固有元素使用特殊的接口 JSX.IntrinsicElements 来查找。
const a = <foo />
// 基于值的元素会简单的在它所在的作用域里按标识符查找。
