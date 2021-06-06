photo 与 photometadata 一对一 JoinColumn()
photo 与 author 多对一 不需要指定 JoinColumn()因为自动将 many 的一方作为从表
photo 与 album 多对多 JoinTable()

查询方法见 photoService
