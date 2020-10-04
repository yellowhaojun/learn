# Symbol

> Symbol 属于ES6提供的一种新的数据类型，表示独一无二的

## 作用

> Symbol的作用非常简单，就是让作为对象属性的唯一标识符，防止对象属性的冲突

每个Symbol都是独一无二的，永远都不会想等

```js
console.log(Symbol() === Symbol()) // false
```

## 定义

Symbol无需new关键字进行创建，直接使用Symbol() 创建，括号内可以输入Symbol的描述文本

```js
// 基础定义
Symbol('foo')
Symbol('bar')
Symbol('baz')

// 创建到Object当中，使用计算属性定义
const obj = {
  [Symbol('name')]: 'jack'
}

console.log(obj) // { [Symbol(name)]: 'jack' }

// 为了方便获取把定义Symbol定义为存到一个变量当中
const name = Symbol('name')

const obj = {
  [name]: 'jack'
}

console.log(obj[name]) // jack
```

## 内置属性

### for

Symbol.for 定义Symbol的描述是一致的时候不会重新创建而是返回之前的Symbol，Symbol.for创建的Symbol会登记在全局的注册表当中

```js
console.log(Symbol.for('name') === Symbol.for('name')) // true
```

因为Symbol的描述说明是需要String类型的，加入传入的不是String类型，会隐性地转换成String类型

```js
console.log(Symbol.for(true) === Symbol.for('true')) // true
```

### keyFor

返回一个已经登记了Symbol

```js
const foo = Symbol.for('foo')
const bar = Symbol('bar')

console.log(Symbol.keyFor(foo)) // foo
console.log(Symbol.keyFor(bar)) // undefined
```

### instanceof

指向内部的instanceof方法

```js
const obj = {
  [Symbol.hasInstance] (arr) {
    return arr instanceof Array
  }
}

console.log([1, 2, 3] instanceof obj) // true
```

### toStringTag

指向内部的toString的方法

```js
const obj = {
  [Symbol.toStringTag]: 'XObject'
}

console.log(obj.toString()) // [object XObject]
```

## 特性

### 唯一

即使是描述说明一样的Symbol也不相等

```js
console.log(Symbol('foo') === Symbol('foo'))
```

### 对象无法遍历出Symbol的key

Symbol可以用于模拟私有属性，遍历obj的时候，不会把Symbol的值输出，使用JSON.stringify也会忽略

```js
const name = Symbol('name')
const obj = {
  [name]: 'jack',
  age: 18
}

for (let key in obj) {
  console.log(key)
}

console.log(JSON.stringify(obj)) // {"age":18}
```

