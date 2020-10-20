# yeoman

> Yeamon帮助你快速的开展一个项目工程，提供最佳实践和工具，来让你保持高效率编码

## 使用

使用步骤:

1. 明确你的需求
2. 找到合适的`Generator`
3. 全局范围安装`Generator`
4. 通过`Yo`运行对应的`Generator`
5. 通过命令行交互填写选项
6. 生成你所需要的项目结构

需要使用yeoman，需要在全局当中安装`yeoman`

```bash
npm install -g yo
```

此时具备一个`yo`的可执行的命令

```bash
yo
```

当执行`yo`命令，会提示`Run a generator`， 运行一个`generator``， 此时就可以选择一个你需要的去安装

还是指定安装需要的`generator`

```bash
npm install -g {generator}
```

使用的时候取不需要输入`generator`, 比如安装一个``generator`-webapp`, `npm install -g generator`-webapp`，使用的时候，我们只需要以下的代码即可

```bash
yo webapp
```

还可以`yo`安装`Sub Generator`，比如安装一个`node:cli`

```bash
yo node:cli
```

`Sub Generator`必须要所选的`Generator`具备`Sub Generator`才可以使用

## 编写generator

创建自定义的`Generator`, 必须具备特定的目录结构

```bash
├── generators             生成器目录
│   ├── app                默认生成器目录
│   │   └── index.js       默认生成器实现
│   └── component          其他生成期目录
│       └── index.js       其他生成器实现
└── package.json           模块包配置文件
```

生成器的命令必须使用以下的命名规范

```bash
generator-<name>
```

当生成完目录后，安装yeoman的依赖

```bash
yarn add yeoman-generator
```

接着实现编程器， `generators/app/index.js`作为`Generator的核心入口`, 引入`yeoman-generator`并导出一个继承`yeoman-generator`的类

```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
}
```

`Yeoman Generator` 在工作时会自动调用我们在此类型中定义的一些生命周期方法, 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能

文件写入

```js

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing () {
    // Yeoman 自动生成文件阶段调用此方法
    // this.fs 接收两个参数，一个是写入的文件路径，一个是写入的内容
    this.fs.write(
      // this.destinationPath 自动获取生成目录下对应的路径
      this.destinationPath('temp.txt'),
      Math.random().toString()
    )
  }
}
```

根据膜拜创建文件

可以在`generators/app`下创建一个`templates`的文件夹，里面存放的文件为模版的文件, 内部可以使用`Ejs`的语法进行数据替换

```ejs
<%= title %>

<% if (success) { %>
 Ejs语法
<% } %>
```

通过`this.fs.copyTpl`使用模版创建文件，传入三个参数，第一个为模版文件路径，第二个为输入目标的路径，第三个为模版数据上下文

```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing () {
   
    // 通过模版的方式写入文件到目标目录
    // 模版文件路径
    // 通过 this.templatePath 获取模版目录所在的文件路径
    const tmpl = this.templatePath('foo.txt')

    // 输入目标的路径
    const output = this.destinationPath('foo.txt')

    // 模版数据上下文
    const contentx = { title: 'Hello world', success: false }

    this.fs.copyTpl(tmpl, output, contentx)
  }
}
```

接受用户输入数据

需要询问用户的问题时候，可以调用`prompting`的钩子进行处理,

```js
module.exports = class extends Generator {
  // Yeoman 在询问用户环节自动调用此方法
  // 在此方法可以调用父类的 prompt() 方法进行问题询问
  prompting () {
    // this.prompt 最终会返回一个Promise，方便异步流程的控制
    return this.prompt([
      {
        type: 'input', // 问题类型
        name: 'name', // 问题的名字
        message: 'Your project name', // 问题信息
        default: this.appname // appname 为项目生成目录名称
      }
    ])
    .then(answers => {
      // answers => { name: 'user input value' }
      this.answers = answers // 保存起来以方便后面的操作
    })
  }

  writing () {
    const tmpl = this.templatePath('foo.txt')
    const output = this.destinationPath('foo.txt')
    const contentx = this.answers

    this.fs.copyTpl(tmpl, output, contentx)
  }
}
```



在调试的阶段可以使用`yarn link`的方式设置软链，进行调试

```bash
yarn link
```

