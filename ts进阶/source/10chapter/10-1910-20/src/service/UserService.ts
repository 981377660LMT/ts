export default class UserService {
  Login(username: string, pwd: string, role: string) {
    console.log("进入service ...Login,username:", username)

    if (username === "admin" && pwd === "123" && role === "admin") {
      return true;
    } else {
      return false;
    }
  }
  register() {
    console.log("usersevice...register")
  }
}