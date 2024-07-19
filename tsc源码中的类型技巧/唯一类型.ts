/**
 * Several node kinds share function-like features such as a signature,
 * a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
 * Examples:
 * - FunctionDeclaration
 * - MethodDeclaration
 * - AccessorDeclaration
 */
interface FunctionLikeDeclarationBase extends SignatureDeclarationBase {
  _functionLikeDeclarationBrand: any
  readonly asteriskToken?: AsteriskToken | undefined
  readonly questionToken?: QuestionToken | undefined
  readonly exclamationToken?: ExclamationToken | undefined
  readonly body?: Block | Expression | undefined
}

// !tag类型/brand类型 用于创建一个独特的类型(而不是type alias)
// "brand"/"tag" 通常指的是一种技术，用于在类型系统中创建一个独特的标记或标识符，以便区分不同的类型。
// 这种技术通常用于确保类型安全，特别是在需要区分具有相同基础类型的不同类型时。
type NormalizedPath = string & {
  __normalizedPathTag: any
}

interface JSDocContainer extends Node {
  _jsdocContainerBrand: any
}
interface LocalsContainer extends Node {
  _localsContainerBrand: any
}
interface FlowContainer extends Node {
  _flowContainerBrand: any
}

// __String 类型的设计是为了确保在类型系统中与普通字符串完全不兼容，但在运行时仍然可以进行比较和转换。这种设计在需要对特定类型的字符串进行严格类型检查和标记时非常有用
enum InternalSymbolName {
  Call = '__call',
  Constructor = '__constructor',
  New = '__new',
  Index = '__index',
  ExportStar = '__export',
  Global = '__global',
  Missing = '__missing',
  Type = '__type',
  Object = '__object',
  JSXAttributes = '__jsxAttributes',
  Class = '__class',
  Function = '__function',
  Computed = '__computed',
  Resolving = '__resolving__',
  ExportEquals = 'export=',
  Default = 'default',
  This = 'this',
  InstantiationExpression = '__instantiationExpression',
  ImportAttributes = '__importAttributes'
}

/**
 * This represents a string whose leading underscore have been escaped by adding extra leading underscores.
 * The shape of this brand is rather unique compared to others we've used.
 * Instead of just an intersection of a string and an object, it is that union-ed
 * with an intersection of void and an object. This makes it wholly incompatible
 * with a normal string (which is good, it cannot be misused on assignment or on usage),
 * while still being comparable with a normal string via === (also good) and castable from a string.
 */
type __String =
  | (string & {
      __escapedIdentifier: void
    })
  | (void & {
      __escapedIdentifier: void
    })
  | InternalSymbolName

export {}

// 也可以用symbol来实现
declare const ShallowReactiveMarker: unique symbol
export type ShallowReactive<T> = T & {
  [ShallowReactiveMarker]?: true
}
