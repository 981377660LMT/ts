//  TypeScript 提供了 namespace 关键字来描述命名空间分组
declare namespace Utility {
  export function log(msg) {
    console.log(msg)
  }
  export function error(msg) {
    console.log(msg)
  }
}

// namespace 关键字编译后的 JavaScript 代码，与我们早些时候看到的 JavaScript 代码一样。
// (function (Utility) {
//   // 添加属性至 Utility
// })(Utility || Utility = {});
