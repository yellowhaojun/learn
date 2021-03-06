# Set

> Set 可以理解为这是一个唯一值的集合，和数组不一样的，数组当中是允许存在相同的值，而set当地是不允许存在相同的值

## new Set 定义Set

定义一个set的集合，使用new Set来定义

```js
const obj = {
  a: 1
}
const set = new Set([1, 1, 2, 3, '3', '3', obj, obj, { b: 1 }, { b: 1 }, undefined, undefined, NaN, NaN, null, null])

console.log(set) 

/*
Set {
  1,
  2,
  3,
  '3',
  { a: 1 },
  { b: 1 },
  { b: 1 },
  undefined,
  NaN,
  null
}
*/
```

从上面我们可以看出，我们初始化时候相同值，set会自动的过滤掉，类似于null，undefined，NaN这些值都必须是唯一的一个

## add 新增字段

add 关键字用于新增字段

```js
const set = new Set()

set.add(1).add(1)

console.log(set) // Set { 1 }
```

使用add关键字新增字段，可以使用链式的调用，加入add的值相同，也会被过滤掉

## has 是否具备某个某个值

has 关键字用于查找当前是否具有那个字段

```js
const set = new Set()

set.add(1)

console.log(set.has(1)) // true
```

## size 查看Set的长度

size 关键字用于查看Set的长度

```js
const set = new Set()
set.add(1).add(2)
console.log(set.size) // 2
```

## delete 删除某个字段

delete 关键字用于删除某个字段

```js
const set = new Set()
set.add(1).add(2)
set.delete(1)
console.log(set) // Set { 2 }
```

## clear 清空队列

clear 关键字用于清空Set

```js
const set = new Set()
set.add(1).add(2)
set.clear()
console.log(set) // Set {}
```

## 遍历

在使用Set的时候，可以遍历这个Set

```js
const set = new Set()
set.add(1).add(2)

// 使用forEach遍历
set.forEach(item => {
  console.log(item)
})

// 使用for of遍历
for (const value of set) {
  console.log(value)
}
```

## 使用场景

### 数组去重

数组的去重是set的一个典型的应用场景

```js
// 使用展开语法
const arr = [1, 3, 4, 5, 1, 2, 3]
const set = [ ...new Set(arr) ]
console.log(set) // [ 1, 3, 4, 5, 2 ]

// 使用Array.from
const arr = [1, 3, 4, 5, 1, 2, 3]
const set = Array.from(new Set(arr))
console.log(set) // [ 1, 3, 4, 5, 2 ]
```

