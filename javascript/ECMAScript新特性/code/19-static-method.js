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

const person = Person.create('jack')
person.sayHi() // Hi, my name is jack