const Status = {
  MANAGER_ADUIT_FAIL: -1,
  NO_ADUIT: 0,
  MANAGER_ADUIT_SUCCESS: 1,
  FINAL_ADUIT_SUCCESS: 2
}
// 审核类
class MyAduit {

  getAduitStatus(status: number): void {

    if (status === Status.NO_ADUIT) {
      console.log("没有审核");
    } else if (status === Status.MANAGER_ADUIT_SUCCESS) {
      console.log("经理审核通过");
    } else if (status === Status.FINAL_ADUIT_SUCCESS) {
      console.log("财务审核通过");
    }
  }
}

const aduit = new MyAduit();
aduit.getAduitStatus(Status.NO_ADUIT)
export { }