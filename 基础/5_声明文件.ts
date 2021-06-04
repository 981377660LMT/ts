// process.exitWithLogging = function () {
//   console.log('exiting')
//   process.exit.apply(process)
// }

// Add it at runtime

// 在 TypeScript 中，接口是开放式的，这意味着当你想使用不存在的成员时，只需要将它们添加至 lib.d.ts 中的接口声明中即可，TypeScript 将会自动接收它。
// 注意，你需要在全局模块中做这些修改，以使这些接口与 lib.d.ts 相关联。我们推荐你创建一个称为 global.d.ts 的特殊文件。
window.helloWorld = () => console.log('hello world')
window.helloWorld()
// 可以通过 declare 关键字来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码
// 强烈建议你应该把声明放入独立的 .d.ts
