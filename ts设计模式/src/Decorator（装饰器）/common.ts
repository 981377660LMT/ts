//������JS���﷨����ʵ����װ�������᰸��������װ������ʵ�ֱ�÷ǳ���
@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable // true

//��������У�@testable����һ�������������޸���MyTestableClass��������Ϊ��Ϊ�������˾�̬����isTestable��testable�����Ĳ���target��MyTestableClass�౾��

//�����ϣ�����������Ϊ��������������
@decorator
class A {}
// ��ͬ��
class A {}
A = decorator(A) || A;

