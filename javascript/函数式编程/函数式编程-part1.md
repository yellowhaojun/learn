# 函数式编程

> 函数式编程是一种编程的范式之一，常用编程范式还有面向过程、面向对象

## 什么是函数式编程？

> 函数式编程： 把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程的抽象）

> 简单的地来说是要把运算的过程写成一系列的函数进行调用嵌套合并成函数

> 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系（公式），例如:y = sin(x)，x和y的关系

例子：

假设我们需要计算一个数组内的平均数，我们可以拆分为两部：

1. 计算这个数组内的总和
2. 计算平均的数

例子:

使用面向过程可能会这么写：

```js
const arr = [1, 2, 3]

const sum = arr.reduce((res, current) => res + current)

const average = sum / arr.length
```

使用函数式是这样子的

```js
// 计算传入数组的和
function sum(arr) {
  return arr.reduce((res, current) => res + current)
}

// 计算两数相除
function except(n1, n2) {
  return n1 / n2
}

const average = except(sum([1, 2, 3]), arr.length)
```

这就是函数式编程，要求把计算过程编写成函数

## 函数是"一等公民"

> 函数是“一等公民”，这里的“一等公民”指的就是把函数当作和其他的对象样对待，因为函数本身其实也是一个普通的对象（使用new关键字实例化）

函数可以像其他的基础类型一样，具备一下的特性

1. 函数可以存储在变量中
2. 函数作为参数
3. 函数作为返回值

### 函数可以存储在变量中

函数可以存储在变量中就是我们日常使用一个变量定义为function

例子:

```js
// 定义一个fn去接收一个函数
const fn = function() {
  console.log(1)
}

// 函数保存到对象中
const person = {
  fn () {
    console.log(123)
  }
}
person.fn()
```

### 函数作为参数

回调函数（callback）是JavaScript异步编程的基础，其实就是把函数作为函数参数

例子:

其实日常经常使用定时器就是使用了函数作为参数

```js
setTimeout(() => {
  console.log('Hello First-class Function')
}, 1000)
```

除了setTimeout外，类似于fitter其实也有应用了这种方式

```js
const arr = [1, 2, 3]

arr.filter((item) => item % 2 === 0)
```

### 函数作为返回值

例子:

假设我们需要一个函数去检测一个数字是否符合某个条件，我们可能需要传入两个参数，min 和 age

```js
function checkAge (min, age) {
  return age >= min
}
```

假设我们要重复调用多次这个函数

```js
checkAge(18, 29)
checkAge(18, 30)
```

第一个参数我们需要多次重复传入，我们可以通过返回一个新的函数，去固定18这个参数

```js
function checkAge (min) {
  return function (age) {
    return age >= min
  }
}

const checkAge18 = checkAge(18)

checkAge18(29)
checkAge18(30)
```

## 高阶函数

### 定义

> 高阶函数需要满足以下两个条件之一，才能被被称为高阶函数

1. 可以把函数作为参数传递给另一个函数
2. 可以把函数作为另一个函数的返回结果

例子:

Javascript 内置的高阶函数

```js
// 函数作为参数

const arr = [1, 2, 3]
arr.reduce((res, current) => res + current)

// 函数作为返回值
function fn () {
  console.log(123)
}

const fn1 = fn.bind(this)
fn1()
```

当然不止以上这些，还有很多的内置的方法也属于高阶函数，比如说 forEach、fitter 等等

自己偏写的高阶函数

```js
// 函数作为参数
function every(arr, fn) {
  let result = true
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result = false
      break
    }
  }
  return result
}

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];
const r = every(array1, isBelowThreshold)

// 函数作为返回值
function checkAge(min) {
  return function (age) {
    return age >= min
  }
}

const checkAage18 = checkAge(18)
```

## 纯函数

### 定义

> 纯函数需要满足以下的条件

1. 相同输入总是会返回相同的输出
2. 不产生“副作用”
3. 不依赖于外部状态


#### 相同的输入总是会返回相同的输出

> 相同的输入总是会返回相同的输出就是表示无论调用多少次，你只要传入的参数是相同的都会得到相同的结果

例子:

当前这个add函数传入1和2无论调用多少次都会返回3

```js
function add (n1, n2) {
  return n1 + n2
}

add(1, 2) // => 3
add(1, 2) // => 3
```

即使是相同的输入，但是不是相同的输出，也不是纯函数

```js
function getRandom(x){
  return Math.floor(Math.random() * x)
}

getRandom(40)
getRandom(40)
```

#### 不产生“副作用”

> 纯函数不产生任何可观察的副作用

> 纯函数副作用指得是当调用函数时候，除了返回函数值之外，对主调用函数产生得影响

例子:

```js
const arr = ['a','b','c','d']

function removeItem(arr, index) {
  arr.splice(1, index)
  return arr
}

// 影响到了外层arr数组，产生了副作用
const arr1 = removeItem(arr, 1)
console.log(arr1, arr)
```

