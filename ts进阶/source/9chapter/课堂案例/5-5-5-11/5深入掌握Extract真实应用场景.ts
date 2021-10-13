interface Button {
  btntype: string
  text: string
}
interface Link {
  alt: string
  href: string
}
interface Href {
  linktype: string
  target: Openlocation
}
enum Openlocation {
  self = 0,
  _blank,
  parent
}
let button: Button = {
  btntype: 'normal',
  text: '跳转到百度',
}
let link: Link = {
  alt: 'goto baidu',
  href: 'http://www.baidu.com'
}
let href: Href = {
  linktype: "外网",
  target: Openlocation._blank
}

// 慕课网高级TS课程 使用 Extract来 优化 TS 泛型函数重载+交叉类型+泛型约束真实应用场景
// Extract 是TS提供的一个TS高级type类型【简称TS高级类型】
type Extract<T, U> = T extends U ? T : never
function cross<T, U>(objOne: Extract<T, object>, objTwo: Extract<U, object>): T & U
function cross<T, U, V>
  (objOne: T, objTwo: U, objThree: V): T & U & V
function cross<T, U, V>
  (objOne: T, objTwo: U, objThree?: V) {
  let obj = {}
  let combine = obj as T & U

  Object.keys(objOne).forEach((key) => {
    combine[key] = objOne[key]
  })
  Object.keys(objTwo).forEach((key) => {
    if (!combine.hasOwnProperty(key)) {
      combine[key] = objTwo[key]
    }
  })
  if (objThree) {//如果有第三个对象传递进来实现交叉
    //let obj = {}
    //let combine2 = obj as T & U & V
    //let combine2=combine as T & U & V
    let combine2 = combine as typeof combine & V
    Object.keys(objThree).forEach((key) => {
      if (!combine2.hasOwnProperty(key)) {
        combine2[key] = objThree[key]
      }
    })
    return combine2// 三个对象交叉结果
  }
  return combine;// 两个对象交叉结果
}
let combine = cross<Button,Link>(button, link)
//效果=let combine = cross(button, link)
//cross<string,string>("str","Er")// 错误：类型“string”的参数不能赋给类型“never”的参数
console.log(combine)
//let combine2 = cross(combine, href)
//console.log(combine);
//console.log(combine2);
export { }

// 5深入掌握Extract真实应用场景.ts