# 函子

> 函数不仅可以用于统一范畴之中值的转换，还可以用于将一个范畴转成另一个范畴。这就涉及到了函子（Functor）

> 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。比较特殊的是，它的变形关系可以依此作用于每一个值，将当前容器变形成为另一个容器。

> 举个例子，函子就有点类似于我们邮寄一个快递，我们去邮寄快递的时候，快递员收件会把你需要邮寄的货物包装到一个盒子（容器）里面，后面对盒子进行的操作，可能要经历多个站点（map处理函数），函子就是那个包装好的快递，最后到你得到就是还是一个盒子（新的容器）


## 为什么使用函子？

> 日常开发当中，采用函数式编程，有些副效果是没办法避免，比如说一些全局的常量、通过接口取出的数据，我们需要使用到函子

> 函子让我们能更好地数据和业务分离，让代码的可读性和扩展性增强

## Functor 函子

1. Functor 遵守一些特定规则的容器类型。
2. 赋予容器自己去调用函数的能力，只留接口map给容器外的函数，这样子外层就可以自由地操作这个容器

```js
class Container {

  constructor(value) { 
    this._value = value
  }

  map(fn) {
    return new Container(fn(this._value))
  }
}

const container = new Container(1)
  .map(x => x + 1)
  .map(x => x * 2)

console.log(container)
```

从下面的代码可以看出是采用了链式调用，更便于我们阅读代码

```js
const container = Container
  .of(1)
  .map(x => x + 1)
  .map(x => x * 2)
```

Functor 函子 提供了一个 of 的函数进行实例化和 map 函数给我们去处理


## Pointed 函子

1. Pointed 函子其实就是增加了of方法进行创建容器，避免了使用new来创建

2. 要批改成函数式编程的思维，需要防止应用new

```js
class Container {

  static of(value) {
    return new Container(value)
  }

  constructor(value) { 
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }
}

const container = Container
  .of(1)
  .map(x => x + 1)
  .map(x => x * 2)

console.log(container)
```

## MayBe 函子

MayBe字面上的意思就是可能，MayBe 函子就是一般是为了解决传递为“空”

```js
class Maybe {
  static of(value) {
    return new Maybe(value)
  }
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
  }

  isNothing() {
    return this._value === undefined || this._value === null
  }
}

console.log(Maybe.of(null))
```


## Either 函子

Either 函子是为了处理”非左即右“的情况，类似于if...else的语法，可以用于处理异常的情况

```js
class Left {
  static of(value) {
    return new Left(value)
  }
  constructor(value) {
    this._value = value
  }
  map() {
    return this
  }
}

class Right {
  static of(value) {
    return new Right(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Right.of(fn(this._value))
  }
}

// 使用Either进行错误处理
function parse (json) {
  try {
    return Right.of(JSON.parse(json))
  } catch (e) {
    return Left.of({ err: e.message })
  }
}

const r = parse('{ "name": "test" }').map(value => value)
console.log(r)
```

## IO 函子

1. IO函子和之前几个函子不同的地方是，value存的是一个函数，而不是一个值。
2 .它把不纯的一些操作包裹在一个函数内，从而延迟这个函数的执行。
3. IO函子返回的是一个函子（容器）

```js
const fp = require('lodash/fp')
class IO {

  static of(x) {
    return new IO(() => x)
  }

  constructor(fn) {
    this._value = fn
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

const r = IO.of(1).map(value => value)
console.log(r._value())
```

## Monad 函子 (单子)

函子是一个容器，那么容器就可以容器放容器（嵌套函子），如下：

```js
Functor.of(Functor.of(1))
```

1. Monad 函子的作用是总是返回一个单层的函子，它具备一个flatMap方法，与map方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会去除后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。

2. 如果 函数 fn 返回的是一个函子，那么this.map(fn)就会生成一个嵌套的函子，所以，join方法保证了flatMap方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平

```js
const fp = require('lodash/fp')
const fs = require('fs')

class Monad {
  static of(x) {
    return new Monad(() => x)
  }

  constructor(fn) {
    this._value = fn
  }


  map(fn) {
    return new Monad(fp.flowRight(fn, this._value))
  }

  join() {
    return this._value()
  }

  flatMap(fn) {
    return this.map(fn).join()
  }
}

const readFile = function(filename) {
  return new Monad(() => {
    return fs.readFileSync(filename, 'utf-8')
  })
}

const print = function (x) {
  return new Monad(() => {
    console.log(x)
    return x
  })
}

let r = readFile('./package.json').flatMap(print).join()
console.log(r)
```

1. readFile 返回了一个新的函子, 这个容器内的 _value 的值就是

```js
function readFile(filename) {
  return fs.readFileSync(filename, 'utf-8')
}
```

2. print 也返回了一个新的函子, 这个容器内的 _value 的值就是


```js
function print(x) {
    console.log(x)
    return x
}
```

3. 先调用了readFile，后执行了flatMap，flatMap的作用后让两个函子内的_value组合成一个新的函数，再执行join之后，就会输出package.json的内容


## Task 异步执行

```js
const { task } = require('folktale/concurrency/task')
const fs = require('fs')
const { split, find } = require('lodash/fp')

function readFile (filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        resolver.reject(err)
      } else {
        resolver.resolve(data)
      }
    })
  })
}

readFile('./package.json').run().listen({
  onRejected: err => { 
    console.log(err)
  },
  onResolved: value => {
    console.log(value) 
  }
})
```

调用了 folktale 当中的task，task也是一个函子，我们也可以通过map函数进行数据的处理

```js
readFile('./package.json')
  .map(split('\n'))
  .map(find(value => value.includes('version')))
  .run()
  .listen({
    onRejected: err => { 
      console.log(err)
    },
    onResolved: value => {
      console.log(value) 
    }
  })
```
