let a: 10
let b: "male" | "female"
let c: boolean | string
let d: any
let e: unknown
let f: { name: string, age?: number }   //加一个问号表示可选属性
let g: { name: string, [propName: string]: any }  //必须要一个name,其他类型的属性任意
let h: (a: number, b: number) => number
let i: Array<number>  //类型数组
let j: [string, string] //元组:长度不变的Array(python中的tuple为不可修改)


//any会污染其他变量的类型检查，但是unknown不会；尽量不用any
b = d
b = e
g = { name: 'cmnx', age: 22 }
h = function (argOne: number, argTwo: number): number {
    return 9
}
i = ["o"]
j = ['a']

// 返回值为空(undefined)或字符串
function test(input: number): void | string {
    if (input > 0) return 'a'
    else return
}

//never是没有返回值
function throwError(): never {
    throw new Error("...");
}