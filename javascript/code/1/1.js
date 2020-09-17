console.log(1)

setTimeout(() => {
  console.log(2)
}, 0)

new Promise((resolve, reject) => {
  console.log(3)
  setTimeout(() => {
    console.log(4)
    resolve(5)
  }, 0)
}).then((num) => {
  console.log(num)
})