## 慕课网 TS 高级课程

### 	 第二章 深度掌握 TypeScript OOP 相关的一系列核心技能

**TS 继承相关技能大纲**

##### 2-20         前端深度掌握 TS 继承的重要+长远意义【共1节】

#####	 	2-21-1  【 TS 继承】深度掌握 TS 继承准备：原型链继承+常见疑问

**2-21-2 【TS继承】深度掌握 TS 继承准备：原型链继承好处深度剖析**

**2-21-3     【 TS 继承】  深度掌握 TS 继承准备：原型链继承**+**容易被遗忘的重要一步**

**2-21-4     【 TS 继承】  深度掌握 TS 继承准备：原型链继承**+**容易被遗忘的重要一步**

 **2-22    【 TS 继承】  深度掌握 TS 继承准备：借用构造函数**【共2节】

**2-23    【 TS 继承】  深度掌握 TS 继承准备：借用构造函数+原型链继承组合模式**

##### 2-24【 TS 继承】深度掌握 TS 继承准备  多维授课助深度透彻掌握寄生组合继承【实现方法1 最佳继承模式】【共3节】

##### 2-25 【 TS 继承】用全栈眼光深度掌握 TS 继承+TS 继承好处  【企业真项目应用场景】【共2节】

**2-26【 TS 继承】  深入 super+方法重写+方法重写的3中实现规则+真实应用场景【共4节】**

##### 2-27    【 TS继承编译后的 JS 源码】   逐行深度剖析 +手写 TS 继承编译的 JS 源码 【练就更深厚 JS 原型+原型继承功底的绝佳场景 ]【共6节】

**TS 访问修饰符【已集成到2-25节】**

*****************************************

**A-1  TS继承开发JQuery工具库【升级课程用 共5节】**

*********************************

#### 2-20    前端深度掌握TS继承的重要丶长远意义

#####  练就 更深厚的 JS 原型，原型链功底

TS编译后的JS中有经典的JS原型和原型链的源码实现，虽然稍显复杂，但源码并不长，这将是 练就 更深厚的 JS 原型，原型链功底的绝佳场景。通过这几次课的认真磨练，大家将拥有更深厚的 JS 原型，原型链功底【当然你必须认真看完，多练方可】。这不仅让你日后面试大受益，而且也为你能阅读Vue3,React 源码或其他流行框架源码铺路，因为不管是那种源码，JS原型链继承一定会用到，再加上你的TS功底，那么这些都成让你日后前端之路走的更远，走的更高！

**提升前端项目架构的根基技术**

如果要你现在用开发一个工具库，组件库，你打算怎么开发 ? 可以写出n多个版本的代码，都可以实现，但版本和版本之间的价值却差别巨大，你可以用 JS 原型写出1年左右工作经验的前端水准的代码，当然，上乘之选肯定是用 TS 来开发，你也可以灵活运用TS继承，多态等多种技术写出高水准的代码。但如果你不具备后端思维能力，就算你工作了5年，你也不一定能有这样的思维，甚至随时有可能被一个拥有了后端思维的只有1到2年工作经验水准的前端工程师超越。

**突破前端技术瓶颈之一的技能**，**晋级中丶高级前端工程师必会技能**

如果你只掌握了单个类的使用，而不知道如何运用继承，那这也是技能缺失，将会限制你日后技术发展的高度，限制你的技术视野，让你的前端变得过于前端化。

说深度掌握了 TS 继承就能突破所有的前端技术瓶颈，那很显然是夸大其词，但要想突破前端技术瓶颈，深度掌握继承必然是其中一项技能，而且是根基技术之一，可见继承的重要性不言而喻。

比如一个简单的汽车租赁项目，让你来实现，你把前端功能实现了，展示在页面上了，但是打开你用 TS 写的 Vuex 代码，用 TS 写的 Nodejs 代码，过于前端化的思维让你编写的代码可能让人不堪入目。这里不单单是说用到封装继承，多态，解耦这些技术，更多的是你过于前端化的思维编写的项目可扩展性将非常差，可读性也差，可重用性【复用性】也低，而这些是评判一个项目是否值钱的关键因素。

