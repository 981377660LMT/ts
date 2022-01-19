type AsyncFunction = (...args: any[]) => Promise<unknown>

// class
type Constructor<T, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T
type Class<T, Arguments extends unknown[] = any[]> = Constructor<T, Arguments> & { prototype: T }

// json
type JsonValue = JsonPrimitive | JsonObject | JsonArray
type JsonPrimitive = string | number | boolean | null
type JsonObject = { [Key in string]?: JsonValue }
type JsonArray = JsonValue[]

// camel/snake/pascal

type UpperCase =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

type WordSeparators = '-' | '_' | ' '

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type Primitive = null | undefined | string | number | boolean | symbol | bigint

// numeric - 检查
// MultidimensionalArray
