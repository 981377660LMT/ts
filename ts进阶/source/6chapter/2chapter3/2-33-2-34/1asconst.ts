//const arr=[10,30,40,"abc"]
//arr=[100,30,40,"abc"]
//arr[0]=100

const arr = [10, 30, 40, "abc"] as const
//arr = [100, 30, 40, "abc"]
//arr[0] = 100;//错误 无法分配到 "数组的索引为0位置的元素" ，因为它是只读属性

function showArr(arr: readonly any[]) {//类型“readonly any[]”中的索引签名仅允许读取。
  //arr[0] = 100;
  console.log(arr)
}

showArr(arr)