class Anima {
  static id = 1
  public readonly name: string
  public constructor(theName: string) {
    this.name = theName
  }
  public static move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }

  a() {}
  b = () => {}
}
