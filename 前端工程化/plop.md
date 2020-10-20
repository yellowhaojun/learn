# plop

> Plop 一个小而美的脚手架工具，日常当中在创建一些模版的文件的时候，可以通plop来快速生成通用的模版文件

## 使用

需要使用`plop`, 首先需要吧`plop`安装到依赖文件当中

```bash
yarn add plop --dev
```

首先创建一个`plopfile.js`的`plop`的入口文件

```bash
touch plopfile.js
```

在`plopfile.js`文件当中，需要到处一个函数, 函数接收一个`plop`对象，用于创建生成器的任务

```js
module.exports = plop => {
// 任务名称 
plop.setGenerator('component', {
    // 任务描述
    description: 'create a component',
}
```

可以通过`prompts`去定义用户的交互

```js
module.exports = plop => {
  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input', // 问题类型
        name: 'name', // 问题名称
        message: 'component name', // 问题信息
        default: 'MyComponent' // 默认值
      }
    ]
}
```

通过`actions`去定义动作， 一般模版文件是定义到一个叫`plop-templates`的文件夹当中

```js
module.exports = plop => {
  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponent'
      }
    ],
    actions: [{
      type: 'add', // type 动作类型，add代表添加文件
      path: 'src/components/{{name}}/{{name}}.js', // 写入文件的路径，这里可以使用{{}}插值表达式的方式去传入prompts的值
      templateFile: 'plop-templates/component.hbs' // 模版文件的路径，使用hbs的语法
    }]
  })
}
```

可以通过`yarn`调用`plop`的脚本, `<name>`为`plop`生成器的任务名称

```bash
yarn plop <name>
```

