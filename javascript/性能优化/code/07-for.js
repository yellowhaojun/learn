
// var arrList = []
// arrList[10000] = 'icoder'

// for (var i = 0; i < arrList.length; i++) {
//   console.log(arrList[i])
// }

// for (var i = arrList.length; i; i--) {
//   console.log(arrList[i])
// }

var arrList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// for (var i = 0; i < arrList.length; i++) {
//   console.log(arrList[i])
// }

// for (let i = 0, len = arrList.length; i < len; i++) {
//   console.log(arrList[i])
// }

arrList.forEach(function (item) {
  console.log(item)
})

for (var i = arrList.length; i; i--) {
  console.log(arrList[i])
}

for (var i in arrList) {
  console.log(arrList[i])
}