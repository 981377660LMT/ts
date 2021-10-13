
export type RemoveTail<S extends string, Tail extends string> =
  S extends `${infer P}${Tail}` ? P : S;

//1 
type removeTailFirstType1 = RemoveTail<':foodname.beijing-china/:price/:shopname', '/:price/:shopname'>
let removeTail: RemoveTail<':foodname.beijing-china/:price/:shopname', '/:price/:shopname'>

// 2 嵌套
let removeTail2: RemoveTail<removeTailFirstType1, '-china'>
type removeTailFirstType2 = RemoveTail<removeTailFirstType1, '-china'>

// 3.再次嵌套
type removeTailFirstType3 = RemoveTail<removeTailFirstType2, '-china'>
let removeTail3: RemoveTail<removeTailFirstType3, '.beijing'>

// 4 通用化
