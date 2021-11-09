定义：一个对象应该对其他的对象保持最少的了解，又叫最少知道原则。
**尽量降低类与类之间的耦合**
优点：降低类之间的耦合
强调只和朋友交流，不和陌生人说话
朋友：出现在成员变量，方法的输入，输出参数中的类称为成员朋友类，而出现在方法体内部的类不属于朋友类。

每个类尽量减少对其他类的依赖
不要把工具方法写在一个类的静态里 而是要抽成 Util 不变的类

是吧逻辑写在 Boss 里**还是把逻辑传进来**
course 应该由 teamleader 创建而 boss 不需要了解
**boss 调用 teamleader 的方法**

```JAVA
public class Boss {

    public void commandCheckNumber(TeamLeader teamLeader) {
        teamLeader.checkNumberOfCourses();
    }

}

```
