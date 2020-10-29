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

把目录当中的`normalize.css`进行压缩， 需要操作以下几步

1. 读取`normalize.css`文件流
2. 创建一个转换流，进行文件中的空格与字符的替换
3. 返回一个经过处理的写入流

```js
const fs = require('fs')
const { Transform } = require('stream')

exports.default = done => {
  const readStream = fs.createReadStream('normalize.css') // 创建normalize.css的读取流
  const writeStream = fs.createWriteStream('normalize.min.css') // 创建normalize.min.css的写入流

  // 创建一个转换流
  const transformStream =  new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString() // chunk 将会获取到流的内容，这个内容为二进制的流，所以需要进行转换
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '') // 替换空格与注释为空字符串
      callback(null, output) // 回调转换流的参数
    }
  })

  return readStream.pipe(transformStream).pipe(writeStream) // 返回一个经过转换后的写入流
}
```

从上面的例子当中，可以看出`gulp`核心处理都是在操作流

### 编译任务

#### src、dest、pipe

实际上日常当中使用`gulp`，不会像上面的代码一样，什么都自己实现，`gulp`对于操作`stream`进行了一系的封装，结合插件能够快速的完成一系列的构建工作，比如说假设需要做文件的复制操作，可以直接使用`gulp`封装的一系列动作

```js
const { src, dest } = require('gulp')

const copy = done => {
  // src 相当于文件的读取流的封装，可以通过通配符的形式匹配一系列的文件, 第二个参数base表示完全继承src的目录结构
  // dest 相当于写入流的封装，最后输出的内容的流
  return src('src/assets/styles/*.scss', { base: 'src' }).pipe(dest('dist'))
}

module.exports = {
  copy
}
```

#### gulp-clean-css 压缩CSS

压缩`css`资源文件

安装

```bash
yarn add gulp-clean-css --dev
```

使用

```js
const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')

const minifyCss = done => {
  return src('src/assets/styles/*.scss', { base: 'src' })
          .pipe(cleanCss()) // 用于压缩css的文件
          .pipe(dest('dist'))
}

module.exports = {
  minifyCss
}
```

#### gulp-rename 重命名文件

重命名文件

安装

```bash
yarn add gulp-rename --dev
```

使用

```js
const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

const minifyCss = done => {
  return src('src/assets/styles/*.scss', { base: 'src' })
          .pipe(cleanCss())
          .pipe(rename({ extname: '.min.css' })) // 重命名为.min.css后缀的文件
          .pipe(dest('dist'))
}

module.exports = {
  minifyCss
}
```

#### gulp-load-plugins 加载插件

用于加载插件

安装

```bash
yarn add gulp-load-plugins --dev
```

使用

```js
const { src, dest } = require('gulp')

const loadPlugins = require('gulp-load-plugins') // 加载插件，会返回一个函数

 // 执行过后，会得到一个安装插件集合的对象，key的值就是插件名，-会被转换成驼峰显示
const plugins = loadPlugins()

const minifyCss = done => {
  return src('src/assets/styles/*.scss', { base: srcPath })
          .pipe(plugins.cleanCss())
          .pipe(plugins.rename({ extname: '.min.css' }))
          .pipe(dest('dist'))
}

module.exports = {
  minifyCss
}
```

#### gulp-sass 编译sass

用于编译`sass`文件

安装

```bash
yarn add gulp-sass --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const config = {
  distPath: 'dist',
  srcPath: 'src', // 源码目录
  tempPath: 'temp', // 临时目录
  assetsPaths: { // 资源目录
    styles: 'assets/styles/*.scss'
  }
}

const { tempPath, srcPath, assetsPaths } = config
const { styles } = assetsPaths

const plugins = loadPlugins()

const style = () => {
  return src(`${srcPath}/${styles}`, { base: srcPath })
    .pipe(plugins.sass({ outputStyle: 'expanded' })) // 编译scss文件，outputStyle编译过后样式的格式
    .pipe(dest(tempPath))
}



module.exports = {
  style
}
```

#### gulp-babel babel

用于转换`js`语法

安装

安装`gulp-babel`需要安装`babel`的依赖, `gulp-babel`只是`babel`的一层`gulp`应用的封装

```bash
yarn add  gulp-babel --dev
yarn add @babel/core --dev
yarn add @babel/preset-env --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const config = {
  distPath: 'dist',
  srcPath: 'src', // 源码目录
  tempPath: 'temp', // 临时目录
  assetsPaths: { // 资源目录
    styles: 'assets/styles/*.scss', // 样式资源文件
    scripts: 'assets/scripts/*.js' // 脚本资源文件
  }
}

const { tempPath, srcPath, assetsPaths } = config
const {  scripts } = assetsPaths

const plugins = loadPlugins()

// 编译脚本文件
const script = () => {
  return src(`${srcPath}/${scripts}`, { base: srcPath })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] })) // 需要指定使用的presets
    .pipe(dest(tempPath))
}


module.exports = {
  script
}
```

