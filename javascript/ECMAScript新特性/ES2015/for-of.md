# for of 

> for of循环ES6提供的新的遍历数组的方法，具备`iterable`类型的集合都可以使用for of循环来遍历

## 使用

### 数组

基本使用

```js
const arr = [1, 2, 3]

for (const item of arr) {
  console.log(item)
}
// 1
// 2
// 3
```

for of和forEach不一样支持break

```js
const arr = [1, 2, 3, 4, 5]

for (const item of arr) {
  console.log(item)
  if (item >= 3 ) {
    break
  }
}

// 1
// 2
// 3
```

如果数组内的值是Object的时候可以使用结构来获取里面的属性

```js
const arr = [{ name: 'jack'}, { name: 'tom'}]

for (const { name } of arr) {
  console.log(name)
}
// 'jack'
// 'tom'
```

### Set

```js
const s = new Set(['foo', 'bar'])
for (const item of s) {
  console.log(item)
}
// 'foo'
// 'bar'
```

### Map

Map一样可以使用结构去获取里面的值

```js
const m = new Map()
m.set('foo', '123')
m.set('bar', '345')

for (const [key, value] of m) {
  console.log(key, value)
}
// foo 123
// bar 345
```

Object

for of不支持普通的Object

```js
const obj = {
  name: 'jack',
  age: 19
}

// error obj is not iterable
for (const item of obj) {
  console.log(item)
}
```

