const obj = { age: 19 }
const name = 'jack'

const { name: objName = 'alex', age, gender = 'man' } = obj

console.log(name, age, gender, objName)