#### gulp-imagemin 图片压缩

用于图片压缩

```bash
yarn add gulp-imagemin --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  }
}

const { tempPath, srcPath, assetsPaths } = config.build
const { styles, scripts, images } = assetsPaths

const plugins = loadPlugins()

// 压缩图片
const image = () => {
  return src(`${srcPath}/${images}`, { base: srcPath })
    .pipe(plugins.imagemin())
    .pipe(dest(tempPath))
}

module.exports = {
  image
}
```



### gulp-swig Javascript模版引擎

javascript模版引擎

安装

```bash
yarn add gulp-swig --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, assetsPaths } = config.build
const { data: dataConf } = config
const { styles, scripts, images, pages } = assetsPaths

const plugins = loadPlugins()

// 编译页面资源
const page = () => {
  return src(`${srcPath}/${pages}`, { base: srcPath})
  	 // 写入模版的文件，第一个参数传入需要传入的数据，第二个参数为传入的配置，cache为false表示不缓存数据
    .pipe(plugins.swig({ data: dataConf, defaults: { cache: false } }))
    .pipe(dest(tempPath))
}

module.exports = {
  page
}
```

####  gulp-uglify JS资源压缩

用于`JS`资源压缩

```bash
yarn add gulp-uglify --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, distPath, assetsPaths } = config.build
const { data: dataConf } = config
const { styles, scripts, images, pages } = assetsPaths

const plugins = loadPlugins()

// 压缩js资源
const uglify = () => {
  return src(`${srcPath}/${scripts}`, { base: srcPath })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(plugins.uglify()) // uglify 插件只支持压缩ES5的代码，所以压缩前需要先把代码转换过后
    .pipe(dest(tempPath))
}
```

#### gulp-htmlmin 压缩html文件

`gulp-htmlmin`是用于把html文件最小化

安装

```bash
yarn add gulp-htmlmin --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}


const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, distPath, assetsPaths } = config.build
const { data: dataConf } = config
const { styles, scripts, images, pages } = assetsPaths

const plugins = loadPlugins()

// 压缩html文件资源
const htmlmin = () => {
  return src(`${srcPath}/${pages}`, { base: srcPath })
    .pipe(plugins.swig({ data: dataConf, defaults: { cache: false } }))
    .pipe(plugins.htmlmin({
      collapseWhitespace: true, // 去除换行
      minifyCSS: true, // 压缩html页面内的css
      minifyJS: true // 压缩html页面内的js
    }))
    .pipe(dest(distPath))
}


module.exports = {
  htmlmin
}
```



#### gulp-useref 整合的HTML引用CSS和JS资源

`HTML`引用的多个`CSS`和`JS`合并起来，减小依赖的文件个数，从而减少浏览器发起的请求次数，`gulp-useref`根据注释将`HTML`中需要合并压缩的区块找出来，对区块内的所有文件进行合并, **注意：它只负责合并，不负责压缩！**,如果需要做其他操作，可以配合`gulp-if`插件使用

安装

```bash
yarn add gulp-useref --dev
```

使用

```html

  <!-- build:css assets/styles/vendor.css -->
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
  <!-- endbuild -->
  <!-- build:css assets/styles/main.css -->
  <link rel="stylesheet" href="assets/styles/main.css">
  <!-- endbuild -->

  <!-- build:js assets/scripts/vendor.js -->
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/popper.js/dist/umd/popper.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
  <!-- endbuild -->
  <!-- build:js assets/scripts/main.js -->
  <script src="assets/scripts/main.js"></script>
  <!-- endbuild -->
```



```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, distPath, assetsPaths } = config.build
const { styles, scripts, images, pages } = assetsPaths

const plugins = loadPlugins()


// useref
const useref = () => {
  return src(`${tempPath}/${pages}`, { base: tempPath })
    .pipe(plugins.useref({ searchPath:  [tempPath, '.'] })) // searchPath 表示搜索的资源的路径
    .pipe(dest(distPath))
}


module.exports = {
  useref
}
```

因为`gulp-useref`只做整合，不做资源的压缩，所以一般情况下，会配合`gulp-if`做资源压缩

#### gulp-if 条件判断

`gulp-if`用于做条件判断

安装

```bash
yarn add gulp-if --dev
```

