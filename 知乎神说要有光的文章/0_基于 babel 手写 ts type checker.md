**babel 7 以后就可以编译 typescript 代码，这还是 typescript 团队和 babel 团队合作一年的成果**
babel 编译流程分为 3 个步骤：parse、transform、generate。
parse 阶段负责编译源码成 AST，transform 阶段对 AST 进行增删改，generate 阶段打印 AST 成目标代码并生成 sorucemap。

**类型检查具体做了什么？**
使用 babel 把这段代码 parse 成 AST
检查的是这个赋值语句 AssignmentExpression，左右两边的类型是否匹配
