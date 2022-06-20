interface Getter {
  get(key: string): [byte: string[], error: Error]
}

interface GetterFunc extends Getter {
  (key: string): [byte: string[], error: Error]
}

// 实现
const getterFunc: GetterFunc = (key: string) => {
  return [[key], new Error('error')]
}
getterFunc.get = (key: string) => getterFunc(key)

function getFromSource(getter: Getter, key: string): string[] {
  const [byte, error] = getter.get(key)
  if (error) {
    throw error
  }
  return byte
}

export {}

// !类比golang
// type Getter interface {
// 	Get(key string) ([]byte, error)
// }

// type GetterFunc func(key string) ([]byte, error)

// // 把函数看成一个类 类实现了Getter接口 从而可以用函数传参
// func (f GetterFunc) Get(key string) ([]byte, error) {
// 	return f(key)
// }

// // !接口型函数的价值什么？
// // !这里为了传一个getter 而让函数继承了接口 => `函数式接口`
// func GetFromSource(getter Getter, key string) []byte {
// 	buf, err := getter.Get(key)
// 	if err == nil {
// 		return buf
// 	}
// 	return nil
// }
