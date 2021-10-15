//һ����˾������Ա������ʽ������ʱ���������в�ͬ�Ĺ�ʱ��н����㷽����
// Ա���ӿ�
interface Employee {
  accept(handler: Department): void
}

// ȫְԱ����
class FulltimeEmployee implements Employee {
  private name = ''
  // ȫְԱ������н����н��
  private weeklyWage = 0
  // ����ʱ��
  private workTime = 0
  constructor(name: string, weeklyWage: number, workTime: number) {
    this.name = name
    this.weeklyWage = weeklyWage
    this.workTime = workTime
  }
  getName(): string {
    return this.name
  }
  getWeeklyWage(): number {
    return this.weeklyWage
  }
  getWorkTime(): number {
    return this.workTime
  }
  // ʵ�ֽӿڣ����÷����ߴ���ȫְԱ���ķ���
  accept(handler: Department) {
    handler.visitFulltime(this)
  }
}

// ��ʱԱ����
class ParttimeEmployee implements Employee {
  private name = ''
  // ��ʱԱ����ʱн����н��
  private hourWage = 0
  // ����ʱ��
  private workTime = 0
  constructor(name: string, hourWage: number, workTime: number) {
    this.name = name
    this.hourWage = hourWage
    this.workTime = workTime
  }
  getName(): string {
    return this.name
  }
  getHourWage(): number {
    return this.hourWage
  }
  getWorkTime(): number {
    return this.workTime
  }
  // ʵ�ֽӿڣ����÷����ߴ�����ʱ���ķ���
  accept(handler: Department) {
    handler.visitParttime(this)
  }
}

// ���Žӿ�
interface Department {
  visitFulltime(employee: FulltimeEmployee): void
  visitParttime(employee: ParttimeEmployee): void
}

// ��������ߡ������񲿣�����н��ʵ�ֲ��Žӿ�
class FADepartment implements Department {
  // ȫְԱ��н����㷽ʽ
  visitFulltime(employee: FulltimeEmployee) {
    const name: string = employee.getName()
    let workTime: number = employee.getWorkTime()
    let weekWage: number = employee.getWeeklyWage()
    const WEEK_WORK_TIME = 40
    if (workTime > WEEK_WORK_TIME) {
      // ����Ӱ๤��
      const OVER_TIME_WAGE = 100
      weekWage = weekWage + (workTime - WEEK_WORK_TIME) * OVER_TIME_WAGE
    } else if (workTime < WEEK_WORK_TIME) {
      if (workTime < 0) {
        workTime = 0
      }
      // �ۿ�
      const CUT_PAYMENT = 80
      weekWage = weekWage - (WEEK_WORK_TIME - workTime) * CUT_PAYMENT
    }
    console.log(`��ʽԱ�� ${name} ʵ�ʹ���Ϊ��${weekWage}`)
  }
  // ��ʱ��н����㷽ʽ
  visitParttime(employee: ParttimeEmployee) {
    const name = employee.getName()
    const hourWage = employee.getHourWage()
    const workTime = employee.getWorkTime()
    console.log(`��ʱ�� ${name} ʵ�ʹ���Ϊ��${hourWage * workTime}`)
  }
}

// ��������ߡ���������Դ�������㹤��ʱ�䣬ʵ�ֲ��Žӿ�
class HRDepartment implements Department {
  // ȫְԱ������ʱ�䱨��
  visitFulltime(employee: FulltimeEmployee) {
    const name: string = employee.getName()
    let workTime: number = employee.getWorkTime()
    // ʵ�ʹ���ʱ�䱨��
    let report = `��ʽԱ�� ${name} ʵ�ʹ���ʱ��Ϊ ${workTime} Сʱ`
    const WEEK_WORK_TIME = 40
    if (workTime > WEEK_WORK_TIME) {
      // �Ӱ�ʱ�䱨��
      report = `${report}���Ӱ� ${WEEK_WORK_TIME - workTime} Сʱ`
    } else if (workTime < WEEK_WORK_TIME) {
      if (workTime < 0) {
        workTime = 0
      }
      // ���ʱ�䱨��
      report = `${report}����� ${WEEK_WORK_TIME - workTime} Сʱ`
    }
    console.log(report)
  }
  // ��ʱ������ʱ�䱨��
  visitParttime(employee: ParttimeEmployee) {
    const name: string = employee.getName()
    const workTime: number = employee.getWorkTime()
    console.log(`��ʱ�� ${name} ʵ�ʹ���ʱ��Ϊ ${workTime} Сʱ`)
  }
}

// Ա��������
class EmployeeList {
  list: Array<Employee> = []
  add(employee: Employee) {
    this.list.push(employee)
  }
  // ����Ա�������е�ÿһ������
  accept(handler: Department) {
    this.list.forEach((employee: Employee) => {
      employee.accept(handler)
    })
  }
}

class Client {
  public static main(): void {
    const list: EmployeeList = new EmployeeList()
    const full1 = new FulltimeEmployee('Bob', 3000, 45)
    const full2 = new FulltimeEmployee('Mikel', 2000, 35)
    const full3 = new FulltimeEmployee('Joe', 4000, 40)
    const part1 = new ParttimeEmployee('Lili', 80, 20)
    const part2 = new ParttimeEmployee('Lucy', 60, 15)
    list.add(full1)
    list.add(full2)
    list.add(full3)
    list.add(part1)
    list.add(part2)
    // ���񲿼���н��
    const faHandler = new FADepartment()
    list.accept(faHandler)
    // ������Դ������������
    const hrHandler = new HRDepartment()
    list.accept(hrHandler)
  }
}
Client.main()

// ��ʽԱ�� Bob ʵ�ʹ���Ϊ��3500
// ��ʽԱ�� Mikel ʵ�ʹ���Ϊ��1600
// ��ʽԱ�� Joe ʵ�ʹ���Ϊ��4000
// ��ʱ�� Lili ʵ�ʹ���Ϊ��1600
// ��ʱ�� Lucy ʵ�ʹ���Ϊ��900
// ��ʽԱ�� Bob ʵ�ʹ���ʱ��Ϊ 45 Сʱ���Ӱ� -5 Сʱ
// ��ʽԱ�� Mikel ʵ�ʹ���ʱ��Ϊ 35 Сʱ����� 5 Сʱ
// ��ʽԱ�� Joe ʵ�ʹ���ʱ��Ϊ 40 Сʱ
// ��ʱ�� Lili ʵ�ʹ���ʱ��Ϊ 20 Сʱ
