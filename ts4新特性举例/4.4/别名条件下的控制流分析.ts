export {}
// control flow analysis
function foo(arg: unknown) {
  const argIsString = typeof arg === 'string'
  if (argIsString) {
    console.log(arg.toUpperCase())
    //              ~~~~~~~~~~~
    // Error! Property 'toUpperCase' does not exist on type 'unknown'.
    // 在之前版本的TypeScript中，这里会报错——即使argIsString被分配了一个类型守卫的值，
  }
}

type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; sideLength: number }

// 不仅仅是typeof的检查。例如，对区别联合类型的检查就可以很优雅：
function area(shape: Shape): number {
  const isCircle = shape.kind === 'circle'
  if (isCircle) {
    // We know we have a circle here!
    return Math.PI * shape.radius ** 2
  } else {
    // We know we're left with a square here!
    return shape.sideLength ** 2
  }
}
