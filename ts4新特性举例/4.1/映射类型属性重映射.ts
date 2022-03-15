// 属性重映射
export {}
// 从 ts4 开始，将支持对属性更进一步的映射，开发者可以通过 as 保留字重新构造想要的属性。
// 属性重命名
interface Props {
  name: string
  age: number
  location: string
  foo(): number
}

type NewProps1 = Getters<Props>
/* 等于
interface NewProps {
  getName: () => string;
  getAge: () => number;
  getLocation: () => string;
} 
*/

type Getters<T> = {
  [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]: () => T[K] // K & string 限制K不能为number/symbol
  // [K in keyof T as K extends string ? `get${Capitalize<K & string>}` : never]: () => T[K] // K & string 限制K不能为number/symbol
}

// 2.去除属性
type NewProps2 = RemoveField<Props>

type RemoveField<T> = {
  [K in keyof T as Exclude<K, 'name'>]: T[K]
}

// 3. 过滤属性
type NewProps3 = GetMethos<Props>

type GetMethos<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K]
}

// 4.衍生属性
type NewProps4 = DoubleProps<Props>

type DoubleProps<T> = {
  [K in keyof T & string as `${K}1` | `${K}2`]: T[K]
}
