/* 懒汉单例 */
class PeopleSingle {
  // 静态成员instance
  private static instance: PeopleSingle

  static getInstance() {
    if (PeopleSingle.instance == undefined) {
      PeopleSingle.instance = new PeopleSingle()
    }
    return PeopleSingle.instance
  }

  // 私有构造函数
  private constructor() {}
}

PeopleSingle.getInstance()

/* 饿汉单例 */
class PeopleSingle_ {
  static instance = new PeopleSingle_()
  private constructor() {}
}

PeopleSingle_.instance
