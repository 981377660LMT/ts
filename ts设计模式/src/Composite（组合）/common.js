//ɨ���ļ��У��ļ��к��ļ�֮��Ĺ�ϵ���ǳ��ʺ������ģʽ���������ļ�����ȿ��԰����ļ����ֿ��԰��������ļ��У����տ�����ϳ�һ������

    //Folder��
    var Folder = function (name) {
        this.name = name;
        this.files = [];
    };
    Folder.prototype.add = function (file) {
        this.files.push(file);
    };
    Folder.prototype.scan = function () {
        console.log('��ʼɨ���ļ��У�' + this.name);
        for (var i = 0, file; file = this.files[i++];) {
            file.scan();
        };
    };

    //File��
    var File = function (name) {
        this.name = name;
    };
    File.prototype.add = function () {
        throw new Error('�ļ����治��������ļ�');
    };
    File.prototype.scan = function () {
        console.log('��ʼɨ���ļ���' + this.name);
    };

    //����3���ļ���
    var folder = new Folder('ѧϰ����');
    var folder1 = new Folder('JavaScript');
    var folder2 = new Folder('JQuery');

    //����3���ļ�
    var file1 = new File('JavaScript���ģʽ�뿪��ʵ��');
    var file2 = new File('������JQuery');
    var file3 = new File('�������');

    //���ļ���ӵ��ļ��л��ļ�����ӵ���һ�ļ�����
    folder1.add(file1);
    folder2.add(file2);

    folder.add(folder1);
    folder.add(folder2);
    folder.add(file3);

    //ɨ���ļ���
    folder.scan();