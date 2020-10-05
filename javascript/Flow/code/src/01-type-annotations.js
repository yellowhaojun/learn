/**
 * 类型注解
 * 
 * @flow
 */
function square (n: number) {
  return n * n
}

// square('100') // error

let num: number = 100
// num = '100' // error

function foo(): number {
  return 100
}
