
export type RemoveTail<S extends string, Tail extends string> =
  S extends `${infer P}${Tail}` ? P : S;

//1 
type removeTailFirstType1 = RemoveTail<'/showFood/:foodname/:price', '/:foodname/:price'>

let removeTail: RemoveTail<'/showFood/:foodname/:price', '/:foodname/:price'>

// 2 嵌套
type removeTailFirstType2 =
  RemoveTail<'/showFood.beijing-china/:foodname/:price', '/:foodname/:price'>

let removeTail2: RemoveTail<removeTailFirstType2, '-china'>

// 3.再次嵌套
type removeTailFirstType3 = RemoveTail<removeTailFirstType2, '-china'>
let removeTail3: RemoveTail<removeTailFirstType3, '.beijing'>

// 4 通用化

//type testType='/showFood/:foodname/:price' extends `${infer P}${'foodname/:price'}`?P:number