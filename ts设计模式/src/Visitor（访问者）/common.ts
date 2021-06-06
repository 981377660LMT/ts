//����Ԫ�أ�Element����ɫ������һ���������ܲ��� accept() �Ľӿڣ������ܵķ����߶�����Ϊ accept() �����Ĳ�����
interface Elemente {
    accept(visitor: Visitor): void
}

//����Ԫ�أ�ConcreteElement����ɫ��ʵ�ֳ���Ԫ�ؽ�ɫ�ṩ�� accept() �������䷽����ͨ������ visitor.visit(this) ���������Ԫ���п��ܻ���������ҵ���߼�����ز�����
class ConcreteElementA implements Elemente {
    constructor(private name: string, private num: number) {

    }
    getName(): string {
        return this.name;
    }
    getMoney(): string {
        return this.num + '��Ԫ';
    }
    accept(visitor: Visitor) {
        visitor.visitA(this)
    }
}

//����Ԫ�أ�ConcreteElement����ɫ��ʵ�ֳ���Ԫ�ؽ�ɫ�ṩ�� accept() �������䷽����ͨ������ visitor.visit(this) ���������Ԫ���п��ܻ���������ҵ���߼�����ز�����
class ConcreteElementB implements Elemente {
    constructor(private name: string, private num: number) {

    }
    getName(): string {
        return this.name;
    }
    getMoney(): string {
        return this.num + '��Ԫ';
    }
    accept(visitor: Visitor) {
        visitor.visitB(this)
    }
}

//��������ߣ�Visitor����ɫ������һ�����ʾ���Ԫ�صĽӿڣ�Ϊÿ������Ԫ�����Ӧһ�����ʲ��� visit() ���ò����еĲ������ͱ�ʶ�˱����ʵľ���Ԫ�ء�
interface Visitor {
    visitA(element: ConcreteElementA): void
    visitB(element: ConcreteElementB): void
}

// ��������ߣ�ConcreteVisitor����ɫ��ʵ�ֳ�������߽�ɫ�������ĸ������ʲ�����ȷ�������߷���һ��Ԫ��ʱ����ʲô��
class ConcreteVisitorA implements Visitor {
    visitA(element: ConcreteElementA) {
        console.log(`${element.getName()}ʹ��${element.getMoney()}ȥ��`)
    }
    visitB(element: ConcreteElementB) {
        console.log(`${element.getName()}ʹ��${element.getMoney()}ȥ��`)
    }
}

// ��������ߣ�ConcreteVisitor����ɫ��ʵ�ֳ�������߽�ɫ�������ĸ������ʲ�����ȷ�������߷���һ��Ԫ��ʱ����ʲô��
class ConcreteVisitorB implements Visitor {
    visitA(element: ConcreteElementA) {
        console.log(`${element.getName()}ʹ��${element.getMoney()}ȥ��`)
    }
    visitB(element: ConcreteElementB) {
        console.log(`${element.getName()}ʹ��${element.getMoney()}ȥ��`)
    }
}

class ObjectStructure {
    list: Array<Elemente> = []
    add(element: Elemente) {
        this.list.push(element)
    }
    accept(visitor: Visitor) {
        this.list.forEach((element: Elemente) => {
            element.accept(visitor)
        })
    }
}


class Client {
    public static main(): void {
        const list: ObjectStructure = new ObjectStructure()
        const shangren1 = new ConcreteElementA('����1', 30)
        const shangren2 = new ConcreteElementA('����2', 50)
        const shangren3 = new ConcreteElementA('����3', 60)
        const diaosi1 = new ConcreteElementB('��˿1', 60)
        const diaosi2 = new ConcreteElementB('��˿1', 80)
        list.add(shangren1)
        list.add(shangren2)
        list.add(shangren3)
        list.add(diaosi1)
        list.add(diaosi2)
        const visitorA = new ConcreteVisitorA()
        list.accept(visitorA)
        const visitorB = new ConcreteVisitorB()
        list.accept(visitorB)
    }
}
Client.main()

// ����1ʹ��30��Ԫȥ��
// ����2ʹ��50��Ԫȥ��
// ����3ʹ��60��Ԫȥ��
// ��˿1ʹ��60��Ԫȥ��
// ��˿1ʹ��80��Ԫȥ��
// ����1ʹ��30��Ԫȥ��
// ����2ʹ��50��Ԫȥ��
// ����3ʹ��60��Ԫȥ��
// ��˿1ʹ��60��Ԫȥ��
// ��˿1ʹ��80��Ԫȥ��