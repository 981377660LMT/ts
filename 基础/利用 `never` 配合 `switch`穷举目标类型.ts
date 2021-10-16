// never 类型可赋值给任意类型，反之不然，除非是 never 本身
// 从而达到了保护作用，提示我们把新增的类型在 switch 语句中补上。

const enum ShapeKind {
  Circle,
  Square,
  // Triangle, // 不小心加的
}

interface Shape {
  kind: ShapeKind
  radius?: number
  sideLength?: number
}

function getArea(shape: Shape) {
  switch (shape.kind) {
    case ShapeKind.Circle:
      return Math.PI * shape.radius ** 2
    case ShapeKind.Square:
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape.kind // 不能将类型“ShapeKind”分配给类型“never”。ts(2322)
      return _exhaustiveCheck
  }
}
