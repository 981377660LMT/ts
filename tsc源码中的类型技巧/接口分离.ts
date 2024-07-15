/**
 * 按照属性与方法的类型进行分离.
 * 也可以按照模块，功能进行分离
 */

interface Node extends ReadonlyTextRange {
  // kind: 用于标识节点的类型，是一个具体的枚举值，表示节点在语法树中的角色。
  // flags: 用于存储节点的各种标志，是一个位标志枚举，可以通过组合提供节点的额外信息。
  // 通过这两个属性，编译器可以更详细地了解和处理 AST 中的每个节点。
  readonly kind: SyntaxKind
  readonly flags: NodeFlags

  readonly parent: Node
}

interface Node {
  getSourceFile(): SourceFile
  getChildCount(sourceFile?: SourceFile): number
  getChildAt(index: number, sourceFile?: SourceFile): Node
  getChildren(sourceFile?: SourceFile): readonly Node[]
  getStart(sourceFile?: SourceFile, includeJsDocComment?: boolean): number
  getFullStart(): number
  getEnd(): number
  getWidth(sourceFile?: SourceFileLike): number
  getFullWidth(): number
  getLeadingTriviaWidth(sourceFile?: SourceFile): number
  getFullText(sourceFile?: SourceFile): string
  getText(sourceFile?: SourceFile): string
  getFirstToken(sourceFile?: SourceFile): Node | undefined
  getLastToken(sourceFile?: SourceFile): Node | undefined
  forEachChild<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined
}
export {}
