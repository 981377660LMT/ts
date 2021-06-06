// �������˿͵�˺󣬷���Ա���¹˿͵���Ϣ�������ú�㲥֪ͨ�˿���ȡ

// �۲��߻���
class Observer {
    take(msg: string): void { }
}

// Ŀ�����
class Subject {
    set: Set<Observer> = new Set();
    // ע��ص�
    add(observer: Observer): void {
        this.set.add(observer);
    }
    // ע���ص�
    remove(observer: Observer): void {
        this.set.delete(observer);
    }
    // ����������ע��Ļص�
    notify(msg: string): void {
        this.set.forEach(observer => {
            observer.take(msg);
        });
    }
}

// ����Ŀ�꣬����Ա��
class Waiter extends Subject {
    // �������֪ͨ����ע���˵Ĺ˿�
    ready(): void {
        this.notify('ready');
    }
}

// ����۲��ߣ��˿���
class Clienter extends Observer {
    name: string;
    // ��ʼ��ʱ������ע�ᵽĿ�꣬�Ա����֪ͨ
    constructor(name: string, waiter: Waiter) {
        super();
        this.name = name;
        waiter.add(this);
    }
    take(msg: string) {
        console.log(`�˿� ${this.name} �յ�����Ϣ��ʾ״̬��<${msg}>�� ����̨��ȡ�˲�`);
    }
}


class Client {
    public static main(): void {
        const waiter = new Waiter();
        // �˿͵�˺󣬵ȴ�����Ա֪ͨ
        const bob = new Clienter('Bob', waiter);
        const mick = new Clienter('Mick', waiter);
        // ��׼���ú󣬷���Ա�㲥֪ͨ�˿Ϳ��Ե���̨��ȡ��
        waiter.ready();
    }
}
Client.main()

// �˿� Bob �յ�����Ϣ��ʾ״̬��<ready>�� ����̨��ȡ�˲�
// �˿� Mick �յ�����Ϣ��ʾ״̬��<ready>�� ����̨��ȡ�˲