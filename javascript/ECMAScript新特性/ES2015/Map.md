# Map

> Map与Object很类似，但是在Object当中我们只能使用String类型作为key的值，而Map能够使用各种类型做为key的值

## new Map定义

Map 初始化的时候需要一个空数组或者传入一个二唯数组

```js
const map = new Map([['name', 'jack']])
console.log(map) // Map { 'name' => 'jack' }
```

假如而为数组当中的key值重复了，后面的会覆盖前面
```js
const map = new Map([['name', 'jack'], ['name', 'tom']])
console.log(map) // Map { 'name' => 'tom' }
```

## set 设置新的值

set关键字用于设置map的值，传入两个参数：key、value， key的值支持各种数据类型

```js
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


console.log(map)
/*
  Map {
    1 => 0,
    { name: 'tom' } => 1,
    [ 'jack', 'tom' ] => 2,
    null => 3,
    undefined => 4
  }
*/
```

## get 获取Map的值

get关键字用于获取Map中的值

```js
const map = new Map([])
const tom = { name: 'tom' }
const names = ['jack', 'tom']

map.set(1, 0)
map.set(tom, 1)
map.set(names, 2)
map.set(null, 3)
map.set(undefined, 4)

console.log(map.get(null)) // 3
```

## has 是否具有某个值

has关键字用于获取是否具有某个值

```js
const map = new Map([])
const tom = { name: 'tom' }
const names = ['jack', 'tom']

map.set(1, 0)
map.set(tom, 1)
map.set(names, 2)
map.set(null, 3)
map.set(undefined, 4)

console.log(map.has(undefined)) // true
```

## delete 删除某个值

delete用于删除Map中的某个值

```js
const map = new Map([])
const tom = { name: 'tom' }
const names = ['jack', 'tom']

map.set(1, 0)
map.set(tom, 1)
map.set(names, 2)
map.set(null, 3)
map.set(undefined, 4)

console.log(map.delete(null)) // true
```

## clear 清空Map

clear 用于清空Map内的所有的值

```js
const map = new Map([])
const tom = { name: 'tom' }
const names = ['jack', 'tom']

map.set(1, 0)
map.set(tom, 1)
map.set(names, 2)
map.set(null, 3)
map.set(undefined, 4)

map.clear()
console.log(map) // Map {}
```

## 遍历

在使用Map的时候，可以遍历这个Map

```js
// 使用forEach遍历
map.forEach((item) => {
  console.log(item)
})

// 使用for of遍历
for (const values of map) {
  console.log(values)
}

// 通过for of可以遍历得到key和value的值
for (const [key, value] of map) {
  console.log(key, value)
}
```

