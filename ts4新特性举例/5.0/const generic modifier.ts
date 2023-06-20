// const generic modifier
// !const 泛型参数

function addComma<const T extends string>(a: T): `${T},` {
  return `${a},`
}

const res = addComma('abc')
