// extends 只支持继承一个父类，我们可以通过 implements 来连接多个 mixins，并且使用原型链连接子类的方法和父类的方法。
// 就像组件拼合一样，由一堆细粒度的 mixins 快速搭建起一个功能强大的类。
// 简单的对象混入
// let target = { a: 1, b: 1 }
// let source1 = { a: 2, c: 3 }
// let source2 = { b: 2, d: 4 }

// Object.assign(target, source1, source2)

// console.log(target) // { a: 2, b: 2, c: 3, d: 4 }
// Object.getOwnPropertyNames() 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
// Disposable Mixin
class Disposable {
  isDisposed: boolean = false

  dispose() {
    this.isDisposed = true
  }
}

// Activatable Mixin
class Activatable {
  isActive!: boolean
  activate() {
    this.isActive = true
  }
  deactivate() {
    this.isActive = false
  }
}

// 接口可以继承多个接口/类
interface ASS extends Activatable, Disposable {}
// 类可以继承单个接口/类，可以实现多个接口/类
// 实现类的同时也生成的类对应的接口，本质是类实现接口
class SmartObject implements Disposable, Activatable {
  constructor() {
    setInterval(() => console.log(this.isActive + ' : ' + this.isDisposed), 500)
  }

  interact() {
    this.activate()
  }

  // 提前定义一些占位属性。
  // Disposable
  isDisposed: boolean = false
  dispose!: () => void
  // Activatable
  isActive: boolean = false
  activate!: () => void
  deactivate!: () => void
}
applyMixins(SmartObject, [Disposable, Activatable])

let smartObj = new SmartObject()
setTimeout(() => smartObj.interact(), 2000)

// applyMixins() 方法借助 Object.getOwnPropertyNames() 遍历 mixins 上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码。
// applyMixins() 这个工具函数可以封装在项目中一个核心函数库中。
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  })
}

export default 0
// 使用 implements 连接多个父类，需要在子类里实现所有接口定义。
