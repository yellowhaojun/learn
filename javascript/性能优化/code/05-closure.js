
// function test(func) {
//   console.log(func())
// }

// function test2() {
//   var name = 'lg'
//   return name
// }

// test(function() {
//   var name = 'lg'
//   return name
// })

function readData() {
  const buf = Buffer.alloc(1024 * 100)
  let index = 0
  buf.fill('g')  

  return function() {
    index++
    if (index < buf.length) { 
      return buf[index-1]   
    } else {
      buf = null
      return ''
    } 
  }
}

const data = readData()
let next = data()

while (next !== '') {
  console.log(next)
  next = data()
}