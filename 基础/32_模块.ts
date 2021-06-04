// 为了支持 CommonJS 和 AMD 的 exports, TypeScript 提供了 export = 语法。
// export = 语法定义一个模块的导出 对象。 这里的 对象 一词指的是类，接口，命名空间，函数或枚举。
// 若使用 export = 导出一个模块，则必须使用 TypeScript 的特定语法 import module = require('module') 来导入此模块。

// 也即
// export = 只能导出 对象
// export = 导出的模块只能用 import = require() 形式导入
let numberRegexp = /^[0-9]+$/
class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}
export = ZipCodeValidator
// TypeScript 的模块机制基本采用的是 ES6 的内置模块化机制，
// 另外添加了 export = 形式来兼容 AMD 与 CommonJS 规范。
