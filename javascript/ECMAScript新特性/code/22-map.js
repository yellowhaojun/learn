// const map = new Map([['name', 'jack'], ['name', 'tom']])
// console.log(map)

const map = new Map([])

const tom = { name: 'tom' }
const names = ['jack', 'tom']

// 使用数字作为key值
map.set(1, 0)

// 使用Object作为key值
map.set(tom, 1)

// 使用数组作为key值
map.set(names, 2)

// 使用null作为key值
map.set(null, 3)


// 使用undefined作为key值
map.set(undefined, 4)

// 使用forEach遍历
map.forEach((item) => {
  console.log(item)
})

// 使用for of遍历
for (const values of map) {
  console.log(values)
}

for (const [key, value] of map) {
  console.log(key, value)
}


// map.clear()
// console.log(map) // Map {}

// console.log(map.delete(null)) // true

// console.log(map.has(undefined)) // true

// console.log(map.get(null)) // 3