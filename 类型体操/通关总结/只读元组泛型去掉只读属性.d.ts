declare const removeReadOnly: <T extends readonly any[]>(args: readonly [...T]) => T

const params = [1, 2, 3] as const
const foo = removeReadOnly(params)
