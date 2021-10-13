function add(one: string | number, two: string | number) {
  return one as any + two as any
}

console.log(add(3, 5))
console.log(add("3", 5))