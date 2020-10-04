# Proxy

对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

简单点来说就是代理（代为管理），可以通过自定义方法去处理对象上的一些操作。

```js
const target = {
  name: 'jack'
}

const halder = {}

const proxy =  new Proxy(target, hander)

console.log(proxy.name) // jack
```

new Proxy 接收2个参数，第一个为target，需要代理的对象，第二个为hanlder 自定义行为的处理对象。

例子1:

方法是设置属性值操作的捕获器 get

```js
const obj = {
  name: 'jack'
}
const proxy =  new Proxy(obj, {
  get (target, property) {
    console.log(target, property) // { name: 'jack' } age
    return property in target ? target[property] : null
  }
})

console.log(proxy.age) // null
```

**参数：**

1. target 代理的对象
2. property 被获取属性名， 如果代理的为数组的，当前值为数组中的下标

**返回数：**

可以返回任何值

例子2：

```js
const obj = {
  name: 'jack'
}

const proxy = new Proxy(obj, {
  set (target, property, value) {
    console.log(target, property, value) // { name: 'jack' } name tom
    return true
  }
})

proxy.name = 'tom'
```

**参数：**

1. target 代理的对象
2. property 被获取属性名，如果代理的为数组的，当前值为数组中的下标
3. value 设置的属性值

**返回值：**

应当返回一个boolean

返回 `true` 代表属性设置成功

返回 `false` 表示属性设置失败