# Flow

> `Flow`是face-book发布的一款Javascript类型检查器

## 环境安装

初始化项目

```bash
npm init -y
```

安装flow

```bash
npm install --save-dev flow-bin
```

把bin命令添加到package.json文件当中

```json
"scripts": {
  "flow": "flow {代码目录}",
  "flow:init": "flow init",
  "flow:stop": "flow stop"
},
"bin": {
  "flow": "./node_modules/.bin/flow"
}
```

新建`.flowconfig`

可以通过手动自己新建

```bash
touch .flowconfig
```

把内容添加进去

```bash
[ignore]

[include]

[libs]

[lints]

[options]

[strict]
```

或者执行刚刚新增的init命令进行添加

```bash
npm run flow:init
```

执行命令:

```js
npm run flow
```

停止命令

```bash
npm run flow:stop
```

## 编译

### 使用官方的工具

安装`flow-remove-types`

```bash
npm install --save-dev flow-remove-types 
```

添加bin命令

```json
"scripts": {
  "flow:remove": "flow-remove-types {源码目录} -d {发布目录}"
},
"bin": {
  "flow-remove-types": "./node_modules/.bin/flow-remove-types"
}
```

执行命令

```bash
npm run flow:remove
```

### 使用babel

安装`babel`工具

```bash
npm install  --save-dev @babel/core @babel/cli @babel/preset-flow
```

新建babel配置文件

```bash
touch .babelrc
```

写入配置

```json
{
  "presets": ["@babel/preset-flow"]
}
```

新增编译命令

```json
"scripts": {
  "build": "babel {源码目录} -d {编译目录}"
}
```

执行命令

```bash
npm run build
```

## 使用

### @flow标识符

需要使用flow，需要在代码里面新增flow的注释标识符

```js
// @flow

/**
 * @flow
 */
```

### 类型注解

类型注解就是给变量或者参数添加上所属的类型，flow会对它们进行校验

语法

```js
function fn (n: dataType): dataType {
}

let num: dataType = '123'
```

使用

```js
// 函数参数
function square (n: number) {
  return n * n
}

square('100') // error

// 变量
let num: number = 100
num = '100' // error

// 函数返回值

function foo(): number {
  return 100
}
```

### 类型推断

类型推断就是在不添加类型注解的情况下，flow会自动取推断出代码的数据类型是否正确

```js
/**
 * 类型推断
 *
 * @flow
 */

function square (n) {
  return n * n
}

square('100') // error

square(100) // success
```

### 原始数据类型

原始的数据类型一共6种：

1. string: 字符串类型
2. number: 数字类型（NaN、Infinity也属于这类型）
3. boolean: 布尔值类型
4. null: null 类型
5. void: undefined 类型
6. symbol: Symbol 类型

```js
/**
 * 原始类型
 *
 * @flow
 */

 const a: string = 'foo'
 const b: number =  Infinity // NaN // 100
 const c: boolean = false // true
 const d: null = null
 const e: void = undefined
 const f: symbol = Symbol('foo')
```

### 对象类型

定义一个对象类型，类似于object对象一样定义它们的值

```js
const obj1: { name: string } = { name: 'jack' }
```

需要某个值不一定存在的时候使用?关键字

```js
const obj2: { name: string, age?: number } = { name: 'jack' }
```

定义一个不确定字段的Object

```js
const obj3: { [string]: string } = {}
obj3.name = 'jack'
```

### 数组类型

定义数组类型，有两种方式

```js
const arr1: Array<number> = [1, 2, 3] // 使用泛形的写法
const arr2: number[] = [1, 2, 3] // 类型加[]的写法
```

定义一个对象的数组

```js
 const arr3: { name: string }[] = [{ name: 'jack' }]
```

定义一个元组(固定位数的数组)

```js
 const foo: [number, string] = [1, '1']
```

### 函数类型

定义函数的类型与箭头函数的写法类似

```js
/**
 * 函数类型
 *
 * @flow
 */

// : (参数1类型, 参数2类型, ...更多参数类型) => 返回类型

 function foo(callback: (string, number) => void) {
   callback('string', 100)
 }

 foo(function (str, num) {
 })
```

### mayBe 类型

mayBe类型就是可能为空（null、undefined）加上一种数据类型

```js
/**
 * mayBe类型
 *
 * @flow
 */

let num: ?number = 1
num = null
num = undefined
```

### 联合类型

联合类型就是一个值可以有多种类型，使用`|`联合起来

```js
/**
 * 联合类型
 *
 * @flow
 */

let type: number | string = '1'
type = 1
```

### 声明类型

flow支持我们自己自定义一个类型

```js
/**
 * 声明类型
 *
 * @flow
 */

type Status = number | string

const a: Status = 'success'
```

### 字面量类型

字面量类型就是一种固定值的类型，一般和联合类型、声明类型一起使用

```js
/**
 * 字面量类型
 *
 * @flow
 */

const a: 'success' | 'error' = 'success'

type Status = 'success' | 'error'
const a: Status = 'success'
```

### Mixed Any

mixed和any都是表示任何的数据类型，any主要是为了兼容旧的代码，而mixed类型还是具备的类型检查的效果

```js
function testMixed (value: mixed) {
  value.substr(1) // error
}

testMixed(1)
```

上述代码当中传递了1进入，但是方法内却调用了字符串的截取，而flow也提早给我们报错了错误

如果需要解决上述的问题，我们需要做一下类型的推断

```js
function testMixed (value: mixed) {
  if (typeof value === 'string') {
    value.substr(1)
  }
}

testMixed(1)
```

而如果使用了any是不会有任何的报错的，只有在运行的时候我们才能知道错误了

```js
function testAny (value: any) {
  value.substr(1)
}

testAny(1)
```

### 运行环境的Api

运行环境的Api指的是某些环境下才有的Api，比如说浏览器环境才具备DOM的API

```js
/**
 * 运行环境 API
 *
 * @flow
 */

const element: HTMLElement | null = document.getElementById('app')
```

更多的API查看 https://github.com/facebook/flow/tree/master/lib