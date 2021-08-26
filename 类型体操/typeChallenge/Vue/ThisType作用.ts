// 没有ThisType情况下
const foo1 = {
  bar() {
    console.log(this.a) // error，在foo中只有bar一个函数，不存在a
  },
}

// 有ThisType情况下
const foo2: ThisType<{ a: number }> = {
  bar() {
    console.log(this.a)
    console.log(this.bar) // error，因为没有在ThisType中定义
  },
}

// ThisType的作用是：提示其下所定义的函数，在函数body中，其调用者的类型是什么。
