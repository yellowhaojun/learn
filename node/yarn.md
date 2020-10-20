# yarn 

初始化配置文件

```bash
yarn init
```

安装依赖

```bash
yarn add {模块名}
```

全局安装命令

```bash
yarn global add {模块名}
```

链接到目标文件夹，生成一个可执行命令， 在`link`目标文件夹种执行，生成命令默认使用的是当前目录`package.json`内的`name`的值

```bash
yarn link
```

去除链接到目标文件夹

```bash
yarn uninlink
```

