// 当将`对象字面量`赋值给变量时会触发额外的属性检查，以保证没有传入多余的属性
// 这个按照strutual typing的设计是不合理的，有几种绕过Excess Property Checking方式 这里是Typescript对对象字面量额外添加的检查，
interface Point {
  x: number
  y: number
}
const point1: Point = {
  x: 1,
  y: 2,
  z: 3, // 报错，多余的属性
}

const tmp = {
  x: 1,
  y: 2,
  z: 3,
}
// 引入临时变量或者类型断言
const point2: Point = tmp // 不报错
export {}
