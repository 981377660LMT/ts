// https://lucifer.ren/blog/2020/08/24/ts-config/
// 类比babel
// {
//   "compilerOptions": {
//     "outDir": "./built",
//     "allowJs": true,
//     "target": "es5"
//   },
//   "include": ["./src/**/*"]
// }

// tsconfig 是如何被解析的？
// 如果你使用 tsc 编译你的项目，
// 并且没有显式地指定配置文件的路径，
// 那么 tsc 则会逐级向上搜索父目录寻找 tsconfig.json ，
// 这个过程类似 node 的模块查找机制。

// tsconfig 的顶层属性
// tsconfig 的顶层属性（Top Level）不多，主要有：
// compilerOptions, files, include, exclude,extends,compileOnSave等。
// {
//   "extends": "@tsconfig/node12/tsconfig.json",

//   "compilerOptions": {},

//   "include": ["src/**/*"],
//   "exclude": ["node_modules"]
// }
// extends 就是继承另外一个配置文件，TypeScript 会对其进行合并，多项目公共配置有用。
// 你也可以直接向上面那样继承社区的“最佳实践”

// 常用的 compilerOptions配置
// 文件相关
// 严格检查
// 模块解析
// 项目配置
