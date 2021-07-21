// Typescript 和 JavaScript 的类型是很不一样的。从表面上来看，
//  TypeScript 的类型是 JavaScript 类型的超集。但是从更深层次上来说，
// 两者的本质是不一样的，一个是值的类型，一个是变量的类型。

// 类型和值居住在不同的空间，一个在阳间一个在阴间。他们之间互相不能访问，甚至不知道彼此的存在。

// 使用 declare 可以在值空间声明一个变量
// Typescript 主要是通过 interface，type，函数类型等打通类型空间，
// 通过 declare 等打通值空间
// ，并结合 binder 来进行类型诊断

// length， includes 以及 toString 是 String 的成员变量，
// 生活在值空间， 值空间虽然不能直接和类型空间接触，
// 但是类型空间可以作用在值空间，从而给其添加类型

// ts的类型收敛
// 如果 a 使用 const 声明，那么 a 不会被推导为 number，而是推导为类型 1
let a = 1
type A = typeof a
const b = 1
type B = typeof b
export {}
