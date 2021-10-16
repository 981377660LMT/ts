export interface Userinfo {
  username: string,
  password: string,
  phone: string,
  role: string
  mark: string
}

// 数据表链接和本课程无关,但会模拟数据表数据操作
// 模拟Userinfo数据
let userinfosdb: Array<Userinfo> =
  [{
    username: "admin",
    password: "123",
    phone: "1111",
    role: "admin",
    mark: "管理员"
  },
  {
    username: "lisi",
    password: "123",
    phone: "1111",
    role: "general",
    mark: "开发工程师"
  },
  {
    username: "liuwu",
    password: "123",
    phone: "1111",
    role: "manager",
    mark: "项目精力"
  },
  ]

export default userinfosdb