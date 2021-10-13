let symid = Symbol("objid")
let obj = { [symid]: 101, username: "wangwu", age: 23 }
let username = obj["username"]
//let objid=obj[symid]//类型“symbol”不能作为索引类型使用
// 解决:
let objid = obj[symid as any]
//let objid2 = obj[symid as unknown]//类型“unknown”不能作为索引类型使用
//let symidunknown = symid as unknown// 可以转换成unknown,正确
