// console.log(Symbol() === Symbol()) // false

// console.log(Symbol('foo') === Symbol('foo'))

// Symbol('baz')

// const foo = Symbol.for('foo')
// const bar = Symbol('bar')

// console.log(Symbol.keyFor(foo)) // foo
// console.log(Symbol.keyFor(bar)) // undefined

// const name = Symbol('name')

// const obj = {
//   [name]: 'jack',
//   age: 18
// }

// for (let key in obj) {
//   console.log(key)
// }

// console.log(JSON.stringify(obj))

// console.log(Symbol.for(true) === Symbol.for('true')) // true

// console.log(Symbol.for('name') === Symbol.for('name'))

// console.log(Symbol.iterator)

// console.log(Symbol.hasInstance)

// const obj = {
//   [Symbol.hasInstance] (arr) {
//     return arr instanceof Array
//   }
// }

// console.log([1, 2, 3] instanceof obj) // true

const obj = {
  [Symbol.toStringTag]: 'XObject'
}

console.log(obj.toString()) // [object XObject]