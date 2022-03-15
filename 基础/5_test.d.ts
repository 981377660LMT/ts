interface Process {
  exit(code?: number): void
  exitWithLogging(code?: number): void
}

// 直接declare变为全局的变量；不想变成全局变量应该加一个命名空间
declare let process: Process

// 在 TypeScript 中，使用<reference>标签来表示引用关系。在 reference 标签中可以标记依赖文件的相对路径。所以只需要在 TestB 类之前加入如下注释即可：

// ///<reference path="TestA.ts" />

// class TestB{
//  public static testBStr:string = TestA.arr.join("");
// }

// 作者：合肥黑
// 链接：https://www.jianshu.com/p/c143e7af7c04
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
