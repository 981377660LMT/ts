type SymmetricDifference<T, U> = Exclude<T | U, T & U>
type OneOrFour = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>
