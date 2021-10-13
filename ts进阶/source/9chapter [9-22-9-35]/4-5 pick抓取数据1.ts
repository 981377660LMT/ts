// 1. 实现 Pick 快速抓取属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Book {
  ISBN: string
  book_name: string
  book_price: number// 
  book_store_count: string;//库存数量
  book_publish: string// 出版社
}
//type tp = Book["ISBN"]//string


type Picktype = Pick<Book, "ISBN" | "book_name" | "book_price">
let pickobj: Picktype = {
  "ISBN": "101-101",
  "book_name": "解放大西南",
  "book_price": 23.4
}
type Picktype2 = Pick<Book, "ISBN" | "book_name">
let pickobj2: Picktype2 = {
  "ISBN": "101-101",
  "book_name": "解放大西南"
}





export { }