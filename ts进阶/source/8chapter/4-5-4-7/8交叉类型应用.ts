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

function cross<T extends object, U extends object>(objOne: T,
  objTwo: U): T & U {
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
  return combine;
}
let combine = cross(button, link)
let combine2 = cross(combine, href)
console.log(combine);
console.log(combine2);
export { }