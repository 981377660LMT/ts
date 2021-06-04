// 三种方式

// 1.类型+[]
// (纯字符串的数组)
let list: string[]
const li = ['1']
// list.push(1)

// 2.泛型：Array<类型>
let arr: Array<number>

// 3.接口(一般不用这个注解数组)
interface NumberArray {
  [index: number]: number
}

//类数组是一个对象，接口为IArguments
// interface IArguments {
//   [index: number]: any;
//   length: number;
//   callee: Function;
// }
function z() {
  let args: IArguments = arguments
}
