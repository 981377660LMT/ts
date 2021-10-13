import Order from '../9keyof/Order';
import OrderDetail from '../9keyof/OrderDetail';

class ObjectImpl<T extends object, K extends keyof T>{
  object!: T;
  key!: K
  constructor(object_: T, key_: K) {
    this.object = object_;
    this.key = key_;
  }
  getValue() {
    return this.object[this.key]
  }
  setValue(newVal: T[K]) {
    this.object[this.key] = newVal;
  }
}
let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
var orderDate = new Date(2023, 10, 17, 5, 20, 0);
let order = new Order(1, orderDate, "李武", "33333",
  [orderDetailOne, orderDetailTwo]);
//let result = order["orderDetailArray"]
let result = order.orderDetailArray;
console.log("result:", result)

//let objectImpl = new ObjectImpl<Order, "orderDetailArray">(order, "orderDetailArray");
let objectImpl = new ObjectImpl(order, "orderDetailArray");

console.log("objectImpl.getValue():", objectImpl.getValue());
objectImpl.getValue().forEach((orderDetail)=>{
  console.log(orderDetail.productname);
})

//objectImpl.setValue("df")