```js

const arr = ['a','b','c','d']

function removeItem(arr, index) {
  const r = arr.concat([])
  r.splice(1, index)
  return r
}

// 没有影响到外层的arr数组，没有产生副作用
const arr1 = removeItem(arr, 1)
console.log(arr1, arr)
```

#### 不依赖于外部状态

> 纯函数不能依赖任何外部的状态值

```js
const arr = ['a', 'b', 'c']
function removeItem(index) {
  // 依赖了外层的arr数组，不纯
  arr.splice(1, index)
  return arr
}
```

依赖外部的状态值很容易产生副作用，如上面假设我上面arr内的值修改过后，会产生不一样的结果，造成了你程序的稳定性

### 纯函数的好处

1. 可缓存
2. 可测试
3. 并行处理

#### 可缓存:

因为每次输入和输出的结果都是一样，所以我们可以把结果进行混存起来，减少性能的消耗

例子:

```js
function getArea (r) {
  console.log(r)
  return Math.PI * r * r
}

function memoize(fn) {
  const cache = {}
  return function () {
    // 根据arguments生成一个唯一的key，如传入了fn的参数传入了4，会生成一个"{"0":4}"的值
    const key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(fn, arguments)
    return cache[key]
  }
}

const getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
```

利用了闭包局部变量会常驻在内存中的特性，把结果缓存在cache当中，避免了重复调用


#### 可测试:

存函数更便于测试，因为不存在对外部的依赖，对单元测试等更方便，不用每一次测试之前都要配置，之后都要断言状态，只需简单地给函数一个输入，然后断言输出就好了。

例子:

jest 测试代码

源代码:

```js
function every(arr, fn) {
  let result = true
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result = false
      break
    }
  }
  return result
}

```

测试用例:

```js
describe('every', () => {
  test('基本使用', () => {
    const isBelowThreshold = (currentValue) => currentValue < 40;
    expect(every([1, 30, 39, 29, 10, 13], isBelowThreshold))).toEqual(true)
  })
})

```

#### 并行处理:

1. 多线程并行操作共享的内存数据可能会出现意外情况

2. 函数不需要访问共享内存数据，所以并行环境下可以输入任意运行纯函数(web worker)

## 柯里化

### 定义

> 柯里化里化为实现多参函数提供了一个递归降解的实现思路

1. 当一个函数有多个参数的时候先传递一部分参数调用它(这部分参数以后永远不变)
2. 然后返回一个新的函数接收剩余的参数，返回结果


例子:

```js
function add (n1, n2) {
  return n1 + n2
}

// 柯里化后
function add (n1) {
  return function (n2) {
    return n1 + n2
  }
} 

const add1 = add(1)
add1(2) // 3
```

柯里化其实应用作用域来保存了上一次传值传进来的参数，形成了新得函数


### 实现lodash当中柯里化函数

lodash 当中具有一个实现实例化的方法，使用是这样子的

```js
const _ = require('lodash')

const add = (n1, n2) => n1 + n2

const curry = _.curry(add)

const add1 = curry(1)


curry(1, 2) // => 3

// add1(2) === add(1, 2) 
add1(2) //=> 3
```

实现思路:

1. 首先我们需要一个函数去接收一个函数

```js
function currying(fn) {}
```

2. 由 curry(1, 2)， curry(1)(2) 得知，当传入函数所需要的参数的时候，就会立即执行传入的函数，而传入一个参数，剩余的参数就会返回一个可执行的函数

我们先处理第一种情况，得到一下的结果

```js
function currying(fn) {
  return function(...args) {
    return fn(...args)
  }
}
```

返回了一个新的函数并且传入了可能会输入的值

3. 到需要处理 curry(1)(2) 的情况的时候，我们需要得知这个函数传入的参数的个数和当前个数做一次对比

```js
function currying(fn) {
  return function(...args) {
    if (fn.length > args.length) {
      return function (...args2) {
        return fn(...args, ...args2)
      }
    }
    return fn(...args)
  }
}
```

4. 上面的情况我们基本实现了我们需要的情况，但假设我们需要处理的函数为三个参数，我们调用上面的方法就会得到NaN，但是我们希望得到得是一个Function

```js
function add(n1, n2, n3) => n1 + n2 + n3

currying(add)(1)(1) // NaN
```

5. 我们不能知道最后需要多少个参数得时候，只要重复调用当前得方法就可以得到我们想要得结果，这个时候我们就会想到使用递归去解决这个问题

```js
function currying(fn) {
  return function curried(...args) {
    if (fn.length > args.length) {
      return function (...args2) {
        return curried(...args.concat(args2))
      }
    }
    return fn(...args)
  }
}
```

## 组合函数

### 定义

> 组合函数，与日常开发当中的把页面拆分成多个组件进行开发类似，不过函数组合把一个复杂的函数拆分为多个函数


例子:

