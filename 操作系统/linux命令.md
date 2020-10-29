# linux的命令

## tree

`tree`命令显示当前文件夹的目录结构，这是一个非常有用的命令，可以帮我们迅速了解当前目录的结构

基本使用:

```bash
tree
```

忽略某个目录, `-I`后面增加忽略的文件夹或者文件

```bash
tree -I 'node_modules'
```

只看两级目录, `-L`后面增加目录的层级数

```bash
tree -L 2
```

## curl

`curl`命令用于请求`WEB`服务器。它的名字就是客户端（client）的 URL 工具的意思

基本使用

```bash
curl https://www.baidu.com
```

不带任何参数时，`curl`就是发出`GET`请求

-A

`-A`参数指定客户端用户代理标头，即`User-Agent`，`curl`的默认用户代理字符串是`culr[version]`