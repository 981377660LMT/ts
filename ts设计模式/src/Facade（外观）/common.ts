
//��۽�ɫ
class Facade {
    private obj1: SubSystem01 = new SubSystem01();
    private obj2: SubSystem02 = new SubSystem02();
    private obj3: SubSystem03 = new SubSystem03();
    public method(): void {
        this.obj1.method1();
        this.obj2.method2();
        this.obj3.method3();
    }
}
//��ϵͳ��ɫ
class SubSystem01 {
    public method1(): void {
        console.log("��ϵͳ01��method1()�����ã�");
    }
}
//��ϵͳ��ɫ
class SubSystem02 {
    public method2(): void {
        console.log("��ϵͳ02��method2()�����ã�");
    }
}
//��ϵͳ��ɫ
class SubSystem03 {
    public method3(): void {
        console.log("��ϵͳ03��method3()�����ã�");
    }
}

class Client {
    public static main(): void {
        const f: Facade = new Facade();
        f.method();
    }
}
Client.main()