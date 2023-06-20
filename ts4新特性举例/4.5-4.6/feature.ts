// !新增 Awaited 类型
type A = Awaited<Promise<string>>

// !捆绑的 dom lib 类型可以被替换
// {
//   "dependencies": {
//      "@typescript/lib-dom": "npm:@types/web"
//    }
//  }

// !TS 类型系统支持尾递归优化

// !强制保留 import
// TS 编译时会把没用到的 import 干掉，但这次提供了 --preserveValueImports 参数禁用这一特性，原因是以下情况会导致误移除 import：

// !代码可以写在 super() 前了

// 类型收窄对解构也生效了
