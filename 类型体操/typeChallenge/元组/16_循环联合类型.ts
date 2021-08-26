// 元组的forEach:K extends K
type LoopUnion<Union extends string, Item extends string = Union> = Item extends Item
  ? `loop ${Item}`
  : never

type R = LoopUnion<'A' | 'B' | 'C'>
