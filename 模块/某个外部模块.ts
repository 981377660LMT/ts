// 找不到模块“url”或其相应的类型声明。
// 需要用reference引入类型声明

/// <reference path='./某个外部模块.d.ts'/>

// 实际上url是从node_modules里引入的
import * as URL from 'url'

let myUrl = URL.parse('http://www.typescriptlang.org')
console.log(myUrl)
