// “声明合并” 是指编译器将针对同一个名字的两个独立声明合并为单一声明。
interface Box {
  height: number
  width: number
}

interface Box {
  scale: number
}

let box: Box = { height: 5, width: 6, scale: 10 }

export {}

// 接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。
// 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。
interface Document {
  createElement(tagName: any): Element
}
interface Document {
  createElement(tagName: 'div'): HTMLDivElement
  createElement(tagName: 'span'): HTMLSpanElement
}
interface Document {
  createElement(tagName: string): HTMLElement
  createElement(tagName: 'canvas'): HTMLCanvasElement
}
///////////////////////
// 合并命名空间和类
class Album {
  label!: Album.AlbumLabel
}

namespace Album {
  export class AlbumLabel {}
}
//////////////////////
// 模块扩展
// 声明会合并
// 见声明文件文件夹