给你一个字符串，将这个字符串转化成大写，然后逆序

常规的思维是

```js
function fn(str) {
  let upperStr = str.toUpperCase()
  return upperStr.split('').reverse().join('')
}

fn('abc') //=> CBA
```

这个是假设我们需要最后把结果拆非为数组，这时候如果去修改之前的代码的话，可能会破坏了设计模式当中开闭原则

当时如果我们使用了组合函数的话，可以通过多个函数组装成一个新的函数，组合函数类似于小时候玩的积木，不同的方式得到结果都是不一样的


```js
function stringToUpper(str) {
  return str.toUpperCase()
}

function stringReverse(str) {
  return str.split('').reverse().join('')
}

function stringToArray(str) {
  return str.split('')
}

function fn(str) {
  return stringToArray(stringToUpper(stringReverse(str)))
}

console.log(fn('abc'))
```

可以看到当变更需求的时候，我们没有打破以前封装的代码，只是新增了函数功能，然后把函数进行重新组合

假设还需要更改需求，我们只需要把单一功能的函数组合成复杂的函数就可以了，这样子我们能更大程度地进行重用函数

### 实现lodash当中flowRight函数

实现思路:

1. 组合函数，我们需要传入多个函数，且假设我们需要从右往左进行执行（loadsh 当中flow是由左往右执行的），我们需要先把得到函数参数的数组进行翻转

```js
function compose(...fns) {
  const funcs = fns.reverse()
}
```

2. 已知需要返回一个函数，且需要先执行的第一个函数的结果

```js
function compose(...fns) {
  const funcs = fns.reverse()
  const length = funcs.length
  return function (...args) {
    let result = length ? funcs[0].apply(this, args) : args[0]
    return result
  }
}
```

3. 我们可以使用for循环去调用剩余需要被调用的函数，并且去更新result的值，且把上一个结果的值传递给下一个函数

```js
function compose(...fns) {
  const funcs = fns.reverse()
  const length = funcs.length
  return function (...args) {
    let result = length ? funcs[0].apply(this, args) : args[0]
    for (let i = 1; i < length; i++) {
      result = funcs[i].call(this, result)
    }
    return result
  }
}
```

使用while来进行编写

```js
function compose(...fns) {
  const funcs = fns.reverse()
  const length = funcs.length

  return function (...args) {
    let index = 0
    let result = length ? funcs[index].apply(this, args) : args[0]
    while (++index < length) {
      result = funcs[index].call(this, result)
    }
    return result
  }
}
```

通过reduce实现

```js
function compose (...fns) {
  return function (value) {
  return fns.reverse().reduce(function (acc, fn) {
        return fn(acc)
      }, value)
  } 
}
```

### debug

有时候多个函数组合成一个函数的时候，有可能中间的某个函数返回的结果不满足下个函数处理的要求会发生错误

我们可以通过定义一个 trace 函数当作中间件进行调试

```js
const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})
```

例子:

```js
const split = _.curry((sep, str) => _.split(str, sep)) 

const join = _.curry((sep, array) => _.join(array, sep))

const map = _.curry((fn, array) => _.map(array, fn))

const f = _.flowRight(join('-'), trace('map 之后'), map(_.toLower), trace('split 之后'), split(' '))

console.log(f('NEVER SAY DIE'))
```


### 函数结合律

```js
let f = compose(f, g, h)
let associative = compose(compose(f, g), h) == compose(f, compose(g, h)
```

我们既可以把 g 和 h 组合，还可以把 f 和 g 组合，结果都是一样的

简单来说有点类似于我们小学时候的数学问题

```js
1 + 1 + 2 = 4 

(1 + 1) + 2 = 4

1 + (1 + 2) = 4
```

1 + 1 + 2  === (1 + 1) + 2 === 1 + (1 + 2)

把数字替换成函数，就是多种组合之后得到结果都是一样的

### Point Free

> Point Free 指得是一种编程的风格，Point指得是函数的参数, 把多个函数组合成一个新的函数的时候，函数不去指定需要处理的具体数据，只要把简单的运算步骤合成到一起

> Point Fress 应该更加关注数据的处理而不是数据上


1. 不需要指明处理的数据
2. 只需要合成运算过程
3. 需要定义一些辅助的基本运算函数


例子:

```js
const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '-'), fp.toLower)

console.log(f('Hello World'))
```

使用lodash当中fp模块，我们需要传入一个字符串把字符串中的空格转换成‘-’， 并且转换为小写

1. 不去指明需要处理的数据，'Hello World' 是在调用的时候才去调用

2. 只需要合成运算的过程，fp.replace 和 fp.toLower 就是需要合成被合成的运算过程

3. 需要定义一些辅助的基本运算函数，fp.replace(/\s+/g, '-') 使用了fp模块当中replace且传入了参数，去生成我们需要使用的基本运算函数

综上所述，这个函数是属于 Point Fress 的风格
