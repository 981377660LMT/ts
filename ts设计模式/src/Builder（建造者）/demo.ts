//����2̨����һ̨�Ǳ����ܡ��������ӡ������������������һ̨�Ǳ����ܡ��������ӡ��������������

//������
class Car {
    private carBody: String
    private wheel: String
    private engine: String
    public setCarBody(carBody: String): void {
        this.carBody = carBody
    }
    public setWheel(wheel: String): void {
        this.wheel = wheel
    }
    public setEngine(engine: String): void {
        this.engine = engine
    }
    public show(): void {
        //��ʾ��Ʒ������
        console.log('��������ɷֱ�Ϊ��', this.carBody, this.wheel, this.engine)
    }
}

abstract class Builder {
    protected car: Car = new Car()
    public abstract buildCarBody(): void
    public abstract buildWheel(): void
    public abstract buildEngine(): void
    public getResult(): Car {
        return this.car
    }
}
//����1�Ľ�����
class ConcreteBuilder extends Builder {
    constructor() {
        super()
    }
    public buildCarBody(): void {
        this.car.setCarBody("BMWCarBody")
    }
    public buildWheel(): void {
        this.car.setWheel("BMWWheel")
    }
    public buildEngine(): void {
        this.car.setEngine("BMWEngine")
    }
}
//����2�Ľ�����
class ConcreteBuilder1 extends Builder {
    constructor() {
        super()
    }
    public buildCarBody(): void {
        this.car.setCarBody("BMWCarBody")
    }
    public buildWheel(): void {
        this.car.setWheel("BMWWheel")
    }
    public buildEngine(): void {
        this.car.setEngine("BenzEngine")
    }
}
class Director {
    public static getProduct(builder: Builder) {
        builder.buildCarBody()
        builder.buildWheel()
        builder.buildEngine()
        return builder.getResult()
    }
}

//����
class Client {
    public static main(): void {
        //��һ̨����:������builder
        const builder: Builder = new ConcreteBuilder()
        const car: Car = Director.getProduct(builder)
        car.show()
        //�ڶ�̨����:������builder1,��������
        const builder1: Builder = new ConcreteBuilder1()
        const car1: Car = Director.getProduct(builder1)
        car1.show()
    }
}
Client.main()

//С�᣺�봴��һ�������ܡ��µϳ��֡����������������Ҳֻ��Ҫ�½�һ���������࣬���Ͽ���ԭ��