
interface Product {
  id: number;
  name: string;
  price: number;
  count: number;
  //mark?: string;
  [key: string]: any;
  transfer: () => void
}

function calToal(product: Product) {
  console.log("product总价:", product.price * product.count)
  product.transfer();
}

calToal({
  id: 100, name: "电脑", price: 5000, count: 10,
  mark: "注意轻纺", place: "", quatity: "二手",
  transfer() {
    console.log(this.name, "运输");
  }
})

interface Getter {
  [key: string]: (state: any) => void
}

let getter: Getter = {
  getProductInfo(state: string) {

  },
  getOneProduct(state: string) {

  }
}


export { }