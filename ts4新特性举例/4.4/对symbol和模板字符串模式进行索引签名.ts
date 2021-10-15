export {}

interface Colors {
  [sym: symbol]: number
}
const red = Symbol('red')
const green = Symbol('green')
const blue = Symbol('blue')

let colors: Colors = {}

colors[red] = 255 // Assignment of a number is allowed
let redVal = colors[red] // 'redVal' has the type 'number'

// colors[blue] = 'da ba dee' // Error: Type 'string' is not assignable to type 'number'.

interface Options {
  width?: number
  height?: number
}

let a: Options = {
  width: 100,
  height: 100,
  // 'data-blah': true, // Error! 'data-blah' wasn't declared in 'Options'.
}

interface OptionsWithDataProps extends Options {
  // Permit any property starting with 'data-'.
  [optName: `data-${string}`]: unknown
}

let b: OptionsWithDataProps = {
  width: 100,
  height: 100,
  'data-blah': true, // Works!

  // 'unknown-property': true, // Error! 'unknown-property' wasn't declared in 'OptionsWithDataProps'.
}