如果你希望未来职业生涯拥有更广阔的技术视野；更远的未来你甚至希望自己能胜任技术总监，那么你就一定从一个更广阔的技术视野来提升自己的技术能力，不能让自己被框在过于前端化的路上。

虽然老师不能三言两语给同学们描述出什么才叫完全突破前端瓶颈，但有一点是可以肯定的，就是要有一定的后端思维能力，这里当然不是要拥有 Java 后端能力，而是起码具备 Nodejs 后端的项目架构能力，Nodejs 可以前端工程师提升晋级一定要掌握的技能。而深度掌握了 TS 继承已经为突破前端技术瓶颈开了一个好头。

####	 	2-21   深度掌握TS继承准备：原型链继承+常见疑问+**容易被遗忘的重要一步**

##### （1）原型链继承实现原理：

**说明：Parent 类是【父构造函数】 Son 类是【子构造函数】**

原型链继承基本思想就是Son 类的原型对象属性【 Son.prototype 】指向 new  Parent( )。即 

```js
	function Parent(name,age){
        this.name=name
        this.age=age
    }
	function Son(favor,sex){
        this.favor=favor // 兴趣爱好
        this.sex=sex
    }
	Son.prototype=new  Parent("好好的",23) // 98
	let sonObj=new Son("篮球","男")
	
```

原型链继承实现的本质是改变Son构造函数的原型对象变量的指向【 就是Son.prototype的指向 】，Son.prototype= new  Parent ( )。那么 Son.prototype 可以访问  Parent 对象空间的属性和方法。所以顺着 [__proto__ ]属性 ，Son类也可以访问 Parent 类 的原型对象空间中的所有属性和方法。

原型链继承查找属性和方法的完整路线描述: 子对象首先在自己的对象空间中查找要访问的属性或方法，如果找到，就输出，如果没有找到，就沿着子对象中的__proto__属性指向的原型对象空间中去查找有没有这个属性或方法，如果找到，就输出，如果没有找到，继续沿着原型对象空间中的__proto__查找上一级原型对象空间中的属性或方法，直到找到Object.prototype原型对象属性指向的原型对象空间为止，如果再找不到，就输出null

 **（2）原型链继承实现容易被遗忘的重要一步**

​		Son.prototype.constructor = Son

 **（3） 原型链继承常见疑问**

Son.prototype= Parent.prototype 这样作为原型链继承的模式和 **Son.prototype=new  Parent (...)** 又有什么区别呢？

 **（4）原型链继承的不足**

​		**局限性：不能通过子类构造函数向父类构造函数传递参数** 

**慕课网 TS 高级课程**

#### **2-22  深度掌握 TS 继承准备：借用构造函数**（冒充对象继承）

##### （1）借用构造函数继承如何解决原型链继承的局限性

借用构造函数继承思想就是在子类【  ChinesePeople 构造函数】的内部借助 apply ( ) 和 call ( ) 方法调用并传递参数给父类【  People 构造函数】，在父类构造函数中为当前的子类对象变量【ChinesePeopl对象变量】增加属性【本例中增加了name,

```js
    function Parent (name, age) {
      this.name = name
      this.age = age
      console.log("this:", this)
      console.log("this.name:", this.name)
    }
    Parent.prototype.friends = ["xiaozhang", "xiaoli"]
    Parent.prototype.eat = function () {
      console.log(this.name + " 吃饭");
    }
    function Son (name, age, favor, sex) {
      this.favor = favor // 兴趣爱好
      this.sex = sex
      Parent.call(this, name, age)// TS继承中使用super
    }
    let sonobj2 = new Son("lisi", 34, "打篮球", "男");
    console.log("sonobj2:", sonobj2)
    console.log("sonobj2.friends:", sonobj2.friends);//undefined
```

 **（2）借用构造函数继承的不足**

