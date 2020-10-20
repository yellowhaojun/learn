# Grunt

> `grunt`作为一个前端构建工具，一些重复性质的工作，比如资源压缩、代码检测、文件合并等

## 使用

### 语法使用

全局安装`grunt-cli`

```bash
yarn global add grunt-cli
```

项目内安装`grunt`

```bash
yarn add grunt --dev
```

创建`gruntfile.js`入口文件

```bash
touch gruntfile.js
```

```js
// Grunt 的入口文件
// 用于定义一些需要， Grunt自动执行的任务
// 需要到处一个函数
// 此函数接受一个 grunt 的形参， 内部提供一些创建任务是可以用到的Api

module.exports = grunt => {
}
```

编写任务

使用`registerTask`创建一个任务

```js
module.exports = grunt => {
  // 定义一个名字为foo的任务
  grunt.registerTask('foo', () => {
    console.log('hello grunt!')
  })
	// 第一个参数为任务名，第二个参数为任务描述, 执行yarn grunt --help可以查看
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task')
  })
}
```

```bash
yarn grunt --help
```

调用任务

```js
yarn grunt <任务名>
```

使用`registerTask`创建一个异步的任务, 创建异步任务时候因为要获取`done`用于标示是否完成，所以必须使用`function`, 不能使用箭头函数

```js
module.exports = grunt => {
  grunt.registerTask('async-task', function () {
    // 通过this获取done回调
    const done = this.async()
    setTimeout(() => {
      console.log('async task workding')
      // 调用done表示异步执行完成
      done()
    }, 1000)
  })
}
```

设置默认任务, 定义的任务名假设为`default`就是默认任务

```js
module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt!')
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task')
  })


  grunt.registerTask('async-task', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task workding')
      done()
    }, 1000)
  })

   // 默认任务，第二个参数接收一个数组为任务名称的数组(会依次执行里面的任务)，执行时不指定任务名就会执行default
  grunt.registerTask('default', ['foo', 'bar', 'async-task'])
}
```

使用`initConfig`配置配置选项,

```js
module.exports = grunt => {
  // 键一般对应任务的名称
  grunt.initConfig({
    foo: 'foo'
  })

  grunt.registerTask('foo', () => {
    // 任务中可以使用 grunt.config() 获取配置
    console.log(grunt.config('foo')) // => foo
  })
}
```

值可以是任意类型的数据

```js
module.exports = grunt => {
  grunt.initConfig({
    foo: {
      bar: 'bar'
    }
  })

  grunt.registerTask('foo', () => {
    // 如果属性值是对象的话，config 中可以使用点的方式定位对象中属性的值
    console.log(grunt.config('foo.bar')) // => bar
  })
}
```

同步任务`return false`表示执行任务错误，异步任务在`done`内传入`false`表示任务执行错误

```js
module.exports = grunt => {
  grunt.registerTask('bad', () => {
    console.log('bad task')
    // 返回false表示执行错误
    return false
  })

  grunt.registerTask('async-bad', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async bad task')
      // 传入false表示执行错误
      done(false)
    }, 200)
  })

  grunt.registerTask('default', ['bad', 'async-bad'])
}
```

当执行时不添加`--force`，当一个任务错误的时候，后面不会继续执行，而新增了`--force`后续的任务会继续执行

使用`registerMultiTask`生成了多目标模式，多目标模式，可以让任务根据配置形成多个子任务

```js
module.exports = grunt => {
  grunt.initConfig({
    build: {
      foo: 100,
      bar: 456
    }
  })

  grunt.registerMultiTask('build', function () {
    // target 会执行build 的key值, data 会是对应key值的value值
    console.log(`task: build, target: ${this.target}, data: ${this.data}`)
  })
}
```

```bash
Running "build:foo" (build) task
task: build, target: foo, data: 100

Running "build:bar" (build) task
task: build, target: bar, data: 456
```

假设配置当中key的值为`options`的时候，是不会被遍历出来, 使用`this.options()`可以获取到对应的配置

```js
module.exports = grunt => {
  grunt.initConfig({
    build: {
      options: {
      	msg: '123'
   		}, 
      foo: 100,
      bar: 456
    }
  })

  grunt.registerMultiTask('build', function () {
    console.log(this.options()) // => { msg: '123' }
    console.log(`task: build, target: ${this.target}, data: ${this.data}`)
  })
}
```

假设配置也是个对象，里面也具备`options`，里面的`options`会覆盖外层的`options`

```js
module.exports = grunt => {
  grunt.initConfig({
    build: {
      options: {
        msg: 456
      },
      foo: {
        options: {
          msg: 789
        },
        value: 123
      },
      bar: 456
    }
  })

  grunt.registerMultiTask('build', function () {
    console.log(this.options())
    console.log(`task: build, target: ${this.target}, data: ${this.data}`)
  })
}
```

```bash
Running "build:foo" (build) task
{ msg: 789 }
task: build, target: foo, data: [object Object]

Running "build:bar" (build) task
{ msg: 456 }
task: build, target: bar, data: 456
```















