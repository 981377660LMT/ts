## 慕课网 TS 高级课程

### 	  第五章：理解infer精髓 + TS高级类型+TS泛型再进阶

**技能大纲**

**5-1   学习 infer + TS高级类型+TS泛型再进阶的价值和重要意义**

**5-2  【 infer 】  理解替换“神器” infer + infer和泛型的区别 【原理+使用案例】**

**5-3  【 infer 】构建带参数的工厂实例方法 +分清易混淆的概念【 泛型+infer综合面试题】**

**5-4 【 infer 】 联合 Vue3 源码 深入理解 infer   [ 透彻掌握infer带来的好处 ]**

 **5-5 【TS 高级 type 类型】  详尽解说 Extract  不同场景下的不同理解+ 和类型断言的异同** 

 **5-6 【TS 高级 type 类型】 详尽解说 Exclude   不同场景下的不同理解 【掌握 Omit 前 必会 】**

 **5-7 【TS 高级 type 类型】 Record完成异步数据扁平化(轻量级 Map)【真实应用场景】 **

 **5-7 【TS 高级 type 类型】 in keyof 简化实现轻量级Map【真实应用场景】 **

**5-8  【TS 高级 type 类型】 Pick 快速抓取数据 【真实应用场景】**

**5-9【TS高级 type  类型】 Partial+Required+ReadOnly**

**5-10  【TS 高级 type 类型】 环环相扣掌握 Omit 反向抓取数据 【真实应用场景】** 

**慕课网 TS 高级课程**

**5-1   学习 infer+ TS 高级类型的价值和意义**

TypeScript  提供了较多的高级类型，通过学习高级类型可以帮助提高 TS 代码的灵活运用能力，掌握好这些高级类型能进一步提升我们对泛型的理解和驾驭能力， 让 TS 功底更深厚，把我们的TS水平推向一个更高的层次，无论以后在项目中运用 TS 还是对理解源码的复杂 TS 泛型语法都有不小的帮助， 由于 TS 高级类型为我们提供了很多技巧性强的功能， 当我们在项目中遇到使用这些功能的应用场景时，会给项目带来更简洁，更轻量级的实现效果，比如：如果我们项目中只需要查询 key value 数据，那么 Record 类型 就是轻量级的 Map ，再比如 Omit 快捷 爬取 Todo列表中的数据，保证编辑和预览时的不同效果。

**慕课网 TS 高级课程**

##### 5-2  【 infer 】  理解替换“神器” infer + infer和泛型的区别 【原理+使用案例】

**infer 的定义**：infer 表示在  extends 条件语句中以占位符出现的用来修饰数据类型的关键字，被修饰的数据类型等到使用时才能被推断出来。

**infer 占位符式的关键字出现的位置**：通常infer出现在以下三个位置上。

（1）infer 出现在 extends 条件语句后的函数类型的参数类型位置上

（2）infer 出现在 extends 条件语句后的函数类型的返回值类型上

（3） infer 会出现在类型的泛型具体化类型上。

**infer 举例1：**

```js
type inferType<T> = T extends (param: infer P) => any ? P : T

interface Customer {
  custname: string
  buymoney: number
}

type custFuncType = (cust: Customer) => void

type inferType = inferType<custFuncType>// 结果为Customer
const cust: inferType = { custname: "wangwdu", buymoney: 23 }

```

**infer 举例2：**

```js
class Subject {
  constructor(public subid: number, public subname: string) {
  }
}
let chineseSubject = new Subject(100, "语文")
let mathSubject = new Subject(101, "数学")
let englishSubject = new Subject(101, "英语")
let setZhangSanSubject = new Set([chineseSubject, mathSubject]);
type ss = typeof setZhangSanSubject
type ElementOf0<T> = T extends Set<infer E> ? E : never
```

**慕课网 TS 高级课程**

**5-3  【 infer 】构建带参数的工厂实例方法 +分清易混淆的概念【 泛型+ infer 的综合运用面试题】**

课程安排  1. 准备分清易混淆的概念  2. 获取构造函数的参数    3. 创建带参数的构造函数工厂实例方法

```js
class TestClass {// 准备类
  public name: string
  public classno: number
  constructor(name: string, classno: number) {
    this.name = name;
    this.classno = classno
  }
  eat() {
    console.log("姓名为: " + this.name + "班级：" + this.classno);
  }
}

type ConstructorParametersType<T extends new (...args: any[]) => any>
  = T extends new (...args: infer P) => any ? P : never

type Constructor<T> = new (...args: any[]) => T

function createInstance<T, C extends new (...args: any[]) => any>(constructor: Constructor<T>,
  ...args: ConstructorParametersType<C>) {
  return new constructor(args[0], args[1])
}
type classType = typeof TestClass
createInstance<TestClass, classType>(TestClass, "wangwu", 105).eat();
createInstance(TestClass, ["wangwu", 23])
```

**慕课网 TS 高级课程**

**5-4 【 infer 】 联合 Vue3 源码 深入理解 infer   [ 透彻掌握 infer 带来的好处 ]**

```js
function unref<T>(ref: T): T extends Ref<infer V> ? V : T {
  return isRef(ref) ? (ref.value as any) : ref
}
```

**慕课网 TS 高级课程**

 **5-5 【TS 高级 type 类型】  详尽解说 Extract  不同场景下的不同理解+ 和类型断言的异同** 

**本节课程安排：**

   (1)  详解 Extract.ts

（2) 从结果上详细对比的 Extract 泛型约束和类型断言【父子类】

（3) 从结果上详细对比 Extract 泛型约束和类型断言【联合类型】

