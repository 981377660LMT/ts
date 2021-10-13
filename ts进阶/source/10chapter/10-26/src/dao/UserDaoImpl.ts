import userinfosfrmdb from '../entity/UserInfo'
export default class UserDaoImpl {

  public findUsrByUsm(username: string, pwd: string) {
    return userinfosfrmdb.find((useinfo) => {
      return username === useinfo.username &&
        pwd === useinfo.password
    })
  }

}

