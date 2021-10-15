1. parcel 直接打包浏览器运行 ts `parcel ./index.html` 即可
2. **函数重载**
   **函数重载或方法重载适用于完成项目种某种相同功能但细节又不同的应用场景**
   函数重载我现在是知道 但是不会主动用的那种程度

函数重载或方法重载有以下几个优势
**优势 1： 结构分明**

让 代码可读性，可维护性提升许多，而且代码更漂亮。

**优势 2： 各司其职，自动提示方法和属性：**
每个重载签名函数完成各自功能，输出取值时不用强制转换就能出现自动提示，从而提高开发效率

**优势 3： 更利于功能扩展**

实现微信消息发送的函数 【真实应用场景, 一站理解函数重载优势】
**真实应用需求：**有一个获取微信消息发送接口消息查找函数，根据传入的参数从数组中查找数据，如果入参为数字， 就认为消息 id，然后从从后端数据源中找对应 id 的数据并返回，否则当成类型，返回这一类型的全部消息。

```JS
不用函数重载

//不用函数重载来实现2-12的功能:查询方式不同导致返回类型是一个联合类型 交集混在一起导致ide提示不出来
// 1.函数结构不分明,可读性，可维护性变差
function getMessage(value: number | MessageType): Message | undefined | Array<Message> {
  if (typeof value === 'number') {
    return messages.find(msg => {
      return value === msg.id
    })
  } else {
    return messages.filter(msg => value === msg.type)
  }
}

// 用函数重载
function getMessage(value: number, myname: string): Message //第一个根据数字id来查询单个消息的重载签名
function getMessage(value: MessageType, readRecordCount: number): Message[] //第二个根据消息类型来查询消息数组的重载签名
function getMessage(value: any, value2: any = 1) {
  if (typeof value === 'number') {
    return messages.find(msg => {
      return 6 === msg.id
    })
  } else {
    return messages.filter(msg => value === msg.type).splice(0, value2)
  }
}
```

**函数签名** [ function signature ]：函数签名=**函数名称**+**函数参数**+**函数参数类型**+**返回值类型**四者合成。在 TS 函数重载中，包含了**实现**签名和**重载**签名，实现签名是一种函数签名，重载签名也是一种函数签名。

```JS
// 四个部分

// 重载签名(至少一个)
function getMessage(value: number, myname: string): Message
function getMessage(value: MessageType, readRecordCount: number): Message[]
// 实现签名(仅有一个)
function getMessage(value: MessageType | number, value2: any = 1) {
  if (typeof value === 'number') {
    return messages.find(msg => {
      return 6 === msg.id
    })
  } else {
    return messages.filter(msg => value === msg.type).splice(0, value2)
  }
}
```

**完整的函数重载定义**：包含了以下规则的**一组函数**就是 TS 函数重载 【规则内容多，大家要多记，多实践方可】

**规则 1：**由一个实现签名+ 一个或多个重载签名合成。

**规则 2：** 但外部调用函数重载定义的函数时，**只能调用重载签名，不能调用实现签名**，这看似矛盾的规则，其实 是 TS 的规定：**实现签名下的函数体是给各司其职的重载签名编写的**，实现签名只是在定义时起到了统领所有重载签名的作用，在执行调用时就看不到实现签名了。(可以按 ctrl 看跳转到哪个函数，就是调用哪个签名)
如果实现签名不能统领重载签名,会报`此重载签名与其实现签名不兼容`的错误

**规则 3：**调用重载函数时，会根据传递的参数来判断你调用的是哪一个函数

**规则 4:** 只有一个函数体，只有实现签名配备了函数体，所有的重载签名都只有签名，没有配备函数体。

**规则 5: 关于参数类型规则完整总结如下：**

**实现签名参数个数可以少于重载签名的参数个数，但实现签名如果准备包含重载签名的某个位置的参数 ，那实现签名就必须兼容所有重载签名该位置的参数类型**【联合类型或 any 或 unknown 类型的一种】。

