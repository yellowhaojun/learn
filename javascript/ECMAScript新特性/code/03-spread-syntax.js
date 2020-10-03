// ========================= 数组当中 =========================
// const arr = [1, 2, 3]
// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]
// console.log(foo, bar, baz)
// console.log.apply(console, arr)

// ========================= 参数当中 =========================
// var arr = [1, 2, 3]
// function myConsole (...args) {
//   console.log.apply(console, args)
// }
// myConsole(arr)

// ========================= 调用当中 =========================

// var arr = [1, 2, 3]
// function myConsole (...args) {
//   console.log.apply(console, ...args)
// }

// myConsole(arr)

// ========================= 对象合并当中 =========================
// const obj1 = { name: 'alex' }
// const obj2 = { name: 'jack', age: 18 }
// const obj3 = { ...obj1, ...obj2 }
// console.log(obj3)

