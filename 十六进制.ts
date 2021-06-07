console.log(
  Buffer.from([0x4b, 0x1b, 0x83, 0x92, 0x9d, 0x0c])
    .reverse()
    .toString('hex')
    .toUpperCase()
    .split('')
    .map((value: string, index: number) => (index % 2 === 1 ? value + ' ' : value))
    .join('')
)
export {}
