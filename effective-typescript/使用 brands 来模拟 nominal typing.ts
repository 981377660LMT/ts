interface Point {
  _brand: 'point'
  x: number
  y: number
}
interface RadiusPoint {
  _brand: 'radius'
  x: number // radius
  y: number // theta
}
function PointDistance(p: Point) {
  return Math.sqrt(p.x ** 2 + p.y ** 2)
}
declare const p1: Point
declare const p2: RadiusPoint

PointDistance(p1)
PointDistance(p2) // 应该报错但不报错,我们可以通过添加一个brand标记区分两者

export {}
