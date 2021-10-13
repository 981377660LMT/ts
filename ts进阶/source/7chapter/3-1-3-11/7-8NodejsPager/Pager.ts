import ArrayList from './ArrayList'
// 通用分页类
// 分页类
export default class Pager<M extends object> {

  firstRecordNoCurPage!: number;//每一页的第一条记录号是多少
  pageSize: number = 3;//每一页总共有几条记录
  pageCount: number = 0;// 当前是第几页--从前端页面传递过来的数据
  dataList!: ArrayList<M>;// 封装数据表取出来的全部数据的集合类【等外部传递数据给dataList】

  constructor(pageCount: number) {
    this.pageCount = pageCount;
  }
  
  // 显示当前页的数据
  public showCurrentPageData() {
    // 当前页的第一条记录号是多少
    this.firstRecordNoCurPage = this.pageSize * (this.pageCount - 1)
    // 当前页的最后一条记录号
    let lastRecordNoCurPage = this.firstRecordNoCurPage + this.pageSize - 1
    //  当前页的所有记录

    //let resultDataListCurpage = lastRecordNoCurPage >= this.dataList.size() - 1 ?
    // 如果lastRecordNoCurPage计算是按照每一页3条记录计算出来的最后一页的最后一条记录，
    // 如果最后一页小于3条记录, 就直接slice到this.dataList.size()就可以了
    return lastRecordNoCurPage >= this.dataList.size() - 1 ?
      this.dataList.element
        .slice(this.firstRecordNoCurPage, this.dataList.size())
      : this.dataList.element
        .slice(this.firstRecordNoCurPage, lastRecordNoCurPage + 1)
    //12  14+1  12 13 14

    //return resultDataListCurpage;
  }
  // firstRecordNoCurPage=12
  //  lastRecordNoCurPage=14
  // 12(第13条记录)  13(第14条记录) )  14(第15条记录)  15

  //现在总共13条记录 第13条记录索引下标为12
}

//this.firstRecordNoCurPage= 3*(1-1)=0

//第一页：0  1  2 //firstRecordNoCurPage=0+3=3-1=2

 //this.firstRecordNoCurPage= 3*(2-1)=3
 //第二页：3  4  5 //firstRecordNoCurPage=3

// this.firstRecordNoCurPage= 3*(3-1)=6
// 第三页：6  7  8 //firstRecordNoCurPage=6

// this.firstRecordNoCurPage= 3*(4-1)=9
// 第四页：9  10 11 //firstRecordNoCurPage=9

 //this.firstRecordNoCurPage= 3*(5-1)=12
// 第五页：12   //firstRecordNoCurPage=12 