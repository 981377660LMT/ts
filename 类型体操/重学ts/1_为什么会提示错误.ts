type User = {
  id: number
  kind: string
}

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    ...u,
    id: u.id,
    kind: 'customer',
  }
}

// T类型是User的子类型，可以赋值给User(多的赋值给少的),但是User不能赋值给T
// 泛型 T由于是在调用该函数的时候才能确定，T类型有可能会存在别的类型，因此返回值{id: u.id, kind: 'customer'}, 不一定符合泛型T。
// (泛型T可能属性更多，而上面只返回了User的属性)
interface MyUser extends User {
  age: number
}
const obj: MyUser = { id: 1, kind: 'foo', age: 24 }
makeCustomer<MyUser>(obj)
