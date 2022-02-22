// ts 的高级类型想做数字的运算只能用`构造不同长度的数组再取 length 的方式`，
// 因为没有类型的加减乘除运算符。
type CreateArray<
  Len extends number,
  Val extends any,
  Res extends Val[] = []
> = Res['length'] extends Len ? Res : CreateArray<Len, Val, [...Res, Val]>

type Add<Num1 extends number, Num2 extends number> = [
  ...CreateArray<Num1, 1>,
  ...CreateArray<Num2, 1>
]['length']

type Three = Add<101, 2>