借用构造函数实现了子类构造函数向父类构造函数传递参数，但没有继承父类原型的属性和方法，无法访问父类原型上的属性和方法。

**慕课网 TS 高级课程**

#### **2-23   深度掌握 TS 继承准备：借用构造函数+原型链继承组合模式**

##### （1）借用构造函数+原型链继承组合模式的优势

**优势1：**具备借用构造函数的优点：子类【 ChinesePeople 构造函数】的内部可以向父类【  People 构造函数】 传递参数

**优势2：**具备原型链继承的优点：ChinesePeople.prototype 和 new ChinesePeople( ) 出来的实例对象变量和实例都可以访问父类【  People 构造函数】 原型对象上的属性和方法。

```js
	function People(name,sex,phone){// People父构造函数【看成是一个父类】//=Parent
			this.name=name; // 实例属性
        	this.sex=sex;
			this.phone=phone
	}		
	People.prototype.doEat=function(){
        console.log(this.name + "吃饭...")
    }
	function ChinesePeople(name,sex,phone,national){ //=SON
		People.apply(this,[name,sex,phone]);// 借用父构造函数继承
		this.national=national;// 民族
	}
	ChinesePeople.prototype=new People("wangwu",'男',"1111"); 
```

##### （2）借用构造函数+原型链继承组合模式的不足：

​	  缺点：调用了两次父类构造函数 【 People 构造函数】 new People 调用构造函数带来问题： 

1. 进入 People 构造函数为属性赋值，分配内存空间，浪费内存；

2. 赋值导致效率下降一些，关键是new People 赋的值无意义，出现代码冗余，new ChinesePeople出来的对象和这些值毫不相干，是通过子类 ChinesePeople 构造函数中的 apply 来向父类People构造函数赋值。

**慕课网 TS 高级课程**

#### 2-24    深度掌握 TS 继承准备:  多维授课助深度透彻掌握寄生组合继承【实现方法1+优化 】【最佳继承模式】

寄生组合继承模式=借用构造函数继承+寄生继承。

寄生组合继承既沿袭了借用构造函数+原型链继承两个优势，而且解决了借用构造函数+原型链继承调用了两次父类构造函数为属性赋值的不足。寄生组合继承模式保留了借用构造函数继承，寄生组合继承模式使用寄生继承代替了原型链继承。

什么是寄生继承呢？就是 ChinesePeople.prototype 不再指向 new  People( ) 出来的对象空间，而用 People 类 【父构造函数】的原型对象属性“克隆”了一个对象。再让ChinesePeople.prototype指向这个新对象，很好的避免了借用构造函数+原型链继承调用了两次父类构造函数为属性赋值的不足。

具体执行步骤见下面代码。

解释 S99 行代码：表示创建了一个新对象，相当用  People  类 【父构造函数】的原型对象属性“克隆”了一个对象。

解释 S100 行代码：让ChinesePeople 原型对象变量指向S99

```js
	"克隆"对象实现方式代码优化 [ TS 继承和装饰器底层继承实现模式]
	function createProtoTypeClone(prototypeObject){
	  function Middle(){
          // 第四步在新创建的ChinesePeople原型对象空间的Middle实例对象中添加constructor属性
		  // 使其指向子类ChinesePeople构造函数对象空间
           this.constructor=ChinesePeople;
		  // clone.constructor=ChinesePeople;
      }
        
	  // 第一步.创建Person父类原型的副本
	  Middle.prototype=Person.prototype;
	  // 第二步2.1:创建父类原型副本的实例对象
      return new Middle();		
	}

	// 第二步2.2 clone指向父类原型副本实例对象的变量
    vSonr clone=createProtoTypeClone(Person.prototype);

	// 第三步:设置子类原型为该副本的实例对象
	ChinesePeople.prototype=clone;

  	
	"克隆"对象实现方式2
	// 第S99行效果 = S102+S103。相当用 People 类【父构造函数】的原型对象属性“克隆”了一个对象。
	let cloneOneParentObj=Object.create(People.prototype)  // S99
    ChinesePeople.prototype=cloneOneParentObj // S100
	ChinesePeople.prototype.constructor = ChinesePeople;// S101


	"克隆"对象实现方式3 [课后思考题]
    let cloneOneParentObj2={} // S102
    cloneOneParentObj2.__proto__=People.prototype // S103
	ChinesePeople.prototype=cloneOneParentObj // S104
	ChinesePeople.prototype.constructor = ChinesePeople;// S105
	
```

