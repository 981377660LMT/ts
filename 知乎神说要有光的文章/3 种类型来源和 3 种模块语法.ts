// https://juejin.cn/book/7047524421182947366/section/7110622496918863887

// tsconfig.json 里配置下 compilerOptions.lib，就可以引入对应的 d.ts 的类型声明文件。
// TS 会先加载内置的 lib 的类型声明，然后再去查找 @types 包下的类型声明。这样，其他环境的类型声明就可以通过这种方式来扩展。
// @types 包是在 DefinitelyTyped 这个项目下统一管理的，想创建一个 @types 包的话要去看一下他们的文档。

// TS 内置的那些 lib 是可以配置的，扩展的这些 @types/xx 的包自然也可以配置：
// 可以指定加载 @types 目录下的哪些包，还可以修改查找 @types 包的目录（默认是 node_modules/@types)

// 那自己写的 ts 代码呢？
// 这些其实我们经常配置，就是配置下编译的入口文件，通过 includes 指定一堆，然后通过 excludes 去掉一部分。还可以通过 files 再单独包含一些

// 命名空间 namespace 和 module 两者的 AST类型都是一样的
// 只不过 module 后一般接一个路径，而 namespace 后一半是一个命名空间名字

// 如果就是需要引入模块，但是也需要全局声明类型，有什么更好的方式呢
// 通过编译器指令 reference。这样既可以引入类型声明，又不会导致所有类型声明都变为模块内的

// !TypeScript 有三种存放类型声明的地方：

// lib： 内置的类型声明，包含 dom 和 es 的，因为这俩都是有标准的。
// @types/xx： 其他环境的 api 类型声明，比如 node，还有 npm 包的类型声明
// 开发者写的代码：通过 include + exclude 还有 files 指定

// 其中，npm 包也可以同时存放 ts 类型，通过 packages.json 的 types 字段指定路径即可。
// 常见的是 vue 的类型是存放在 npm 包下的，而 react 的类型是在 @types/react 里的。因为源码一个是 ts 写的，一个不是。

// !TS 声明模块的方式也是三种：

// namespace：最早的实现模块的方式，编译为声明对象和设置对象的属性的 JS 代码，很容易理解
// module：和 namespace 的 AST 没有任何区别，只不过一般用来声明 CommonJS 的模块，在 @types/node 下有很多
// es module：es 标准的模块语法，ts 额外扩展了 import type

// !dts 的类型声明默认是全局的，除非有 es module 的 import、export 的声明，这时候就要手动 declare global 了。为了避免这种情况，可以用 reference 的编译器指令。
