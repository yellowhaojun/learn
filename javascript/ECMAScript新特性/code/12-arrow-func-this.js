// const person = {
//   name: 'jack',
//   sayHi () {
//     console.log(`Hi, ${this.name}`)
//   }
// }
// person.sayHi() // 'Hi, jack'

// const person = {
//   name: 'jack',
//   sayHi: () => {
//     console.log(`Hi, ${this.name}`)
//   }
// }
// person.sayHi() // 'Hi, undefined'


const person = {
  name: 'jack',
  sayHi () {
    setTimeout(() => {
      console.log(`Hi, ${this.name}`)
    })
  }
}
person.sayHi() // 'Hi, jack'
