import { IsEqual, Subtract } from './internal'

type Recursive<T> = Array<Recursive<T>>

/**
Creates a type that represents a multidimensional array of the given type and dimension.

Use-cases:
- Return a n-dimensional array from functions.
- Declare a n-dimensional array by defining its dimensions rather than declaring `[]` repetitively.
- Infer the dimensions of a n-dimensional array automatically from function arguments.
- Avoid the need to know in advance the dimensions of a n-dimensional array allowing them to be dynamic.

@example
```
import {MultidimensionalArray} from 'type-fest';

function emptyMatrix<T extends number>(dimensions: T): MultidimensionalArray<unknown, T> {
	const matrix: unknown[] = [];

	let subMatrix = matrix;
	for (let dimension = 1; dimension < dimensions; ++dimension) {
		console.log(`Initializing dimension #${dimension}`);

		subMatrix[0] = [];
		subMatrix = subMatrix[0] as unknown[];
	}

	return matrix as MultidimensionalArray<unknown, T>;
}

const matrix = emptyMatrix(3);

matrix[0][0][0] = 42;
```

@category Array
*/
export type MultidimensionalArray<Element, Dimensions extends number> = number extends Dimensions
  ? Recursive<Element>
  : IsEqual<Dimensions, 0> extends true
  ? Element
  : Array<MultidimensionalArray<Element, Subtract<Dimensions, 1>>>

/**
 *
 * @param initValue 数组初始化值
 * @param sizes 数组各个维度的大小
 * @returns
 */
function make<T = number, S extends number[] = []>(
  initValue: T,
  ...size: S
): MultidimensionalArray<T, S['length']> {
  const dimension = size.length
  if (dimension === 1) return Array(size[0]).fill(initValue) as any
  return Array.from({ length: size.shift()! }, () => make(initValue, ...size)) as any
}

if (require.main === module) {
  console.log(make(2, 10))
  console.log(make(2, 2, 3))
  console.log(make(0, 2, 3, 4))
  console.log(make([], 2, 3, 4))
  // [
  //   2, 2, 2, 2, 2,
  //   2, 2, 2, 2, 2
  // ]
  // [ [ 2, 2, 2 ], [ 2, 2, 2 ] ]
  // [
  //   [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ],
  //   [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]
  // ]
}

export { make }
