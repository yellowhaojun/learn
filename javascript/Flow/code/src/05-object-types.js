/**
 * 对象类型
 *
 * @flow
 */

const obj1: { name: string } = { name: 'jack' }

const obj2: { name: string, age?: number } = { name: 'jack' }

const obj3: { [string]: string } = {}
obj3.name = 'jack'