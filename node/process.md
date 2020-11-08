# process

> process 存在全局对象当中，不需要使用 require 载入，process 模块主要做两方面的事情
>
> * 获取进程信息（资源使用、运行环境、运行状态）
> * 执行进程操作（监听事件、调度任务、发出警告）

## 资源使用

资源使用指运行此进程所消耗的机器资源。例如内存、cpu

### 内存

```js
const showMem = function(){
  const mem = process.memoryUsage();
  const format = function(bytes){
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }
  console.log('Process: heapTotal ' + format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss) + ' external:' + format(mem.external))
  console.log('-----------------------------------------------------------')
}

showMem() // => Process: heapTotal 4.05 MB heapUsed 2.07 MB rss 17.09 MB external:0.65 MB
```

获取到内容分为4部分

1. `heapTotal` 堆的总大小，包括3个部分
	* 已分配的内存，用于对象的创建和存储，对应于``heapUsed`
	* 未分配的但可用于分配的内存
	* 未分配的但不能分配的内存，例如在垃圾收集（GC）之前对象之间的内存碎片
2. `heapUsed` 已分配的内存，即堆中所有对象的总大小，是heapTotal的子集
3. `rss` 操作系统分配给进程的总的内存大小
4. `external` 进程使用到的系统链接库所占用的内存

## 运行环境

运行环境指此进程运行的宿主环境包括运行目录、node环境、CPU架构、用户环境、系统平台

### 运行目录

```js
console.log(`Current directory: ${process.cwd()}`)

// => Current directory: /Users/xxx/Documents/xxx/xxx
```

### 用户环境

```bash
NODE_ENV=dev node 01-process.js
```

```js
console.log(process.env.NODE_ENV) // => dev
```

#### node 环境

```js
console.log(process.version) // => v12.16.2
```

如果不仅仅希望获得node的版本信息，还希望`v8`、`zlib`、`libuv`版本等信息的话就需要使用`process.versions`

```js
console.log(process.versions)
```

运行结果

```js
{
  node: '12.16.2',
  v8: '7.8.279.23-node.34',
  uv: '1.34.2',
  zlib: '1.2.11',
  brotli: '1.0.7',
  ares: '1.15.0',
  modules: '72',
  nghttp2: '1.40.0',
  napi: '5',
  llhttp: '2.0.4',
  http_parser: '2.9.3',
  openssl: '1.1.1e',
  cldr: '36.0',
  icu: '65.1',
  tz: '2019c',
  unicode: '12.1'
}
```

### 运行状态

运行状态指当前进程的运行相关的信息包括启动参数、执行目录、主文件、PID信息、运行时间

### 启动参数

获取启动参数有三个方法，`execArgv`获取`node`的命令行选项

```bash
node --harmony 01-process.js --version 1.0
```

```js
console.log(process.argv)
console.log(process.argv0)
console.log(process.execArgv)

/*
[
  '/usr/local/bin/node',
  '/Users/xxx/Documents/xxx/node/code/01-process.js',
  '--version',
  '1.0'
]

node

[ '--harmony' ]
*/
```

