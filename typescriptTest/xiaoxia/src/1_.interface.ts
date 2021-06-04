// 接口：对对象形状进行描述；对类的一部分行为得抽象
//接口名最好大写
interface Hero {
  //不希望name被修改，改为只读属性readonly
  readonly name: string
  attack: number
  // 可选属性?
  level?: number
  //任意属性的固定写法;任意属性的类型一定是any
  [propName: string]: any
}

const myHero: Hero = {
  name: 'cmnx',
  attack: 7,
  sex: 'male',
}
// myHero.name='a'

////////////////////////////////////////////////////////////////////
let roArr: ReadonlyArray<number> = [1, 23]
////////////////////////////////////////////////////////////////////
// 使用interface注解函数
interface SearchFunc {
  (source: string, subString: string): void
}

let mySearch: SearchFunc
mySearch = (a, b) => {}
////////////////////////////////////////////////////////////////////
// interface 注解索引
//索引签名只能为 number 或者 string，二者其中一个
// 索引签名的注意点：当使定义了 string索引签名 时，其余所有成员都必须符合 string索引签名的规范!
// 当使用 number来索引时，JavaScript最后还是会将它转换成string然后再去索引对象。
interface Test {
  [i: string]: number
  length: number
  // name:string
  // [i: number]: string
}
////////////////////////////////////////////////////////////////////
// 类的接口
interface ClockInterface {
  currentTime: Date
  setTime(t: Date): void
}
// 类静态部分与实例部分的区别
// 接口中无法定义静态部分：constructor存在于类的静态部分，所以不在检查的范围内。

class Clock {}

//implements：表示接口上的属性需要在类中实现
class myClock extends Clock implements ClockInterface {
  currentTime = new Date()
  constructor(h: number, m: number) {
    super()
  }
  setTime() {
    console.log('setting time')
  }
}
////////////////////////////////////////////////////////////////////
// 接口可以继承
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

//类型断言as
// 也可以写<类型>值,但是在jsx中无法使用
// let square = <Square>{}
let square = {} as Square
square.color = 'blue'
square.sideLength = 10
////////////////////////////////////////////////////////////////////
// 接口的混合类型