**慕课网 TS 高级课程**

#### **2-25      用全栈眼光深度掌握TS继承+TS继承好处  【企业真项目应用场景】**

##### 1. 理解子类

（1）什么是子类？   

有两个类，比如 A 类和 B 类，如果满足 A 类  is a kind of  B类，那么 A 类就是 B 类的子类
比如：A 类是顾客类，B 类是人类，因为顾客类 a kind of 人类成立【顾客类是人类的一种】，所以顾客类是人类的子类。

（2） 子类如何继承父类的属性和方法？

以顾客类为例子：顾客类继承了父类【人类】的非私有的属性和方法，也具备子类独有的属性和方法 。

顾客类继承父类【人类】的全部非私有的属性和方法外，还有哪些独有的属性和方法呢？
顾客类独有属性：顾客等级，顾客编号
顾客类独有方法：购买

  (3)  初步理解为什么要用继承？

 举例：宠物管理项目中的狗狗类，兔子类，小猫类都是宠物，尽管每个宠物都有独有属性和方法，比如狗狗类的品种，看家方法；兔子类的肤色属性等。但这些类都包含了 name, buymoney[购买价格]，healthstatus[健康状况]，friendshipstar [和主人的友谊星级数]这些属性，如果每一个类都写这些属性，那么就非常臃肿，可以把这些属性提取出来放到一个宠物类中，其他类都继承这个宠物类。当然继承还有更多好处，下面借助汽车租赁功能的实现来更深度的掌握继承。

 (4)  汽车租赁管理功能【深度掌握继承】

需求1:汽车租赁功能实现: 有小轿车,大巴,卡车三种类型的车,顾客可以租任意一种或多种不同类型的车,按照租用的天计算租金， 同时为了响应国家对各类车安全的管理, 对在租赁期内有过各种超载，超乘客数，酒后驾车等违规的车需额外支付一定的费用。

需求2:计算退回费用：最终退回顾客的费用为押金扣除使用天数，如押金不足需额外支付不足部分。

思考小轿车,大巴,卡车共同属性:  品牌 ( brand )  VechileNo ( 车牌号 )  days ( 租赁天数 ) total ( 支付的租赁总费用 )  deposit ( 押金 )

思考小轿车,大巴,卡车共同方法: 计算租赁车的价格 ( calculateRent)   支付押金的方法( payDesposit)

​										安全规则方法（safeShow)

父类：Vechile   交通工具。

// 子类 小轿车 【型号】type属性



**慕课网 TS 高级课程**

#### 2-26       【 TS 继承】   super+方法重写的真应用

**方法重写：**（override)

**条件**：一定发生在继承的子类中

**位置**： 子类中重写父类的方法

**应用场景**：当父类中方法的实现不能满足子类功能需要或不能完全满足子类功能需要时，就需要在子类中进行重写

**方法重写给继承带来的好处**: 让所有的子类共用父类中方法已经实现了一部分功能的代码【父类方法代码在各个子类中得到了复用】 

**定义规则**：1. 和父类方法同名  2. 参数和父类相同，如果是引用类型的参数，需要依据具体类型来定义。

   3. 父类方法的访问范围【访问修饰符】必须小于子类中方法重写的访问范围【访问修饰符】

      同时父类方法不能是private 

      

