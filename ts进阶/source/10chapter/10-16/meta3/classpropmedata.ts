import 'reflect-metadata'

// 为类定义元数据
@Reflect.metadata("info", "地球人")
class People {
  @Reflect.metadata('descible1', '居住地为主要城市')
  @Reflect.metadata('descible2', '上海')
  place: Array<string> = ["中国", "北京"]

  @Reflect.metadata('firstname', '第一个名字')
  @Reflect.metadata('lastname', '最后一个名字')
  getFullName(name: string, age: string): number {
    return 100
  }
}

// 获取元数据
console.log(Reflect.getMetadata('info', People));//地球人
console.log(Reflect.getMetadata("descible", People.prototype, 'place'));//rose
console.log(Reflect.getMetadata('firstname', People.prototype, 'getFullName'))//Jim
console.log(Reflect.getMetadata('lastname', People.prototype, 'getFullName'))//Jim
// [
//   'design:returntype',
//   'design:paramtypes',
//   'design:type',
//   'lastname',
//   'firstname'
// ]
// // 获取People.prototype 上getFullName方法的全部元数据Key组成的数组
//console.log(Reflect.getMetadataKeys(People.prototype, "getFullName"));
// Reflect.getMetadataKeys(People.prototype).forEach((item) => {
//   console.log("metadatakey:", item);
// })
// Reflect.getMetadataKeys(People.prototype, 'getFullName').forEach((metakey) => {
//   console.log("11metadatakey:", metakey);
//   console.log(Reflect.getMetadata(metakey, People.prototype, 'getFullName'));
// })

// 获取People类上place方法的全部元数据Key组成的数组
// 输出
// [
//   'design:type',
//   'descible1',
//   'descible2'
// ]
console.log(Reflect.getMetadataKeys(People.prototype, "place"));

Reflect.getMetadataKeys(People.prototype, 'place').forEach((metakey) => {
  console.log("属性metadatakey:", metakey);
  console.log(Reflect.getMetadata(metakey, People.prototype, 'place'));
})


class ChinesePeople extends People {
  @Reflect.metadata("descible", "姓名不能包含非法汉字")
  guoYear(args: string) {

  }
}
console.log("getMetadataKeys==>查看父类上的方法...");
console.log(Reflect.getMetadataKeys(ChinesePeople.prototype, 'getFullName'))//Jim
console.log("getOwnMetadataKeys不能查看父类上的方法...");
console.log(Reflect.getOwnMetadataKeys(ChinesePeople.prototype, 'getFullName'))//Jim