class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, my name is ${this.name}`)
  }

  static create(name) {
    return new Person(name)
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }
  learn () {
    super.sayHi()
    console.log(`${this.name} love study`)
  }
}

const student = new  Student('jack')
student.learn()