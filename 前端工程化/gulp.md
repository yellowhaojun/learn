# gulp

> Gulp 与 Grunt一样是一个前端的构建工具，但是它是基于流的构建工具，执行速度更快，执行效率更高

## 使用

### 基础使用

安装

```bash
yarn add gulp --dev
```

创建入口文件

```bash
touch gulpfile.js
```

`gulp`当中 导出的函数都会作为 `gulp` 任务， 所有的任务都为异步的任务，使用`done`标示结束

```js
// 导出的函数都会作为 gulp 任务
exports.foo = done => {
  console.log('done') // => 'done'
  done() //  可以通过调用回调函数标识任务完成
}
```

在 v4.0 之前需要通过 gulp.task() 方法注册任务, 建议在v4.0之后的版本当中使用直接导出函数的方式创建任务

```js
const glup = require('gulp')

glup.task('foo', done => {
  console.log('done')
  done()
})
```

直接导出`default`方法，就是默认任务

```js
exports.default = done => {
  console.log('default')
  done()
}
```

使用 `series` 串形任务

```js
const { series } = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2')
    done()
  }, 200)
}

exports.foo = series(task1, task2) // 接受任意个数的任务，任务会依次执行
```

使用`parallel`并行任务

```js
const { parallel } = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2')
    done()
  }, 200)
}

exports.foo2 = parallel(task1, task2) // 接受任意个数的任务，任务会同时执行
```

`gulp`因为所有任务都是异步任务，处理异步流程也具备三种方式，分别是`callback`、`promise`、`stream`的方式

上面所采用的就是`callback`的方式，当需要返回异常的时候在`done`内传入`new Error`， `gulp`是异常错误优先的，当任务执行过程发生错误，将会停止往下的执行

```js

exports.callback = done => {
  console.log('callback')
  done() // 成功的回调
}

exports.callback_error = done => {
  console.log('callback error')
  done(new Error('callback_error')) // 失败的回调
}
```

使用`promise`的方式，就是最后返回一个`promise`，返回的是`reject`就是错误, 返回`resolve`就是正确的回调，注意`resolve`不需要传入任何参数，因为`gulp`不会接收里面的任何参数，`resolve`当中也需要传入一个`new Error`

```js
exports.promise = done => {
  console.log('promise')
  return Promise.resolve() // 成功的回调
}

exports.promise_error = done => {
  console.log('promise_error')
  return Promise.reject(new Error('promise_error')) // 失败的回调
}
```

`promise`的方式，如果`node`环境支持`async awiat`，也可以使用该语法糖

```js
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000) // 执行到这里，也会等待这个timeout执行完成，才会继续往下执行
  console.log('async')
  return
}
```

使用`stream` 的方式

```js

const fs = require('fs')

exports.stream = () => {
  const read = fs.createReadStream('yarn.lock') // 创建一个读取流
  const wirte = fs.createWriteStream('a.txt') // 创建一个写入流
  read.pipe(wirte) // 把读取流的内容写入到写入流
  return read // 返回读取流
}
```

如果返回一个`stream`的话， `gulp`会默认注册一个`end`的回调事件, 相当于以下的代码

```js
const fs = require('fs')

exports.stream = done => {
  const read = fs.createReadStream('yarn.lock')
  const wirte = fs.createWriteStream('a.txt')
  read.pipe(wirte)
  // 给读写流创建一个end的回调处理
  read.on('end', () => {
    done() // 回调完成
  })
}
```

### 实现原理

`gulp`是一个基于内存，或者说是基于`stream`的构建工具，在`gulp`中，实现文件的读写都应该是使用`stream`来操作，比如说我们执行压缩`css`文件

目录结构:

```bash
├── gulpfile.js
├── normalize.css
├── package.json
└── yarn.lock
```



### 插件的使用

