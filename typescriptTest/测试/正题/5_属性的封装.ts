/*
 * @Author: cmnx
 * @Date: 2021-02-03 11:43:41
 * @LastEditTime: 2021-02-03 14:44:47
 */

(function (): void {
    class Person {
        //TS可以在属性前添加属性的修饰符。
        //例如static,readonly,public(默认public),private(只能在类内部修改),protected(只能在当前类和子类中修改)
        _name: string
        private _age: number

        constructor(name: string, age: number) {
            this._name = name
            this._age = age
        }

        get age() {
            console.log('调用了get age');
            return this._age
        }

        set age(value: number) {
            if (value > 0) {
                console.log('调用了set age');
                this._age = value
            }

        }

    }

    /**
     * 属性被任意修改导致对象中的数据变得不安全。 
     */
    let per = new Person('cmnx', 22)
    per.age = -1
    console.log(per.age);

    console.log(per);

})()