（4) 从结果上详细对比 Extract 泛型约束和类型断言 【函数】

  本章 扩展：初步理解 Promise 源码+  Vuex 源码  TS 语法精彩片段 【为第 七，八章手写源码准备】

**慕课网 TS 高级课程**  

**扩展课程安排** 

​					 1 基础复习：函数参数和回调函数     

​					 2  初步理解 Promise 源码片段

​					 3  函数赋值中的解构参数    

​					 4  对象类型中的属性 key 的类型为函数类型

​					 5  class 类中的实例属性的类型为函数类型   

​					 6 Vuex 底层源码中的 Store 类源码片段中的语法理解

​					 7 Vuex底层源码中的 StoreOptions 接口中的 actions 属性语法理解【ActionTree】

​				     8 把 StoreOptions 接口作为 Store类 构造函数的参数

​					 9 createStore方法的实现

 （5) Extract 真实应用场景.ts 

```js
// Extract 类型定义格式
type Extract<T, U> = T extends U ? T : never
```

**慕课网 TS 高级课程**

 **5-6【TS 高级 type 类型】 详尽解说 Exclude   【掌握 Omit 前 必会 】**

**本节课程安排：**

（1）type 类型在 Exclude   中的理解 

（2）联合类型在 Exclude   的 分解理解

```js
type Exclude<T, U> = T extends U ? never : T
```

**慕课网 TS 高级课程** 

**5-7 【TS 高级 type 类型】 完成异步数据扁平化(轻量级 Map)【真实应用场景】**

本讲课程安排： 

1.  复习+理解 泛型 K extends keyof 泛型 T  
2.  深入理解 K extends keyof any 【K extends keyof string |number |symbol
3.  理解 P  in   K
4.  理解 K  in  keyof  any
5.  深入 Record 完成异步数据扁平化 【 实现方式1 】
6.  深入 Record 完成异步数据扁平化 【 实现方式2 】
7.  object 和 Map 和 Record 区别

```js
type Record<K extends keyof any, T> = {
  [P in K]: T
}
let goodRecord: Record<number, Goods> = {}
const goodSymid = Symbol("goodid")
interface Goods {
  [goodSymid]: number
  name: string
  price: number
}
const goodsList: Goods[] = [
  {
    [goodSymid]: 101,
    "name": "苹果",
    "price": 9
  },
  {
    [goodSymid]: 102,
    "name": "香蕉",
    "price": 3
  },
  {
    [goodSymid]: 103,
    "name": "香蕉",
    "price": 3
  }
]

goodsList.map((goods) => {
  goodRecord[goods[goodSymid]] = goods;
})
// 泛型自动提示
console.log("goodRecord:", goodRecord);
for (let key in goodRecord) {
  console.log(goodRecord[key].name)
}
// type Record2<T> = {
//   [x: string]: T,// 字符串索引可以是数字类型,可以是字符串类型，最终都会转换为字符串类型
//   //[x: number]: T,// 字符串索引可以是数字类型 [x: number]可以最终合成一个数组的索引
//   //[x:symbol]:T//索引签名参数类型必须为 "string" 或 "number"
// }
```

 **5-7 【TS 高级 type 类型】 in keyof 简化实现轻量级 Map【真实应用场景】 **

```js
type Record<T> = {
  [P in keyof any]: T
}
```

**慕课网 TS 高级课程**

##### 5-8   高级类型 Pick  

本讲课程安排： 

1  首先实现 Pick 快速抓取属性

Pick 主要用于提取某种数据类型的属性，但实际工作中，主要用来提取接口或 type 定义的对象类型中的属性

2  Pick+ Record 结合应用【真实应用场景】

```js
// 理解 Pick
// 而 keyof用来获取接口的属性名【key】组成的联合类型  
//  K 如果 属于 keyof T 联合类型或者它的子类型
//  那么 K extends keyof T就成立
type Pick<T, K extends keyof T> = {
  // in是类型映射,=for...in 循环迭代所有的K的类型
  [P in K]: T[P]
}


const todonew: Pick<Todo, "title"> = {
  "title": "下午3点美乐公园参加party"
}
const todonew2: Pick<Todo, "title" | "completed"> = {
  "title": "下午3点美乐公园参加party",
  "completed": false
}


interface Todo {
  title: string
  completed: boolean
  description: string
}


type TodoPreview = Pick<Todo, "title" | "completed">

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}

const todo2: Pick<Todo, "title" | "completed"> = {
  title: 'Clean room',
  completed: false
}
export { }
```

**慕课网 TS 高级课程**

**5-10【 TS 高级 type  类型】 Partial+Required+ReadOnly**

```js
// Partial 一次性全部变成可选选项的type高级类型
type Partial<T> = {
  [P in keyof T]?: T[P]
}
interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  text: string
  disabled: boolean
  onClick: () => void
}

let props: Partial<ButtonProps> = {
  text: "登录"
}
    
// Required 和Partial相反 一次性全部变成必选选项的type高级类型
 type Required<T> = {
  [P in keyof T]-?: T[P]
}

//  ReadOnly 一次性全部变成可读选项的type高级类型
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}
```

**慕课网 TS 高级课程**

**5-11  【 TS 高级 type 类型】 环环相扣掌握 Omit 反向抓取属性数据 【真实应用场景】**

本节课程安排： 

（1） 理解 Exclude<keyof T, K>   

（2） 理解 Pick<T, Exclude<keyof T, K>>

（3） 理解 type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

```js
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface Todo {
  title: string
  completed: boolean
  description: string
  // phone: number
}

type TodoPreview = Omit<Todo, "description">//type TodoPreview={}

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}

export { }
```

