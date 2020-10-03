// ========================= 基础使用 =========================

// if (true) {
//   var foo = 'foo'
// }
// console.log(foo)


// if (true) {
//   let foo = 'foo'
// }
// console.log(foo)

// ========================= 变量提升 =========================
// console.log(foo)
// let foo = 'foo'

// ========================= 内层覆盖外层的变量 =========================

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

// ========================= 循环绑定事件，事件处理函数中获取正确索引 =========================

// var elements = [{}, {}, {}]
// for (var i = 0; i < elements.length; i++) {
//   elements[i].onclick = function () {
//     console.log(i)
//   }
// }

// elements[1].onclick()

// var elements = [{}, {}, {}]
// for (var i = 0; i < elements.length; i++) {
//   elements[i].onclick = (function (i) {
//     return function() {
//       console.log(i)
//     }
//   })(i)
// }

// elements[1].onclick()


// var elements = [{}, {}, {}]
// for (var i = 0; i < elements.length; i++) {
//   elements[i].onclick = function () {
//     console.log(i)
//   }
// }

// elements[1].onclick()



// ========================= 隐性的块级作用域 =========================
// try {
//   undefined()
// } catch (err) {
//   console.log(err)
// }
// console.log(err)

