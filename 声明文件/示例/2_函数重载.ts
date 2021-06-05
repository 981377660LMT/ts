declare function getWidget(n: number): Widget
declare function getWidget(s: string): Widget[]

let x: Widget = getWidget(43)

let arr: Widget[] = getWidget('all of them')

export {}
