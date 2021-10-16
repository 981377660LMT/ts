class Collection<T = any> {

  static collection: Collection = new Collection();

  private constructor() { }

  private containerMap = new Map<string | symbol, any>();

  public set(id: string | symbol, value: T): void {
    this.containerMap.set(id, value);
  }

  public get(id: string | symbol): T {
    return this.containerMap.get(id);
  }

  public has(id: string | symbol): Boolean {
    return this.containerMap.has(id);
  }
}
export default Collection.collection;