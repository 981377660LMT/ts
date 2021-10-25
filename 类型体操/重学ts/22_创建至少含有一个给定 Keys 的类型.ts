type Responder = {
  text?: () => string
  json?: () => string
  secure?: boolean
}

type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType
> = KeysType extends any ? ObjectType & Required<Pick<ObjectType, KeysType>> : never // 对每个类型判断一次

// 表示当前类型至少包含 'text' 或 'json' 键
// 表示当前类型至少包含 'text' 或 'json' 键
const responder1: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  json: () => '{"message": "ok"}',
  secure: true,
}

const responder2: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  secure: true,
}

const responder3: RequireAtLeastOne<Responder, 'text' | 'json'> = {}

export {}
