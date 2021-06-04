/*
 * @Author: your name
 * @Date: 2021-02-03 11:09:24
 * @LastEditTime: 2021-02-03 11:44:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \正题\4_接口.ts
 */
(function () {
    /**
     * 接口用来定义一个类的结构。定义了一个规范。
     * 接口名可以重复，而type不能重复。
     * 接口中只定义类型。
     */
    interface myInterface {
        name: string,
        age: number
    }

    interface myInterface {
        gender: string,
        sayHello(): void
    }

    const obj: myInterface = {
        name: 'cmnx',
        age: 22,
        gender: 'male',
        sayHello() {
            console.log('hello');
        }
    }

    /**
     * 定义类时，可以使类实现一个接口。
     * 鼠标放在类名上，可以快速填充属性与方法。
     */
    class Myclass implements myInterface {
        name: string
        age: number
        gender: string

        constructor(name: string, age: number, gender: string) {
            this.name = name
            this.age = age
            this.gender = gender
        }

        sayHello(): void {
            console.log('hello');
        }

    }

    /////////////////////////////////////////////////////
    type test = {
        name: string
    }

    // type test = {
    //     name: string
    // }

})()