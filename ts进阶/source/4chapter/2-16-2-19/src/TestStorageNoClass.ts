

localStorage.setItem("count", "30")

let loginInfoObj = { username: "lisi", age: 23 }

localStorage.setItem("loginUser", JSON.stringify(loginInfoObj))

// 问题1：代码零散
// 问题2：可读性差，不能一下子就能顾名思义
// 问题3：对后期的维护产生影响
// 问题4： JSON.stringify，JSON.parse可以直接放到类中，如果这样写的多，就影响了开发效率

let value = localStorage.getItem("loginUser")
value != null ? JSON.parse(value) : null;
//console.log(value.username)
