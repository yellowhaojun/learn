# let 与 const

## let 与 块级作用域

### 块级作用域

在此之前，ES只有全局作用域和函数作用域，ES6种新增了块级作用域

```js
if (true) {
  var foo1 = 'foo'
}
console.log(foo1) // 'foo'


if (true) {
  let foo2 = 'foo'
}
console.log(foo2) // foo is not defined
```

简单点来讲 { } 内就属于一个块，而这个作用域的作用就只在{}内，当我们使用var定义的时候，属于全局作用域，而使用let就成了块级作用域，所以foo1输出'foo'，而foo2会输出error foo is not defined

### let不存在变量提升

```js
console.log(foo)
let foo = 'foo'
```

### 隐形的块级作用域

在ES6之前的，也存在着隐形的块级作用域

```js
try {
  undefined()
} catch (err) {
  console.log(err)
}
console.log(err) // error
```

### 使用let的好处

#### let 不存在变量覆盖

在for循环当中如果使用了var去定义了两个相同的变量，会产生覆盖效果，最终我们只会得到一次输出

```js
for (var i = 0; i < 3; i++) {
  for (var i = 0; i < 3; i++) {
    console.log(i)
  }
  console.log('内层结束 i = ' + i)
}
```

而如果我们使用了let取定义的话，是不会产生覆盖的效果，最终可以得到我们想得到的效果

```js
for (var i = 0; i < 3; i++) {
  for (let i = 0; i < 3; i++) {
    console.log(i)
  }
  console.log('内层结束 i = ' + i)
}
```

即使let不会产生副作用，但为了代码的可读性，还是建议使用不同的变量去处理

#### for循环可以得到正确的索引

下面的代码执行之后，会发现得不到正确的索引

```js
var elements = [{}, {}, {}]

for (var i = 0; i < elements.length; i++) {
  elements[i].onclick = function () {
    console.log(i)
  }
}

elements[1].onclick() // 3
```

我们希望得到正确的索引的值，我们可以使用必包，使用函数作用域去解决当前的问题

```js
var elements = [{}, {}, {}]

for (var i = 0; i < elements.length; i++) {
  elements[i].onclick = (function (i) {
    return function() {
      console.log(i)
    }
  })(i)
}

elements[1].onclick()
```

其实这里更简单的解决方法是使用let

```js
var elements = [{}, {}, {}]

for (var i = 0; i < elements.length; i++) {
  elements[i].onclick = function () {
    console.log(i)
  }
}

elements[1].onclick()
```

## const

### const的特性

const 是用于定义常量的，修改后是不允许修改，这里的不允许修改指得是不允许修改变量内存地址 

```js
// 修改了内存地址
const a = '123'
a = '123' // error

// 不允许发开定义值，必须初始化值
const name
name = '123' // error

// 修改了内存推内的值
const obj = {
  name: '123'
}

obj.name = '456'
console.log(obj.name) // 456
```