// 声明文件和普通文件
// *.d.ts和*.ts的区别在于：

// *.d.ts对于typescript而言，是类型声明文件，且在*.d.ts文件中的顶级声明必须以declare或export修饰符开头。同时在项目编译过后，*.d.ts文件是不会生成任何代码的。补充：默认使用tsc —init会开启skipLibCheck跳过声明文件检查，可以关闭它。
// 而*.ts则没有那么多限制，任何在*.d.ts中的内容，均可以在*.ts中使用。

// 在项目中，设置package.json的types或者typings指向声明文件。
// 在设置types或者typings后，会去找指向的声明文件。如果没有定义，则会去找根目录下的index.d.ts，
// 再没有则去找入口文件，是否存在对应文件名的声明文件。
