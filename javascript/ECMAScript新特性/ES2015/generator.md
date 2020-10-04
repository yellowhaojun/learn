# generator

> ES6提供的一种解决异步编程的方案，Generator 函数可以暂停执行和恢复执行，所以具备了处理异步编程的能力

## 使用

需要定义一个generator的时候，就在普通函数前面新增`*`就定义完成了一个generator函数

```js
function * sayHello() {
  return 'hello world'
}
```

需要执行的时候，需要去定义一个执行器，这个时候sayHello()不会像普通函数一样立即执行

```js
function * sayHello() {
  return 'hello world'
}

const gen = sayHello() 
```

当调用gen上的next方法就会去执行，可以看到返回的结果是一个对象，具有value和done，可以看出generator内部也是实现了类似于`iterable`的接口定义

```js
function * sayHello() {
  return 'hello world'
}

const gen = sayHello()
console.log(gen.next()) // { value: 'hello world', done: true }
```

搭配`yield`一起使用，没执行一次next就会去到`yield`的位置

```js
function * sayHello() {
  yield 'hello'
  yield 'world'
}

const gen = sayHello()

console.log(gen.next()) // { value: 'hello', done: false }
console.log(gen.next()) // { value: 'world', done: false }
console.log(gen.next()) // { value: undefined, done: true }
```

