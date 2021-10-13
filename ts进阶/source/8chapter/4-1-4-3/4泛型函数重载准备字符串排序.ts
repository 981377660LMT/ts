var pattern1 = /[\u4e00-\u9fa5]+/g;
// 3泛型函数重载准备
// (1). 中文排序
// (2). 字符串自排序
function quickSort<T>(arr: Array<T>): Array<T> {
  if (arr.length < 2) { return arr }

  var left: Array<T> = [];
  var right: Array<T> = [];
  var mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
  console.log("mid:", mid)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}
// localeCompare

let str: string = "cbaimcnd"
//let strArrSort = quickSort(str)

// (2). 字符串自排序
function strSelfSort(str: string): string {
  // (1) 字符串拆分成数组
  let strArray = str.split('');
  // (2) 数组进行使用快速排序算法来排序
  let strSortArray = quickSort(strArray);
  // (3) 重新把排好序的数组连接成一个字符串返回
  return strSortArray.join('');
}
console.log(strSelfSort(str));
export { }


