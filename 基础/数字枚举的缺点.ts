// https://juejin.cn/post/6844904112669065224#heading-6
// 3.1 缺点：日志输出:在输出数字枚举的成员时，我们只会看到数字：

import assert from 'assert'

// 3.2 缺点：松散型检查
enum NoYes {
  No,
  Yes,
}
function func(noYes: NoYes) {}

func(33) // no error!
// 建议：使用字符串枚举

// 目前 TypeScript 只支持将数字和字符串作为枚举成员值。不允许使用其他值，比如 symbols。

// 枚举的用例
// 4.1 用例：位模式
enum Perm {
  UserRead = 1 << 8,
  UserWrite = 1 << 7,
  UserExecute = 1 << 6,
  GroupRead = 1 << 5,
  GroupWrite = 1 << 4,
  GroupExecute = 1 << 3,
  AllRead = 1 << 2,
  AllWrite = 1 << 1,
  AllExecute = 1 << 0,
}
assert.strictEqual(Perm.UserRead | Perm.UserWrite | Perm.GroupRead, 0o640)
