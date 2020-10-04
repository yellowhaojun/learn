// const set = new Set([1, 2, 2, 3])
// console.log(set)


// const obj = {
//   a: 1
// }
// const set = new Set([1, 2, 2, 3, obj, obj])
// console.log(set)


// const set = new Set([1, 2, 2, 3, { a : 1 }, { a: 1 }])
// console.log(set)


// const set = new Set([1, 2, 2, 3, null, null])
// console.log(set)

// const set = new Set([1, 2, 2, 3, NaN, NaN])
// console.log(set)


// const set = new Set([1, 2, 2, 3, undefined, undefined])
// console.log(set)

// const obj = {
//   a: 1
// }
// const set = new Set([1, 1, 2, 3, '3', '3', obj, obj, { b: 1 }, { b: 1 }, undefined, undefined, NaN, NaN, null, null])
// console.log(set)


const set = new Set()

set.add(1).add(1)

console.log(set)