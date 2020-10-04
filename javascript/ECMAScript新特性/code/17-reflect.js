const obj = {
  name: 'tom',
  age: 18
}

console.log(Reflect.has(obj, 'gender'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(obj)