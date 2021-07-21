// https://cloud.tencent.com/developer/article/1675691
// TypeScript 编译器是如何工作的？
// scanner/parser/binder/checker/emitter
// TypeScript 文本首先会被解析为 token 流。这个过程比较简单，就是单纯地按照分隔符去分割文本即可。
// 接着 token 流会被转换为 AST，也就是抽象语法树。
// binder 则根据 AST 信息生成 Symbol（TypeScript 中的一个数据结构）。拿上面的图来说，就是 number 节点。
// 当我们需要类型检查的时候， checker 会根据前面生成的 AST 和 symbols 生成类型检查结果。
// 当我们需要生成 JS 文件的时候，emitter 同样会根据前面生成的 AST 和 symbols 生成 JS 文件。
export {}
