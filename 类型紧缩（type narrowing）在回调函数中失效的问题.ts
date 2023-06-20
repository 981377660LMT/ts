// !回调函数会取消let的类型收窄
const ran = () => (Math.random() > 0.5 ? 'hei' : undefined)
const funfun = (fun: (id: string) => string) => {
  fun('huo')
}
function mustString(s: string, b: string) {
  return s + b
}

let s: string | undefined = undefined
if (ran() == 'hei') {
  s = ran()
}

const b = ran()

if (b != null) {
  mustString(b, b)
  funfun((c: string) => mustString(b, c))
}

if (s != null) {
  mustString(s, s)
  // Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  // Type 'undefined' is not assignable to type 'string'.
  funfun((c: string) => mustString(s, c))
}

// 修复方法:
if (s != null) {
  mustString(s, s)
  const tmp = s
  funfun((c: string) => mustString(tmp, c))
}

export {}
