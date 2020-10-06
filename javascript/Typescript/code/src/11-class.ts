// 类

// class Person {
//   name = 'jack'
//   getName() {
//       return this.name
//   }
// }

// class Teacher extends Person {
//   getTeachName () {
//       return 'Teacher'
//   }
// }

// const teacher = new Teacher()
// console.log(teacher.getName()) // 'jack'


// class Person {
//   public name: string = 'jack'
//   public sayHi () {
//       console.log(this.name)
//   }
// }

// const person = new Person()
// person.name = 'tom'
// person.sayHi() // tom


// class Person {
//   protected name: string = 'jack'
//   public sayHi () {
//       console.log(this.name)
//   }
// }

// class Teacher extends Person {
//    public sayBye () {
//        console.log(this.name)
//    }
// }

// const teacher = new Teacher()
// teacher.sayBye() // jack


// class Person {
//   constructor (private _name: string) {}
//   get name () {
//       return `${this._name}_jack`
//   }
// }

// const person = new Person('jack')
// console.log(person.name) // 'jack_jack'


class Person {
  constructor (private _name: string) {}
  get name () {
      return `${this._name}_jack`
  }
  set name (name: string) {
      this._name = name
  }
}

const person = new Person('jack')
person.name = 'tom'
console.log(person.name) // tom_jack