import Order from './Order'


// key就是属性名 这里的key为address phone descri
let obj = { address: "博鳌", phone: 1111, descri: "顺利" }

//type myobjtype = typeof obj //S98
//type keyofobj = keyof myobjtype// S99 "address" | "phone" | "descri"
type keyofobjtype = keyof typeof obj;//S100=S98+S99的效果
let keyofobj: keyofobjtype = "address"


type objType2 = { username: string, age: number }
type valueType=objType2["age"]
interface objType { username: string, age: number }

let obj2: objType = { username: "博鳌", age: 1111 }
type obj2keyofType = keyof objType// obj2keyofType="username"|"age"

// 接口

export { }