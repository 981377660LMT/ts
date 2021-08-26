type Concat<V extends unknown[], W extends unknown[]> = [...V, ...W]
type Result = Concat<[1], [2]> // expected to be [1, 2]
