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

