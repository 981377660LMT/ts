现在需要打折了 是不是应该修改接口 添加 getDiscountPrice 方法呢？
这样会导致很多类都要修改方法
**接口作为契约不应该经常变化**

解决：
继承父类 增添方法
