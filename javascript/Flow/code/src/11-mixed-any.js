/**
 * Mixed Any
 *
 * @flow
 */

function testMixed (value: mixed) {
  if (typeof value === 'string') {
    value.substr(1)
  }
}

testMixed(1)

function testAny (value: any) {
  value.substr(1)
}
testAny(1)