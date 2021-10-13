import Order from './Order'

// 获取Order类上所有属性+所有的public方法名组成的联合类型
type keyofOrders = keyof Order// keyofOrders="orderId" | "date" |"custname"|"phone"|"orderDetailArray" |"doEat"
let allvalue: keyofOrders = "doEat"


export { }