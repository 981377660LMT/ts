import OrderDetail from './OrderDetail'
class Order {
  //订单 Id，订单日期，顾客地址，顾客名，顾客微信，顾客手机号，客服
  public orderId: number = 0;
  public date: Date = new Date();
  public custname: string = "nocustname"
  public phone: string = "111"
  //public orderDetail:OrderDetail[]=[]
  //public orderDetail:Set=[]
  //原始值类型=基本数据类型
  // 这是一个引用属性【数组类型的引用属性】 
  public orderDetailArray: Array<OrderDetail> = []//定义了一个Array数组,Array数组当中的每一个元素都是OrderDetail类型的元素
  //public orderDetailArray: Array<OrderDetail> = new Array()//定义了一个Array数组,Array数组当中的每一个元素都是OrderDetail类型的元素
  constructor(orderId_: number, date_: Date, custname_: string,
    phone_: string, orderDetailArray_: Array<OrderDetail>) {
    this.orderId = orderId_;
    this.date = date_;
    this.custname = custname_;
    this.phone = phone_
    this.orderDetailArray = orderDetailArray_
  }

  public static peisong(){
    let time="2024-01-02"
  }
}

// 回顾
// let obj=
// let obj2=obj

let orderDetailOne = new OrderDetail(10, "电视机", 5000, 3);
let orderDetailTwo = new OrderDetail(11, "桌子", 2000, 2);
//let orderDetailThree=new OrderDetail(12,"桌子",2000,2);

// 给数组赋值方式1：直接定义数组时赋值
let orderDetailArray: Array<OrderDetail> = [orderDetailOne, orderDetailTwo]
// 给数组赋值方式2：定义完成以后再单独赋值
//let orderDetailArray: Array<OrderDetail> = []=new 了数组
//orderDetailArray[0]=orderDetailOne
//orderDetailArray[1]=orderDetailTwo 

//定义数组并赋值的第三种方式
//let orderDetailArray: Array<OrderDetail> = [] 等价于let orderDetailArray: Array<OrderDetail> =new Array()
//let orderDetailArray: Array<OrderDetail> =
//new Array(orderDetailOne, orderDetailTwo)

var orderDate = new Date(2023, 10, 17, 5, 20, 0);

// let order = new Order(1, orderDate, "李武", "33333", orderDetailArray);
//写法2:
let order = new Order(1, orderDate, "李武", "33333",
  [orderDetailOne, orderDetailTwo]);

console.log(order);
