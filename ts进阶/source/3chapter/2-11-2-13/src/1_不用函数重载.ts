type MessageType = 'image' | 'audio' //微信消息类型

interface Message {
  id: number
  type: MessageType
  sendmessage: string
}

const db: Message[] = [
  {
    id: 1,
    type: 'image',
    sendmessage: '你好啊,今晚咱们一起去三里屯吧',
  },
  {
    id: 2,
    type: 'audio',
    sendmessage: '朝辞白帝彩云间，千里江陵一日还',
  },
  {
    id: 3,
    type: 'audio',
    sendmessage: '你好！张无忌',
  },
  {
    id: 4,
    type: 'image',
    sendmessage: '刘老根苦练舞台绝技！',
  },
  {
    id: 5,
    type: 'image',
    sendmessage: '今晚王牌对王牌节目咋样?',
  },
]

//不用函数重载来实现2-12的功能
// 1.函数结构不分明,可读性，可维护性变差
function getMessage(value: number | MessageType): Message | undefined | Array<Message> {
  if (typeof value === 'number') {
    return db.find(msg => {
      return value === msg.id
    })
  } else {
    return db.filter(msg => value === msg.type)
  }
}

console.log(getMessage('image'))
console.log(getMessage(1))

export {}
