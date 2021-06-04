// TypeScript 编译器会将程序中多个具有相同名称的声明合并为一个声明。
// TypeScript 中的声明会创建以下三种实体之一：命名空间、类型或值。
interface Box {
  height: number
  width: number
}

interface Box {
  scale: number
  width: number // 类型相同 OK
}

let box: Box = { height: 5, width: 6, scale: 10 }
////////////////////////////////////////////////////////
// 合并多个具有相同名称的命名空间：

// 导出成员不可重复定义
// 非导出成员仅在其原有的（合并前的）命名空间内可见
namespace A_ {
  let used = true

  export function fn() {
    return used
  }
}

namespace A_ {
  export function fnOther() {
    return used // Error, 未找到变量 used
  }
}

A_.fn() // OK
A_.fnOther() // OK
