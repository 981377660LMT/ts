// 在某些业务场景里我们希望区分“相同结构但不同含义”的数据，通常可以用“品牌化” (Branding) 来让编译器识别它们是完全不同的类型。
// 最简单的方法是加个不存在的“tag”或“_brand”字段：

type Brand<K, T> = T & { __brand: K }

type UserId = Brand<'UserId', number>
type OrderId = Brand<'OrderId', number>

function getUserById(id: UserId) {
  /* ... */
}

const uid = 123 as UserId
const oid = 123 as OrderId

getUserById(uid) // OK
getUserById(oid) // Error：即使结构相同也不能乱用

export {}
