// type A = Array
// 泛型类型“Array<T>”需要 1 个类型参数。
// 泛型这样是不行的，这是和函数不一样的地方
// 而如果 Array 的类型也支持默认参数的话，比如：
// interface Array<T = string> {
//   ...
// }
// 那么 type A = Array; 就是成立的，如果不指定的话，会默认为 string 类型。
export {}
