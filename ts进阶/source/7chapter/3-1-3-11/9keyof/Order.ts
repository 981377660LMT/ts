import OrderDetail from './OrderDetail'
export default class Order {
  static count: number
  static call: number
  constructor(
    private orderId: number,
    private date: Date,
    private custname: string,
    private phone: string,
    public orderDetailArray: Array<OrderDetail>
  ) {}
  doEat() {}
}
