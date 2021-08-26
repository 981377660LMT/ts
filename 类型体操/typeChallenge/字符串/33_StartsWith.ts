type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false

type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false
