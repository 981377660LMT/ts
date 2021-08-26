type Length<T extends readonly any[]> = T['length']

type One = Length<[1]>
