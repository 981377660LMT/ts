// --useUnknownInCatchVariables
try {
  console.log(1)
} catch (err) {
  // err: unknown

  // Error! Property 'message' does not exist on type 'unknown'.
  console.error(err.message)

  // Works! We can narrow 'err' from 'unknown' to 'Error'.
  if (err instanceof Error) {
    console.error(err.message)
  }
}
// 如果我们不想在catch子句中处理unknown变量，我们总是可以添加显式的：any注释，这样我们就可以选择不使用更严格的类型。

// 内嵌提示
// TypeScript正在试验对嵌入文本的编辑器支持，它可以帮助在代码中显示有用的信息，比如内联的参数名。你可以把它看作是一种友好的“内嵌文本”。
