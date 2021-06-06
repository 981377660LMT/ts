class Subject {
    /**
     * �۲����б�
     */
    private observers: Observer[] = [];
    /**
     * ע��۲���
     * @param observer
     */
    public addObserver(observer: Observer): void {
        console.log(observer, "is pushed!");
        this.observers.push(observer);
    }
    /**
     * �Ƴ��۲���
     * @param observer
     */
    public deleteObserver(observer: Observer): void {
        var n: number = this.observers.indexOf(observer);
        console.log(observer, "is removed");
        this.observers.splice(n, 1);
    }
    /**
     * ֪ͨ���й۲���
     */
    public notifyObservers(): void {
        console.log("notify all the observers", this.observers);
        this.observers.forEach(observer => observer.notify());
    }
}

class Observer {
    constructor(private name: string) { }
    notify() {
        console.log(`${this.name} has been notified.`);
    }
}

class Client {
    public static main(): void {
        const subject: Subject = new Subject();
        subject.addObserver(new Observer("semlinker"));
        subject.addObserver(new Observer("lolo"));
        subject.notifyObservers();
    }
}
Client.main()

// Observer { name: 'semlinker' } 'is pushed!'
// Observer { name: 'lolo' } 'is pushed!'
// notify all the observers [ Observer { name: 'semlinker' }, Observer { name: 'lolo' } ]
// semlinker has been notified.
// lolo has been notified.