代码生成与类型检查是独立的
Typescript 的类型声明不影响运行时性能
把类型当做值的集合思考
区分类型空间(type space)还是值空间(value space)

```JS
class Cylinder {
radius = 1;
height = 1
}
const instance: Cylinder = new Cylinder();
```

typeof Cylinder 并非是 Cylinder 类型，而 InstanceType<typeof Cylinder>才是 Cylinder 类型 这里着重说一下 class，class 实际上是两类对象的合体,一类是作为构造函数及其原型属性一类是类对象本身

```JS
class Test {
  constructor(x:number){
    this.instanceMember = x;
  }
  static staticMember = 1;
  instanceMember = 2;
  static staticMethod1(){

  }
  static staticMethod2(){
    this.staticMethod1();
  }
  instanceMethod1(){

  }
  instanceMethod2(){
    this.instanceMethod1()
  }
}

实际上可以将Test拆分为两部分
class Test {
   instanceMember = 1;
   instanceMethod1(){

   }
   instanceMethod2(){

   }
}

object Test {
  new(x:number): Test{

  }
  staticMethod1(){

  }
  staticMethod2(){

  }
  staticMember = 1
}
```

这里的 object Test 在 scala 中被称为伴生对象,而这里的 class Test 实际是用来生成实例对象的 伴生对象和实例对象通过构造函数关联 我们可以从伴生类型中获取实例类型，也可以从实例类型获取伴生类型

```JS
const test = new Test()
type instanceType = typeof test; // 获取实例对象的类型即这里class Test定义的类型
type companionType = typeof Test // 获取伴生对象的类型即这里的object Test定义的类型
type c = InstanceType<companionType> // 根据伴生类型推倒实例类型
```

虽然可以通过实例的 proto 来获取伴生对象但是 Typescript 并没有提供支持

优先使用类型声明而非类型断言

避免使用装箱类型(String, Number, Boolean, Symbol, BigInt)

尽可能对整个函数表达式进行类型标注,提取出公共的函数类型

```JS
function add(a:number,b:number){
return a+b;
}
function sub(a:number,b:number){
return a-b;
}
function mult(a:number,b:number){
return a*b;
}
function div(a:number,b:number){
return a/b;
}

type Binary = (a:number,b:number) =>number;
const add : Binary = (a,b) => a+b;
const sub: Binary = (a,b) => a-b;
const mult: Binary = (a,b) => a*b;
const div: Binary= (a,b) => a-b;

使用typeof fn来标注`增强`的函数类型
const myFetch: typeof fetch = (...args) => {
  return fetch(...args).then(res => {
    if (!res.ok) throw new Error('failed')
  })
}

// 可以继续获取类型检查
myFetch('/api')



```

充分利用泛型和类型运算避免冗余类型标记

```JS
interface ButtonProps {
type: string;
size: 'large' | 'middle'| 'small'
}
interface ButtonPropsWithChildren{  // 不推荐
type: string;
size: 'large' | 'middle'| 'small',
children: React.ReactNode

import { PropsWithChildren } from 'react';
type ButtonPropsWithChildren = PropsWithChildren<ButtonProps>
}
```

使用 index type | mapped type | keyof 等进行类型传递

```JS
interface State {
userId: string;
pageTitle: string;
recentFiles: string[]
pageContents: string;
}
interface TopNavState {  // 不推荐
userId: string;
pageTitle: string;
recentFiles: string[]
}

type TopNavState = Pick<State, 'userId', 'pageTitle', 'rencentFiles'>
```

利用 typeof 来进行类型传递

```JS
function getUserInfo(userId:string){
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor
  }
}
type UserInfo = ReturnType<typeof getUserInfo>
```

编写 utility type 时，多多使用 `generic constraint` 保证实例化时的类型安全

```JS
interface Name {
first: string;
last: string
}
type Pick1<T, K>{
[k in K]: T[k]
}
type FirstLast = Pick1<Name, 'first'| 'last'>
type FirstMiddle = Pick1<Name, 'first', 'middle'> // 应该报错但没报错
type Pick2<T, K extends keyof T> = { // 添加泛型约束
[k in K]: T[K]
}
type FirstMiddle = Pick2<Name, 'first', 'middle'> // 正确的报错了
```

使用 Index signature 来表示动态数据
对于只有在运行期才能获取的属性，可以通过 index signature 来建模
对于动态数据，其属性的值的类型应添加 undefined 类型，确保安全访问

```JS
function parseCSV(input:string): Record<string,string>[]
function safeParseCSV(input:string): Record<string,string|undefined>[]
```

尽可能对 index signatures 进行细化以保证类型安全

```JS
interface Row1 { [column:string]: number} // 太宽泛了,允许访问不应该允许的属性了
interface Row2 { a:number, b?:number, c?:number, d?:number} // 不允许访问不存在的属性了
interface Row3 = | {a:number} | { a: number; b:number } | {a:number;b:number;c:number} | {a: number; b: number; c:number; d:number}
// 更细化了，不允许{ a:1, c: 2}这种不允许的对象
```

优先使用 Arrays、Tuple、ArrayLike 而非 number index signatures
代码 x[0]和 x[‘0’]的行为在运行时完全一致，但是只有 x[0]才能正确的推倒出类型。

