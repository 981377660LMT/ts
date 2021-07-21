// 当我们用 npm 等包管理工具安装第三方包的时候，
// 有些包并不是 TypeScript 编写的，
// 自然也不会导出 TypeScript 声明文件。这种情况下，
// 如果我们在 TypeScript 项目中引入了这种包，
// 则会编译报错(没有设置 allowJS)

// 你可以通过npm install @types/jquery安装相关声明，
// 或者自己定义一份.d.ts 文件，将 jquery 声明为 module。

// TypeScript 是怎么找定义的
// 包类型定义的查找
// TypeScript 编译器先在当前编译上下文找 jquery 的定义。
// 如果找不到，则会去 node_modules 中的@types
//（默认情况，目录可以修改，后面会提到）目录下去寻找对应包名的模块声明文件。

// TypeScript 会默认引入node_modules下的所有@types声明
// @types 下的定义都是全局的。
// 当然你可以导入 @types 下导出的定义，使得它们的作用域变成你的模块内部。
// 开发者也可以通过修改tsconfig.json的配置来修改默认的行为.
// typeRoots: 用来指定默认的类型声明文件查找路径
// types: TypeScript 编译器会默认引入typeRoot下所有的声明文件，
// 但是有时候我们并_不希望全局引入所有定义_，而是仅引入部分模块。
// 这种情景下可以通过types指定模块名只引入我们想要的模块

// 总结
// 1.typeRoots 是 tsconfig 中 compilerOptions 的一个配置项，typeRoots 下面的包会被 ts 编译器自动包含进来，typeRoots 默认指向 node_modules/@types。
// 2.@types 是 npm 的 scope 命名空间，和@babel 类似，@types 下的所有包会默认被引入，你可以通过修改 compilerOptions 来修改默认策略。
// 3.types 和 typeRoots 一样也是 compilerOptions 的配置，指定 types 后，typeRoots 下只有被指定的包才会被引入。
