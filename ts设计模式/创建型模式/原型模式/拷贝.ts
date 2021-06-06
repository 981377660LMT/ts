// 特点：不需要知道对象构建的细节，直接从对象上克隆出来。
// 用处：当对象的构建比较复杂时或者想得到目标对象相同内容的对象时可以考虑原型模式。
// 注意：深拷贝和浅拷贝。
// JavaScript对这个应该是太了解了，天生就有Prototype，通过Object.create就可以根据对象原型创建一个新的对象。
// class Origin {
//   name: string = ''
// }

// let origin = new Origin()
// origin.name = 'brook'

// let cloneObj = Object.create(origin)
// console.log(cloneObj.name) // brook

interface Clonable<T> {
  clone(): T
}

class Origin implements Clonable<Origin> {
  name: string = ''

  clone() {
    let target = new Origin()
    target.name = this.name
    return target
  }
}

let origin = new Origin()
origin.name = 'brook'

let cloneObj = origin.clone()
console.log(cloneObj.name) // brook

export {}

// 实现Clonable接口的都具有Clone功能，通过Clone功能就可以实现对象的快速复制，如果属性很多，想另外创建属性值也差不多相同的对象，原型就可以派上用场。
// 当然，还是要注意深拷贝和浅拷贝的问题，上面的代码只有string，所以浅拷贝没有问题，如果有对象就需要注意浅拷贝是否能满足要求。
