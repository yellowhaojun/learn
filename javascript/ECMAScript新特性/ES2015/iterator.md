# iterator

> iterator迭代器，ES6当中有3数据类型具备iterator接口: Array、Set、Map。除此之外，其他的数据结构的`iterator`接口，都需要自己在属性上面部署，这样子才能被for of循环所遍历。

## 语法

```js
next () {
  return index < arr.length {
    value: <value>,
    done: <true|false>
  }
}
```

iterator返回的需要具备next的方法，next需要返回一个对象具备，value的值，和表示是否完成的done属性

## 内置的iterator

我们知道Array、Set、Map具备内置的iterator接口，下面是获取了Array内的`iterator`接口进行使用

```js
const arr = [1, 2, 3]
const current = arr[Symbol.iterator]()

console.log(current.next()) // { value: 1, done: false }
console.log(current.next()) // { value: 2, done: false }
console.log(current.next()) // { value: 3, done: false }
```

## 实现Iterable接口

可以通过Symbol.iterator 去自定义一个自己`iterator`接口

```js
const person = {
  hobbies: ['sing', 'programing', 'sports'],
  [Symbol.iterator] () {
    let index = 0
    let hobbies = this.hobbies
    return {
      next () {
        return {
          done: index >= hobbies.length,
          value: hobbies[index++]
        }
      }
    }
  }
}

for (const hobbies of person) {
  console.log(hobbies)
}
// sing
// programing
// sports
```



