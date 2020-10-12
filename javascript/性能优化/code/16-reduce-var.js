// const arr3 = () => {
//   let a = 1
//   let b = 3
//   let c = 4;
//   console.log(a + b + c)
// }

// const test = (ele) => {
//   let w = ele.width
//   let h = ele.height
//   return w * h
// }

const test = (ele) => {
  return ele.width * ele.height
}


console.log(test({
  width: 100,
  height: 100
}))