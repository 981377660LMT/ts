// 1. 为什么用元组(tuple)



// 2. 符合下面条件的数组就是一个元组
//  定义时的元素的类型确定，但各个元素的类型不必相同。
// 为元素赋值时，该值必须是当前位置的类型

let salary: [string, number, number, string] = ["王五", 8000, 10000, "ok"]

// 3.取值
console.log(salary[3])