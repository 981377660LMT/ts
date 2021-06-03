/**
 * 立即执行，函数作用域避免命名冲突
 */
(function (): void {
    /**
     * abstract表示抽象类。
     * 无法创建抽象类的实例；只是用来被继承的。
     * 抽象类中可以添加抽象方法。
     */
    abstract class Animal {
        static id: number = 1
        name: string
        age: number

        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }

        //抽象方法只能定义在抽象类中。子类必须重写抽象方法。
        abstract sayHello(): void

    }

    class Dog extends Animal {
        voice: string

        //派生类的构造函数必须包含 "super" 调用。
        //访问派生类的构造函数中的 "this" 前，必须调用 "super"。
        constructor(name: string, age: number, voice: string) {
            super(name, age)
            this.voice = voice
        }

        run() {
            console.log(`${this.name} is running`);
        }

        //super表示当前类的父类
        //通过 "super" 关键字只能访问基类的公共方法和受保护方法。
        sayHello() {
            console.log('wang');
        }

    }

})()


