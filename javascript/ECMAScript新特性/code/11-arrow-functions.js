// ========================= 基础使用 =========================

// function add(n1, n2) {
//   return n1 + n2
// }

// const add = (n1, n2) => n1 + n2


// const add = (n1, n2) => {
//   console.log(n1, n2)
//   return n1 + n2
// }

// const arrow = (n1) => ({ name: n1 })

// console.log(arrow('jack'))

// ========================= 无法new =========================

// const add = (n1, n2) => n1 + n2
// console.log(new add1()) // error

// ========================= 不绑定arguments =========================

// function count(n) {
//   const f = () => arguments[0] + n
//   return f()
// }

// console.log(count(0))
// console.log(count(10))

// ========================= 不绑定this =========================