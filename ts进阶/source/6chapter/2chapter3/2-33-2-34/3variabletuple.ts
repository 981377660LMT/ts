let [username, age, ...rest]: [name_: string, age_: number,
  ...rest: any[], descri_: string] = ["wangwu", 23,
    "海口海淀岛四东路3号", "133123333", 23, "weixin", 3, "str"]

console.log("username:", username)//wangwu
console.log("age:", age)//23
console.log("rest:", rest)

//const arr: (string | number)[] = [10, 30, 40, "abc", 30] as const
// 类型 "readonly [10, 30, 40, "abc", 30]" 为 "readonly"，不能分配给可变类型 "(string | number)[]"
//arr[0]=100

let [x, ...y] = [10, 30, 40, 60, "abc"]
console.log("x:", x)
console.log("y:", y)

let constnum = [10, 30, 40, 60, "abc"]
let [x1, ...y1] = constnum
console.log("x1:", x1)
console.log("y1:", y1)

// let constnum2 = [10, 30, 40, 60, "abc"]
// let [x2, ...y2]: (string | number)[] = constnum2
// console.log("x2:", x2)
// console.log("y2:", y2)

// let constnum2 = [10, 30, 40, 60, "abc"]
// //错误:不能将类型“(string | number)[]”分配给类型“[number, ...any[]]”。
// let [x2, ...y2]: [number, ...any[]] = constnum2// 错误
// console.log("x2:", x2)
// console.log("y2:", y2)

// let constnum2 = ["df", 30, 40, 60, "abc"]
// //  把元组退化成"数组"
// let [x2, ...y2]: [...any[]] = constnum2// 错误
// console.log("x2:", x2)
// console.log("y2:", y2)

// let constnum3 = [10, 30, 40, 60, "abc"] as const
// //  把元组退化成"数组"
// let [x3, ...y3]: readonly [any, ...any[]] = constnum3// 错误
// console.log("x3:", x3)
// console.log("y3:", y3)

let constnum4 = [10, 30, 40, 60, "abc"] as const
//  把元组退化成"数组"
let arr: readonly [any, ...any[]] = constnum4// 错误

//arr[0] = 100 //readonly 和 as const 都是表示固定不变的，包括数组和元组中每一个元素都不能改变
// readonly等效于as const
// function tail(constnum5: readonly (string | number)[]) {
//   //constnum5[0] = 33
//   let arr = constnum5;
// }
let constnum5 = [10, 30, 40, 60, "abc"] as const
// readonly等效于as const
function tail(arr: readonly [any, ...any[]]) {
  //arr[0] = 33
  let [first, ...rest] = arr;
  return rest;
}
console.log(tail(constnum5));
export { }