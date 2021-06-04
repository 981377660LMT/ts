// 1.函数声明
;(arg: string = 'init'): void => {}
/*************************************************** */
// 2.函数表达式
let anfn: (a: number, b?: string) => void = a => {}
/*************************************************** */
// 多了参数怎么办？将多i出来的参数收集到数组中、
function zz(init: boolean, ...args: any[]) {}
zz(true, 1, {})
/*************************************************** */

// 重载
function reverse(x: string): string
function reverse(x: number): number
function reverse(x: string | number) {
  if (typeof x === 'string') {
    return x.split('').reverse().join('')
  } else {
    return reverse(Number(x.toString()))
  }
}

/*************************************************** */
// 使用interface注解函数
interface SearchFunc {
  (source: string, subString: string): void
}

let mySearch_2: SearchFunc
mySearch = () => {}
