// !迭代器类型守卫
// !if (iter.hasNext()) 内部调用 iter.next() 不会返回 undefined

interface ITreeIterator<N> {
  hasNext(): this is ITreeIteratorWithNext<N>
  next(): N | undefined
}

interface ITreeIteratorWithNext<N> extends ITreeIterator<N> {
  next(): N
}

declare const iter: ITreeIterator<string>
const maybeEmpty = iter.next() // string | undefined
if (iter.hasNext()) {
  const nonEmpty = iter.next() // string
}