**规则 6： 关于重载签名和实现签名的返回值类型规则完整总结如下：**

必须给重载签名提供返回值类型，TS 无法默认推导。

提供给重载签名的返回值类型不一定为其执行时的真实返回值类型，可以为重载签名提供真实返回值类型，也可以提供 void 或 unknown 或 any 类型，如果重载签名的返回值类型是 void 或 unknown 或 any 类型，那么将由实现签名来决定重载签名执行时的真实返回值类型。 当然为了调用时能有自动提示+可读性更好+避免可能出现了类型强制转换，强烈建议为重载签名提供真实返回值类型。

不管重载签名返回值类型是何种类型【包括后面讲的泛型类型】，实现签名都可以返回 any 类型 或 unknown 类型，当然一般我们两者都不选择，让 TS 默认为实现签名自动推导返回值类型。

unknown 是任何类型的父类型
any 是任何类型的父类型与子类型

**什么时候不能用 unknown**

1. 例如：不能将 unknown 分配给类型 number (unknown 只能做父类)

//

3.  方法重载：Java 简易版 ArrayList
    两种删除方法

    ```JS
    remove(value: number): number
    remove(value: object): object
    //remove(value: number | object): number | object {
    remove(value: any): any {
    this.element = this.element.filter((ele, index) => {
      //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
      if (typeof value === "number") {
        return value !== index
      } else {
        // 如果是根据对象去删除元素，remove方法返回的是一个对象
        return value !== ele
      }
    })
    return value;
    // 如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
    // 如果是根据对象去删除元素，remove方法返回的是一个对象
    }
    ```

4.  构造器重载
    构造器是方法吗?
    我们说对象调用的才是方法，但是 TS 构造器是在对象空间地址赋值给对象变量之前被调用，而不是用来被对象变量调用的，所以构造器( constructor )可以说成构造函数，但不能被看成是一个方法。
    【**构造器重载应用】**图形面积的两种实现
    创建正方形对象，可以给构造器传递宽和高，也可以给构造器传递一个包含了宽和高的形状参数对象

    ```JS
     interface ISquare {
       width: number
       height: number
     }

     class Square implements ISquare {
       private readonly width: number
       private readonly height: number
       constructor(width: number, height: number)
       constructor(value: ISquare)
       constructor(valueOrWidth: number | ISquare, height?: number) {
         if (typeof valueOrWidth === 'object') {
           this.height = valueOrWidth.height
           this.width = valueOrWidth.width
         } else {
           this.width = valueOrWidth
           this.height = height
         }
       }
     }

     const square1 = new Square(40, 50)
     const square2 = new Square({ width: 40, height: 50 })
    ```

    解决重载签名与其实现签名不兼容的方法:

    - ? 可选参数
    - 默认值
    - ... rest 参数

5.  单例模式
    - 全局状态管理容器 store
    - 数据存储
      不用类：代码零散，可读性差
    - 日志记录
6.  静态属性与方法
    静态成员保存在内存哪里？何时分配的内存空间呢
    静态方法是否可以接受一个对象变量来作为方法的参数:可以通过调用静态方法时把对象变量传递给静态方法来使用(Object 类的 keys 方法用来获取给定对象的自身可枚举属性组成的数组)
    **何时应该把一个方法定义成静态方法或属性定义为静态属性呢**
    1. 单例：外部不能创建对象，就只能借助类内部的静态方法来获取类的对象
    2. 当**类中某个方法没有任何必要使用任何对象属性**时，而且使用了对象属性反而让这个方法的逻辑不正确，那既如此，就应该禁止这个方法访问任何对象属性和其他的对象方法，这时就应该把这个方法定义为静态方法
       例如：一个顾客类的购买方法【 buy 方法】中肯定要允许访问顾客姓名或其他顾客微信这些对象属性，这样的方法我们就**需要定义在原型对象属性**上，但如果顾客类中的 阅读顾客积分公告方法【 readNotice 方法] 是针对全体顾客的公告方法，就应该定义为静态方法，方法内部就应该禁止出现任何具体的对象属性。如果在这样的方法中使用了顾客的某个属性，比如用了顾客姓名，那么这个方法逻辑就不正确【**这个方法就会说：你让我向全体顾客展示公告，我要知道每个顾客姓名做什么？**】。所以我们应该让这样的方法禁止访问对象属性和其他的对象方法，那就应该设置为静态方法。
    3. 当一个类中某个方法只有一个或者 1-2 个 对象属性，而且更重要的是，你创建这个类的对象**毫无意义**，我们只需要使用这个类的一个或者多方法就可以了，那么这个方法就应该定义为静态方法。常见的工具类中的方法通常都应该定义为静态方法。比如 StringUtil, FileUtil 等，我们以 FileUtil 为例进行讲解 (**也可以闭包代替**)
       饿汉式 懒汉式
