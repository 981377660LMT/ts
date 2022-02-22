// 共変（covariance）・反変（contravariance）・双変（bivariance）

// 共変
// List<number> に、1 しか入り得ない List を代入するのは問題ない
const l: List<number> = new List<1>(1, 1, 1)

// 反変
declare const getNumber: (url: string, handleNumber: (response: number) => void) => void
// 1 以外も来るかもしれないので、これはエラー
getNumber('/mynumber', (hoge: 1) => {})

export {}

// TypeScript は`メソッドを双変として扱う`
