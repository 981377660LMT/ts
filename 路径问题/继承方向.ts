type S = '1'
type Check1 = S extends string ? true : false
type Check2 = string extends S ? true : false

export {}
