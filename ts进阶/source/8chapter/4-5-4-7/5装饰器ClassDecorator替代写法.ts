
class ShopCartService {
  public productname!: string;
  public count!: number;
  constructor() {

  }
  addShopCart() {
    console.log("增加商品:", this.productname + ":数量:", this.count)
  }
}

type MyClassDecorator = <T>(targetClass: { new(...args: any[]): T }) => any
// function Controller(rootPath: string) {

//   //return function (targetClass) {
//   return function <T>(targetClass: { new(...args: any[]): T }) {
//   }
// }
//思考题:
function Controller2(rootPath: string): MyClassDecorator {

  //return function (targetClass) {
  return function (targetClass) {
  }
}
export { }