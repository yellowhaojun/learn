// 接口

// interface Obj {
//   name: string
//   age: number
// }

// const obj: Obj = {
//   name: 'jack'
//   age: 19
// }


// interface Obj {
//   name: string
//   age?: number
// }

// const obj: Obj = {
//   name: 'jack'
// }

// interface Obj {
//   readonly name: string
//   age: number
// }

// const obj: Obj = {
//   name: 'jack',
//   age: 19
// }

// obj.name = 'tom'


// interface Cache {
//   [prop: string]: string
// }

// const cache: Cache = {}

// cache.value = 'value1'

// interface Add{
//   (n1: number, n2: number): number
// }

// const add: Add = (n1, n2) => n1 + n2

// add(1, 2)

interface Attr1 {
  age: number
}

interface Attr2 {
  name: string
}

interface Person extends Attr1, Attr2 {
  gender: string
}

const person1: Person = {
  name: 'jack',
  age: 18,
  gender: 'man'
}




export {}