interface Strategy {
    Operation(): void; //��������ķ���
    getName(): string; //������������
}

//���ܷ���
class NuclearPower implements Strategy {
    Operation(): void {
        console.log("Ohhh!! �ÿ���Ŷ");
        console.log("Power Coming!!");
    }
    getName(): string {
        return 'NuclearPower';
    }
}
//ˮ����
class WaterPower implements Strategy {
    Operation(): void {
        console.log("Waiting..."); //����
        console.log("Waiting..."); //ȱˮ
        console.log("Waiting..."); //��ֻ�ܷ���ô�� ��Ҫ��
        console.log("Power Coming!!"); //���
    }
    getName(): string {
        return 'WaterPower';
    }
}
//�𷢵�
class FirePower implements Strategy {
    Operation(): void {
        console.log("Ohhh!! Ǭ�Q��ú"); //�e���ģ��ɾ���ú
        console.log("A lot of Smoke!!"); //������
        console.log("Power Coming!!");  //���
    }
    getName(): string {
        return 'FirePower';
    }
}

class Battery {
    private strategy: Strategy; //������
    setPowerStrategy(str: Strategy) {
        this.strategy = str; //�O��������
    }
    charge(): void {
        console.log('Use: ' + this.strategy.getName() + ' Charging...'); //������ʲô����
        this.strategy.Operation(); //����
    }
    discharge(): void {
        console.log('Discharging...');
    }
}

class Client {
    public static main(): void {
        let gogorobattery: Battery = new Battery(); //����һ���

        gogorobattery.setPowerStrategy(new FirePower()); //���ĵ�س�緽��
        gogorobattery.charge(); //���س�翩
        gogorobattery.discharge(); //�ĵ�صĵ�
        console.log('�]���� ��ȥ���');

        gogorobattery.setPowerStrategy(new NuclearPower());
        gogorobattery.charge();
        gogorobattery.discharge();
        console.log('�]���� ��ȥ���');

        gogorobattery.setPowerStrategy(new WaterPower());
        gogorobattery.charge();
        gogorobattery.discharge();
    }
}
Client.main()

// Use: FirePower Charging...
// Ohhh!! Ǭ�Q��ú
// A lot of Smoke!!
// Power Coming!!
// Discharging...
// �]���� ��ȥ���
// Use: NuclearPower Charging...
// Ohhh!! �ÿ���Ŷ
// Power Coming!!
// Discharging...
// �]���� ��ȥ���
// Use: WaterPower Charging...
// Waiting...
// Waiting...
// Waiting...
// Power Coming!!
// Discharging...