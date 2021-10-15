interface TestInter {
  age: number
  username: string
  eat(): void
  allowinput?: 1
}

//工具类
class StringUtil {
  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, '')
  }
}

const testobj: TestInter = {
  username: ' wan  g wu',
  age: 23,
  eat() {
    console.log(StringUtil.trimSpace(this.username) + ' 吃饭')
  },
  allowinput: 1,
}

/**
 * 判断是否是字符串的自定义守卫方法
 */
function isString(str: any): str is string {
  return typeof str === 'string'
}

function isFunction(data: any): data is Function {
  return typeof data === 'function'
}

function processObjOutput(obj: any) {
  // 判断allowinput属性或者方法在ojb对象中是否存在
  if (obj && 'allowinput' in obj) {
    let value: unknown
    Object.keys(obj).forEach(key => {
      value = obj[key]
      if (isString(value)) console.log(key + ':', StringUtil.trimSpace(value))
      else if (isFunction(value)) value()
    })
  } else {
    console.log('不是一个合法的对象。')
  }
}

processObjOutput(testobj)

export {}
