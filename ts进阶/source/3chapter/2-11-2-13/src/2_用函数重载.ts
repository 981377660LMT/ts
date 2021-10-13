type MessageType = 'image' | 'audio' //微信消息类型

type Message = {
  id: number
  type: MessageType
  sendmessage: string
}

let messages: Message[] = [
  //let messages: Array<Message> = [
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

// function getMessage(value: number | MessageType):
//   Message | undefined | Array<Message> {
//   if (typeof value === "number") {
//     return messages.find((msg) => { return value === msg.id })
//   } else {
//     //return messages.filter((msg) => { return value === msg.type })
//     return messages.filter((msg) => value === msg.type)
//   }
// }

function getMessage(value: number, myname: string): Message //第一个根据数字id来查询单个消息的重载签名
function getMessage(value: MessageType, readRecordCount: number): Message[] //第二个根据消息类型来查询消息数组的重载签名
//function getMessage(value: number | MessageType, readRecordCount: number = 1): Message | undefined | Message[] {
//function getMessage(value: any, readRecordCount: any = 1): Message | undefined | Message[] {
//function getMessage(value: any, readRecordCount: any = 1):any {
//function getMessage(value: any, myname: string = "abc", readRecordCount: any = 1) {
function getMessage(value: any, value2: any = 1) {
  //console.log(myname)
  if (typeof value === 'number') {
    return messages.find(msg => {
      return 6 === msg.id
    }) //undefined
  } else {
    //return messages.filter((msg) => { return value === msg.type })
    return messages.filter(msg => value === msg.type).splice(0, value2)
  }
}

getMessage(1, 'df').id

getMessage('image', 2).forEach(msg => {
  console.log(msg)
})

export {}
