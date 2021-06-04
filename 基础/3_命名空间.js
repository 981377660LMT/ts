// JavaScript 使用命名空间
var something
;(function (something) {
  something.foo = 123
})(something || (something = {}))

console.log(something)
// { foo: 123 }
;(function (something) {
  something.bar = 456
})(something || (something = {}))

console.log(something) // { foo: 123, bar: 456 }

// There are two ways of specifying modules in TS:

// declare module "buffer" {} // with quotes
// and

// declare module buffer {} // without quotes
// The former (with quotes) signifies external module (ES6 module) and is currently used in .d.ts files to put several ES6 modules in one file:

// declare module "buffer" {}
// declare module "fs" {}
// The latter (without quotes) was used as namespace and is now replaced with

// declare namespace buffer {}

// “内部模块”现在称做“命名空间namespace”。 “外部模块”现在则简称为“模块module”
// declare module 一般用于声明第三方库
// 例如 declare module "reflect-metadata"
// declare namespace 一般用于声明自己的代码，防止命名冲突，外面套一层命名空间
// 记得export导出
https://www.tslang.cn/docs/handbook/namespaces.html
