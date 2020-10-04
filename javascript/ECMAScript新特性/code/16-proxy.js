const obj = {
  name: 'jack'
}

// ========================= 代理数组 =========================
// const list = []
// const proxy = new Proxy(list, {
//   set (target, property, value) {
//     console.log(target, property, value)
//     return true
//   },

//   get (target, property) {
//     console.log(target, property)
//     return property in target ? target[property] : null
//   }
// })

// proxy.push(10)

// ========================= get =========================

// const proxy =  new Proxy(obj, {
//   get (target, property) {
//     console.log(target, property)
//     return property in target ? target[property] : null
//   }
// })

// console.log(proxy.age)

// ========================= set =========================

// const proxy = new Proxy(obj, {
//   set (target, property, value) {
//     console.log(target, property, value)
//     return true
//   }
// })

// proxy.name = 'tom'