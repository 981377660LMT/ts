//  对象准备
const userModule = {
  userName: '',
  getOrder: [
    {
      orderId: '',
      orderName: '',
    },
  ],
}

const roleModule = {
  roleId: '',
  meta: [
    {
      roleName: '',
    },
  ],
}

const rightModule = {
  rightId: '',
  meta: [
    {
      name: '',
    },
  ],
}

// 写一个泛型工具，获取如下类型？// S100
type moduleCollectionObj = {
  user: {
    userName: string
    getOrder: {
      orderId: string
      orderName: string
    }[]
  }
} & {
  role: {
    roleId: string
    meta: {
      roleName: string
    }[]
  }
} & {
  right: string
}

// T extends any ? (arg: T) => void : never该表达式一定走true分支，用此方式将参数T放到逆变位置上 然后infer
type UnionToIntersection<T> = (T extends any ? (arg: T) => void : never) extends (
  // infer推导的名称相同并且都处于逆变的位置(比如说函数参数)，则推导的结果将会是交叉类型。
  arg: infer U
) => void
  ? U // U必须都要有T的属性 所以交叉  (函数少的参数可以赋给多的 而多的不能付给少的)
  : never
