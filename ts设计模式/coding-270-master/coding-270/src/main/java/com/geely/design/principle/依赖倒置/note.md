定义：高层模块不应该依赖底层模块，二者都应该依赖其抽象
抽象不应该依赖细节，细节应该依赖抽象
针对接口编程，不要针对实现编程
优点：可以减少类间的耦合性，提高系统稳定性，提高代码的可读性和可维护性，可降低修改程序所造成的的风险

Geely 学 java/fe/python 越来越多的方法的实现
导致 test 模块依赖了 geely

改进：
geely 学什么不在 geely 里写实现 **geely 不依赖于他们** 想再学什么 geely 不需要改动
而是在 test 里传入决定 geely 学什么
**geely 只保留传入、学习的方法**

```JAVA
public class Geely {

    public void setiCourse(ICourse iCourse) {
        this.iCourse = iCourse;
    }

    private ICourse iCourse;

    public void studyImoocCourse() {
        iCourse.studyCourse();
    }

}

public static void main(String[] args) {
    Geely geely = new Geely();
    geely.setiCourse(new JavaCourse());
    geely.studyImoocCourse();

    geely.setiCourse(new FECourse());
    geely.studyImoocCourse();

}
```
