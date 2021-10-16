// 14-6  一种特殊的接口类型 【加量赠送】
// 接口当名字的函数类型


// Vuex4
interface ActionContext {
  (state: any, commit: any): void
}

let actionContext:ActionContext=(state:any,commit:any):void=>{
    console.log("state:",state);
}
actionContext("abc","df")