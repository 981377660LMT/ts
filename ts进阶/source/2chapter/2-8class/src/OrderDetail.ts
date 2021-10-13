// 订单详情类
export default class OrderDetail {

  public orderDetailId: number = 0;
  public productname: string = "noproduct"//订单详情中的商品名[顾客购买的商品]
  public price: number = 0;//购买的商品的价格
  public count: number = 0;//购买数量

  constructor(orderDetailId_: number, productname_: string,
    price_: number, count_: number) {

    this.orderDetailId = orderDetailId_;
    this.productname = productname_;
    this.price = price_;
    this.count = count_
    //return this
  }
}
let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