7.  继承
    原型链继承的不足：局限性：不能通过子类构造函数向父类构造函数传递参数
    借用构造函数继承:call 传参给父类 借用构造函数继承的不足:借用构造函数实现了子类构造函数向父类构造函数传递参数，但没有继承父类原型的属性和方法，无法访问父类原型上的属性和方法。

    ```JS
    function Parent (name,age) {
      this.name='name'
      this.age='age'
    }

    function Son (name,age) {
      Parent.call(this)  // 类比super  super 编译成 JS 源码后 可以看到：就是采用 JS 原型中的借用构造函数来实现的
      this.grade='grade'
    }

    const son=new Son()
    ```

    寄生组合：

    ```JS
       const myExtends = (SuperType, SubType) => {
       // your code here
       function myClass(...contructorArgs) {
         // 构造函数初始化
         SuperType.apply(this, contructorArgs)
         SubType.apply(this, contructorArgs)
         // obj.__proto__ = SubType.prototype
         Object.setPrototypeOf(this, SubType.prototype) // 实例方法去SubType.prototype上寻找
       }

       // 找实例方法
       Object.setPrototypeOf(myClass.prototype, SubType.prototype)
       Object.setPrototypeOf(SubType.prototype, SuperType.prototype)

       // 找静态方法
       Object.setPrototypeOf(myClass, SuperType)

       return myClass
     }
    ```

    TS 继承案例
    汽车租赁管理功能
    override 规则：

    1. 和父类方法同名
    2. 参数和父类相同，如果是引用类型的参数，需要依据具体类型来定义。
    3. 父类方法的访问范围【访问修饰符】必须小于子类中方法重写的访问范围【访问修饰符】 (只要有父类出现的地方，都可以用子类来替代，而且不会出现任何错误和异常。但是反过来则不行，有子类出现的地方，不能用其父类替代。：里氏替换原则)
       同时父类方法不能是 private

8.  类型断言与类型守卫
    两个类之间断言的规则:
    两个类中任意一个的属性和方法是另一个类的属性和方法完全**相同或子集**，则这两个类可以相互断言 (继承/实现关系可以互相断言)
    否则这两个类就不能相互断言

    ```JS

     class People {
       constructor(public username: string, public age: number, public address: string) {}
     }

     class Stu {
       public age!: number
       public address!: string
       public phone!: string
       constructor(age: number, address: string) {
         this.address = address
       }
     }

     const people = new People('wangwu', 23, 'beijing')
     const stuedConvert = people as Stu // 类型 "People" 到类型 "Stu" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
                                        // 类型 "People" 中缺少属性 "phone"，但类型 "Stu" 中需要该属性。
    ```

9.  多态配合类型守卫
    多态的定义：父类的对象变量可以接受任何一个子类的对象。从而用这个父类的对象变量来调用子类中重写的方法而输出不同的结果.
    产生多态的条件：1.必须存在继承关系 2.必须有方法重写
    多态的好处:利于项目的扩展【从局部满足了 开闭原则--对修改关闭,对扩展开放】 (传参时，子类可以赋给父类，**即参数更加抽象化**)
    多态的局限性：无法直接调用子类独有方法，必须结合 instanceof 类型守卫来解决

    ```JS
         class Customer {

           rentVechile(vechile: Vechile) {  // 好处:子类可以赋给父类

             if (vechile instanceof Car) {  // 局限性
               vechile.checkIsWeigui(true);
             } else if (vechile instanceof Bus) {
               vechile.checkIsOverNum(true);
             } else if (vechile instanceof Truck) {
               vechile.checkIsOverWeight(true)
             }
             return vechile.calculateRent();
           }

       }
    ```

