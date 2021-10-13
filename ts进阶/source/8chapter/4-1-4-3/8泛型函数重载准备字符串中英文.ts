// var pattern1 = /[\u4e00-\u9fa5]+/g;
// 英文、数字数组排序  
function quickSort<T>(arr: Array<T>): T[] {
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

//   中文排序
function sortChinese<T>(arr: Array<T>): T[] {//Array<T>=T[]
  return arr.sort(function (firstnum, secondnum) {
    return (firstnum as any).localeCompare(secondnum, "zh-CN")
  })
}

// 判断数组中是否有中文元素
function isChinese<T>(arr: Array<T>): boolean {
  var pattern1 = /[\u4e00-\u9fa5]+/g;
  return arr.some((item) => {
    return pattern1.test(item as any)
  })
}
// 慕课网 TS 高级课程
// 泛型函数重载
// 中文+英文、数字数组排序混合方法  
// 分工明确
function sort(data: string, count?: number): string//[可有可无]
function sort<T>(data: T, count?: number): T//分工明确
function sort(data: any, count: number = 5): any {
  if (typeof data === "string") {//如果是字符串
    return strSelfSort(data, count)// 按照字符串自排序
  }
  if (data instanceof Array) {//如果data是数组
    if (isChinese(data)) {//如果是中文数组
      return sortChinese(data);
    }
    let newArr = data.map((item) => {
      return typeof item === "string" ? strSelfSort(item) : item
    })
    //英文、数字数组排序
    return quickSort(newArr as any);
  }
}
//// (2). 字符串自排序
function strSelfSort(str: string, count: number = 5): string {
  // (1) 字符串拆分成数组
  let strArray = str.split('');
  // (2) 数组进行使用快速排序算法来排序
  let strSortArray = quickSort(strArray);
  // (3) 重新把排好序的数组连接成一个字符串返回
  let strResult = strSortArray.join('');
  return strResult.length > 10 ? strResult.substr(0, count) + "..." : strResult;
}
var str = "bdfaerafdfsd"
let strResult = sort(str, 6)
console.log("长度为:", strResult.length, "字符串", strResult)

var numArr = [3, 1.883332, 8, 9, 20, 15, 2, 7, 13, 11, 19, 18, 5, 6, 17, 4];
console.log(sort(numArr));
//sort(numArr)
let result = sort<number[]>(numArr)
result.forEach((item) => {
  console.log(item.toFixed(2));
})

let strArr: Array<string> = ["cba", "kkdf", "ndf", "bcdf", "dfd", "cdf"]
console.log(sort(strArr));

var chineseArr = ["武汉", "郑州", "太原", "济南", "沈阳", "大连"];
console.log(sort(chineseArr));


export { }


