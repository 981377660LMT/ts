import OrderDetail from './OrderDetail'
export default class Order {
  static count: number
  constructor(public orderId: number, public date: Date,
    public custname: string,
    public phone: string, public orderDetailArray: Array<OrderDetail>) {

  }
  doEat() {
  }

}

type OrderDetailType = Order["orderDetailArray"] 

let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
var orderDate = new Date(2023, 10, 17, 5, 20, 0);
let order = new Order(1, orderDate, "李武", "33333",
  [orderDetailOne, orderDetailTwo]);
order["phone"] = "111"
console.log(order);