10. 抽象类
    什么样的类可以被定义为抽象类:任何一个实例化后毫无意义的类都可以被定义为抽象类 例如:Crawler 这种类只是用来继承改写的 **模板方法类**/**适配器** 就应该定义成抽象类
    比如：我们实例化一个玫瑰花类的对象变量，可以得到一个具体的 玫瑰花 实例对象，但如果我们实例化一个 Flower 类的对象变量，那世界上有一个叫 花 的对象吗？很明显没有，所以 Flower 类 可以定义为一个抽象类，但玫瑰花可以定义为具体的类。

            ```JS
                abstract class BaseRequester<T> {
                  constructor(private url: string) {}

                  reqeustData(): T {
                    this.sendReqeust()
                    return this.handleResponse()
                  }

                  private sendReqeust() {
                    console.log(`send request, url: ${this.url}`)
                  }

                  protected abstract handleResponse(): T // 不同的server返回的数据交由子类去实现
             }
            ```

        abstract class 类名{ 可以有 0 到多个抽象方法【只有方法体，没有方法实现的方法】，可以有 0 到多个具体方法，可以有构造器，可以有 0 到多个实例属性，0 到多个静态属性，0 到多个静态方法 } **单纯从类的定义上来看和普通类没有区别，只是多了可以有 0 到多个抽象方法这一条**，并且不能被实例化

    **抽象类相比普通类充当父类给项目带来的好处**

    **好处 1：提供统一名称的抽象方法，提高代码的可维护性**：抽象类通常用来充当父类，当抽象类把一个方法定义为抽象方法，那么会强制在所有子类中实现它，防止不同子类的同功能的方法命名不相同，从而降低项目维护成本。

    **好处 2：防止实例化一个实例化后毫无意义的类。**

    ```JS
      interface MouseListenerProcess {
        mouseReleased(e: any): void //  鼠标按钮在组件上释放时调用。
        mousePressed(e: any): void //  鼠标按键在组件上按下时调用。
        mouseEntered(e: any): void //鼠标进入到组件上时调用。

        mouseClicked(e: any): void // 鼠标按键在组件上单击（按下并释放）时调用。
        mouseExited(e: any): void //  鼠标离开组件时调用。
      }

      // 适配器Adapter是一个抽象类
      abstract class MouseListenerProcessAdapter implements MouseListenerProcess {
        mouseReleased(e: any): void {
          throw new Error('Method not implemented.')
        }

        mousePressed(e: any): void {
          throw new Error('Method not implemented.')
        }

        mouseEntered(e: any): void {
          throw new Error('Method not implemented.')
        }

        abstract mouseClicked(e: any): void

        abstract mouseExited(e: any): void
      }

      class MyMouseListenerProcess extends MouseListenerProcessAdapter {
        mouseClicked(e: any): void {
          throw new Error('Method not implemented.')
        }

        mouseExited(e: any): void {
          throw new Error('Method not implemented.')
        }
      }

    ```

11. 自定义守卫
    **自定义守卫格式：**

        ```js
        function  函数名( 形参：参数类型【参数类型大多为any】)  : 形参 is A类型 {

          return  true or false

        }
        ```

        例子：

        ```JS
        function isPromise(val: any): val is Promise {
        return isObject(val) && isFunction(val.then)
        }

        function isObject(val: any): val is Record<any, any> {  // 数组也是Record
          return val !== null && typeof val === "object"
        }

        function isFunction(data: any): data is Function {
          return typeof data === "function"
        }
        ```

        抽离成自定义守卫函数，更加语义化

        ```JS
        // if (typeof value === "string") {//把变量的范围缩小为string类型在语句块内使用该数据类型
        if (isString(value)) {
          console.log(key + ":", StringUtil.trimSpace(value));
        }

        function isString(str: any): str is string {
            return typeof str === "string"
        }
        ```

        ```JS
        function processObjOutput(obj: any) {
          // 判断allowinput属性或者方法在ojb对象中是否存在
          if (obj && 'allowinput' in obj) {
            let value: unknown
            Object.keys(obj).forEach(key => {
              value = obj[key]
              if (isString(value)) console.log(key + ':', StringUtil.trimSpace(value))
              else if (isFunction(value)) value()
            })
          } else {
            console.log('不是一个合法的对象。')
          }

        }
        ```
        unknown 的一个使用场景是，避免使用 any 作为函数的参数类型而导致的静态类型检查 bug
          上面的使用 unknown(任何类型的父类) + 类型守卫 逐步缩小范围:source\6chapter\2chapter3\2-29-2-32\9自定义守卫.ts
          这个地方用value:unknown value.prop 会报错
           而 如果将value声明为any 则不会报错 存在安全隐患
           unknown 只能 接收 各种类型的变量 除此之外什么都做不了

        ```JS
        Vue3中的自定义守卫使用  isRef 函数
        ref 接收 各种数据
        export function ref<T extends object>(value: T): ToRef<T>
        export function ref<T>(value: T): Ref<UnwrapRef<T>>
        export function ref<T = any>(): ToRef<T | undefined>
        export function ref(value?: unknown) {
          return createRef(value)
        }
        ```
        ```JS
        export interface Ref {
          value: any,
          // key为Symbol的属性做类型标识
          [RefSymbol]: true
          _shallow?: boolean
        }

        export function isRef(r: any): r is Ref {// r is Ref 效果等同于boolean
          return Boolean(r && r.__v_isRef === true)
        }

        // 没有用泛型的unref,泛型大家先不用管,接下来几章我们会非常详细的讲解
        export function unref(ref: unknown) {
          if (isRef(ref)) {
            return ref.value
          } else {
            return ref;
          }
        }
        ```

12. as const 与 readonly 搭配

```JS
const arr = [10, 30, 40, "abc"] as const
//arr = [100, 30, 40, "abc"]
//arr[0] = 100;//错误 无法分配到 "数组的索引为0位置的元素" ，因为它是只读属性

function showArr(arr: readonly any[]) {//类型“readonly any[]”中的索引签名仅允许读取。
  //arr[0] = 100;
  console.log(arr)
}
```

13. 可变元组 Variadic Tuple Types 与 **元组标签**

```JS
const [username, age, ...rest]: [name_: string, age_: number, ...rest: any[],最后出现:string] = ["wangwu", 23,
  "海口海淀岛四东路3号", "133123333", "一路同行,一起飞", 23, "最后出现"]
```

元组标签:**元组标签主要用于定义函数的入参**，通过元组标签，编译器可以更好的提示函数入参类型

```JS
type Interval = [start: number, end: number]
type QueueItem = [val: number, count: number]

type Name=[first:string,last:string]
function createPerson(...name:Name){
}
```

14. 泛型函数重载

15. 声明文件

```JS
假如我们使用了 css module，那么我们需要让 TS 识别.less 文件(或者.scss)引入后是一个对象，可以如此定义：
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
```

而对于一些全局的数据类型，如后端返回的通用的数据类型，我也习惯将其放在 typings 文件夹下，使用 Namespace 的方式来避免名字冲突，如此可以节省组件 import 类型定义的语句。

```JS
declare namespace EdgeApi {
  interface Department {
    description: string;
    gmt_create: string;
    gmt_modify: string;
    id: number;
    name: string;
  }
}
```

这样，每次使用的时候，只需要 const department: EdgeApi.Department 即可，节省了不少导入的精力。开发者只要能约定规范，避免命名冲突即可。
