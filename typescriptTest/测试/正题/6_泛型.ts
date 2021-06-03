/*
 * @Author: cmnx
 * @Date: 2021-02-03 14:47:29
 * @LastEditTime: 2021-02-03 15:03:09
 */

/**
 * 定义函数或类时，不确定的类型可以使用泛型。
 * 在<>里定义泛型。
 */
function fn<K>(a: K): K {
    console.log(a);
    return a
}

let result_1 = fn(10)
let result_2 = fn('hello')

////////////////////////////////////////////////////////

function fn2<T, K>(a: T, b: K): T {
    return a
}
fn2<string, number>('a', 2)

//////////////////////////////////////////////////////
interface test {
    length: number
}

function fn3<T extends test>(a: T): number {
    return a.length
}

console.log(fn3('12345'));

