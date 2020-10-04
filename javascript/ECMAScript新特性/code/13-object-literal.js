const bar = '345'

const obj = {
  foo: 123,
  bar,
  fn1 () {
    return this.foo
  },
  [1+2] () {
    return bar
  }
}

console.log(obj)