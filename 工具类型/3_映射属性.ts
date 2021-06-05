interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

// 一个对象里面每个属性的类型都是PageInfo
const x_: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
}
