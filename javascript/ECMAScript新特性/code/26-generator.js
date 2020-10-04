function * sayHello() {
  yield 'hello'
  yield 'world'
}

const gen = sayHello()

console.log(gen.next()) // { value: 'hello', done: true }
console.log(gen.next()) // { value: 'world', done: true }