// 3.3 函数中的参数变量的类型如果是一个函数类型
//   具体说明   
//   函数中的参数变量的类型如果是一个函数类型
//   而且这个函数类型的定义的参数有的是对象类型的参数
type funcType = (one: number, two: string) => void

function func(custfunc: funcType) {
  custfunc(23, "abc");
}
// 下面这个函数执行输出的结果为：one: 23 two: abc
func(function (one: number, two: string) {
  console.log("one:", one, "two:", two)
})
// 函数定义类型的参数类型为定义对象类型
type CustObjType = { custname: string, degree: number }
type funcType2 = (one: CustObjType, two: string) => void
//  1
let func2: funcType2 = function (one: CustObjType, two: string) {
  console.log(one.custname, ":", two)
}
let func21: funcType2 = function ({ degree }: CustObjType, two: string) {
  console.log(degree, ":", two)
}
func2({ custname: "李逵", degree: 23 }, "很好")// 李逵 : 很好

//2 
function func3(func2: funcType2) {
  func2({ custname: "李逵", degree: 23 }, "很好")
}
// func3: 李逵 : 很好
func3(function (one: CustObjType, two: string) {
  console.log("func3:", one.custname, ":", two)
})

// 3 
function func4(func2: funcType2) {
  func2({ custname: "李逵", degree: 23 }, "很好")
}
func4(function ({ degree }: CustObjType, two: string) {
  console.log("func4等级:", degree, ":", two)// func4等级: 23 : 很好
})
export { }