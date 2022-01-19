import { BuiltIns } from './internal'

export type ReadonlyDeep<T> = T extends BuiltIns | ((...arguments: any[]) => unknown)
  ? T
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMapDeep<KeyType, ValueType>
  : T extends ReadonlySet<infer ItemType>
  ? ReadonlySetDeep<ItemType>
  : T extends object
  ? ReadonlyObjectDeep<T>
  : unknown

// Map
interface ReadonlyMapDeep<KeyType, ValueType>
  extends ReadonlyMap<ReadonlyDeep<KeyType>, ReadonlyDeep<ValueType>> {}

// Set
interface ReadonlySetDeep<ItemType> extends ReadonlySet<ReadonlyDeep<ItemType>> {}

// Object(包括Array)
type ReadonlyObjectDeep<ObjectType extends object> = {
  readonly [KeyType in keyof ObjectType]: ReadonlyDeep<ObjectType[KeyType]>
}
