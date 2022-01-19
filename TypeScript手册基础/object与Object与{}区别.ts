// TypeScript 2.2 引入了被称为 object 类型的新类型，它用于表示非原始类型。
// 在 JavaScript 中以下类型被视为原始类型：string、boolean、number、bigint、symbol、null 和 undefined。

// 所有其他类型均被视为非基本类型。新的 object 类型表示如下：
// All primitive types
type Primitive = string | boolean | number | bigint | symbol | null | undefined

// All non-primitive types
type NonPrimitive = object
interface ObjectConstructor {
  create(o: object | null): any
  setPrototypeOf(o: any, proto: object | null): any
  // ...
}
// 例如，Object.create() 和Object.setPrototypeOf() 方法，现在需要为它们的原型参数指定 object | null 类型：
// Object 接口定义了 Object.prototype 原型对象上的属性；
// ObjectConstructor 接口定义了 Object 类的属性。

// 总结：
// object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。
// Object 类型：它是所有 Object 类的实例的类型。它由以下两个接口来定义：
// Object 接口定义了 Object.prototype 原型对象上的属性；
// ObjectConstructor 接口定义了 Object 类的属性。
// {} 类型：它描述了一个没有成员的对象。
export {}
