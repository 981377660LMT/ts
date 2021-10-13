function UrlParam(params: any) {
  return function paramDecorator(targetClassPrototype: any,
    methodname: string, paramindex: number) {
    console.log("targetClassPrototype:", targetClassPrototype)
    console.log("methodname:", methodname);
    console.log("paramindex:", paramindex);
    targetClassPrototype.info = params
  }
}
class People {
  eat(@UrlParam("地址信息") address: string, who: string) {
    console.log("address:", address);
  }
}