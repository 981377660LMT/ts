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





