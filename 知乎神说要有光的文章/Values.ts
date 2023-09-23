type Values<T> = T[keyof T]

type Data = {
  k2: {
    k2A: {
      k2A1: 'k2A1_E'
      k2A2: 'k2A2_F'
    }
    k2B: {
      k2B1: 'k2B1_G'
      k2B2: 'k2B2_H'
    }
  }
}

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type Iterate<Obj, Path extends any[] = []> = Obj extends string
  ? Record<Obj, Path>
  : {
      [Prop in keyof Obj]: Obj[Prop] extends string ? Iterate<Obj[Prop], Path> : Iterate<Obj[Prop], [...Path, Prop]>
    }[keyof Obj]

// type Result =
//     & Record<"k2A1_E", ["k2", "k2A"]>
//     & Record<"k2A2_F", ["k2", "k2A"]>
//     & Record<"k2B1_G", ["k2", "k2B"]>
//     & Record<"k2B2_H", ["k2", "k2B"]>

type Result = UnionToIntersection<Iterate<Data>>
