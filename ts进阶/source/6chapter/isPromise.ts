function isPromise(obj: any): obj is Promise<any> {
  return isObject(obj) && isFunction(obj.then)
}

function isObject(obj: any): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object'
}

function isFunction(data: any): data is Function {
  return typeof data === 'function'
}
