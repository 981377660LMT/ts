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

3. 方法重载：Java 简易版 ArrayList
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

4. 构造器重载
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

5. 单例模式
   - 全局状态管理容器
   - 数据存储
   - 日志记录
6. 静态属性与方法
7. 泛型函数重载
