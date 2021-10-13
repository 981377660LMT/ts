// 订单详情类
export default class OrderDetail {
  // TS4之前针对
  // 没有初始化的值，也没有在构造函数中明确给这个赋值的一种解决方案
  // 增加undefined类型就可以
  public orderDetailId: number | undefined;
  public productname: string 
  public price!: number
  public count!: number

  constructor(orderDetailId_: number, productname_: string,
    count_: number, price_: number) {

    this.orderDetailId = orderDetailId_;
    this.productname = productname_;
    this.price = price_;
    this.count = count_
  }

  public getTotal(): number {
    return this.price * this.count
  }
}
let orderDetail = new OrderDetail(12, "cc", 30, 2);
console.log(orderDetail.getTotal());//NaN

console.log(typeof orderDetail.price)//undefined