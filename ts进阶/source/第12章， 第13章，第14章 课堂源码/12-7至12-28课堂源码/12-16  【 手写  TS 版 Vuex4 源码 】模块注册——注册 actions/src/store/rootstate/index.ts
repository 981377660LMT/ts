export * from '../food/state'
export * from '../food/state'
// 运行手写源码后会自动添加 所有state到RootState,无需提前写进去
// 但对于单模块一般就是根模块，可以往RootState中添加数据
// 单模块中用到的state
export type RootState = {
  navList: any[]
}
// // 多模块
// export type RootState = {

// }
