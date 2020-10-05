/**
 * 类型推断
 *
 * @flow
 */

function square (n) {
  return n * n
}

// square('100') // error

square(100) // success