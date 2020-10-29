# yarn 与 npm

以下所有内容都区分为`npm`和`yarn`

初始化配置文件

```bash
yarn init
```

```bash
npm init
```

安装依赖

```bash
yarn add <模块名>
```

```bash
npm install <模块名>
```

安装依赖开发依赖

```bash
yarn add <模块名> --dev
```

```bash
npm install <模块名> --save-dev
```

全局安装命令

```bash
yarn global add <模块名>
```

```bash
npm install -g <模块名>
```

链接到目标文件夹，生成一个可执行命令， 在`link`目标文件夹种执行，生成命令默认使用的是当前目录`package.json`内的`name`的值

```bash
yarn link
```

```bash
npm link
```

去除链接到目标文件夹

```bash
yarn unlink
```

```bash
npm unlink
```

读取本地`node_modules`的`bin`文件的命令, `yarn`直接使用`yarn`, `npm`使用`npx`

```bash
yarn <bin命令>
```

```bash
npx <bin命令>
```

