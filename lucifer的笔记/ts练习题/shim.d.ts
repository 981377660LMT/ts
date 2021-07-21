declare module 'str-utils' {
  // export const ...
  // export function ...
  export function strReverse(s: string): string
  export function strToLower(s: string): string
  export function strToUpper(s: string): string
  export function strRandomize(s: string): string
  export function strInvertCase(s: string): string
}

declare module 'stats' {
  export function getMaxIndex<T>(input: T[], comparator: (a: T, b: T) => number): number
  export function getMaxElement<T>(input: T[], comparator: (a: T, b: T) => number): T
  export function getMinElement<T>(input: T[], comparator: (a: T, b: T) => number): T
  export function getMedianIndex<T>(input: T[], comparator: (a: T, b: T) => number): number
  export function getMedianElement<T>(input: T[], comparator: (a: T, b: T) => number): T
  export function getAverageValue<T>(input: T[], getValue: (a: T) => number): number
  export function getMinIndex<T>(input: T[], comparator: (a: T, b: T) => number): number
}
