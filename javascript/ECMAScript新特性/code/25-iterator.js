// const arr = [1, 2, 3]
// const current = arr[Symbol.iterator]()

// console.log(current.next())
// console.log(current.next())
// console.log(current.next())

const person = {
  hobbies: ['sing', 'programing', 'sports'],
  [Symbol.iterator] () {
    let index = 0
    let hobbies = this.hobbies
    return {
      next () {
        return {
          done: index >= hobbies.length,
          value: hobbies[index++]
        }
      }
    }
  }
}

for (const hobbies of person) {
  console.log(hobbies)
}