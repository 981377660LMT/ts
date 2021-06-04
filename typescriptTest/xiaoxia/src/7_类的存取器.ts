let passcode = 'secret passcode'

class Employee {
  //!代表赋值断言
  private _fullName!: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee()

employee.fullName = 'Bob Smith'

if (employee.fullName) {
  alert(employee.fullName)
}
