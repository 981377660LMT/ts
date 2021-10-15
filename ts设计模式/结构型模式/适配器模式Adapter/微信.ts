//小游戏的运行环境在iOS上是JavaScriptCore，在Android上是V8，都是没有BOM和DOM的运行环境，没有全局document和window对象。因此当你在小游戏环境下希望使用DOM API来创建Canvas和Image等元素的时候，会引发错误。
// const canvas = document.createElement('canvas') //erro

class wx {
  static createImage() {
    throw new Error('Method not implemented.')
  }
  static createCanvas() {
    throw new Error('Method not implemented.')
  }
}

//但是我们可以使用 wx.createCanvas 和 wx.createImage 来封装一个 document。
const document = {
  createElement(tagName: string) {
    tagName = tagName.toLowerCase()
    if (tagName === 'canvas') {
      return wx.createCanvas()
    } else if (tagName === 'image') {
      return wx.createImage()
    }
  },
}

//这时代码就可以像在浏览器中创建元素一样创建 Canvas 和 Image 了。
const canvas = document.createElement('canvas')
const image = document.createElement('image')

export {}
// 小游戏的运行环境没有BOM和DOM，没有全局的document和window对象。
// 因此当你希望使用DOM API来创建Canvas和Image等元素的时候，会引发错误。
// 此时，微信团队就提供的一个Adapter模块，
// 该模块是对基于浏览器环境的游戏引擎在小游戏运行环境下的一层适配层，
// 使游戏引擎在调用DOM和访问DOM属性时不会产生错误。