**super的两种用法**【super只能出现在子类【派生类】中】

**用法1**：在子类的构造函数中使用 super (子类传递给父类构造函数的参数) 就表示用来调用父类构造函数  (传递给父类构造函数的参数)

还记得吗？super 编译成 JS 源码后 可以看到：就是采用 JS 原型中的借用构造函数来实现的

**用法2**：在子类重写的方法中调用父类同名方法，super.重写的方法

**错误用法**：当子类和父类有同名属性时，可以在子类中用 super 来获取父类同名属性吗？【不能】【一般要避免在子类，父类属性名同名】

**慕课网 TS 高级课程**

#### 2-27      【 TS 继承】   逐行深度剖析 +手写TS 继承编译的 JS 源码 【练就更深厚JS 原型+原型继承功底的绝佳场景 ]

**（1）相关技术**：setPrototypeOf 使用+ 和 Object.create 的区别；

  (2)  **父类静态方法和属性在子类中的继承**：setPrototypeOf 和  Object.create 分别实现；

**（2） 深度掌握 +手写+优化底层 extendsStatics  方法的实现；**

​		extendsStatics 方法的作用：  完成父类静态方法和属性在子类中的继承

（3）**深度掌握_extends 方法**

```js
  // 手写优化后源码：
   var _extends = (this.extends_) || (function () {
  function getExendsStatics2 (son, parent) {
    son.__proto__ = parent
  }
  function getExendsStatics3 (son, parent) {
    for (let key in parent) {
      if (Object.prototype.hasOwnProperty.call(parent, key)) {
        son[key] = parent[key]
      }
    }
    // 等价
    //继承父类的静态属性和方法
    // Object.keys(parent).forEach(function (son) {
    //   Child[key] = Father[key];
    // });
    //return Object.setPrototypeOf(son, parent)
  }
  var extendsStatics = function (son, parent) {

    extendsStatics = Object.setPrototypeOf || getExendsStatics2 || getExendsStatics3
    return extendsStatics(son, parent)
 
  }
  var _extends = function (son, parent) {
    extendsStatics(son, parent)
    function middle () {
      this.constructor = son
    }
    if (parent) {
      middle.prototype = parent.prototype
      //son.prototype = parent === null ? Object.create(null) : new middle()
      son.prototype = new Middle();
    } else {
      son.prototype = Object.create(null)
    }
  }
  return _extends;
})()

var Vechile = (function () {
  function Vechile (brand_, vechileNo_, days_, deposit_) {
    this.brand = brand_;
    this.vechileNo = vechileNo_;
    this.days = days_;
    this.deposit = deposit_;
  }
  // 计算租赁车的价格 ( calculateRent)
  Vechile.prototype.calculateRent = function () {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand);
    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
    return 0;
  };
  Vechile.prototype.safeShow = function () {
    console.log("车规则....");
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
  };
  Vechile.count = 300;
  return Vechile;
}())


var Car = (function (_super) {
  _extends(Car, _super)
  function Car (brand_, vechileNo_, days_, deposit_, type_) {
    _super.call(this, brand_, vechileNo_, days_, deposit_)
    // var _this = _super.call(this, brand_, vechileNo_, days_, deposit_) || this
    this.type = type_;
    //console.log("_this:", _this)
    //_this.type = type_;
    //return _this;
    return this;
  }
  Car.prototype.getPriceByType = function () {
    var rentMoneyByDay = 0; //每天的租金
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800;
    }
    else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400;
    }
    else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  };
  Car.prototype.calculateRent = function () {
    this.safeShow();
    _super.prototype.calculateRent.call(this); //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count);
    console.log("型号:", this.type)
    return this.days * this.getPriceByType();
  };
  return Car;
}(Vechile))

var car = new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版");
console.log("car:", car)
console.log(car.calculateRent());

```

##### 








