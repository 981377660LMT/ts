declare const RefSymbol: unique symbol
declare const RawSymbol: unique symbol
export interface Ref<T = any> {
  value: T
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true
}
