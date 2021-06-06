abstract class Beverage {
    boilWater() {
        console.log("��ˮ���");
    }

    abstract brew(): void;
    abstract pourInCup(): void;
    abstract addCondiments(): void;

    makeBeverage() {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    }
}

class Coffee extends Beverage {
    brew(): void {
        console.log("�÷�ˮ���ݿ���");
    }
    pourInCup(): void {
        console.log("�ѿ��ȵ�������");
    }
    addCondiments(): void {
        console.log("���Ǻ�ţ��");
    }
}

class Tea extends Beverage {
    brew(): void {
        console.log("�÷�ˮ���ݲ�Ҷ");
    }
    pourInCup(): void {
        console.log("�Ѳ赹������");
    }
    addCondiments(): void {
        console.log("������");
    }
}

class Client {
    public static main(): void {
        const coffee: Coffee = new Coffee();
        const tea: Tea = new Tea();
        coffee.makeBeverage();
        tea.makeBeverage();
    }
}
Client.main()

// ��ˮ���
// �÷�ˮ���ݿ���
// �ѿ��ȵ�������
// ���Ǻ�ţ��
// ��ˮ���
// �÷�ˮ���ݲ�Ҷ
// �Ѳ赹������
// ������
