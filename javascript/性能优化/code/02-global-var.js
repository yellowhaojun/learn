// before
// var i, str = ''
// for (i = 0; i < 1000; i++) {
//   str += i
//   console.log(str)
// }

// after
// function fn() {
//   let str = ''
//   for (let i = 0; i < 1000; i++) {
//     str += i
//     console.log(str)
//   }
// }

// fn()