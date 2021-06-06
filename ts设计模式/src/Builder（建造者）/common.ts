//��Ʒ��ɫ�����������ɲ����ĸ��Ӷ���
class Product {
  private partA: String
  private partB: String
  private partC: String
  public setPartA(partA: String): void {
    this.partA = partA
  }
  public setPartB(partB: String): void {
    this.partB = partB
  }
  public setPartC(partC: String): void {
    this.partC = partC
  }
  public show(): void {
    //��ʾ��Ʒ������
    console.log('��Ʒ�Ĳ����ֱ�Ϊ��', this.partA, this.partB, this.partC)
  }
}
//�������ߣ�����������Ʒ�����Ӳ����ĳ��󷽷���
abstract class Builder {
  //������Ʒ����
  protected product: Product = new Product()
  public abstract buildPartA(): void
  public abstract buildPartB(): void
  public abstract buildPartC(): void
  //���ز�Ʒ����
  public getResult(): Product {
    return this.product
  }
}
//���彨���ߣ�ʵ���˳������߽ӿڡ�
class ConcreteBuilder extends Builder {
  constructor() {
    super()
  }
  public buildPartA(): void {
    this.product.setPartA('partA')
  }
  public buildPartB(): void {
    this.product.setPartB('partB')
  }
  public buildPartC(): void {
    this.product.setPartC('partC')
  }
}
//���彨����1��ʵ���˳������߽ӿڡ�
class ConcreteBuilder1 extends Builder {
  constructor() {
    super()
  }
  public buildPartA(): void {
    this.product.setPartA('partA1')
  }
  public buildPartB(): void {
    this.product.setPartB('partB1')
  }
  public buildPartC(): void {
    this.product.setPartC('partC1')
  }
}
//ָ���ߣ����ý������еķ�����ɸ��Ӷ���Ĵ�����
class Director {
  public static getProduct(builder: Builder) {
    builder.buildPartA()
    builder.buildPartB()
    builder.buildPartC()
    return builder.getResult()
  }
}

//����
class Client {
  public static main(): void {
    const builder0: Builder = new ConcreteBuilder()
    const builder1: Builder = new ConcreteBuilder1()
    //����:������builder0
    // const product: Product = Director.getProduct(builder0)
    //����:������builder1,��������
    const product: Product = Director.getProduct(builder1)
    product.show()
  }
}
Client.main()
