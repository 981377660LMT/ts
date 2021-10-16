import Customer from './test'
//import searchHistory from '@/home/search'
// let str: string = 23

// let obj = { username: "wangwu", age: 23 }
// obj=3

let obj = { username: "wangwu", age: 23 }
//let str: string = 3


export let set: Set<string> = new Set<string>(["abc", "df"])



// tsconfig.json文件配置讲解
export function add(one: number, two: any) {// "noImplicitAny": true, 

}

//let price: number = undefined
//let price: undefined = undefined
//let price: any = undefined
//let price: unknown = undefined




// 这是一个类
export default class Student {
  name: string;
  phone: string
  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone
  }
  study() {
    console.log(this.name + " 学习");
  }
}

