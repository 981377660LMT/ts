// // 判断一个函数是否是构造函数，即判断一个函数是否具有[[Construct]]内部方法
// 如果是一起比较，没有办法判断 =>所有函数（除了箭头函数）都可以是构造函数（类B就是一个构造函数B，名叫[class B]）
// 可以判断函数的名称
// class A {
//   constructor() {}
// }

// // class B extends A {
// //   constructor() {
// //     super()
// //   }
// // }

// console.log(A, typeof A)

// const constructorFunc = A
// const asaa = () => {}
// function kl() {}

// // 箭头函数根据定义是不可构造的。
// console.log(!!asaa.prototype)
// console.log(A.constructor.prototype)
// console.log(kl.constructor.prototype)

// // 缺少构造签名new
// // new kl()
// function isConstructor(f: any) {
//   try {
//     new f()
//   } catch (err) {
//     // verify err is the expected error and then
//     return false
//   }
//   return true
// }

// console.log(isConstructor(A), isConstructor(kl), isConstructor(asaa))

class A {
  constructor() {
    console.log(1)
  }
}

class B extends A {
  constructor() {
    super()
  }
}

const b = new B()

const prototype = Object.getPrototypeOf(b)
console.log(Object.getOwnPropertyNames(prototype))

// 有关Object.getPrototypeOf的总结:
// B继承自A
// Object.getPrototypeOf(B) [class A]
// Object.getPrototypeOf(b)相当于b.__proto__ A {}
// B.prototype  A {}
console.log(B)
