type NonEmptyArray1<T> = [T, ...T[]] // [T, ...T[]] 确保了第一项一定是T, 代码简洁的同时还易于理解
//貌似也能用
type NonEmptyArray2<T> = T[]['length'] extends 0 ? never : T[]
