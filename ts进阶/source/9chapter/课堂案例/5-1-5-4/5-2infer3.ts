class Subject {
  constructor(public subid: number, public subname: string) {
  }
}
let chineseSubject = new Subject(100, "语文")
let mathSubject = new Subject(101, "数学")
let englishSubject = new Subject(101, "英语")

let setZhangSanSubject = new Set<Subject>([chineseSubject, mathSubject, englishSubject]);
type ss = typeof setZhangSanSubject
type ElementOf0<T> = T extends Set<infer E> ? E : never

let result: ElementOf0<typeof setZhangSanSubject>