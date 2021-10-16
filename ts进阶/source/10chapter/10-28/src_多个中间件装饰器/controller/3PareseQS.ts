export interface ParamsDictionary {
  [key: string]: string;
}

interface ParsedQs {
  [key: string]: undefined | string | string[] |
  ParsedQs | ParsedQs[]
}
let pq: ParsedQs = {
  "abc": {
    "age": "23"
  }
}
let pq2: ParsedQs = {
  "abc2": [{
    "address": "wangwu",
    "kk": "sdf"
  }, {
    "address": "wangwu",
    "kk": "sdf"
  }]
}