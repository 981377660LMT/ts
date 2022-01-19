declare global {
  interface SymbolConstructor {
    readonly cmnx: symbol
  }
}

interface CMNXLike<ValueType = unknown> {
  [Symbol.cmnx](): CMNXLike<ValueType>
}
