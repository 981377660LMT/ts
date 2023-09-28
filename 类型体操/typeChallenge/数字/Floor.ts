type Floor<T extends string | number> = `${T}` extends `${infer H}.${infer R}` ? H : `${T}`
