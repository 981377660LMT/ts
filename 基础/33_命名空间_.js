// 命名空间同样是为了避免变量命名冲突，
// TypeScript 官方将命名空间视为“内部模块”，上节介绍的import export模块被视为“外部模块”。
// 如果声明相同名称的命名空间，TypeScript 编译器会将其合并为一个声明
// TypeScript 的命名空间可以将代码包裹起来，只对外暴露这个命名空间对象，
// 通过 export 关键字将命名空间内的变量挂载到命名空间对象上。
// 命名空间本质上就是一个对象，将其内部的变量组织到这个对象的属性上
var Calculate
;(function (Calculate) {
  var fn = function (x, y) {
    return x * y
  }
  Calculate.add = function (x, y) {
    return x + y
  }
})(Calculate || (Calculate = {}))
