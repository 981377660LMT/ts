
JQuery.$(function () {

})
JQuery.$("div").css("border", "1px solid red").css("marginTop", "20px");

JQuery.$.post("http://localhost:5000/search")

interface Product {
  id: number;
  name: string;
  price: number;
  count: number
}

function calToal(product: Product) {
  console.log("product总价:", product.price * product.count)
}

calToal({ id: 100, name: "电脑", price: 5000, count: 10 })