可以配合`gulp-useref`使用，比如说对上面的代码进行处理

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, distPath, assetsPaths } = config.build
const { styles, scripts, images, pages } = assetsPaths
const plugins = loadPlugins()


const useref = () => {
  return src(`${tempPath}/${pages}`, { base: tempPath })
    .pipe(plugins.useref({ searchPath:  [tempPath, '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify())) // 以js结尾的文件，使用uglify插件进行压缩
    .pipe(plugins.if(/\.css$/, plugins.cleanCss())) // 以css结尾的文件，使用cleanCss压缩
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ // 以html结尾的文件，使用htmlmin压缩
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(distPath))
}

module.exports = {
  useref
}
```

#### del 删除

除了使用基于`gulp`的插件外，还可以使用`node`的一些模块使用

安装

```bash
yarn add del --dev
```

使用

```js
const { src, dest } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const del = require('del')

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, distPath, assetsPaths } = config.build
const { data: dataConf } = config
const { styles, scripts, images, pages } = assetsPaths

const plugins = loadPlugins()

// 清除文件
const clean = () => {
  // del模块会返回一个promise，所以符合gulp任务的语法要求
  return del([distPath, tempPath])
}

module.exports = {
  clean
}
```

#### 组合编译任务

新增一个`extra`和 `font`，通过`series`和`parallel`把任务组合起来

```js
const { src, dest, series, parallel } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const del = require('del')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const config = {
  build: {
    distPath: 'dist',
    srcPath: 'src', // 源码目录
    tempPath: 'temp', // 临时目录
    publicPath: 'public', // 不打包的资源
    assetsPaths: { // 资源目录
      styles: 'assets/styles/*.scss', // 样式资源文件
      scripts: 'assets/scripts/*.js', // 脚本资源文件
      images: 'assets/images/**', // 图片资源文件
      fonts: 'assets/fonts/**', // 字体资源文件
      pages: '*.html'
    }
  },
  data
}

const { tempPath, srcPath, distPath, assetsPaths, publicPath } = config.build
const { data: dataConf } = config
const { styles, scripts, images, pages, fonts } = assetsPaths

const plugins = loadPlugins()

// 编译css的文件
const style = () => {
  return src(`${srcPath}/${styles}`, { base: srcPath })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(tempPath))
}

// 编译脚本文件
const script = () => {
  return src(`${srcPath}/${scripts}`, { base: srcPath })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(tempPath))
}

// 压缩图片
const image = () => {
  return src(`${srcPath}/${images}`, { base: srcPath })
    .pipe(plugins.imagemin())
    .pipe(dest(tempPath))
}

// 编译页面资源
const page = () => {
  return src(`${srcPath}/${pages}`, { base: srcPath})
    .pipe(plugins.swig({ data: dataConf, defaults: { cache: false } }))
    .pipe(dest(tempPath))
}

// 压缩html文件资源
const htmlmin = () => {
  return src(`${srcPath}/${pages}`, { base: srcPath })
    .pipe(plugins.swig({ data: dataConf, defaults: { cache: false } }))
    .pipe(plugins.htmlmin({
      collapseWhitespace: true, // 去除换行
      minifyCSS: true, // 压缩html页面内的css
      minifyJS: true // 压缩html页面内的js
    }))
    .pipe(dest(distPath))
}


// useref
const useref = () => {
  return src(`${tempPath}/${pages}`, { base: tempPath })
    .pipe(plugins.useref({ searchPath:  [tempPath, '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify())) // 以js结尾的文件，使用uglify插件进行压缩
    .pipe(plugins.if(/\.css$/, plugins.cleanCss())) // 以css结尾的文件，使用cleanCss压缩
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ // 以html结尾的文件，使用htmlmin压缩
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(distPath))
}


// 压缩js资源
const uglify = () => {
  return src(`${srcPath}/${scripts}`, { base: srcPath })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(plugins.uglify())
    .pipe(dest(tempPath))
}

// 清除文件
const clean = () => {
  // del模块会返回一个promise，所以符合gulp任务的语法要求
  return del([distPath, tempPath])
}

// 复制文件
const extra = () => {
  return src('**', { base: publicPath })
    .pipe(dest(distPath)) 
}

// 复制字体
const font = () => {
  return src(`${srcPath}/${fonts}`, { base: srcPath })
    .pipe(plugins.imagemin())
    .pipe(dest(distPath))
}

// 上线之前执行的任务
const compile = parallel(style, script, page)

const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

module.exports = {
  build
}
```



#### 启动本地环境

#### browser-sync 启动本地服务

用于启动本地服务



