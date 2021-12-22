class C {
  vals = [1, 2, 3]
  // logSquares() {
  //   for (const val of this.vals) {
  //     console.log(val * val)
  //   }
  // }
  logSquares(this: C) {
    for (const val of this.vals) {
      console.log(val * val)
    }
  }
}

const c = new C()
c.logSquares()
const c2 = new C()
const method = c.logSquares
method() // check ok, 但是运行时报错

export {}
