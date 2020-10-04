# Object的方法

## assign

Object.assign是用于复制合并对象

### 复制对象

```js
const target = {
  a: 456,
  c: 456
}

const copy = Object.assign({}, target) // { a: 456, c: 456 }
console.log(copy === target) // false
```

只需要使用一个空对象，和原有的对象进行合并，这种操作相当于把对象复制了，而复制之后的对象和之前的对象是不存在关联的

### 合并对象

```js
const source1 = {
  a: 123,
  b: 123
}

const source2 = {
  b: 789,
  d: 789
}

const target = {
  a: 456,
  c: 456
}

const result = Object.assign(target, source1, source2)
target.a = 8888
console.log(result === target) // true
console.log(target, result) // { a: 8888, c: 456, b: 789, d: 789 } { a: 8888, c: 456, b: 789, d: 789 }
```

把target与source1、source2进行合并，再去修改target.a为8888，会发现result的a值也会跟着改变，从这里可以看出合并对象和原对象之前是存在关联的

## is

我们在使用等于或者全等去对比一些数值的时候可能出现一下和你理解不一样的情况

```js
0 == false              // true
0 === false             // false
+0 === -0               // true
NaN === NaN             // false
undefined == null       // true
undefined === null      // false
undefined === undefined //  true
```

比如说我们使用全等的时候，正0和负0得到结果为true，这明明是一个不想等的两个值，可以使用Object.is得出我们想要的结果

```js
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```