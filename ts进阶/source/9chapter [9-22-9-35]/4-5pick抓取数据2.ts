//  2  Pick+ Record 结合应用【真实应用场景】
// 应用场景：Todo事项编辑或更新才需要填写描述信息,预览页面只提供标题和完成状态
// 因为编辑有描述信息【description]信息, 所以不能设置成可选属性。
// 预览时如何保证只提取 Todo 接口的两个属性呢?

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}




type Pick<T, K extends keyof T> = {
  // in是类型映射 =for...in 循环迭代所有的K的类型
  [P in K]: T[P]
}


interface Todo {
  title: string
  completed: boolean
  description: string
}
// 作业：怎样实现完成这个数组 只允许保留 title和completed这两个属性
// 模拟异步从服务器中获取到数据
let todoList: Todo[] = [
  {
    title: "开发权限管理模块",
    completed: true,
    description: "使用Vue3+typescript来开发"
  },
  {
    title: "年会",
    completed: false,
    description: "12月29号上午开心酒店1楼105"
  }
]

type Record<T> = {
  [P in keyof any]: T
}
type todoRecordType = Record<Todo>// type todoRecord = {
//[x: string]: Todo;
//}
let todoRecord: todoRecordType = {}
todoList.map((todo) => {
  todoRecord[todo["title"]] = todo
})
console.log(todoRecord);
export { }