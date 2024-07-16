type MyString = string & {
  _myStringTag: any
}

function testMyString(s: MyString): void {
  console.log(s)
}

const myString: MyString = 'myString' as MyString

testMyString(myString) // OK
testMyString('') // Error

export {}
