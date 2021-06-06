class Singleton {
    private static instance: Singleton
    private constructor() {}	//���ù��캯��private����ֹnewʵ����
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton()
      }
      return Singleton.instance
    }
}