//�ڿ����У�һ���������Ǿ�������������Ҫ��ĳ�������ӷ���������������Լ���ģ�����Ĵ������߰��㣬���ǵ�Ȼ�����޸������Ĵ��롣�����������װ����

//����д��ս������
@addMissileFire
class Fighter {
    public doSomething() {

    }
}
//�������ս�������ӷ��䵼���Ĺ���
function addMissileFire(target) {
    target.missileFire = () => { console.log('���䵼��') }
}
//����
class Client {
    public static main() {
        Fighter.missileFire()
    }
}
Client.main()//���䵼��