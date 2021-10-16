// 已知条件 1：Action 接口，FoodModule 类
interface Action<T = any> {
  type: string
  payload?: T
}

class FoodModule {
  public static topic: string
  public count!: number

  delay(promise: Promise<number>) {
    return promise.then((second: number) => ({
      type: 'delay',
      payload: `延迟 ${second} 秒`,
    }))
  }

  searchFoodByCity(action: Action<String>) {
    return {
      payload: action.payload,
      type: 'searchFoodByCity',
    }
  }
}

// 已知条件 2：
// BaseConvert 的函数，这个对象上提取了 FoodModule 两个方法声明 ，并增加了两个方法类型。
type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>
type asyncMethodConnect<T, U> = (input: T) => Action<U>

type syncMethod<T, U> = (action: Action<T>) => Action<U>
type syncMethodConnect<T, U> = (action: T) => Action<U>

// 定义一个 Convert 类型，接受 FoodModule 实例或者 和 FoodModule 方法同类型的实例，
// 然后输出一个类型，但这个类型改变了。
// asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
// asyncMethod<T, U>(input: T): Action<U>

// syncMethod<T, U>(action: Action<T>): Action<U>  变成了
// syncMethod<T, U>(action: T): Action<U>

// // 最终要得到的结果:
// type Convert = () => {
//   delay: asyncMethodConnect<number, string>;
//   searchFoodByCity: syncMethodConnect<String, String>;
// }

// type PickMethod<T extends object> = {
//   [K in keyof T as T[K] extends Function ? K : never]: T[K] extends asyncMethod<
//     infer Arg,
//     infer Return
//   >
//     ? asyncMethod<Awaited<Arg>, Awaited<Return>>
//     : T[K] extends syncMethod<infer Arg, infer Return>
//     ? syncMethod<UnWrapAction<Arg>, UnWrapAction<Return>>
//     : never
// }

type Mapping<T extends object> = {
  [K in keyof T]: T[K]
}

type MethodsOf<T extends object> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K] extends asyncMethod<
    infer Arg,
    infer Return
  >
    ? asyncMethodConnect<Arg, Return>
    : T[K] extends syncMethod<infer Arg, infer Return>
    ? syncMethodConnect<Arg, Return>
    : never
}

type Convert = () => {
  [K in keyof MethodsOf<FoodModule>]: MethodsOf<FoodModule>[K]
}
/////////////////////////////////////////////////////////////////////////////////////////////
// 实际上不需要asyncMethodConnect 使用awaited递归地Unwrap也可
type UnWrapAction<T> = T extends Action<infer R> ? UnWrapAction<R> : T
// type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T
type MyParameters<F> = F extends (...args: infer R) => any ? R[0] : never
type MyReturnType<F> = F extends (...args: any[]) => infer R ? R : never
type Test2 = MyReturnType<(input: Promise<string>) => Promise<Action<number>>>
