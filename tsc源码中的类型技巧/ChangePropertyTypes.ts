// TS 类型中大量使用 ChangePropertyTypes

type ChangePropertyTypes<
  T,
  Substitutions extends {
    [K in keyof T]?: any
  }
> = {
  [K in keyof T]: K extends keyof Substitutions ? Substitutions[K] : T[K]
}

type ChangeStringIndexSignature<T, NewStringIndexSignatureType> = {
  [K in keyof T]: string extends K ? NewStringIndexSignatureType : T[K]
}

type ChangePropertyTypesTest = ChangePropertyTypes<{ a: string; b: number }, { a: boolean }> // { a: boolean; b: string }
type ChangeStringIndexSignatureTest = ChangeStringIndexSignature<
  {
    a: string
    b: number

    [key: string]: any
  },
  boolean
> // { a: string; b: number; [key: string]: boolean }
