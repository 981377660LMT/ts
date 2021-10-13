var pattern1 = /[\u4e00-\u9fa5]+/g;
// 3泛型函数重载准备
// (1). 中文排序
// (2). 自排序



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
var chineseArr = ["武汉", "郑州", "太原", "济南", "沈阳", "大连"];

// (1). 中文排序
function sortChinese<T>(arr: Array<T>): T[] {//Array<T>=T[]
  return arr.sort(function (firstnum, secondnum) {
    return (firstnum as any).localeCompare(secondnum, "zh-CN")
  })
}

console.log(sortChinese(chineseArr));

export { }


