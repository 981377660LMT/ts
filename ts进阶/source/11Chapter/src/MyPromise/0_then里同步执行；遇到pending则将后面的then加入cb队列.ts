new Promise<void>((resolve, reject) => {
  // resolve()
  setTimeout(() => {
    resolve()
  }, 10000)
  reject('no')
})
  // @ts-ignore   // 实际上要传excutor 这样不规范
  .then(console.log(100)) // excutor在构造函数里立即执行
  .catch(err => console.log(err))

// 调用 then时判断状态
// 如果pending那就将后面的excutor放入之前promise里的回调队列中
// 之前的promise resolve时再清空回调队列
