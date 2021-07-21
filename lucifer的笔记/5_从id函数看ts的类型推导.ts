const id = <T>(id: T): T => id

const cmnx = id('cmnx') // 有ts类型推导
const cmnx2 = id<string>('cmnx')
// 这也就是为什么 useState 有如下两种写法的原因。
// const [name, setName] = useState("lucifer");  // 借助ts类型推导
// const [name, setName] = useState<string>("lucifer");

// 需要注意的是，类型推导是仅仅在初始化的时候进行推导
export {}
