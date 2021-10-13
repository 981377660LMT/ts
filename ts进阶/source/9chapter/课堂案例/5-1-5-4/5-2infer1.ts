//（1）infer 出现在 extends 条件语句后的函数类型的参数类型位置上
interface Customer {
  custname: string
  buymoney: number
}

//type custFuncType = (cust: Customer,str:string) => void// 函数类型 
type custFuncType = (cust: Customer) => string// 函数类型 
//（1）infer 出现在 extends 条件语句后的函数类型的参数类型位置上
type inferType<T> = T extends (params: infer P) => any ? P : T
//type inferType<custFuncType>= (cust: Customer) => string extends (params:infer P)=>any?P:T

type inferResultType = inferType<custFuncType>
export { }