// Square 和 Rectangle有共同成员 kind，因此 kind 存在于 Shape 中。
interface Square {
  kind: 'square'
  size: number
}

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

// 有人仅仅是添加了 `Circle` 类型
// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误
interface Circle {
  kind: 'circle'
  radius: number
}

type Shape = Square | Rectangle | Circle

// 详细的检查
function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size
  } else if (s.kind === 'rectangle') {
    return s.width * s.height
  } else if (s.kind === 'circle') {
    return Math.PI * s.radius ** 2
  } else {
    // ok，自己发现错误
    const _exhaustiveCheck: never = s
  }
}
