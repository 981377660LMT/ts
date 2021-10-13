// 
// 没有用泛型
// 快速排序方法
//  3  1   8   9   20  15   2   7  13  11  19  18 5  6 17  4
// 第一轮:中间数:13  左数组保存：3  1  8  9   2   7   11  5   6  4 [cc]
//       右数组保存：20  15  19   18   17 [CC]

// return quickSort(left).concat(mid, quickSort(right))
//  因为return左数组在前,会先一直先执行完左数组 再连接中间数 然后再一直执行完右数组

//   先一直先执行完左数组，执行过程如下： 
// 左数组一直执行:拿cc左数组当新数组【递归】继续选中间数：
//    cc左数组当新数组递归： 
//        中间数：  7       分解出左数组：3  1  2   5  6  4  【dd]  
//                         分解出右数组：8  9   11  [DD]

//  规律依旧：因为return左数组在前,cc左数组等待dd左数组执行完成后继续执行后续连接操作
//        dd左数组当新数组递归； 
//        中间数：5   左数组   3  1  2  4【ee]      右数组 6
//=================== dd左数组等待 ee左数组执行完成后继续执行后续连接操作===
//       ee左数组当新数组递归；
//        中间数：2   左数组  1 【ff]        右数组  3   4【hh】

//       继续递归ff左数组，但ff左数组只有1个数，会停止并退出递归，然后链接中间数2
//        1.concact(2)= 1  2 [OO] 等待hh右数组递归完成后一并连接

//       再继续递归hh右数组  3  4    分解出中间数 4  左数组：3 [ii]  右数组【无】
//       ii左数组为1个数，不再递归，最后连接为  3，4 【TT]
//       OO 和 TT 进行连接 最后 1，2，3，4 
//  ========================ee左数组执行完成==========================
//   ==>【ee所在的quickSort函数所有它【ee]的下级递归结束退回到 上级dd所在的quickSort上层函数】
//       ee结束退出进入dd左数组所在的上层quickSort函数,dd最后连接为  1，2，3，4，5，6

//  ==>【dd所在的quickSort函数所有它【dd]的下级递归结束退回到 上级cc所在quickSort上层函数】
//       dd结束退出进入cc左数组所在的上层quickSort函数,dd左函数全部执行完，连接中间数，
//       但DD右quickSort函数没有执行完成，继续执行右quickSort函数：8  9   11  [DD]
//       也会按照相同规律一直执行到整个排序完成   
//       

// 1．先从数列中取出一个数作为基准数。
// 2．分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边。
// 3．再对左右区间重复第二步，直到各区间只有一个数。
function quickSort(arr: Array<any>): Array<any> {
  if (arr.length < 2) { return arr }

  var left: Array<any> = [];
  var right: Array<any> = [];
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


var chineseArr = [3, 1, 8, 9, 20, 15, 2, 7, 13, 11, 19, 18, 5, 6, 17, 4];

let chineseArrSort = quickSort(chineseArr)
console.log("chineseArrSort:", chineseArrSort)

let strArr: Array<string> = ["cba", "kkdf", "ndf", "bcdf", "dfd", "cdf"]
let strArrSort = quickSort(strArr)

console.log("strArrSort:", strArrSort)
export { }