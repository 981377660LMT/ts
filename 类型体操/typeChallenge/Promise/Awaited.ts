type Awaited<T> = T extends Promise<infer R> ? R : never
export {}
