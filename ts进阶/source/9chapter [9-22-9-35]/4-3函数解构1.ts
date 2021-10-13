//4-3函数解构1.ts

// 3  函数赋值中的解构参数    
//      函数赋值中的解构参数  
//      3.1. TS如何使用对象解构
//      3.2  TS函数中的解构参数 

// 3.1. TS 如何使用对象解构
type CustObjType = { custname: string, degree: number }
let custObj: CustObjType = { custname: "wangwu", degree: 123 }

let { custname: mycustname, degree: mydegree }: CustObjType =
  { custname: "wangwu", degree: 123 }
console.log(mycustname)//wangwu
console.log(mydegree)//123

// let { custname: custname, degree: degree }: CustObjType =
//   { custname: "wangwu", degree: 123 }
// let { custname, degree }: CustObjType = { custname: "wangwu", degree: 123 }
// console.log(custname)//wangwu
// console.log(degree)//123

let { custname }: CustObjType = { custname: "wangwu", degree: 123 }
console.log("single:", custname)//single: wangwu

//  3.2  TS函数中的解构参数 
function func(custObj: CustObjType) {
  console.log("func:", custObj.custname)
}
func({ custname: "wangwu", degree: 123 })//func: wangwu

function func2({ custname }: CustObjType) {
  console.log("func2:", custname)
}
func2({ custname: "wangwu", degree: 123 })//func: wangwu
export { }