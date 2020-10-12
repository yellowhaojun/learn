# Reflect

> Reflect 是一个静态的方法，他提供了一系列的方法，让我们的代码更加的统一，Reflect 一共有13个静态的方法

## 使用

### has

对象中是否具备某个属性值

```js
const obj = {
  name: 'zce',
  age: 18
}

console.log(Reflect.has(obj, 'name')) // true
```

### deleteProperty

删除对象上的某个属性

```js
const obj = {
  name: 'zce',
  age: 18
}

console.log(Reflect.deleteProperty(obj, 'age')) // ture
```

### ownKeys

把对象中的key组合成数组

```js
const obj = {
  name: 'zce',
  age: 18
}

console.log(Reflect.ownKeys(obj)) // ['name', 'age']
```



