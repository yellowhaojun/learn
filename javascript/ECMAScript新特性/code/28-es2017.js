// const obj = {
//   a: 'somestring',
//   b: 42,
//   c: false,
//   get d () {
//     return 'get name'
//   }
// }

// console.log(Object.values(obj))
// console.log(Object.keys(obj))
// console.log(Object.entries(obj))

// console.log(Object.getOwnPropertyDescriptor(obj))

// const descriptors = Object.getOwnPropertyDescriptors(obj)
// console.log(descriptors)
// console.log(Object.getOwnPropertyDescriptors(obj))

// console.log(Object.getOwnPropertyDescriptors(obj))

// Object.create(
//   Object.getPrototypeOf(obj), 
//   Object.getOwnPropertyDescriptors(obj) 
// )


// const p1 = {
//   firstName: 'Li',
//   lastName: 'Lei',
//   get fullName () {
//     return this.firstName + ' ' + this.lastName
//   }
// }

// const descriptors = Object.getOwnPropertyDescriptors(p1)
// const p2 = Object.defineProperties({}, descriptors)
// console.log(p2) // { firstName: 'Li', lastName: 'Lei', fullName: [Getter] }


const str1 = 'hello'
console.log(str1.padEnd(10, '.')) // hello.....

const str2 = 'hello'
console.log(str2.padStart(10, '.')) // .....hello
