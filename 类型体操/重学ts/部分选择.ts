type Bi<T extends object, K extends keyof T = keyof T> = Pick<T, K> & Omit<T, K>
