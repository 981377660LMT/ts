const deepEqualCompare = <Arg>(
  a: Arg extends any[] ? 'Dont pass Array' : Arg,
  b: Arg extends any[] ? 'Dont pass Array' : Arg
): boolean => {
  return a === b
}

console.log(deepEqualCompare(1, 1))
console.log(deepEqualCompare([], []))
