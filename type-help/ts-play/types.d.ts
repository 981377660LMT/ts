// // 类型补充声明
// // 这里声明的是全局的成员

interface Dict<T> {
  [key: string]: T
}

declare module 'lodash' {
  // export const camelCase = (input: string) => '123'
  export const camelCase: (input: string) => string
  // export function camelCase (input: string): string
  // export const capitalize: (input: string) => string
  // export default {
  //   camelCase: (input: string) => string,
  //   capitalize: (input: string) => string
  // }
  // interface Loadsh {
  //   camelCase: (input: string) => string
  //   capitalize: (input: string) => string
  // }
  // const lodash: Loadsh
  // export default lodash
  // export = lodash
}

// declare module '*.png' {
//   const url: string
//   export default url
// }

// declare module '*.css' {
//   const styles: Record<string, unknown>
//   export default styles
// }