```JS
let a : string[] = []
let x = a[0] // x类型为string
let y = a['0'] // 但是y类型为any
```

**使用 readonly 来避免 mutation 造成的错误**
可以用来`标注该函数是否要改变传入的数组`
`如果一个函数没有声明一个函数参数为 readonly,那么将无法传递一个 readonly 的数组`, 即使函数实现没有修改参数
所以为了**保证函数可以同时接受 readonly 和非 readonly 的数组，应尽量声明参数为 readonly**(这里和 c++的 const reference 和 reference 的限制很类似)

```JS
function arraySum2(arr:readonly number[]) {

}
const arr: readonly number[] = [];
arraySum2(arr)
```

使用 Mapped Type 来实现值和类型的同步

避免滥用类型推导
避免对简单可以推导的类型进行标注

```JS
const a: number = 10; // 不建议
const a = 10 // 可自行推导
```

对于函数尽量显示的标明返回类型，而非依赖类型推导

优先使用 union of interface 而非 interfaces of unions

```JS
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint
}
这样设计的类型很难关联layout和对应的paint,重构如下
interface FillLayer {
  type: 'fill',
  layout: FillLayout,
  paint: FillPaint
}
interface LineLayer {
  type: 'line',
  layout: LineLayout,
  paint: LinePaint
}
interface PointLayer {
  type: 'paint',
  layout: PointLayout,
  paint: PointPaint
}

type Layer = FillLayer | LineLayer |PointLayer

这实际上就是tagged union,可以通过type进行narrowing操作

function drawLayer(layer: Layer) {
  if (layer.type === 'fill') {
    const {paint} = layer;  // Type is FillPaint
    const {layout} = layer;  // Type is FillLayout
  } else if (layer.type === 'line') {
    const {paint} = layer;  // Type is LinePaint
    const {layout} = layer;  // Type is LineLayout
  } else {
    const {paint} = layer;  // Type is PointPaint
    const {layout} = layer;  // Type is PointLayout
  }
}
```

使用更细化的 string 类型，优先考虑使用 string literal union

使用 brands 来模拟 nominal typing
由于是 Typescript 使用的是 structual typing,导致 实际上可以将 RadiusPoint 类型的变量也可以传递进去，导致计算错误 我们可以通过添加一个 brand 标记区分两者

```JS
interface Point {
  _brand: 'point'
  x: number
  y: number
}
interface RadiusPoint {
  _brand: 'radius'
  x: number // radius
  y: number // theta
}
function PointDistance(p: Point) {
  return Math.sqrt(p.x ** 2 + p.y ** 2)
}
declare const p1: Point
declare const p2: RadiusPoint

PointDistance(p1)
PointDistance(p2) // 应该报错但不报错,我们可以通过添加一个brand标记区分两者

export {}

```

缩小 any 的影响范围

```JS
function f1(){
  const x: any = expressionReturningFoo(); // 不建议,后续的x都是any了
  processBar(x)
}

function f2(){
  const x = expressionReturningFoo();
  processBar(x as any) // 建议，只有这里是any
}
```

使用更细化的 any

```JS
const numArgsBad = (...args:any) => args.length //Return any 不推荐
const numArgs = (...args: any[]) => args.length // Return number 推荐
```

函数签名和实现想分离：安全的签名不安全的实现

```JS
// 类型安全的签名
export function useImmer<S = any>(
  initialValue: S | (() => S)
): [S, (f: (draft: Draft<S>) => void | S) => void];
// 没那么安全的实现
export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue);
  return [
    val,
    useCallback(updater => {
      updateValue(produce(updater));
    }, [])
  ];
}
```

Typescript 中的 any 并不是一成不变的，会随着用户的操作，Typescript 会猜测更加合理的类型

```JS
const output = [] // any[]
output.push(1)
output // number[]
output.push('2')
output // (number|string)[]
```

优先使用 unknown 而非 any

{}/Object: 包含除了 null 和 undefined 之外的所有值
object: 包含了所有的非 primitive 类型，即不包含 12,‘test’等基本类型 在引入 unknown 之前，多使用{},在引入 unknown 之后，基本上不需要再使用{}类型

将@types 的依赖放在 devDependencies 里
使用 TSDOC 去注释导出的函数，class，types

为 callback 提供 this 的类型

```JS
class C {
  vals = [1, 2, 3]
  // logSquares() {
  //   for (const val of this.vals) {
  //     console.log(val * val)
  //   }
  // }
  logSquares(this: C) {
    for (const val of this.vals) {
      console.log(val * val)
    }
  }
}

const c = new C()
c.logSquares()
const c2 = new C()
const method = c.logSquares
method() // check ok, 但是运行时报错
```

尽量避免用户对@types 的依赖，不要强制 web 用户依赖 NodeJS 的 types

使用 Object.entries 去遍历对象

private 在运行时并不能阻止外部用户访问

使用 sourcemap 去 debug Typescript 程序

**避免同时使用多个变量来建模状态，而是使用单一变量来区分不同的状态**

对入参款宽松对出参严格

相比不准确的类型考虑使用不完备的类型

将公用 API 里使用的类型也一并导出
