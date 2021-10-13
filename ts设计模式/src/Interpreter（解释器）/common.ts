// ������ģʽ����������Ҫ��ɫ:
// 1���������ʽ��Abstract Expression����ɫ������������Ľӿڣ�Լ���������Ľ��Ͳ�������Ҫ�������ͷ��� interpret()��
// 2���ս������ʽ��Terminal    Expression����ɫ���ǳ������ʽ�����࣬����ʵ���ķ������ս����صĲ������ķ��е�ÿһ���ս������һ�������ս����ʽ��֮���Ӧ��
// 3�����ս������ʽ��Nonterminal Expression����ɫ��Ҳ�ǳ������ʽ�����࣬����ʵ���ķ�������ս����صĲ������ķ��е�ÿ�����򶼶�Ӧ��һ�����ս������ʽ��
// 4��������Context����ɫ��ͨ������������������Ҫ�����ݻ��ǹ����Ĺ��ܣ�һ���������ݱ����н��������������ݣ�����Ľ��������Դ������ȡ��Щֵ��
// 5���ͻ��ˣ�Client������Ҫ�����ǽ���Ҫ�����ľ��ӻ����ʽת����ʹ�ý��������������ĳ����﷨����Ȼ����ý������Ľ��ͷ�������ȻҲ����ͨ��������ɫ��ӷ��ʽ������Ľ��ͷ�����

//�������ʽ��
interface AbstractExpression {
  interpret(info: string): void //���ͷ���
}
//�ս������ʽ��
class TerminalExpression implements AbstractExpression {
  public interpret(info: string): void {
    //���ս������ʽ�Ĵ���
  }
}
//���ս������ʽ��
class NonterminalExpression implements AbstractExpression {
  private exp1: AbstractExpression
  private exp2: AbstractExpression
  public interpret(info: string): void {
    //�Ƕ��ս������ʽ�Ĵ���
  }
}
//������
class Context {
  private exp: AbstractExpression
  public constructor() {
    //���ݳ�ʼ��
  }
  public operation(info: string): void {
    //������ر���ʽ��Ľ��ͷ���
  }
}
//�ͻ���
class Client {
  public static main(): void {}
}
Client.main()

export {}
