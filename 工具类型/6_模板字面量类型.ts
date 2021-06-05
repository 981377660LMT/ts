// 从 TypeScript 4.1 开始支持模版字面量类型
type World = 'world'

type Greeting = `hello ${World}`

type EmailLocaleIDs = 'welcome_email' | 'email_heading'
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff'

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
type Lang = 'en' | 'ja' | 'pt'

// 多个替换字符串的位置上的多个联合类型会进行交叉相乘：
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`

type LowercaseGreeting = 'hello, world'
type Greeting_ = Capitalize<LowercaseGreeting>
