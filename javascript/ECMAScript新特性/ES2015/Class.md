# Class

> ES6当中给我们提供了一个新的语法糖，Class，我们过去使用面向对象，使用的是function的构造函数，而在ES6当中，使用Class使我们的面向对象用起来更加的方便



## 使用

```js
// 过去
function Person(name) {
  this.name = name
}

Person.prototype.sayHi = function() {
  console.log(`Hi, my name is ${this.name}`)
}

const person = new Person('jack')
person.sayHi() // Hi, my name is jack

// 现在
class Person {
  constructor(name) { // 构造函数
    this.name = name
  }
  sayHi() {
    console.log(`Hi, my name is ${this.name}`)
  }
}


const person = new Person('jack')
person.sayHi() // Hi, my name is jack
```

## static 静态方法

static 关键字是用于生成一个静态的方法，而静态方法是直接挂载到Class上的，所以我们调用的时候使用Person.creact调用，而不是new一个实例去调用

```js
class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, my name is ${this.name}`)
  }

  static create(name) {
    return new Person(name)
  }
}

const person = Person.create('jack')
person.sayHi() // Hi, my name is jack
```

### extends 继承

面向对象一个很重要的特性，就是类的继承，在ES6中能够更容易地去实现这个继承

```js
class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, my name is ${this.name}`)
  }

  static create(name) {
    return new Person(name)
  }
}

// Student 继承 Person
class Student extends Person {
  constructor(name) {
    super(name) // 调用了父类的constructor
  }
  learn () {
    super.sayHi() // 调用了父类的sayHi方法
    console.log(`${this.name} love study`) 
  }
}

const student = new  Student('jack')
student.learn() // Hi, my name is jack
								 // jack love study
```

super的关键字是用于调用父类的方法或者访问的，直接调用super相当于调用了父类的 constructor 构造函数 
