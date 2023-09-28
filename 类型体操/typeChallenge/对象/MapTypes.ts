type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  [K in keyof T]: [T[K]] extends [R['mapFrom']] ? Transform<R, T[K]> : T[K]
}

// `R extends any` : `R` 是联合类型，这样可以触发分发机制，让每一个类型独立判断
type Transform<R extends { mapFrom: any; mapTo: any }, T> = R extends any ? (T extends R['mapFrom'] ? R['mapTo'] : never) : never

type TestMapTypes = MapTypes<{ foo: string; bar: number }, { mapFrom: string; mapTo: number }>
