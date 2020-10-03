// if (true) {
//   var foo = 'foo'
// }
// console.log(foo)


// if (true) {
//   let foo = 'foo'
// }
// console.log(foo)

// for (var i = 0; i < 3; i++) {
//   for (var i = 0; i < 3; i++) {
//     console.log(i)
//   }
//   console.log('内层结束 i = ' + i)
// }


// for (var i = 0; i < 3; i++) {
//   for (let i = 0; i < 3; i++) {
//     console.log(i)
//   }
//   console.log('内层结束 i = ' + i)
// }

try{
  undefined()
} catch(err) {
  console.log(err)
}
console.log(err)