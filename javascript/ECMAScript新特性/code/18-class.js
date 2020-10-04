// ========================= ES5 =========================

// function Person(name) {
//   this.name = name
// }

// Person.prototype.sayHi = function() {
//   console.log(`Hi, my name is ${this.name}`)
// }

// const person = new Person('jack')
// person.sayHi() // Hi, my name is jack


// ========================= ES6 =========================
class Person {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    console.log(`Hi, my name is ${this.name}`)
  }
}


const person = new Person('jack')
person.sayHi() // Hi, my name is jack