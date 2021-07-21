export class ObjectManipulator<T> {
  constructor(protected obj: T) {}

  public set<K extends keyof T, V>(key: K, value: V): ObjectManipulator<T> {
    return new ObjectManipulator({ ...this.obj, [key]: value }) as ObjectManipulator<
      T &
        {
          [Key in K]: V
        }
    >
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.obj[key]
  }

  public delete<K extends keyof T>(key: K): ObjectManipulator<Omit<T, K>> {
    const newObj = { ...this.obj }
    delete newObj[key]
    return new ObjectManipulator(newObj)
  }

  public getObject(): T {
    return this.obj
  }
}
