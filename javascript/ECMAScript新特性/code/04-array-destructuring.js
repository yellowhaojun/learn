// ========================= 数组结构 =========================

// const arr = [1, 2, 3]

// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]

// const [foo, bar, baz] = arr
// console.log(foo, bar, baz)

// const [, , baz] = arr
// console.log(baz)


const arr = [1, 2]
const [, , baz = 4] = arr
console.log(baz)