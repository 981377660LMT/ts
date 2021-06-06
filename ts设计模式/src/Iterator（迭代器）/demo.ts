interface Aggregate {
    iterator(): Iterater;
}
interface Iterater {
    hasNext(): boolean;
    next(): Object;
}
class Book {
    private name: string;
    constructor(n: string) {
        this.name = n;
    }
    public getName(): string {
        return this.name;
    }
}
class BookShelf implements Aggregate {
    private books: Book[] = [];
    private count: number;
    constructor() {
        this.count = 0;
    }
    public getBook(index: number): Book { //ȡ���ı���
        return this.books[index];
    }
    public appendBook(book: Book): void { //���ӕ�
        this.books.push(book);
        this.count++;
    }
    public getLength(): number { //ȡ�Õ���Ŀǰ���ٕ�
        return this.count;
    }
    public iterator(): Iterater { //ȡ�Ì��L���� �����Լ�����Iterator�Ȯa��һ��v����
        return new BookShelfIterator(this);
    }

}
class BookShelfIterator implements Iterater {
    private bookshelf: BookShelf;
    private index: number;
    constructor(bshelf: BookShelf) { //�ѕ��ܷ��M��
        this.bookshelf = bshelf;
        this.index = 0; //Ŀǰλ����0
    }
    public hasNext(): boolean { //�Ƿ�����һ�������ɬF��λ�ÁK�_�������ǲ��������N���� ����F��λ��9 �ҕ�Ҳֻ��9���������ѽ��]����һ����
        if (this.index < this.bookshelf.getLength()) {
            return true;
        } else {
            return false;
        }
    }
    //ȡ����һ�������ҕ�͸�^ԓ����
    public next(): Object {
        let book: Book = this.bookshelf.getBook(this.index);
        this.index++;
        return book;
    }

}

class Client {
    public static main(): void {
        let bookshelf: BookShelf = new BookShelf();
        bookshelf.appendBook(new Book('A Book'));
        bookshelf.appendBook(new Book('B Book'));
        bookshelf.appendBook(new Book('C Book'));
        let it: Iterater = bookshelf.iterator();
        while (it.hasNext()) {
            console.log((<Book>it.next()).getName());
        }
    }
}
Client.main()

// A Book
// B Book
// C Book