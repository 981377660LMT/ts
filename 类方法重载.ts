class Foo1 {
  protected merge(id: string): void
  protected merge(id: number, type: string): void
  protected merge(id: number, type: string, name: string): void
  protected merge(...info: any[]): void {}
}

class Bar1 extends Foo1 {
  protected override merge(str: string): void
  protected override merge(num: number): void
  protected override merge(...args: any[]): void {
    super.merge(1, '1', '0')
  }
}
