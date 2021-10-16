
type TypStuobj = { username: string, age: number, phone: string }

function info(stuObj: TypStuobj) {
  console.log("name:", stuObj.username, " age:", stuObj.age);
  return 3
}

let stuObj: TypStuobj = { username: "wangwu", age: 23, phone: "111" }
info(stuObj)

// 函数解构

function subInfo({ username, phone }: TypStuobj) {
  console.log("name:", username, " phone:", phone);
  return 3
}

subInfo({ username: "lisi", age: 33, phone: "222" })


export { }



