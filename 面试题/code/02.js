// console.log('AAAA')
// setTimeout(() => console.log('BBBB'), 1000)
// const start = new Date()
// while (new Date() - start < 3000) { }
// console.log('CCCC')
// setTimeout(() => console.log('DDDD'), 0)
// new Promise((resolve, reject) => {
//   console.log('EEEE')
//   foo.bar(100)
// })
//   .then(() => console.log('FFFF'))
//   .then(() => console.log('GGGG'))
//   .catch(() => console.log('HHHH'))
// console.log('IIII')



async function async1 () {
  console.log('AAAA')
  async2();
  console.log('BBBB')
}
async function async2 () {
  console.log('CCCC')
}
console.log('DDDD');
setTimeout(function () {
  console.log('FFFF')
}, 0);
async1()
new Promise(function (resolve) {
  console.log('GGGG')
  resolve()
}).then(function () {
  console.log('HHHH')
})
console.log('IIII')