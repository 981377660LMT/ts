// 全局模块与文件模块
// 在 bar.ts 文件里使用 import 时，它不仅允许你使用从其他文件导入的内容，还会将此文件 bar.ts 标记为一个模块，文件内定义的声明也不会“污染”全局命名空间
// 当我们讨论文件模块时，比较了全局变量与文件模块，
// 并且我们推荐使用基于文件的模块，而不是选择污染全局命名空间。

// 然而，如果你的团队里有 TypeScript 初学者，你可以提供他们一个 global.d.ts 文件，
// 用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。

import * as foo from 'foo'
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
console.log(foo.bar)

// 当导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略
// 当你使用 import * as foo from 'foo'，将会按如下顺序查找模块：
// ./node_modules/foo
// ../node_modules/foo
// ../../node_modules/foo
// 直到系统的根目录

// 当我提及被检查的 place 时，我想表达的是在这个 place 上，TypeScript 将会检查以下内容（例如一个 foo 的 place）：

// 如果这个 place 表示一个文件，如：foo.ts，欢呼！
// 否则，如果这个 place 是一个文件夹，并且存在一个文件 foo/index.ts，欢呼！
// 否则，如果这个 place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在，那么就欢呼！
// 否则，如果这个 place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在，那么就欢呼！

// 关键的问题：如何让一个模块变成文件模块而不是全局模块？
// 加上import 或者export即可
