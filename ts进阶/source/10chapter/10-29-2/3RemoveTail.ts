
export type RemoveTail<S extends string, Tail extends string> =
  S extends `${infer P}${Tail}` ? P : S;

//1 
type removeTailFirstType1 =
  RemoveTail<':foodname.beijing-china/:price/:shopname', `/${string}`>
let removeTail: RemoveTail<':foodname.beijing-china/:price/:shopname', '/:price/:shopname'>

// 2 嵌套
let removeTail2: RemoveTail<removeTailFirstType1, `-${string}`>
type removeTailFirstType2 = RemoveTail<removeTailFirstType1, `-${string}`>

// 3.再次嵌套
type removeTailFirstType3 = RemoveTail<removeTailFirstType2, `.${string}`>
let removeTail3: RemoveTail<removeTailFirstType3, `.${string}`>

// 4 通用化
