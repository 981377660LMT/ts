
//�쵼���Ҫʵ��һ����Ʒ���ܣ����ֲ����˽����е�ϸ�ڡ�

// ����
class Idea { };
// ����
class Requirement { };
// ������
class Development { };
// ������
class Release { };

// ��Ʒ����
class PD {
    analyze(idea: Idea) {
        console.log('PD ��ʼ����');
        return new Requirement();
    }
}
// ������
class Developer {
    develop(requirement: Requirement) {
        console.log('����Ա��ʼ����');
        return new Development();
    }
}
// ������
class Tester {
    test(develop: Development) {
        return new Release();
    }
}
// ���ģʽ���쵼����Ҫ��ע����Ŀ������̣�ֻҪ˵���Լ����뷨����
// ��������۷����Ļ���Ҳ���Է��ʵ���ϵͳ��ֻ����Ҫ�˽����е�ϸ��
class Facade {
    public addNewFunction(idea: Idea): void {
        const pd = new PD();
        const developer = new Developer();
        const tester = new Tester();
        const requirement = pd.analyze(idea);
        const development = developer.develop(requirement);
        const release = tester.test(development);
        console.log('����');
    }
}

// �쵼
class Leader {
    haveAGoodIdea() {
        const idea = new Idea();
        new Facade().addNewFunction(idea);
    }
}


class Client {
    public static main(): void {
        const leader = new Leader();
        leader.haveAGoodIdea();
    }
}
Client.main()